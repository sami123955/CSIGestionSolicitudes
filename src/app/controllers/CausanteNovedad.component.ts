import { Component, OnInit } from '@angular/core';
import { CausanteNovedad } from '../models/CausanteNovedad';
import {CausanteNovedadService} from '../services/CausanteNovedad.service';
import {DatosServidor} from '../models/DatosServidor';


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
    providers: [CausanteNovedadService]
})

export class CausanteNovedadComponent implements OnInit {


    model = new CausanteNovedad('','','');

    DatosServidor = new DatosServidor();

    DatosCausanteNovedad='';

    constructor(private _CausanteNovedadService: CausanteNovedadService){}

    loading=false;


    ngOnInit() {
        //alert();
    }

    //para guardar
    GuardarCausanteNovedad(){
        this._CausanteNovedadService.GuardarCausanteNovedad(this.model, this.DatosServidor.url)
            .subscribe(
                data =>alert(JSON.stringify(data)),
                error =>alert(error),
            );
    }

}