import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './controllers/home.component';
import { EmpresaComponent } from './controllers/Empresa.component';
import { EmpleadoComponent } from './controllers/Empleado.component';
import { SucursalComponent } from './controllers/Sucursal.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'empresa',  component: EmpresaComponent },
  { path: 'empleado',  component: EmpleadoComponent },
  { path: 'sucursal',  component: SucursalComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
