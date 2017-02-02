import { Component, OnInit } from '@angular/core';
import { TipoServicio } from '../models/TipoServicio';
import { TipoServicioService } from '../services/TipoServicio.service';
import { DatosServidor } from '../models/DatosServidor';

declare var $:any;
declare var alertify:any;
declare var success:any;
declare var error:any;

@Component({
    selector:'TipoServico',
    templateUrl: '../views/TipoServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [TipoServicioService]
})
export class TipoServicioComponent implements OnInit{

    constructor (private _TipoServicioService: TipoServicioService) {}

    //Instanciamos clase
    model = new TipoServicio('','');


    //Variable que se encargara de controlar cuando mostrar el preloader
    Cargando = false;


    //Instanciamos la clase que se encargara de traernos la url del servidor donde se alojan los servicios
    DatosServidorModel = new DatosServidor();

    //Variable que almacenara los datos para la tabla
    DatosTipoServicio = '';

    //Variable que usaremos para validar si ya se le aplica data table o No
    DataTable = false;

    GuardarTipoServicio(){

        try {
            
                this.Cargando = true;

                this._TipoServicioService.GuardarTipoServicio(this.model, this.DatosServidorModel.url)
                .subscribe(
                    data => alertify.success('Registrado Correctamente'),
                    error => alert(error),
                    () => this.BuscarTipoServicio()
                );

        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->GuardarTipoServicio--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

    }


    BuscarTipoServicio(){
        try {
            this._TipoServicioService.BuscarTipoServicio(this.DatosServidorModel.url).subscribe(
            data => this.DatosTipoServicio = data,
            error => alertify.error('No funciona'),
            () => this.LimpiarCampos()
            );
        } catch (error) {
            
            var DescripcionError = 'TipoServicio.component.ts--->BuscarTipoServicio--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }
    }


    ngOnInit(){
        this.Cargando = true;
        this.BuscarTipoServicio();
    }

    LimpiarCampos(){
        this.model = new TipoServicio('','','','');

        $('.TipoServicioModal').modal('hide');

        this.Cargando = false;
    }


    CargarCampos(Nombre, Descripcion, Codigo, Estado){
        this.model = new TipoServicio(Nombre, Descripcion, Codigo, Estado);
    }

    ActualizarTipoEmpresa() {


        try {
            
                this.Cargando = true;

                this._TipoServicioService.ActualizarTipoServicio(this.model, this.DatosServidorModel.url)
                .subscribe(
                    data => alertify.success('Actualizado Correctamente'),
                    error => alert(error),
                    () => this.BuscarTipoServicio()
                );

        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->ActualizarTipoEmpresa--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


    }


    AplicarDataTable(){

       if(this.DataTable == false) {
           
            $('#TipoServicioTabla').dataTable({

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



}