import { Component, OnInit } from '@angular/core';
import { TipoNovedad } from '../models/TipoNovedad';
import { DatosServidor} from '../models/DatosServidor';
import {TipoNovedadService} from '../services/TipoNovedad.service';

//Importar libreria externas
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

    model = new TipoNovedad('');

    DatosServidor=new DatosServidor();

//Variable que almacenara todos los datos de la consulta de TipoNovedad.
    DatosTipoNovedad = '';

//Variable que usaremos para controlar los preloaders 
    loading=false;

     DatosServidorModel=new DatosServidor();

 //Variable que usaremos para validar si ya se le aplica data table o No
    DataTable=false;

    ngOnInit() {
        //alert();
        this.loading=true;
        this.BuscarTipoNovedad();
    }
    GuardarTipoNovedad(){
        this._TipoNovedadService.GuardarTipoNovedad(this.model, this.DatosServidor.url)
        .subscribe(
                data => alertify.success('Registrado Correctamente'),
                error => alert(error),
                //() =>//
        );
    }
    BuscarTipoNovedad(){
        this._TipoNovedadService.BuscarTipoNovedad(this.DatosServidor.url).subscribe(
            data => this.DatosTipoNovedad = data,
            error => alert(error),
          //  () => alert(JSON.stringify(this.DatosTipoNovedad))
        );
}

    CargarDatosForm(Codigo, Nombre, Estado){
        this.model = new TipoNovedad(Nombre, Codigo, Estado);
    }
    ActualizarTipoNovedad(){
        this.loading = true;
        this._TipoNovedadService.ActualizarTipoNovedad(this.model, this.DatosServidor.url)
        .subscribe(
            data => alertify.success('Actualizado Correctamente'),
            error => alert(error),
            () => this.BuscarTipoNovedad()
        );
    }

}