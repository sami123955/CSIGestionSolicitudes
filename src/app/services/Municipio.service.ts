import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MunicipioService {
    constructor(private _http: Http) { }

    GuardarTipoServicio(ObjetoMunicipio: any, UrlServicio: string) {
        
        var params = '?Codigo=&Nombre='+this.ValidarCadena(ObjetoMunicipio.Nombre)+'&CodigoDepartamento='+ObjetoMunicipio.CodigoDepartamento;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Municipio'+ params
            , '', options)
            .map(res => res.json());

    }

    BuscarDepartamento(UrlServicio) {

        var params = "Codigo=&Nombre=";

        return this._http.get(UrlServicio + 'Departamento?' + params).map(res => res.json());
    }

    BuscarMunicipio(UrlServicio){

        var params = "Codigo=&CodigoDepartamento=";

        return this._http.get(UrlServicio + 'Municipio?' + params).map(res => res.json());
    }

    BuscarMunicipioSucursal(CodigoSucursal, UrlServicio){
        var params = "CodigoSucursal="+CodigoSucursal;

        return this._http.get(UrlServicio + 'SucursalMunicipio?' + params).map(res => res.json());
    }

    ActualizarTipoServicio(ObjetoMunicipio: any, UrlServicio: string){
        var params = '?Codigo='+ObjetoMunicipio.Codigo+'&Nombre='+this.ValidarCadena(ObjetoMunicipio.Nombre)+'&CodigoDepartamento='+ObjetoMunicipio.CodigoDepartamento;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Municipio'+ params
            , '', options)
            .map(res => res.json());
    }

    //Metodo que elimanara caracteres especiales 

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
        
        
        return Cadena;
    }

}