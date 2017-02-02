import { Component, OnInit } from '@angular/core';
import { CausanteNovedad } from '../models/CausanteNovedad';
import {CausanteNovedadService} from '../services/CausanteNovedad.service';
import {DatosServidor} from '../models/DatosServidor';
import {TipoNovedadService} from '../services/TipoNovedad.service';


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
    providers: [CausanteNovedadService, TipoNovedadService]
})

export class CausanteNovedadComponent implements OnInit {

    constructor(private _CausanteNovedadService: CausanteNovedadService, private _TipoNovedadService: TipoNovedadService){}


    //Recordar q siempre espera Dos parametros o dependiendo en este caso espera 2


    model = new CausanteNovedad('','');

    DatosServidor = new DatosServidor();

    //Variable que almacenara todos los datos de la consulta

    DatosCausanteNovedad='';
    DatosTipoNovedad='';

//Variable que usaremos para controlar los preloaders
    loading=false;

//Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del servidor donde consumiremos los servicios

    DatosServidorModel=new DatosServidor();

//Variable que usaremos para validar si ya se le aplica data table o No
    DataTable=false;


    ngOnInit() {
        //alert();
        this.loading=true;
        this.BuscarCausanteNovedad();
        this.BuscarTipoNovedad();
    }

    //para guardar
    GuardarCausanteNovedad(){
        
        this._CausanteNovedadService.GuardarCausanteNovedad(this.model, this.DatosServidor.url)
            .subscribe(
                data =>alertify.success('Registrado Correctamente'),
                error =>alert(error),
                () => this.BuscarCausanteNovedad()
            );
    }

    BuscarTipoNovedad(){

        this._TipoNovedadService.BuscarTipoNovedad(this.DatosServidor.url).subscribe(
            data => this.DatosTipoNovedad = data,
            error => alert(error),
        );
    }

    BuscarCausanteNovedad(){
        this._CausanteNovedadService.BuscarCausanteNovedad(this.DatosServidor.url).subscribe(
            data => this.DatosCausanteNovedad=data,
            error =>alert(error),
            
        );
    }
    CargarDatosForm(Nombre, CodigoTipoNovedad, Codigo, Estado){
        this.model = new CausanteNovedad(Nombre, CodigoTipoNovedad, Codigo, Estado);
    }
    ActualizarCausanteNovedad(){
        this.loading = true;
        this._CausanteNovedadService.ActualizarCausanteNovedad(this.model, this.DatosServidor.url)
        .subscribe(
            data=> alertify.success('Actulizado Correctamente'),
            error => alert(error),
            () => this.BuscarCausanteNovedad()
        );
    }

}