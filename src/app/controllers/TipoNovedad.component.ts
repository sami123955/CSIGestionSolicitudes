import { Component, OnInit } from '@angular/core';
import { TipoNovedad } from '../models/TipoNovedad';
import { DatosServidor} from '../models/DatosServidor';
import {TipoNovedadService} from '../services/TipoNovedad.service';

//Importar libreria externas
declare var $: any;
declare var alertify:any;
declare var success:any;
declare var error:any;
declare var DataTable: any;

@Component({
    selector: 'TipoNovedad',
    templateUrl: '../views/TipoNovedad.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [TipoNovedadService]
})

export class TipoNovedadComponent implements OnInit {

     constructor(private _TipoNovedadService:TipoNovedadService){}

    model = new TipoNovedad('');

    DatosServidor=new DatosServidor();

//Variable que almacenara todos los datos de la consulta de TipoNovedad.
    DatosTipoNovedad = '';

//Variable que usaremos para controlar los preloaders 
    Cargando=false;

     DatosServidorModel=new DatosServidor();

    //Variable que usaremos para validar si ya se le aplica data table o No
    DataTable = false;

    ngOnInit() {
        //alert();
        this.Cargando=true;
        this.BuscarTipoNovedad();
    }
    GuardarTipoNovedad(){

        try {
            
            this.Cargando = true;
            
            this._TipoNovedadService.GuardarTipoNovedad(this.model, this.DatosServidor.url)
            .subscribe(
                    data => alertify.success('Registrado Correctamente'),
                    error => alert(error),
                    () => location.reload()
            );    


        } catch (error) {
            
        }

        
    }
    BuscarTipoNovedad(){

        try {

            this._TipoNovedadService.BuscarTipoNovedad(this.DatosServidor.url).subscribe(
            data => this.DatosTipoNovedad = data,
            error => alert(error),
            () => this.Cargando = false
            );
            
        } catch (error) {
            
        }

        
}

    CargarDatosForm(Codigo, Nombre, Estado){
        this.model = new TipoNovedad(Nombre, Codigo, Estado);
    }
    ActualizarTipoNovedad(){

        try {

            this.Cargando = true;
            this._TipoNovedadService.ActualizarTipoNovedad(this.model, this.DatosServidor.url)
            .subscribe(
                data => alertify.success('Actualizado Correctamente'),
                error => alert(error),
                () => location.reload()//this.BuscarTipoNovedad()
            );
            
        } catch (error) {


        }

        
    }


    AplicarDataTable(){

        try {
                if(this.DataTable == false) {

                $('#TipoNovedadTabla').dataTable({

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
        } catch (error) {
            

            var DescripcionError = 'TipoNovedad.component.ts--->AplicarDataTable--->'+'  Error:  ' + error;
            console.log(DescripcionError);


        }

        
    }

    LimpiarDatos(){

        this.model = new TipoNovedad('');

    }

}