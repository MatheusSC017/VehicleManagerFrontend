import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { ClientService } from '../../services/client.service';
import { FinancingService } from '../../services/financing.service';
import { Financing } from '../../interfaces/financing';
import { catchError, switchMap } from 'rxjs/operators';
import { forkJoin, throwError } from 'rxjs';
import { ErrorResponse } from '../../interfaces/error-response';

@Component({
  selector: 'app-financing-form',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './financing-form.component.html',
  styleUrl: './financing-form.component.css'
})
export class FinancingFormComponent {
  title = 'Cadastrar';
  serverErrors: any = {};

  constructor(
    private vehicleService: VehicleService, 
    private clientService: ClientService,
    private financingService: FinancingService,
    private router: Router
  ) {}

  onSubmit(financing: any): void {
    this.serverErrors = {};

    const vehicle$ = this.vehicleService.getVehicleByChassi(financing.vehicleChassi).pipe(
      catchError(() => {
        this.serverErrors['vehicleChassi'] = 'Veículo não encontrado';
        return throwError(() => 'vehicle error');
      })
    );

    const client$ = this.clientService.getClientByEmail(financing.clientEmail).pipe(
      catchError(() => {
        this.serverErrors['clientEmail'] = 'Cliente não encontrado';
        return throwError(() => 'client error');
      })
    );

    forkJoin({ vehicle: vehicle$, client: client$ }).pipe(
      switchMap(({ vehicle, client }) => {
        if (vehicle.vehicleStatus !== 'AVAILABLE') {
          this.serverErrors['vehicleChassi'] = 'Veículo não disponível';
          return throwError(() => 'vehicle not available');
        }

        const financingInterface: Financing = {
          id: 0,
          client: client.id,
          vehicle: vehicle.id,
          totalAmount: financing.totalAmount,
          downPayment: financing.downPayment,
          installmentCount: financing.installmentCount,
          installmentValue: financing.installmentValue,
          annualInterestRate: financing.annualInterestRate,
          contractDate: financing.contractDate,
          firstInstallmentDate: financing.firstInstallmentDate,
          financingStatus: financing.financingStatus,
        };

        return this.financingService.create(financingInterface);
      })
    ).subscribe({
      next: (financingData: Financing) => {
        this.router.navigate(['/financiamentos']);
      },
      error: (err) => {
        if (typeof err === 'string') return;
        const errorResponse = err.error as ErrorResponse<Financing>;
        console.log(errorResponse);
        this.serverErrors = errorResponse?.errors ?? { general: 'Erro inesperado.' };
      }
    });  
  }
}
