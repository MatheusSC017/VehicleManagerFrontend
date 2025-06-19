import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleRegisterComponent } from './components/vehicle-register/vehicle-register.component';
import { VehicleUpdateComponent } from './components/vehicle-update/vehicle-update.component';

export const routes: Routes = [
    {path:'veiculos', component:VehicleListComponent},
    {path:'veiculos/cadastrar', component:VehicleRegisterComponent},
    {path:'veiculos/:id/editar', component:VehicleUpdateComponent},
    {path:'veiculos/:id', component:VehicleDetailComponent},
];
