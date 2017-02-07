import { Component, OnInit } from '@angular/core';
import { Municipio } from '../models/Municipio';
import { MunicipioService } from '../services/Municipio.service';
import { DatosServidor } from '../models/DatosServidor';


declare var alertify:any;
declare var error:any;
declare var success:any;
declare var $:any;

@Component({
    selector: 'Municipio',
    templateUrl: '../views/Municipio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [MunicipioService]
})
export class MunicipioComponent implements OnInit {


    constructor (private _MunicipioService:MunicipioService) {}

    //Instanciamos la clase Municipio
    model = new Municipio('','');

    //Instanciamos la clase DatosServicor para extraer la url del servicio al que vamos a consumir
    DatosServidorModel = new DatosServidor();

    //Variable que usaremos para almacenar los datos de departamento
    DatosDepartamento = '';

    //Variable que usaremos para almacenar los datos de Municipio
    DatosMunicipio = '';

    //Variable que usaremos para controlar el preloader
    Cargando = false;


    //Variable que usaremos para verificar si ya se aplico datatable
    DataTable = false;


    ngOnInit() {
        this.Cargando = true;
        this.BuscarDepartamento();
        this.BuscarMunicipio();
    }


    BuscarDepartamento() {

        try {

                this._MunicipioService.BuscarDepartamento(this.DatosServidorModel.url).subscribe(
                data => this.DatosDepartamento = data,
                error => alert(error)
            );

        } catch (error) {

            var DescripcionError = 'Municipio.component.ts--->BuscarDepartamento--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

        

    }

    GuardarMunicipio() {
        try {


           // this.ValidarDato(this.model.Nombre);



           this.Cargando = true;
            
            
            this.Cargando = true;

            this._MunicipioService.GuardarTipoServicio(this.model, this.DatosServidorModel.url).subscribe(
                data => alertify.success('Registrado correctamente'),
                error => alertify.error('Ocurrio un error al realizar el registro'),
                () => location.reload()
            );
            
        } catch (error) {

            var DescripcionError = 'Municipio.component.ts--->GuardarMunicipio--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }
    }

    BuscarMunicipio(){

        try {

            this._MunicipioService.BuscarMunicipio(this.DatosServidorModel.url).subscribe(
                data => this.DatosMunicipio  = data,
                error => alertify.error('Ocurrio un problema al cargar los datos'),
                () => this.Cargando = false
            );

            
            
        } catch (error) {

            var DescripcionError = 'Municipio.component.ts--->BuscarMunicipio--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


    }

    CargarDatos(Nombre, CodigoDepartamento, Codigo){
        this.model = new Municipio(Nombre, CodigoDepartamento, Codigo);
    }


    ActualizarMunicipio(){

        
        try {

            this.Cargando = true;

            this._MunicipioService.ActualizarTipoServicio(this.model, this.DatosServidorModel.url).subscribe(
                data => alertify.success('Actualizado correctamente'),
                error => alertify.error('Ocurrio un error'),
                () => location.reload()
            );
            
        } catch (error) {

            var DescripcionError = 'Municipio.component.ts--->ActualizarMunicipio--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


    }

    AplicarDataTable() {

        try {

                if(this.DataTable == false) {
            
                    $('#MunicipioTabla').dataTable({

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
            
            var DescripcionError = 'TipoServicio.component.ts--->AplicarDataTable--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }

    }



}