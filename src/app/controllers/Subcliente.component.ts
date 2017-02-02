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
    loading=false;

//Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del seridor donde consumiremos los servicios
    DatosServidorModel=new DatosServidor();

 //Variable que usaremos para validar si ya se le aplica data table o No
    DataTable=false;

    ngOnInit() {    
        
        this.loading = true;
        this.BuscarSucursal();
        this.BuscarSubcliente();
    }
    GuardarSubcliente(){
        this._SubclienteService.GuardarSubcliente(this.model, this.DatosServidor.url)
            .subscribe(
                data => alertify.sucess('Registrado Correctamente'),
                error => alert(error),
                //() =>//
            );
    }

    BuscarSucursal(){
        
        this._SucursalService.BuscarSucursal(this.DatosServidor.url).subscribe(
            data => this.DatoSucursal = data,
            error => alert(error),
            //() => 
        );
    }

    LimpiarCampos(){

        //para cerrar el modal
        $('.SubclienteModal').modal('hide');
        this.loading = false;

    }

    CargarDatosForm(CodigoSucursal, Nit, RazonSocial, Telefono, Representante, Estado, Codigo){

        this.model = new Subcliente(CodigoSucursal, Nit, RazonSocial, Telefono, Representante, Estado, Codigo);

    }
     ActualizarSubcliente() {

        this.loading = true;
            this._SubclienteService.ActualizarSubCliente(this.model, this.DatosServidor.url)
            .subscribe(
                data => alertify.success('Actualizado Correctamente'),
                error => alert(error),
                () => this.BuscarSubcliente()
            );
            
    }

    BuscarSubcliente(){
        
        this._SubclienteService.BuscarSubcliente(this.DatosServidor.url).subscribe(
            data => this.DatosSubcliente = data,
            error => alert(error),
            () => this.LimpiarCampos()
        );


    }

}