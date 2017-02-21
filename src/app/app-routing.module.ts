import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './controllers/home.component';
import { EmpresaComponent } from './controllers/Empresa.component';
import { EmpleadoComponent } from './controllers/Empleado.component';
import { SucursalComponent } from './controllers/Sucursal.component';
import { TipoNovedadComponent } from './controllers/TipoNovedad.component';
import { SubclienteComponent } from './controllers/Subcliente.component';
import { CausanteNovedadComponent } from './controllers/CausanteNovedad.component';
import { TipoServicioComponent } from './controllers/TipoServicio.component';
import { FormatoComponent } from './controllers/Formato.component';
import { PersonaComponent } from './controllers/Persona.component';
import { ComboServicioComponent } from './controllers/ComboServicio.component';
import { MunicipioComponent } from './controllers/Municipio.component';
import { SolicitudServicioComponent } from './controllers/SolicitudServicio.component';
import { AsignarServicioComponent } from './controllers/AsignarServicio.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'empresa',  component: EmpresaComponent },
  { path: 'empleado',  component: EmpleadoComponent },
  { path: 'sucursal',  component: SucursalComponent },
  { path: 'tiponovedad', component: TipoNovedadComponent},
  { path: 'subcliente', component: SubclienteComponent},
  { path: 'causantenovedad', component: CausanteNovedadComponent},
  { path: 'tipoServicio', component: TipoServicioComponent},
  { path: 'formato', component: FormatoComponent},
  { path: 'persona', component: PersonaComponent},
  { path: 'comboServicio', component: ComboServicioComponent},
  { path: 'municipio', component: MunicipioComponent},
  { path: 'solicitudServicio', component: SolicitudServicioComponent},
  { path: 'asignacionSolicitud', component: AsignarServicioComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
