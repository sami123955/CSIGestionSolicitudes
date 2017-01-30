import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SubclienteService {
    constructor(private _http: Http) { }

    GuardarSubcliente(SubclienteObject: any, urlService: string) {


        var params = '?CodigoSucursal=1&Nit='+SubclienteObject.Nit+'&RazonSocial='+SubclienteObject.RazonSocial+'&Telefono='+SubclienteObject.Telefono+'&Representante='+SubclienteObject.Representante+'&Estado='+true+'&Codigo=';

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(urlService + 'SubCliente'+ params
            , '', options)
            .map(res => res.json());

    }

    BuscarSubcliente(UrlApi) {

        var params = 'CodigoSucursal=&CodigoEmpresa=&Nit=&RazonSocial=&Telefono=&Representante=&Estado=&Codigo=';

        return this._http.get(UrlApi + 'SubCliente?' + params).map(res => res.json());
    }


    ActualizarEmpresa(empresaObject: any, urlService: string){
        var frmData= empresaObject.Archivos;

        
        var params = '?Codigo='+empresaObject.Codigo+'&Nit='+empresaObject.Nit+'&RazonSocial='+empresaObject.RazonSocial+'&Direccion='+empresaObject.Direccion+'&DireccionRecepcion='+empresaObject.DireccionRecepcion+'&EmailEmpresa='+empresaObject.EmailEmpresa+'&Telefono='+empresaObject.Telefono+'&Representante='+empresaObject.Representante+'&Observaciones='+empresaObject.Observaciones+'&Estado='+empresaObject.Estado+'&Contacto='+empresaObject.Contacto+'&EmailContacto='+empresaObject.EmailContacto+'&RutaRut='+encodeURIComponent(empresaObject.RutaRut)+'&RutaCamaraComercio='+encodeURIComponent(empresaObject.RutaCamaraComercio)+'&Contrato='+encodeURIComponent(empresaObject.Contrato);

        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });


        return this._http.post(urlService + 'Empresa' + params
            , frmData, options).map(res => res.json());

    }



}