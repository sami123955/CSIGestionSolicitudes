import { Component, OnInit } from '@angular/core';
import { TipoServicio } from '../models/TipoServicio';
import { TipoServicioService } from '../services/TipoServicio.service';
import { DatosServidor } from '../models/DatosServidor';


declare var alertify:any;
declare var success:any;
declare var error:any;

@Component({
    selector:'TipoServico',
    templateUrl: '../views/TipoServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [TipoServicioService]
})
export class TipoServicioComponent implements OnInit{

    constructor (private _TipoServicioService: TipoServicioService) {}

    //Instanciamos clase
    model = new TipoServicio('','');


    //Variable que se encargara de controlar cuando mostrar el preloader
    Cargando = false;


    //Instanciamos la clase que se encargara de traernos la url del servidor donde se alojan los servicios
    DatosServidorModel = new DatosServidor();

    //Variable que almacenara los datos para la tabla
    DatosTipoServicio = '';

    GuardarTipoServicio(){

        try {
            
                this.Cargando = true;

                this._TipoServicioService.GuardarTipoServicio(this.model, this.DatosServidorModel.url)
                .subscribe(
                    data => alertify.success('Registrado Correctamente'),
                    error => alert(error),
                    //() => this.BuscarEmpresa()
                );

        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->GuardarTipoServicio--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

    }


    BuscarTipoServicio(){
        try {
            this._TipoServicioService.BuscarTipoServicio(this.DatosServidorModel.url).subscribe(
            data => this.DatosTipoServicio = data,
            error => alertify.error('No funciona'),
            //() => this.LimpiarForm()
            //() => alert(JSON.stringify(this.DatosTipoServicio))
            );
        } catch (error) {
            
            var DescripcionError = 'TipoServicio.component.ts--->BuscarTipoServicio--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }
    }


    ngOnInit(){
        this.BuscarTipoServicio();
    }

}