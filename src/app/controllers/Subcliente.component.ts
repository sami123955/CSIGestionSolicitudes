import { Component, OnInit } from '@angular/core';
import { Subcliente } from '../models/Subcliente';
import { DatosServidor } from '../models/DatosServidor';
import { SubclienteService } from '../services/Subcliente.service';
import { SucursalService } from '../services/Sucursal.service';

//Importar libreria externas
declare var jQuery: any;
declare var $: any;
declare var alertify:any;
declare var success:any;
declare var error:any;
declare var DataTable: any;


@Component({
    selector: 'Subcliente',
    templateUrl: '../views/Subcliente.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SubclienteService, SucursalService]
})

export class SubclienteComponent implements OnInit {

 constructor (private _SubclienteService: SubclienteService, private _SucursalService: SucursalService) {}

    model = new Subcliente('','','','','','','',);

    DatosServidor = new DatosServidor();


//Variable que almacenara todos los datos de la consulta de Subcliente.
    DatosSubcliente = '';
    DatoSucursal = '';

   
 //Variable que usaremos para controlar los preloaders   
    Cargando = false;

//Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del seridor donde consumiremos los servicios
    DatosServidorModel=new DatosServidor();

 //Variable que usaremos para validar si ya se le aplica data table o No
    DataTable=false;

    ngOnInit() {    
        
        this.Cargando = true;
        this.BuscarSucursal();
        this.BuscarSubcliente();
    }
    GuardarSubcliente(){

        try {

            this.Cargando = true;

            this._SubclienteService.GuardarSubcliente(this.model, this.DatosServidor.url)
            .subscribe(
                data => alertify.success('Registrado Correctamente'),
                error => alert(error),
                () => location.reload()
            );

        } catch (error) {

             var DescripcionError = 'Subcliente.component.ts--->GuardarSubcliente--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


        
    }

    BuscarSucursal(){

        try {

            this._SucursalService.BuscarSucursal(this.DatosServidor.url).subscribe(
            data => this.DatoSucursal = data,
            error => alert(error),
            //() => this.Cargando = false
            );
            
        } catch (error) {

            var DescripcionError = 'Subcliente.component.ts--->BuscarSucursal--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }
        
        
    }

    CargarDatosForm(CodigoSucursal, Nit, RazonSocial, Telefono, Representante, Estado, Codigo){

        this.model = new Subcliente(CodigoSucursal, Nit, RazonSocial, Telefono, Representante, Estado, Codigo);

    }
     ActualizarSubcliente() {

        
        try {

            this.Cargando = true;

            this._SubclienteService.ActualizarSubCliente(this.model, this.DatosServidor.url)
            .subscribe(
                data => alertify.success('Actualizado Correctamente'),
                error => alert(error),
                () => location.reload()//this.BuscarSubcliente()
            );

        } catch (error) {
            
            var DescripcionError = 'Subcliente.component.ts--->ActualizarSubcliente--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }

        
            
    }

    BuscarSubcliente(){

        try {


            this._SubclienteService.BuscarSubcliente(this.DatosServidor.url).subscribe(
            data => this.DatosSubcliente = data,
            error => alert(error),
            () => this.Cargando = false
            );


        } catch (error) {

            var DescripcionError = 'Subcliente.component.ts--->BuscarSubcliente--->'+'  Error:  ' + error;
            console.log(DescripcionError);
        
        }
        
        


    }


    AplicarDataTable(){

        try {
            
             if(this.DataTable == false) {
            
                    $('#SubClienteTabla').dataTable({

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

            var DescripcionError = 'Subcliente.component.ts--->AplicarDataTable--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


    }

    LimpiarDatos(){

        this.model = new Subcliente('','','','','');

    }

}