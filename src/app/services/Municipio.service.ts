import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MunicipioService {
    constructor(private _http: Http) { }

    /*GuardarTipoServicio(ObjetoTipoServicio: any, UrlServicio: string) {
        
        var params = '?Codigo=&Nombre='+this.ValidarCadena(ObjetoTipoServicio.Nombre)+'&Descripcion='+this.ValidarCadena(ObjetoTipoServicio.Descripcion)+'&Estado='+true;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'TipoServicio'+ params
            , '', options)
            .map(res => res.json());

    }*/

    BuscarDepartamento(UrlServicio) {

        var params = "Codigo=&Nombre=";

        return this._http.get(UrlServicio + 'Departamento?' + params).map(res => res.json());
    }
/*
    ActualizarTipoServicio(ObjetoTipoServicio: any, UrlServicio: string){
        var params = '?Codigo='+ObjetoTipoServicio.Codigo+'&Nombre='+this.ValidarCadena(ObjetoTipoServicio.Nombre)+'&Descripcion='+this.ValidarCadena(ObjetoTipoServicio.Descripcion)+'&Estado='+ObjetoTipoServicio.Estado;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'TipoServicio'+ params
            , '', options)
            .map(res => res.json());
    }


*/
    //Metodo que elimanara caracteres especiales 

    ValidarCadena(Cadena){

        Cadena = Cadena.replace('"', '');
        Cadena = Cadena.replace("'", '');
        Cadena = Cadena.replace("%", '');
        Cadena = Cadena.replace("&", '');
        Cadena = Cadena.replace("/", '');
        Cadena = Cadena.replace("!", '');
        Cadena = Cadena.replace("?", '');
        Cadena = Cadena.replace("¿", '');
        Cadena = Cadena.replace("*", '');
        
        return Cadena;

    }



}