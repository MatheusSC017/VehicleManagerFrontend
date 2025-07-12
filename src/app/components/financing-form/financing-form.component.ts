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

  financingInterface: Financing = {
    id: 0,
    client: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    vehicle: {
      id: 0,
      model: "",
      brand: "",
      chassi: ""
    },
    totalAmount: 0.0,
    downPayment: 0.0,
    installmentCount: 0.0,
    installmentValue: 0.0,
    annualInterestRate: 0.0,
    contractDate: "",
    firstInstallmentDate: "",
    financingStatus: "",
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
      this.title = "Atualizar"

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
          financingStatus: financing.financingStatus,
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
}
