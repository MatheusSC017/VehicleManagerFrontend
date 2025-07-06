import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterLink, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { environment } from '../../../environment/environment';
import { VehicleStatus, VehicleChange, VehicleFuel, VehicleType } from '../../enums/vehicle.enums';
import { VehicleMultImages } from '../../interfaces/vehicle-mult-images';

@Component({
  selector: 'app-vehicle',
  imports: [RouterModule, RouterLink],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css'
})
export class VehicleDetailComponent {
  id!: number;
  vehicle!: VehicleMultImages;

  vehicleStatusMap: { [key: string]: string } = {
    AVAILABLE: VehicleStatus.AVAILABLE,
    RESERVED: VehicleStatus.RESERVED,
    SOLD: VehicleStatus.SOLD,
    MAINTENANCE: VehicleStatus.MAINTENANCE
  };

  vehicleChangeMap: { [key: string]: string } = {
    MANUAL: VehicleChange.MANUAL,
    AUTOMATED: VehicleChange.AUTOMATED,
    AUTOMATIC: VehicleChange.AUTOMATIC,
    CVT: VehicleChange.CVT
  };

  vehicleFuelMap: { [key: string]: string } = {
    GASOLINE: VehicleFuel.GASOLINE,
    ALCOHOL: VehicleFuel.ALCOHOL,
    FLEX: VehicleFuel.FLEX,
    DIESEL: VehicleFuel.DIESEL,
    HYBRID: VehicleFuel.HYBRID,
    ELECTRIC: VehicleFuel.ELECTRIC
  };

  vehicleTypeMap: { [key: string]: string } = {
    CAR: VehicleType.CAR,
    MOTORCYCLE: VehicleType.MOTORCYCLE
  };

  baseUrl = environment.baseUrl;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private vehicleService:VehicleService) {}

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
  
    this.vehicleService.getVehicleById(this.id).subscribe({
      next: data => {
        this.vehicle = data;
      },
      error: error => {
        this.router.navigate(['/veiculos']);
      }
    });

  }

}
