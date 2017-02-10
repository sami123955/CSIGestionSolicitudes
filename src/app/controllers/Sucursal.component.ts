import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../models/Sucursal';
import { DatosServidor } from '../models/DatosServidor';
import { SucursalService } from '../services/Sucursal.service';


//Importar libreria externas
declare var $: any;
declare var alertify:any;
declare var success:any;
declare var error:any;
declare var DataTable: any;

@Component({
    selector: 'Sucursal',
    templateUrl: '../views/Sucursal.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SucursalService]
})

export class SucursalComponent implements OnInit {

//Variable que usaremos para controlar los preloaders
    Cargando = false;


    model = new Sucursal('','','','','');


    DatosServidor = new DatosServidor();

//Variable que almacenara todos los datos de la consulta de empresa.
    DatosSucursal = '';
    
//Variable que usaremos para validar si ya se le aplica data table o No
    DataTable = false;

    constructor (private _SucursalService: SucursalService) {}


    ngOnInit() {

        this.Cargando = true;

        this.BuscarSucursal();
    }

    GuardarSucursal() {

            this.Cargando = true;


            this._SucursalService.GuardarSucursal(this.model, this.DatosServidor.url)
            .subscribe(
                data => alertify.success('Registrado Correctamente'),
                error => alert(error),
                () => location.reload()//this.BuscarSucursal()
            );

    }

    
    BuscarSucursal(){

        
        
        this._SucursalService.BuscarSucursal(this.DatosServidor.url).subscribe(
            data => this.DatosSucursal = data,
            error => alert(error),
            () => this.Cargando = false
        );


    }

    CargarDatosForm(Nombre, Telefono, Direccion, Email, Representante, Codigo, Estado){

        this.model = new Sucursal(Nombre, Direccion, Email, Telefono, Representante,Codigo, Estado);
    }

    ActualizarSucursal(){

        this.Cargando = true;
              
        this._SucursalService.ActualizarSucursal(this.model, this.DatosServidor.url)
        .subscribe(
            data => alertify.success('Actualizado Correctamente'),
            error => alert(error),
            () => location.reload()//this.BuscarSucursal()
        );
    }

    AplicarDataTable(){

        if(this.DataTable == false){


            $('#SucursalTabla').dataTable({

                    "bDestroy": true,
                    "language": {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            });

            this.DataTable = true;


        }


    }

    LimpiarDatos(){
        this.model = new Sucursal('','','','','');
    }

}