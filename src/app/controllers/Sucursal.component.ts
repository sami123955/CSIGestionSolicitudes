import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../models/Sucursal';
import { DatosServidor } from '../models/DatosServidor';
import { SucursalService } from '../services/Sucursal.service';

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
                data => alert('Registra correctamente'),
                error => alert(error),
                () => console.log('termina')
            );

    }

    
    BuscarSucursal(){
        
        this._SucursalService.BuscarSucursal(this.DatosServidor.url).subscribe(
            data => this.DatosSucursal = data,
            error => alert(error),
            () => console.log('Termina')
        );


    }

}