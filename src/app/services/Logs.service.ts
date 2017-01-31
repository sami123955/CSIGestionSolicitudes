import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LogsService {
    constructor(private _http: Http) { }

    /*GuardarEmpresa(empresaObject: any, urlService: string) {

        var frmData= empresaObject.Archivos;
        
        var params = '?Codigo=&Nit='+empresaObject.Nit+'&RazonSocial='+empresaObject.RazonSocial+'&Direccion='+empresaObject.Direccion+'&DireccionRecepcion='+empresaObject.DireccionRecepcion+'&EmailEmpresa='+empresaObject.EmailEmpresa+'&Telefono='+empresaObject.Telefono+'&Representante='+empresaObject.Representante+'&Observaciones='+empresaObject.Observaciones+'&Estado='+true+'&Contacto='+empresaObject.Contacto+'&EmailContacto='+empresaObject.EmailContacto+'&RutaRut='+""+'&RutaCamaraComercio='+""+'&Contrato='+"";

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(urlService + 'Empresa'+ params
            , frmData, options)
            .map(res => res.json());

    }*/
}