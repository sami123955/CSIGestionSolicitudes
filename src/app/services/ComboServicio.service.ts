import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ComboServicioService {
    constructor(private _http: Http) { }

    GuardarComboServicio(ObjetoComboServicio: any, UrlServicio: string) {

        var Datos = new FormData;

        Datos.append('Codigo', '');
        Datos.append('CodigoSucursal', ObjetoComboServicio.CodigoSucursal);
        Datos.append('Nombre',  this.ValidarCadena(ObjetoComboServicio.Nombre));
        Datos.append('CodigoSubcliente', ObjetoComboServicio.CodigoSubcliente);
        Datos.append('Estado', true);
        Datos.append('Costo', this.ValidarCadena(ObjetoComboServicio.Costo));
        Datos.append('lstCiudades', ObjetoComboServicio.Municipio);
        Datos.append('lstDetalle', ObjetoComboServicio.CodigoServicio);


        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'ComboDetalle'
            , Datos, options)
            .map(res => res.json());

    }

    /*Metodo para buscar ComboServicios*/
    BuscarComboServicio(UrlApi){
        var params ="?Codigo=&Nombre=&CodigoSubcliente=&Estado=&CodigoSucursal=&CodigoMunicipio=";
        return this._http.get(UrlApi+'ComboDetalle'+params).map(res => res.json());
    }

/*
    BuscarMunicipio(UrlServicio){

        var params = "Codigo=&CodigoDepartamento=";

        return this._http.get(UrlServicio + 'Municipio?' + params).map(res => res.json());
}*/
/*
    ActualizarTipoServicio(ObjetoMunicipio: any, UrlServicio: string){
        var params = '?Codigo='+ObjetoMunicipio.Codigo+'&Nombre='+this.ValidarCadena(ObjetoMunicipio.Nombre)+'&CodigoDepartamento='+ObjetoMunicipio.CodigoDepartamento;

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Municipio'+ params
            , '', options)
            .map(res => res.json());
}*/

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
        Cadena = Cadena.replace(/\(/g, '');
        Cadena = Cadena.replace(/\)/g, '');
        Cadena = Cadena.replace(/\%/g, '');
         
        return Cadena;
    }

}