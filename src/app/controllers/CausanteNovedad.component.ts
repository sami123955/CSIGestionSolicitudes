import { Component, OnInit } from '@angular/core';
import { CausanteNovedad } from '../models/CausanteNovedad';
import {CausanteNovedadService} from '../services/CausanteNovedad.service';
import {DatosServidor} from '../models/DatosServidor';
import {TipoNovedadService} from '../services/TipoNovedad.service';


//Importar libreria externas
declare var jQuery: any;
declare var $: any;
declare var alertify:any;
declare var success:any;
declare var error:any;
declare var DataTable: any;

@Component({
    selector: 'CausanteNovedad',
    templateUrl: '../views/CausanteNovedad.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [CausanteNovedadService, TipoNovedadService]
})

export class CausanteNovedadComponent implements OnInit {

    constructor(private _CausanteNovedadService: CausanteNovedadService, private _TipoNovedadService: TipoNovedadService){}


    //Recordar q siempre espera Dos parametros o dependiendo en este caso espera 2


    model = new CausanteNovedad('','');

    DatosServidor = new DatosServidor();

    //Variable que almacenara todos los datos de la consulta

    DatosCausanteNovedad='';
    DatosTipoNovedad='';

//Variable que usaremos para controlar los preloaders
    Cargando = false;

//Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del servidor donde consumiremos los servicios

    DatosServidorModel=new DatosServidor();

//Variable que usaremos para validar si ya se le aplica data table o No
    DataTable = false;


    ngOnInit() {
        //alert();
        this.Cargando=true;
        this.BuscarCausanteNovedad();
        this.BuscarTipoNovedad();
    }

    //para guardar
    GuardarCausanteNovedad(){

        try {


            this.Cargando = true;
            this._CausanteNovedadService.GuardarCausanteNovedad(this.model, this.DatosServidor.url)
                .subscribe(
                    data =>alertify.success('Registrado Correctamente'),
                    error =>alert(error),
                    () => location.reload()
                );


        } catch (error) {

            var DescripcionError = 'CausanteNovedad.component.ts--->BuscarTipoNovedad--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


        
    }

    BuscarTipoNovedad(){

        try {

            this._TipoNovedadService.BuscarTipoNovedad(this.DatosServidor.url).subscribe(
            data => this.DatosTipoNovedad = data,
            error => alert(error),
            );


        } catch (error) {

            var DescripcionError = 'CausanteNovedad.component.ts--->BuscarTipoNovedad--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }

        
    }

    BuscarCausanteNovedad(){


        try {


            this._CausanteNovedadService.BuscarCausanteNovedad(this.DatosServidor.url).subscribe(
            data => this.DatosCausanteNovedad=data,
            error =>alert(error),
            () => this.Cargando = false
            );


        } catch (error) {

            var DescripcionError = 'CausanteNovedad.component.ts--->BuscarCausanteNovedad--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

        
    }
    CargarDatosForm(Nombre, CodigoTipoNovedad, Codigo, Estado){
        this.model = new CausanteNovedad(Nombre, CodigoTipoNovedad, Codigo, Estado);
    }
    ActualizarCausanteNovedad(){

        try {
            
            this.Cargando = true;
            this._CausanteNovedadService.ActualizarCausanteNovedad(this.model, this.DatosServidor.url)
            .subscribe(
                data=> alertify.success('Actulizado Correctamente'),
                error => alert(error),
                () => location.reload()
            );


        } catch (error) {

            var DescripcionError = 'CausanteNovedad.component.ts--->ActualizarCausanteNovedad--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

        
    }

    AplicarDataTable(){


        try {
            

             if(this.DataTable == false) {
            
                    $('#CausanteNovedadTabla').dataTable({

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

            var DescripcionError = 'CausanteNovedad.component.ts--->AplicarDataTable--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


    }


    LimpiarDatos() {

        this.model = new CausanteNovedad('', '');

    }

}