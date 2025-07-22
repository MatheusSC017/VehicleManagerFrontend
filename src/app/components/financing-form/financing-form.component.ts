import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { ClientService } from '../../services/client.service';
import { FinancingService } from '../../services/financing.service';
import { Financing } from '../../interfaces/financing';
import { catchError, switchMap } from 'rxjs/operators';
import { forkJoin, throwError } from 'rxjs';
import { ErrorResponse } from '../../interfaces/error-response';
import { FinancingStatus } from '../../enums/financing.enums';
import { VehicleMinimal } from '../../interfaces/vehicle-minimal';
import { Client } from '../../interfaces/client';
import { Vehicle } from '../../interfaces/vehicle';

@Component({
  selector: 'app-financing-form',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './financing-form.component.html',
  styleUrl: './financing-form.component.css'
})
export class FinancingFormComponent {
  title = 'Cadastrar';
  id!: number;
  currentVehicle!: VehicleMinimal;
  serverErrors: any = {};

  showClientSearch: boolean = false;
  searchClientQuery: string = '';
  clients: Client[] = [];

  showVehicleSearch: boolean = false;
  searchVehicleQuery: string = '';
  vehicles: Vehicle[] = [];

  financingInterface: Financing = {
    id: 0,
    client: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    vehicle: {
      id: 0,
      model: '',
      brand: '',
      chassi: ''
    },
    totalAmount: 0.0,
    downPayment: 0.0,
    installmentCount: 0.0,
    installmentValue: 0.0,
    annualInterestRate: 0.0,
    contractDate: '',
    firstInstallmentDate: '',
    financingStatus: '',
  };

  financingStatusList = Object.entries(FinancingStatus);

  constructor(
    private vehicleService: VehicleService, 
    private clientService: ClientService,
    private financingService: FinancingService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    if (this.id) {
      this.title = 'Atualizar'

      this.financingService.get(this.id).subscribe({
        next: data => {
          this.financingInterface = data;
          this.currentVehicle = this.financingInterface.vehicle;
        },
        error: (err) => {
          this.router.navigate(['/financiamentos']);
        }
      });
    }
  }

  onSubmit(financing: any): void {
    this.serverErrors = {};

    const vehicle$ = this.vehicleService.getByChassi(financing.vehicleChassi).pipe(
      catchError(() => {
        this.serverErrors['vehicleChassi'] = 'Veículo não encontrado';
        return throwError(() => 'vehicle error');
      })
    );

    const client$ = this.clientService.getByEmail(financing.clientEmail).pipe(
      catchError(() => {
        this.serverErrors['clientEmail'] = 'Cliente não encontrado';
        return throwError(() => 'client error');
      })
    );

    forkJoin({ vehicle: vehicle$, client: client$ }).pipe(
      switchMap(({ vehicle, client }) => {
        if ((!this.id || financing.vehicleChassi != this.currentVehicle.chassi) && vehicle.vehicleStatus !== 'AVAILABLE') {
          this.serverErrors['vehicleChassi'] = 'Veículo não disponível';
          return throwError(() => 'vehicle not available');
        }

        this.financingInterface = {
          id: 0,
          client: client,
          vehicle: vehicle,
          totalAmount: financing.totalAmount,
          downPayment: financing.downPayment,
          installmentCount: financing.installmentCount,
          installmentValue: financing.installmentValue,
          annualInterestRate: financing.annualInterestRate,
          contractDate: financing.contractDate,
          firstInstallmentDate: financing.firstInstallmentDate,
          financingStatus: '',
        };
        
        if (this.id) {
          return this.financingService.update(this.id, this.financingInterface);
        } else {
          return this.financingService.create(this.financingInterface);
        }
      })
    ).subscribe({
      next: (financingData: Financing) => {
        this.router.navigate(['/financiamentos']);
      },
      error: (err) => {
        if (typeof err === 'string') return;
        const errorResponse = err.error as ErrorResponse<Financing>;
        this.serverErrors = errorResponse?.errors ?? { general: 'Erro inesperado.' };
      }
    });  
  }

  calculateInstallmentValue(): void {
    this.serverErrors = {};
    this.financingInterface.installmentValue = 0.0;

    if (this.financingInterface.totalAmount != 0.0 && 
      this.financingInterface.installmentCount != 0.0
    ) {
      if (this.financingInterface.downPayment >= this.financingInterface.totalAmount) {
        this.serverErrors['downPayment'] = 'Valor da entrada deve ser menor que o valor total do veículo;';
        return;
      }

      if (this.financingInterface.installmentCount <= 0) {
        this.serverErrors['installmentCount'] = 'Quantidade de parcelas não pode ser igual ou menor que zero;';
        return
      }

      if (this.financingInterface.annualInterestRate < 0) {
        this.serverErrors['annualInterestRate'] = 'Taxa de juros anual não pode ser menor que zero;';
        return
      }

      const financedAmount = this.financingInterface.totalAmount - this.financingInterface.downPayment;

      const monthlyRate = this.financingInterface.annualInterestRate / 100 / 12;

      if (monthlyRate === 0) {
        this.financingInterface.installmentValue = financedAmount / this.financingInterface.installmentCount;
        return;
      }

      const installmentValue = (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -this.financingInterface.installmentCount));
      this.financingInterface.installmentValue  = parseFloat(installmentValue.toFixed(2));
    }
  }

  openClientSearch(): void {
    this.clients = [];
    this.searchClientQuery = '';
    this.showClientSearch = true;
  }

  closeClientSearch(): void {
    this.showClientSearch = false;
  }

  searchClients(searchFor: string): void {
    this.clientService.search(searchFor).subscribe({
      next: clients => {
        this.clients = clients;
      }
    })
  }

  selectClient(client: Client): void {
    this.financingInterface.client = client;
    this.showClientSearch = false;
  }

  openVehicleSearch(): void {
    this.vehicles = [];
    this.searchVehicleQuery = '';
    this.showVehicleSearch = true;
  }

  closeVehicleSearch(): void {
    this.showVehicleSearch = false;
  }

  searchVehicles(searchFor: string): void {
    this.vehicleService.search(searchFor).subscribe({
      next: vehicles => {
        this.vehicles = vehicles;
      }
    })
  }

  selectVehicle(vehicle: Vehicle): void {
    this.financingInterface.vehicle = vehicle;
    this.showVehicleSearch = false;
  }

}
