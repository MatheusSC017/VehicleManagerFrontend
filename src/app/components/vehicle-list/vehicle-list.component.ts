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

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
})
export class VehicleListComponent {
  selectedVehicle: Vehicle | null = null;
  showSaleModal: boolean = false;
  saleFormError: any = {};

  saleStatus: 'SOLD' | 'RESERVED' = 'SOLD';
  
  vehicleTypeList = Object.entries(VehicleType);
  vehicleStatusList = Object.entries(VehicleStatus);
  vehicleFuelList = Object.entries(VehicleFuel);
  vehicleChangeList = Object.entries(VehicleChange);

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
    private vehicleService:VehicleService,
    private clientService: ClientService,
    private saleService:SaleService
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
    this.vehicleService.deleteVehicle(vehicleId).subscribe({
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

      this.vehicleService.getVehiclesWithImages(queryParams).subscribe(data => {
        this.vehicles = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      });
    });
  }

  openSaleModal(vehicle: Vehicle): void {
    if (vehicle.vehicleStatus == 'AVAILABLE') {
      this.selectedVehicle = vehicle;
      this.showSaleModal = true;
    }
  }

  closeSaleModal(): void {
    this.showSaleModal = false;
  }

  newSale(sale: any): void {
    if (this.selectedVehicle == null) return;
      
    this.clientService.getClientByEmail(sale.email).pipe(
      catchError(() => {
        this.saleFormError['email'] = 'Cliente não encontrado';
        return throwError(() => 'client error');
      })
    ).subscribe({
      next: (client: Client) => {
        this.saleService.create(client, this.selectedVehicle as Vehicle, sale.saleStatus).subscribe({
          next: response => {
            this.getVehicles();
            this.closeSaleModal();
          },
          error: error => {
            this.saleFormError['sale'] = error;
          }
        });
      },
      error: (err) => {
        this.saleFormError['email'] = 'Cliente não encontrado';
        console.error('Erro ao buscar cliente:', err);
      }
    });
  }
}