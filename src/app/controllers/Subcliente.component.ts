import { Component, OnInit } from '@aular/core';
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


    model = new Subcliente('','','','','','','',);

    DatosServidor = new DatosServidor();

    DatosSubcliente = '';
    DatoSucursal = '';

    constructor (private _SubclienteService: SubclienteService, private _SucursalService: SucursalService) {}
    
    loading=false;

    ngOnInit() {
        //alert();
        this.BuscarSucursal();
        this.BuscarSubcliente();
        this.searchCompany();
    }
    GuardarSubcliente(){
        this._SubclienteService.GuardarSubcliente(this.model, this.DatosServidor.url)
            .subscribe(
                data => alert(JSON.stringify(data)),
                error => alert(error),
                () => console.log('termina')
            );
    }

    BuscarSucursal(){
        
        this._SucursalService.BuscarSucursal(this.DatosServidor.url).subscribe(
            data => this.DatoSucursal = data,
            error => alert(error),
            () => console.log('Termina')
        );


    }

    CargarDatosForm(CodigoSucursal, Nit, RazonSocial, Telefono, Representante, Estado, Codigo){
        this.model = new Subcliente(CodigoSucursal, Nit, RazonSocial, Telefono, Representante, Estado, Codigo);
   

    }

    searchCompany(){
        
        this._SubclienteService.searchCompany(this.DatosServidor.url).subscribe(
            data => this.DatosSubcliente = data,
            error => alertify.error('No funciona'),
            () => this.LimpiarForm()
        );

        


    }

     ActualizarSubcliente() {

        this.loading = true;
            this._SubclienteService.ActualizarEmpresa(this.model, this.DatosServidor.url)
            .subscribe(
                data => alertify.success('Actualizado Correctamente'),
                error => alert(error),
                () => this.searchCompany()
            );
            
    }

    BuscarSubcliente(){
        
        this._SubclienteService.BuscarSubcliente(this.DatosServidor.url).subscribe(
            data => this.DatosSubcliente = data,
            error => alert(error),
            () => console.log('Termina')
        );


    }

    arr = ['1', '2', '3']
}