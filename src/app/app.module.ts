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

@NgModule({
  imports:      [ 
                  BrowserModule, 
                  AppRoutingModule ,
                  HttpModule,
                  FormsModule,
                  MultiselectDropdownModule
                ],
  declarations: [ 
                  AppComponent,
                  HomeComponent,
                  EmpresaComponent,
                  EmpleadoComponent,
                  SucursalComponent
                ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
