import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';


import 'rxjs/add/operator/map';

@Injectable()
export class FormatoService {
    constructor(private _http: Http) { }

    GuardarFormato(ObjetoFormato: any, UrlServicio: string) {
 
        var params = '?Codigo=&Formato=&Descripcion='+this.ValidarCadena(ObjetoFormato.Descripcion)+'&Estado='+true;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Formato'+ params
            , ObjetoFormato.Archivo, options)
            .map(res => res.json());
    }

    BuscarFormato(UrlServicio) {

        var params = "Codigo=&Estado=";

        return this._http.get(UrlServicio + 'Formato?' + params).map(res => res.json());
    }


    ActualizarFormato(ObjetoFormato: any, UrlServicio: string){
        var params = '?Codigo='+ObjetoFormato.Codigo+'&Formato='+encodeURIComponent(ObjetoFormato.Formato)+'&Descripcion='+this.ValidarCadena(ObjetoFormato.Descripcion)+'&Estado='+true;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Formato'+ params
            , ObjetoFormato.Archivo, options)
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