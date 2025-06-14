import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';

export const routes: Routes = [
    {path:'veiculos', component:VehicleListComponent},
    {path:'veiculos/:id', component:VehicleComponent},
];
