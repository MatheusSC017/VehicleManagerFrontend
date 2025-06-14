import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { environment } from '../../../environment/environment';
import { VehicleStatus, VehicleChange, VehicleFuel, VehicleType } from '../../enums/vehicle.enums';

@Component({
  selector: 'app-vehicle',
  imports: [RouterModule, RouterLink],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  id!: number;
  vehicle: any;

  vehicleStatusMap: { [key: string]: string } = {
    AVAILABLE: VehicleStatus.AVAILABLE,
    REFURBISHED: VehicleStatus.REFURBISHED,
    SOLD: VehicleStatus.SOLD,
    MAINTENACE: VehicleStatus.MAINTENACE
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

  constructor(private route: ActivatedRoute, private vehicleService:VehicleService) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  
    this.vehicleService.getVehicleById(this.id).subscribe(data => {
      this.vehicle = data;
    });

  }

}
