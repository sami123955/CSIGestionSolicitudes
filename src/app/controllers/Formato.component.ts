import { Component, OnInit } from '@angular/core';
import { Formato } from '../models/Formato';
import { FormatoService } from '../services/Formato.service';
import { DatosServidor } from '../models/DatosServidor';


declare var $:any;
declare var alertify:any;
declare var success:any;
declare var error:any;
declare var dataTable:any;
declare var clear:any;
declare var draw:any;

//declare var DataTable:any;

@Component({
    selector: 'Formato',
    templateUrl: '../views/Formato.component.html',
    styleUrls:  ['../../assets/css/Maestras.css'],
    providers: [FormatoService]
})
export class FormatoComponent implements OnInit {


    constructor (private _FormatoService:FormatoService) {}

    model = new Formato('');


    //Variable que usaremos para saber cuando sacar preloader
    Cargando = false;

    //Instanciamos la clase datos servidor para saber la url del servidor donde se aloja el servicios que vamos a consumir
    DatosServidorModel = new DatosServidor();

    //Variable que almacenara los datos de la consulta
    DatosFormato = '';

    //Variable que usaremos para controlar si ya se aplico datatable
    DataTable = false;

    ngOnInit(){
        this.Cargando = true;
        this.model.Archivo = new FormData();
        this.BuscarFormato();
    
    }

    BuscarFormato(){

        try {

            this.DataTable = false;

            this._FormatoService.BuscarFormato(this.DatosServidorModel.url).subscribe(
            data => this.DatosFormato = data,
            error => alertify.error('No funciona'),
            () => this.LimpiarFormulario()

            );
        } catch (error) {
            
            var DescripcionError = 'Formato.component.ts--->BuscarFormato--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }


    }

    CargarArchivo(event){

        try {
            
            let fileList: FileList = event.target.files;

            if(fileList.length > 0) {
                let file: File = fileList[0];   

                this.model.Archivo.has('Formato') ? this.model.Archivo.delete('Formato') : '';
                
                this.model.Archivo.append('Formato', file, file.name);             
            }


        } catch (error) {

            var DescripcionError = 'Formato.component.ts--->CargarArchivo--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }
    }

    

    GuardarFormato(){
        try {
            
                this.Cargando = true;

                this._FormatoService.GuardarFormato(this.model, this.DatosServidorModel.url)
                .subscribe(
                    data => alertify.success('Registrado Correctamente'),
                    error => alert(error),
                    () => location.reload()//this.BuscarFormato()
                );

        } catch (error) {

            var DescripcionError = 'Formato.component.ts--->GuardarFormato--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }
    }

    AplicarDataTable(){

       if(this.DataTable == false) {

            $('#FormatoTabla').dataTable({
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


   LimpiarFormulario(){
       this.model = new Formato('');

       this.model.Archivo  = new FormData();
       $('.FormatoModal').modal('hide');

       this.Cargando = false;
   }


   CargarCampos(FormatoRuta, Descripcion, Codigo, Estado){
       //
       this.model = new Formato(Descripcion, '', FormatoRuta, Codigo, Estado);

       this.model.Archivo = new FormData();

   }

   ActualizarFormato(){


       try {
            
            this.Cargando = true;

            this._FormatoService.ActualizarFormato(this.model, this.DatosServidorModel.url)
            .subscribe(
                data => alertify.success('Actualizado Correctamente'),
                error => alert(error),
                () => location.reload()//this.BuscarFormato()
            );

        } catch (error) {

            var DescripcionError = 'Formato.component.ts--->ActualizarFormato--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


   }







} 