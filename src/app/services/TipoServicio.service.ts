import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TipoServicioService {
    constructor(private _http: Http) { }

    GuardarTipoServicio(ObjetoTipoServicio: any, UrlServicio: string) {
        
        var params = '?Codigo=&Nombre='+ObjetoTipoServicio.Nombre+'&Descripcion='+ObjetoTipoServicio.Descripcion+'&Estado='+true;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'TipoServicio'+ params
            , '', options)
            .map(res => res.json());

    }

    BuscarTipoServicio(UrlServicio) {

        var params = "Codigo=&Nombre=&Descripcion=&Estado=";

        return this._http.get(UrlServicio + 'TipoServicio?' + params).map(res => res.json());
    }

/*
    ActualizarEmpresa(empresaObject: any, urlService: string){
        var frmData= empresaObject.Archivos;

        
        var params = '?Codigo='+empresaObject.Codigo+'&Nit='+empresaObject.Nit+'&RazonSocial='+empresaObject.RazonSocial+'&Direccion='+empresaObject.Direccion+'&DireccionRecepcion='+empresaObject.DireccionRecepcion+'&EmailEmpresa='+empresaObject.EmailEmpresa+'&Telefono='+empresaObject.Telefono+'&Representante='+empresaObject.Representante+'&Observaciones='+empresaObject.Observaciones+'&Estado='+empresaObject.Estado+'&Contacto='+empresaObject.Contacto+'&EmailContacto='+empresaObject.EmailContacto+'&RutaRut='+encodeURIComponent(empresaObject.RutaRut)+'&RutaCamaraComercio='+encodeURIComponent(empresaObject.RutaCamaraComercio)+'&Contrato='+encodeURIComponent(empresaObject.Contrato);

        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });


        return this._http.post(urlService + 'Empresa' + params
            , frmData, options).map(res => res.json());

    }
*/




}