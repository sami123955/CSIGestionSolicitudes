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


}