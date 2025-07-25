import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { FormsModule } from '@angular/forms';
import { VehicleType, VehicleChange, VehicleFuel, VehicleStatus } from '../../enums/vehicle.enums';
import { CommonModule } from '@angular/common';
import { VehicleMultImages } from '../../interfaces/vehicle-mult-images';
import { ErrorResponse } from '../../interfaces/error-response';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToggleService } from '../../shared/toggle.service';
import { ImagePreviewService } from '../../shared/image-preview.service';
import { FileService } from '../../services/file.service';
import { Vehicle } from '../../interfaces/vehicle';


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

  constructor(
    private vehicleService: VehicleService, 
    private fileService: FileService,
    private router: Router, 
    public toggleService: ToggleService,
    public imagePreviewService: ImagePreviewService
  ) {
    this.toggleService.activeSections['basicInfo'] = true; 
  }

  onFileSelected(event: Event): void {
    this.imagePreviewService.onFileSelected(event);

    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.images = Array.from(target.files);
    }
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicleService.create(vehicle).subscribe({
      next: (vehicleData: Vehicle) => {
        this.fileService.create(vehicleData.id, this.images).subscribe({
          next: response => {
            this.router.navigate(['/veiculos']);
          }
        });
      },
      error: (httpError: HttpErrorResponse) => {
        const errorResponse = httpError.error as ErrorResponse<VehicleMultImages>;
        this.serverErrors = errorResponse?.errors ?? { general: 'Erro inesperado.' };
      }
    });

  }

}
