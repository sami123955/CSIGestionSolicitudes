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


    model = new Sucursal('','','','','');


    DatosServidor = new DatosServidor();


    DatosSucursal = '';

    constructor (private _SucursalService: SucursalService) {}


    ngOnInit() {
        this.BuscarSucursal();
    }

    GuardarSucursal() {


            this._SucursalService.GuardarSucursal(this.model, this.DatosServidor.url)
            .subscribe(
                data => alertify.success('Registrado Correctamente'),
                error => alert(error),
                () => this.BuscarSucursal()
            );

    }

    
    BuscarSucursal(){
        
        this._SucursalService.BuscarSucursal(this.DatosServidor.url).subscribe(
            data => this.DatosSucursal = data,
            error => alert(error),
            //() => console.log('Termina')
        );


    }

    CargarDatosForm(Nombre, Telefono, Direccion, Email, Representante, Codigo, Estado){

        this.model = new Sucursal(Nombre, Direccion, Email, Telefono, Representante,Codigo, Estado);
    }

    ActualizarSucursal(){
              
        this._SucursalService.ActualizarSucursal(this.model, this.DatosServidor.url)
        .subscribe(
            data => alertify.success('Actualizado Correctamente'),
            error => alert(error),
            () => this.BuscarSucursal()
        );
    }

}