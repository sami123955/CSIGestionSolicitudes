import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpleadoService {
    constructor(private _http: Http) { }

    GuardarEmpleado(ObjetoEmpleado: any, UrlServicio: string) {

        var params = 'Codigo=&Nombre='+ObjetoEmpleado.Nombre+'&Telefono='+ObjetoEmpleado.Telefono+'&Celular='+ObjetoEmpleado.Celular+'&Cargo='+ObjetoEmpleado.Cargo+'&Estado='+true;

        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Empresa?'
            , '', options)
            .map(res => res.json());
    }


}