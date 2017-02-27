import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';


import 'rxjs/add/operator/map';

@Injectable()
export class AsignarServicioService {
    constructor(private _http: Http) { }

    BuscarAnalistas(UrlServicio) {

        var Parametros = "Codigo=";

        return this._http.get(UrlServicio + 'SolicitudUsuario?' + Parametros).map(res => res.json());
    }

    AsignarServicio(ObjetoAsignarServicio:any, UrlServicio:string){

        var Datos = new FormData;

        Datos.append('CodigoDetalle', ObjetoAsignarServicio.CodigoDetalle);
        Datos.append('CodigoAnalista', ObjetoAsignarServicio.CodigoAnalista);
        Datos.append('CodigoFormato', ObjetoAsignarServicio.CodigoFormato);

        var header = new Headers();

        var Opciones = new RequestOptions({headers: header});

        return this._http.post(UrlServicio + 'SolicitudUsuario', Datos, Opciones).map(res => res.json());

    }


}