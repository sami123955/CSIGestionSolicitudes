import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpresaService {
    constructor(private _http: Http) { }

    GuardarEmpresa(empresaObject: any, urlService: string) {

        var frmData= empresaObject.Archivos;
        
        var params = '?Nit='+empresaObject.Nit+'&RazonSocial='+empresaObject.RazonSocial+'&Direccion='+empresaObject.Direccion+'&DireccionRecepcion='+empresaObject.DireccionRecepcion+'&EmailEmpresa='+empresaObject.EmailEmpresa+'&Telefono='+empresaObject.Telefono+'&Representante='+empresaObject.Representante+'&Observaciones='+empresaObject.Observaciones+'&Estado='+true+'&Contacto='+empresaObject.Contrato+'&EmailContacto='+empresaObject.EmailContacto;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(urlService + 'Empresa'+ params
            , frmData, options)
            .map(res => res.json());

    }

    searchCompany(UrlApi) {

        var params = "Codigo=&Nit=&RazonSocial=&EmailEmpresa=&Telefono=&Representante=&Estado=";

        return this._http.get(UrlApi + 'Empresa?' + params).map(res => res.json());
    }


    ActualizarEmpresa(empresaObject: any, urlService: string){
        var frmData= empresaObject.Archivos;

        
        var params = '?Codigo='+empresaObject.Codigo+'&Nit='+empresaObject.Nit+'&RazonSocial='+empresaObject.RazonSocial+'&Direccion='+empresaObject.Direccion+'&DireccionRecepcion='+empresaObject.DireccionRecepcion+'&EmailEmpresa='+empresaObject.EmailEmpresa+'&Telefono='+empresaObject.Telefono+'&Representante='+empresaObject.Representante+'&Observaciones='+empresaObject.Observaciones+'&Estado='+empresaObject.Estado+'&Contacto='+empresaObject.Contacto+'&EmailContacto='+empresaObject.EmailContacto+'&RutaRut='+encodeURIComponent(empresaObject.RutaRut)+'&RutaCamaraComercio='+encodeURIComponent(empresaObject.RutaCamaraComercio)+'&Contrato='+encodeURIComponent(empresaObject.Contrato);

        var headers = new Headers();
        headers.append('Content-type', 'multipart/form-data');

        var options = new RequestOptions({ headers: headers });

        return this._http.put(urlService + 'Empresa' + params
            , frmData).map(res => res.json());
    }



}