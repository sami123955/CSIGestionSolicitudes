import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SucursalService {
    constructor(private _http: Http) { }

    GuardarSucursal(SucursalObject: any, urlService: string) {

        
        var params = '?Direccion='+this.ValidarCadena(SucursalObject.Direccion)+'&Nombre='+this.ValidarCadena(SucursalObject.Nombre)+'&Email='+SucursalObject.Email+'&Telefono='+SucursalObject.Telefono+'&Representante='+this.ValidarCadena(SucursalObject.Representante)+'&Estado='+true+'&CodigoEmpresa=35'+'&Codigo=';

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(urlService + 'Sucursal'+ params
            , '', options)
            .map(res => res.json());

    }

    BuscarSucursal(UrlApi) {

        var params = '?Direccion=&Nombre=&Email=&Telefono=&Representante=&Estado=&CodigoEmpresa=&Codigo=';

        return this._http.get(UrlApi + 'Sucursal' + params).map(res => res.json());
    }


    ActualizarSucursal(SucursalObject: any, urlService: string){

        var params = '?Direccion='+this.ValidarCadena(SucursalObject.Direccion)+'&Nombre='+this.ValidarCadena(SucursalObject.Nombre)+'&Email='+SucursalObject.Email+'&Telefono='+SucursalObject.Telefono+'&Representante='+this.ValidarCadena(SucursalObject.Representante)+'&Estado='+SucursalObject.Estado+'&Codigo='+SucursalObject.Codigo+'&CodigoEmpresa=35';

        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });


        return this._http.post(urlService + 'Sucursal' + params
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
        Cadena = Cadena.replace(/\(/g, '');
        Cadena = Cadena.replace(/\)/g, '');
        
        return Cadena;
    }



}