import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


import { Subject, Observable } from "rxjs"

declare var alertify:any;
declare var success:any;
declare var error:any;



@Injectable()
export class SolicitudAsignadasService {


    constructor(private _http: Http) {  }

    BuscarSolitudServicio(UrlServicio, ObjetoSolicitudesAsignadas) {

        var Parametros = '?Codigo=&Nombre=&Cedula=&CodigoUsuario='+ObjetoSolicitudesAsignadas.CodigoUsuario+'&FechaInicio='+ObjetoSolicitudesAsignadas.FechaInicial+'&FechaFin='+ObjetoSolicitudesAsignadas.FechaFinal+'&CodigoEstado='+ObjetoSolicitudesAsignadas.EstadoServicio+'&CodigoSucursal=';

        return this._http.get(UrlServicio + 'SolicitudServicio' + Parametros).map(res => res.json());

    }

    RechazarServicio(UrlServicio, Razon, CodigoServicio){

        var Datos = new FormData;

        var Header = new Headers();

        var Opciones = new RequestOptions({headers: Header});

        return this._http.post(UrlServicio + '', Datos, Opciones).map(res => res.json());
    }


}