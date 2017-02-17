import { Component, OnInit } from '@angular/core';
import { Empleado } from '../models/Empleado';
import { DatosServidor } from '../models/DatosServidor';
import { EmpleadoService } from '../services/Empleado.service';
import { SucursalService } from '../services/Sucursal.service';

import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';


import { Observable } from 'rxjs'

declare var $: any;
declare var alertify: any;

@Component({
    selector: 'Empleado',
    templateUrl: '../views/Empleado.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [EmpleadoService, SucursalService],

})

export class EmpleadoComponent implements OnInit {

    empleados$: Observable<any>;


    constructor(private _EmpleadoService: EmpleadoService, private _SucursalService: SucursalService) {


    }

    //Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del seridor donde consumiremos los servicios
    DatosServidorModel = new DatosServidor();

    model = new Empleado('', '', '', '', '', []);

    SucursalesSelect = [];

    //Json que usaremos para almacenar las configuraciones del select
    ConfiguracionSelect = {
        pullRight: true,
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default col-md-12',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: true,
        showUncheckAll: false,
        dynamicTitleMaxItems: 1,
        width: '400px'
        //maxHeight: '300px',
    };


    //Variable que usaremos para almacenar los datos del empleado
    DatosEmpleado = '';

    //Variable que usaremos para almacenar los datos de la sucursal
    DatosSucursal = '';

    //Variable que usaremos para verificar si se aplico datatable
    DataTable = false;

    ngOnInit() {
        this.BuscarSucursales();
        this.BuscarEmpleado();

        this.empleados$ = this._EmpleadoService.getEmpleados$();
    }

    BuscarSucursales() {

        var DatosSucursal: any;

        this._SucursalService.BuscarSucursal(this.DatosServidorModel.url).subscribe(
            data => DatosSucursal = data,
            error => alertify.error('No se ha podido procesar la peticion'),
            () => this.FormatearOpcionesSelect(DatosSucursal)
        );


    }

    FormatearOpcionesSelect(DatosSucursal) {
        for (let item of DatosSucursal.Data) {

            this.SucursalesSelect.push({ id: item.Codigo, name: item.Nombre });

        }
    }


    GuardarEmpleado() {

        try {

            this._EmpleadoService.GuardarEmpleado(this.model, this.DatosServidorModel.url).
                subscribe(
                data => this.ValidarPeticion(data),
                error => alert(error),
            );

        } catch (error) {

            var DescripcionError = 'Empleado.component.ts--->GuardarEmpleado--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }



    }

    ValidarPeticion(Resultado) {

        if (Resultado.TipoResultado == false) {
            alertify.error(Resultado.Mensaje);
        }
        else {
            alertify.success('Registro satisfactorio');
            location.reload();
        }

    }

    LimpiarFormulario() {

        this.model = new Empleado('', '', '', '', '', []);

    }

    BuscarEmpleado() {

        try {

            this._EmpleadoService.BuscarEmpleado(this.DatosServidorModel.url);           

        } catch (error) {

            var DescripcionError = 'Empleado.component.ts--->BuscarEmpleado--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }


    }

    CargarSucursalesModal(Sucursales) {

        this.DatosSucursal = Sucursales;
        console.log(JSON.stringify(this.DatosSucursal));

    }

    AplicarDataTable() {

        try {

            if (this.DataTable == false) {

                $('#EmpleadoSucursal').dataTable({
                    "bDestroy": true,
                    "language": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast": "Último",
                            "sNext": "Siguiente",
                            "sPrevious": "Anterior"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                    }
                });

                this.DataTable = true;
            }

        } catch (error) {

            var DescripcionError = 'Empleado.component.ts--->AplicarDataTable--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }



    }

    CargarDatos(Nombre, Telefono, Celular, Email, Cargo, Sucursal, Codigo, Estado) {

        this.model = new Empleado(Nombre, Telefono, Celular, Email, Cargo, this.OpcionesSeleccionadas(Sucursal), Codigo, Estado);

    }


    OpcionesSeleccionadas(Datos) {

        var Salida = [];

        for (let item of Datos) {
            Salida.push(item.CodigoSucursal);
        }

        return Salida;

    }


    ActualizarEmpleado() {

        try {
            this._EmpleadoService.ActualizarEmpleado(this.model, this.DatosServidorModel.url).subscribe(
                data => alertify.success('Actualizado correctamente'),
                error => alert(error),
                () => location.reload()
            );
        } catch (error) {
            var DescripcionError = 'Empleado.component.ts--->ActualizarEmpleado--->' + '  Error:  ' + error;
            console.log(DescripcionError);
        }

    }





}