import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { FormsModule } from '@angular/forms';
import { VehicleType, VehicleChange, VehicleFuel, VehicleStatus } from '../../enums/vehicle.enums';
import { CommonModule } from '@angular/common';
import { VehicleMultImages } from '../../interfaces/vehicle-mult-images';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ToggleService } from '../../shared/toggle.service';
import { ImagePreviewService } from '../../shared/image-preview.service';
import { environment } from '@env/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../interfaces/error-response';
import { FileService } from '../../services/file.service';
import { Vehicle } from '../../interfaces/vehicle';

@Component({
  selector: 'app-vehicle-update',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './vehicle-update.component.html',
  styleUrl: './vehicle-update.component.css'
})
export class VehicleUpdateComponent {
  id!: number;
  vehicle!: VehicleMultImages;
  selectedImages: number[] = [];

  baseUrl = environment.baseUrl;

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
    private activatedRoute: ActivatedRoute,
    public toggleService: ToggleService,
    public imagePreviewService: ImagePreviewService
  ) {
    this.toggleService.activeSections['basicInfo'] = true; 
  }

  ngOnInit(): void {
    this.imagePreviewService.imagePreviews = [];
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    this.vehicleService.getWithImages(this.id).subscribe({
      next: data => {
        this.vehicle = data;
      },
      error: (err) => {
        this.router.navigate(['/veiculos']);
      }
    });
  }

  onFileSelected(event: Event): void {
    this.imagePreviewService.onFileSelected(event);

    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.images = Array.from(target.files);
    }
  }

  onImageSelected(event: Event, imageId: number): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (!this.selectedImages.includes(imageId)) {
        this.selectedImages.push(imageId);
      }
    } else {
      this.selectedImages = this.selectedImages.filter(id => id !== imageId);
    }
  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicleService.update(this.id, vehicle).subscribe({
      next: (vehicleData: Vehicle) => {
        this.fileService.update(vehicleData.id, this.images, this.selectedImages).subscribe({
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
