import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleType, VehicleStatus, VehicleFuel, VehicleChange } from '../../enums/vehicle.enums';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterLink, Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { Vehicle } from '../../interfaces/vehicle';
import { VehicleFilters } from '../../interfaces/vehicle-filters';
import { SaleService } from '../../services/sale.service';
import { ClientService } from '../../services/client.service';
import { catchError, throwError } from 'rxjs';
import { Client } from '../../interfaces/client';
import { Sale } from '../../interfaces/sale';
import { SaleStatus } from '../../enums/sale.enums';
import { ErrorResponse } from '../../interfaces/error-response';
import { MaintenanceService } from '../../services/maintenance.service';
import { Maintenance } from '../../interfaces/maintenance';
import { HttpErrorResponse } from '@angular/common/http';
import { FinancingService } from '../../services/financing.service';
import { Financing } from '../../interfaces/financing';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
})
export class VehicleListComponent {
  selectedVehicle: Vehicle | null = null;
  showSaleModal: boolean = false;
  saleRegister: boolean = true;
  saleFormError: any = {};
  selectedSale: any = {
    client: { email: '' },
    status: 'SOLD'
  };
  sales: Sale[] = [];
  financedVehicle: Financing | null = null;

  showMaintenanceModal: boolean = false;
  maintenances: Maintenance[] = [];
  maintenanceAdditionalInfo = '';

  saleStatus: string = 'SOLD';
  saleStatusList = Object.entries(SaleStatus);
  
  vehicleTypeList = Object.entries(VehicleType);
  vehicleStatusList = Object.entries(VehicleStatus);
  vehicleFuelList = Object.entries(VehicleFuel);
  vehicleChangeList = Object.entries(VehicleChange);

  saleStatusMap: { [key: string]: string } = {
    SOLD: SaleStatus.SOLD,
    RESERVED: SaleStatus.RESERVED,
    CANCELED: SaleStatus.CANCELED
  };

  vehicleStatusMap: { [key: string]: string } = {
    AVAILABLE: VehicleStatus.AVAILABLE,
    RESERVED: VehicleStatus.RESERVED,
    SOLD: VehicleStatus.SOLD,
    MAINTENANCE: VehicleStatus.MAINTENANCE
  };

  currentPage: number = 0;
  totalPages: number = 1;

  filters: VehicleFilters = {
    searchInput: '',
    status: '',
    type: '',
    fuel: '',
    priceMin: '',
    priceMax: '',
  };

  baseUrl = environment.baseUrl;

  vehicles: Vehicle[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private vehicleService: VehicleService,
    private clientService: ClientService,
    private saleService: SaleService,
    private maintenanceService: MaintenanceService,
    private financingService: FinancingService
  ){}

  ngOnInit(): void {
    this.getVehicles();
  }

  onSubmit(): void {
    const queryParams: any = {};

    for (const [key, value] of Object.entries(this.filters)) {
      if (value) {
        queryParams[key] = value;
      }
    }

    this.router.navigate(['/veiculos'], { queryParams });
  }

  onDelete(vehicleId: number): void {
    this.vehicleService.delete(vehicleId).subscribe({
      next: () => this.getVehicles(),
      error: (err) => console.error(err)
    });
  }

  getVehicles(): void {
    this.route.queryParamMap.subscribe(params => {
      let queryParams: any = {};

      const filterKeys = Object.keys(this.filters) as (keyof VehicleFilters)[];

      filterKeys.forEach(key => {
        if (params.has(key)) {
          let value = params.get(key) ?? '';

          this.filters[key] = value;
          queryParams[key] = value;
        }
      });

      if (params.has('page')) {
        queryParams.page = params.get('page');
      }

      this.vehicleService.getAllWithImages(queryParams).subscribe(data => {
        this.vehicles = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      });
    });
  }

  openSaleWindow(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
    this.sales = [];
    this.selectedSale = {
      client: { email: '' },
      status: 'SOLD'
    };
    this.saleRegister = true;
    this.financedVehicle = null;
    this.saleService.getAllByVehicle(vehicle.id).subscribe({
      next: sales => {
        this.sales = sales;
        if (sales.length > 0 && sales[0].status != 'CANCELED') {
          this.saleRegister = false;
          this.selectedSale = Object.assign({}, sales[0]);
        } else {
          this.financingService.getByVehicleId(vehicle.id).subscribe({
            next: response => {
              if (response != null) {
                this.financedVehicle = response;
              }
            }
          })
        }
      }
    })

    this.showSaleModal = true;
  }

  closeSaleModal(): void {
    this.showSaleModal = false;
  }

  manageSale(sale: any): void {
    if (this.selectedVehicle == null) return;
      
    this.clientService.getByEmail(sale.email).pipe(
      catchError(() => {
        this.saleFormError['email'] = 'Cliente não encontrado';
        return throwError(() => 'client error');
      })
    ).subscribe({
      next: (client: Client) => {
        if (this.saleRegister) {
          this.saleService.create(client, this.selectedVehicle as Vehicle, sale.saleStatus).subscribe({
            next: response => {
              this.getVehicles();
              this.closeSaleModal();
            },
            error: (httpError: HttpErrorResponse) => {
              const errorResponse = httpError.error as ErrorResponse<Sale>;
              this.saleFormError = errorResponse?.errors ?? { general: 'Erro inesperado.' };
            }
          });
        } else {
            this.saleService.update(this.selectedSale.id, client, this.selectedVehicle as Vehicle, sale.saleStatus).subscribe({
            next: response => {
              this.getVehicles();
              this.closeSaleModal();
            },
            error: (httpError: HttpErrorResponse) => {
              const errorResponse = httpError.error as ErrorResponse<Sale>;
              console.log(errorResponse.errors);
              this.saleFormError = errorResponse?.errors ?? { general: 'Erro inesperado.' };
            }
          });
        }
      },
      error: (err) => {
        this.saleFormError['email'] = 'Cliente não encontrado';
        console.error('Erro ao buscar cliente:', err);
      }
    });
  }

  openMaintenanceModal(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.showMaintenanceModal = true;
    this.maintenanceAdditionalInfo = '';
    this.maintenanceService.getAllByVehicle(vehicle.id).subscribe({
        next: maintenances => {
          this.maintenances = maintenances;
        }
    });
  }

  closeMaintenanceModal() {
    this.showMaintenanceModal = false;
    this.maintenances = [];
    this.selectedVehicle = null;
  }

  manageMaintenance(): void {
    const vehicle = this.selectedVehicle;
    if (vehicle == null) return;

    if (vehicle.vehicleStatus == 'AVAILABLE') {
      this.maintenanceService.create(vehicle.id, this.maintenanceAdditionalInfo).subscribe({
        next: (maintenance: Maintenance) => {
          vehicle.vehicleStatus = 'MAINTENANCE';
          this.closeMaintenanceModal();
        }
      });
    } else {
      if (this.maintenances.length > 0 && this.maintenances[0].endDate != '') {
        this.maintenanceService.delete(this.maintenances[0].id).subscribe({
          next: response => {
            vehicle.vehicleStatus = 'AVAILABLE';
            this.closeMaintenanceModal();
          }
        })
      }
    }
  }

}