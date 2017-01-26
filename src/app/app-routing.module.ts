import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './controllers/home.component';
import { EmpresaComponent } from './controllers/Empresa.component';
import { EmpleadoComponent } from './controllers/Empleado.component';
import { SucursalComponent } from './controllers/Sucursal.component';
import { TipoNovedadComponent } from './controllers/TipoNovedad.component';
import { SubclienteComponent } from './controllers/Subcliente.component';
import { CausanteNovedadComponent } from './controllers/CausanteNovedad.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'empresa',  component: EmpresaComponent },
  { path: 'empleado',  component: EmpleadoComponent },
  { path: 'sucursal',  component: SucursalComponent },
  { path: 'tiponovedad', component: TipoNovedadComponent},
  { path: 'subcliente', component: SubclienteComponent},
  { path: 'causantenovedad', component: CausanteNovedadComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
