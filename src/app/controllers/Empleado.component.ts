import { Component, OnInit } from '@angular/core';
import { Empleado } from '../models/Empleado';
import { DatosServidor } from '../models/DatosServidor';
import { EmpleadoService } from '../services/Empleado.service';
import { SucursalService } from '../services/Sucursal.service';

import {IMultiSelectSettings } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';



declare var alertify:any;

@Component({
    selector: 'Empleado',
    templateUrl: '../views/Empleado.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [EmpleadoService, SucursalService],
    
})

export class EmpleadoComponent implements OnInit  {


    constructor (private _EmpleadoService:EmpleadoService, private _SucursalService: SucursalService) {}

    //Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del seridor donde consumiremos los servicios
    DatosServidorModel = new DatosServidor();

    model = new Empleado('', '', '', '', []);

    SucursalesSelect = [];

    //Json que usaremos para almacenar las configuraciones del select
    ConfiguracionSelect = {
        pullRight: true,
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: true,
        showUncheckAll: false,
        dynamicTitleMaxItems: 1,
        width: '400px'
        //maxHeight: '300px',
    };


    data;

    ngOnInit() {
        this.BuscarSucursales();
    }

    BuscarSucursales(){
        
        var DatosSucursal:any;

        this._SucursalService.BuscarSucursal(this.DatosServidorModel.url).subscribe(
        data => DatosSucursal = data,
        error => alertify.error('No se ha podido procesar la peticion'),
        () => this.FormatearOpcionesSelect(DatosSucursal)
        );

        
    }

    FormatearOpcionesSelect(DatosSucursal){
        for (let item of DatosSucursal.Data) {
            
            this.SucursalesSelect.push({ id: item.Codigo, name: item.Nombre });
            
        }
    }


    GuardarEmpleado(){

        this._EmpleadoService.GuardarEmpleado(this.model, this.DatosServidorModel.url).
            subscribe(
                data => alertify.success('Guardado correctamente'),
                error => alertify.error('No se pudo realizar la accion'),

            );
        
    }

        
}