import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TipoServicioService {
    constructor(private _http: Http) { }

    GuardarTipoServicio(ObjetoTipoServicio: any, UrlServicio: string) {
        
        var params = '?Codigo=&Nombre='+this.ValidarCadena(ObjetoTipoServicio.Nombre)+'&Descripcion='+this.ValidarCadena(ObjetoTipoServicio.Descripcion)+'&Estado='+true;

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

    ActualizarTipoServicio(ObjetoTipoServicio: any, UrlServicio: string){
        var params = '?Codigo='+ObjetoTipoServicio.Codigo+'&Nombre='+this.ValidarCadena(ObjetoTipoServicio.Nombre)+'&Descripcion='+this.ValidarCadena(ObjetoTipoServicio.Descripcion)+'&Estado='+ObjetoTipoServicio.Estado;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'TipoServicio'+ params
            , '', options)
            .map(res => res.json());
    }



    //Metodo que elimanara caracteres especiales 

    ValidarCadena(Cadena){

        console.log(Cadena);

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
        Cadena = Cadena.replace(/\+/g, '');
        
        return Cadena;
    }


}