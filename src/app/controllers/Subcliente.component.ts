import { Component, OnInit } from '@angular/core';
import { Subcliente } from '../models/Subcliente';
import { DatosServidor } from '../models/DatosServidor';
import { SubclienteService } from '../services/Subcliente.service';
import { SucursalService } from '../services/Sucursal.service';

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


    ngOnInit() {
        //alert();
        this.BuscarSucursal();
        this.BuscarSubcliente();
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

    BuscarSubcliente(){
        
        this._SubclienteService.BuscarSubcliente(this.DatosServidor.url).subscribe(
            data => this.DatosSubcliente = data,
            error => alert(error),
            () => console.log('Termina')
        );


    }

    arr = ['1', '2', '3']
}