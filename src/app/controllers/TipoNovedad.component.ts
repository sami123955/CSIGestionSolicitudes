import { Component, OnInit } from '@angular/core';
import { TipoNovedad } from '../models/TipoNovedad';
import { DatosServidor} from '../models/DatosServidor';
import {TipoNovedadService} from '../services/TipoNovedad.service';

//Importar libreria externas
declare var jQuery: any;
declare var $: any;
declare var alertify:any;
declare var success:any;
declare var error:any;
declare var DataTable: any;

@Component({
    selector: 'TipoNovedad',
    templateUrl: '../views/TipoNovedad.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [TipoNovedadService]
})

export class TipoNovedadComponent implements OnInit {

     constructor(private _TipoNovedadService:TipoNovedadService){}

    model = new TipoNovedad('','');
    DatosServidor=new DatosServidor();

    DatosTipoNovedad='';

   

    loading=false;


    ngOnInit() {
        //alert();
    }
    GuardarTipoNovedad(){
        this._TipoNovedadService.GuardarTipoNovedad(this.model, this.DatosServidor.url)
        .subscribe(
                data => alertify.sucess('Registrado Correctamente'),
                error => alert(error),
                //() =>//
        );
    }

}