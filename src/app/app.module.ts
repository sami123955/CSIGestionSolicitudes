import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule} from '@angular/http';


import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';


//import { DataTablesModule } from 'angular-datatables';

import { AppComponent }  from './app.component';

import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ng2-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from '../app/controllers/home.component';
import { EmpresaComponent } from '../app/controllers/Empresa.component';
import { EmpleadoComponent } from '../app/controllers/Empleado.component';
import { SucursalComponent } from '../app/controllers/Sucursal.component';
import { TipoNovedadComponent } from '../app/controllers/TipoNovedad.component';
import { SubclienteComponent } from '../app/controllers/Subcliente.component';
import { CausanteNovedadComponent } from '../app/controllers/CausanteNovedad.component';
import { TipoServicioComponent } from './controllers/TipoServicio.component';
import { FormatoComponent } from './controllers/Formato.component';
import { PersonaComponent } from './controllers/Persona.component';
import { ComboServicioComponent } from './controllers/ComboServicio.component';
import { MunicipioComponent } from './controllers/Municipio.component';
import { SolicitudServicioComponent } from './controllers/SolicitudServicio.component';

@NgModule({
  imports:      [ 
                  BrowserModule,
                  AppRoutingModule,
                  HttpModule,
                  FormsModule,
                  MultiselectDropdownModule,
                  ModalModule.forRoot()
                ],
  declarations: [ 
                  AppComponent,
                  HomeComponent,
                  EmpresaComponent,
                  EmpleadoComponent,
                  SucursalComponent,
                  TipoNovedadComponent,
                  SubclienteComponent,
                  CausanteNovedadComponent,
                  TipoServicioComponent,
                  FormatoComponent,
                  PersonaComponent,
                  ComboServicioComponent,
                  MunicipioComponent,
                  SolicitudServicioComponent
                ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
