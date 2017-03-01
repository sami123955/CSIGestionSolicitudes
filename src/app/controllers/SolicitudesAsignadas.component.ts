import { Component } from '@angular/core';
import { SolicitudesAsignadas } from '../models/SolicitudesAsignadas';
import { DatosServidor } from '../models/DatosServidor';
import { SolicitudAsignadasService } from '../services/SolicitudesAsignadas.service';

@Component({
    selector: 'SolicitudesAsignadas',
    templateUrl: '../views/SolicitudesAsignadas.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SolicitudAsignadasService]
})

export class SolicitudesAsignadasComponent {

    constructor(private _SolicitudAsignadasService:SolicitudAsignadasService){}

    ObjetoSolicitudesAsignadas = new SolicitudesAsignadas('','','','14');

    //Datos servidor
    DatosServidorModel = new DatosServidor();

    //Variable que almacenara las solicitudes de servicio
    DatosSolicitudesServicio = '';


    BuscarServicios(){

        try {

            this._SolicitudAsignadasService.BuscarSolitudServicio(this.DatosServidorModel.url, this.ObjetoSolicitudesAsignadas).subscribe(
                data => /*this.DatosSolicitudesServicio = */alert(JSON.stringify(data)),
                error => alert(error),
            );
            
        } catch (error) {

            var DescripcionError = 'SolicitudesAsignadas.component.ts--->BuscarServicios--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

    }


    ConstruirDatosParaTabla(Datos){

        var Salida = [];

        for(let i of Datos.Data){

            var JsonEntrada = {}


            //Agregamos los datos mas superficiales
            JsonEntrada['codigo'] = '';

        }

    }

}