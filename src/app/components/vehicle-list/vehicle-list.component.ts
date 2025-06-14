import { Component, inject } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleType, VehicleStatus, VehicleFuel, VehicleChange } from '../../enums/vehicle.enums';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterLink } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  imports: [CommonModule, RouterModule, RouterLink],
})
export class VehicleListComponent {
  vehicleTypeList = Object.entries(VehicleType);
  vehicleStatusList = Object.entries(VehicleStatus);
  vehicleFuelList = Object.entries(VehicleFuel);
  vehicleChangeList = Object.entries(VehicleChange);

  vehicleStatusMap: { [key: string]: string } = {
    AVAILABLE: VehicleStatus.AVAILABLE,
    REFURBISHED: VehicleStatus.REFURBISHED,
    SOLD: VehicleStatus.SOLD,
    MAINTENACE: VehicleStatus.MAINTENACE
  };

  search: String = '';
  selectedType: String = '';
  selectedStatus: String = '';
  selectedFuel: String = '';
  selectedPriceMin: number = 0;
  selectedPriceMax: number = 0;
  currentPage: number = 0;
  totalPages: number = 1;

  baseUrl = environment.baseUrl;

  vehicles: any;

  constructor(private route: ActivatedRoute, private vehicleService:VehicleService){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const queryParams: any = {};
      
      if (params.has('searchInput')) {
        queryParams.searchInput = params.get('searchInput');
        this.search = params.get('searchInput') || '';
      }

      if (params.has('type')) {
        queryParams.type = params.get('type');
        this.selectedType = params.get('type') || '';
      }

      if (params.has('status')) {
        queryParams.status = params.get('status');
        this.selectedStatus = params.get('status') || '';
      }

      if (params.has('fuel')) {
        queryParams.fuel = params.get('fuel');
        this.selectedFuel = params.get('fuel') || '';
      }

      if (params.has('priceMin')) {
        queryParams.priceMin = params.get('priceMin');
        this.selectedPriceMin = Number(params.get('priceMin'));
      }

      if (params.has('priceMax')) {
        queryParams.priceMax = params.get('priceMax');
        this.selectedPriceMax = Number(params.get('priceMax'));
      }

      if (params.has('page')) {
        queryParams.page = params.get('page');
        this.currentPage = Number(params.get('page'));
      }

      this.vehicleService.getVehicles(queryParams).subscribe(data => {
        this.vehicles = data.content;
        this.totalPages = data.totalPages;
      });
    });
  
  }
}