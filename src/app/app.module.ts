import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule} from '@angular/http';


import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { AppComponent }  from './app.component';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';


import { HomeComponent } from '../app/controllers/home.component';
import { EmpresaComponent } from '../app/controllers/Empresa.component';
import { EmpleadoComponent } from '../app/controllers/Empleado.component';
import { SucursalComponent } from '../app/controllers/Sucursal.component';
import { TipoNovedadComponent } from '../app/controllers/TipoNovedad.component';
import { SubclienteComponent } from '../app/controllers/Subcliente.component';
import { CausanteNovedadComponent } from '../app/controllers/CausanteNovedad.component';
import { TipoServicioComponent } from './controllers/TipoServicio.component';


@NgModule({
  imports:      [ 
                  BrowserModule, 
                  AppRoutingModule ,
                  HttpModule,
                  FormsModule,
                  MultiselectDropdownModule,
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
                  TipoServicioComponent
                ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
