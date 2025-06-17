import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleType, VehicleStatus, VehicleFuel, VehicleChange } from '../../enums/vehicle.enums';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterLink, Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { Vehicle } from '../../interfaces/Vehicle';
import { VehicleFilters } from '../../interfaces/VehicleFilters';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
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

  constructor(private router: Router, private route: ActivatedRoute, private vehicleService:VehicleService){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const queryParams: any = {};

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

      this.vehicleService.getVehicles(queryParams).subscribe(data => {
        this.vehicles = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      });
    });
  
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
}