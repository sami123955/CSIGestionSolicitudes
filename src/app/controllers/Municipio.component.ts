import { Component, OnInit } from '@angular/core';
import { Municipio } from '../models/Municipio';
import { MunicipioService } from '../services/Municipio.service';
import { DatosServidor } from '../models/DatosServidor';

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


    ngOnInit() {

        this.BuscarDepartamento();

    }


    BuscarDepartamento() {

        this._MunicipioService.BuscarDepartamento(this.DatosServidorModel.url).subscribe(
            data => alert(JSON.stringify(data)),
            error => alert(error)
        );

    }

    


}