import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SubclienteService {
    constructor(private _http: Http) { }

    GuardarSubcliente(SubclienteObject: any, urlService: string) {


        var params = '?CodigoSucursal='+SubclienteObject.CodigoSucursal+'&Nit='+this.ValidarCadena(SubclienteObject.Nit)+'&RazonSocial='+this.ValidarCadena(SubclienteObject.RazonSocial)+'&Telefono='+SubclienteObject.Telefono+'&Representante='+this.ValidarCadena(SubclienteObject.Representante)+'&Estado='+true+'&Codigo=';

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(urlService + 'SubCliente'+ params
            , '', options)
            .map(res => res.json());
                
    }
    searchCompany(UrlApi) {

        var params = "CodigoSucursal=&Nit=&RazonSocial=&Telefono=&Representante=&Estado=&Codigo=";

        return this._http.get(UrlApi + 'SubCliente?' + params).map(res => res.json());
    }   

    BuscarSubcliente(UrlApi) {

        var params = 'CodigoSucursal=&Nit=&RazonSocial=&Telefono=&Estado=&Codigo=&CodigoEmpresa=';

        return this._http.get(UrlApi + 'SubCliente?' + params).map(res => res.json());
    }


    ActualizarSubCliente(SubclienteObject: any, urlService: string){

       
        var params = '?CodigoSucursal='+SubclienteObject.CodigoSucursal+'&Nit='+this.ValidarCadena(SubclienteObject.Nit)+'&RazonSocial='+this.ValidarCadena(SubclienteObject.RazonSocial)+'&Telefono='+SubclienteObject.Telefono+'&Representante='+this.ValidarCadena(SubclienteObject.Representante)+'&Estado='+SubclienteObject.Estado+'&Codigo='+SubclienteObject.Codigo;

        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });


        return this._http.post(urlService + 'SubCliente' + params
            , '', options).map(res => res.json());

    }

//Metodo para eliminar caracteres especiales
     ValidarCadena(Cadena){

        Cadena = Cadena.replace(/'/g, '');
        Cadena = Cadena.replace(/"/g, '');
        Cadena = Cadena.replace(/%/g, '');
        Cadena = Cadena.replace(/&/g, '');
        Cadena = Cadena.replace(/\$/g, '');
        Cadena = Cadena.replace(/!/g, '');
        Cadena = Cadena.replace(/¿/g, '');  
        Cadena = Cadena.replace(/\*/g, '');
        Cadena = Cadena.replace(/\?/g, '');
        Cadena = Cadena.replace(/º/g, '');
        Cadena = Cadena.replace(/\//g, '');
        Cadena = Cadena.replace(/#/g, '');
        Cadena = Cadena.replace(/\+/g, '');
        Cadena = Cadena.replace(/\-/g, '');
        
        return Cadena;
    }



}