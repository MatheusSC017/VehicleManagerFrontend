import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { FormsModule } from '@angular/forms';
import { VehicleType, VehicleChange, VehicleFuel, VehicleStatus } from '../../enums/vehicle.enums';
import { CommonModule } from '@angular/common';
import { VehicleMultImages } from '../../interfaces/VehicleMultImages';
import { ErrorResponse } from '../../interfaces/ErrorResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-vehicle-register',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './vehicle-register.component.html',
  styleUrl: './vehicle-register.component.css'
})
export class VehicleRegisterComponent {
  vehicleTypeList = Object.entries(VehicleType);
  vehicleStatusList = Object.entries(VehicleStatus);
  vehicleFuelList = Object.entries(VehicleFuel);
  vehicleChangeList = Object.entries(VehicleChange);
  
  serverErrors: any = {};
  images: File[] = [];

  constructor(private vehicleService: VehicleService, private router: Router) {}

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.images = Array.from(target.files);
    }
  }

  addVehicle(vehicle: VehicleMultImages) {
    this.vehicleService.createVehicle(vehicle, this.images).subscribe({
      next: (vehicleData:VehicleMultImages) => {
        this.router.navigate(['/veiculos']);
      },
      error: (httpError: HttpErrorResponse) => {
        const errorResponse = httpError.error as ErrorResponse<VehicleMultImages>;
        this.serverErrors = errorResponse.errors;
      }
    });

  }

}
