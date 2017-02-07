import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonaService {
    constructor(private _http: Http) { }

    GuardarPersona(ObjetoPersona: any, UrlServicio: string) {
        
       var frmData = ObjetoPersona.Archivo;
        
        var params = '?Codigo=&Estado='+true+'&Nombre='+this.ValidarCadena(ObjetoPersona.Nombre)+'&Cedula='+ObjetoPersona.Cedula+'&Direccion='+this.ValidarCadena(ObjetoPersona.Direccion)+'&Barrio='+this.ValidarCadena(ObjetoPersona.Barrio)+'&Telefono='+/*this.ValidarCadena(*/ObjetoPersona.Telefono/*)*/+'&Telefono2='+/*this.ValidarCadena(*/ObjetoPersona.Telefono2/*)*/+'&Celular='+/*this.ValidarCadena(*/ObjetoPersona.Celular/*)*/+'&Email='+/*this.ValidarCadena(*/ObjetoPersona.Email/*)*/+'&Email2='+ObjetoPersona.Email2+'&Profesion='+/*this.ValidarCadena(*/ObjetoPersona.Profesion/*)*/+'&CodigoMunicipio='+ObjetoPersona.CodigoMunicipio+'&FechaIngreso='+ObjetoPersona.FechaIngreso+'&FechaCumpleanios='+ObjetoPersona.FechaCumpleanios+'&Foto=&CodigoBanco='+ObjetoPersona.Banco+'&CodigoTipoCuenta='+ObjetoPersona.TipoCuenta+'&CodigoPersona='+/*this.ValidarCadena(*/ObjetoPersona.NumeroCuenta/*)*/+'&CodigoRol='+ObjetoPersona.CodigoRol;

        console.log(params);

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Persona'+ params
            , frmData, options)
            .map(res => res.json());

    }

    BuscarBanco(UrlServicio) {

        var params = "Codigo=&Nombre=&Estado=";

        return this._http.get(UrlServicio + 'Banco?' + params).map(res => res.json());
    }

    BuscarTipoCuenta(UrlServicio){
        
        var params = "Codigo=&Nombre=&Estado=";

        return this._http.get(UrlServicio + 'TipoCuenta?' + params).map(res => res.json());


    }


    BuscarRoles(UrlServicio){

        var params = "Codigo=&Estado=";

        return this._http.get(UrlServicio + 'Rol?' + params).map(res => res.json());

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