import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleRegisterComponent } from './components/vehicle-register/vehicle-register.component';
import { VehicleUpdateComponent } from './components/vehicle-update/vehicle-update.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'veiculos', component:VehicleListComponent},
    {path:'veiculos/cadastrar', component:VehicleRegisterComponent},
    {path:'veiculos/:id/editar', component:VehicleUpdateComponent},
    {path:'veiculos/:id', component:VehicleDetailComponent},
    {path:'clientes', component:ClientListComponent},
    {path:'clientes/cadastrar', component:ClientFormComponent},
    {path:'clientes/:id', component:ClientFormComponent}
];
