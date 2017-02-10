import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ComboServicioService {
    constructor(private _http: Http) { }

    GuardarComboServicio(ObjetoComboServicio: any, UrlServicio: string) {

        var JsonSalida = {

                            Codigo: '',
                            CodigoSucursal: ObjetoComboServicio.CodigoSucursal,
                            Nombre: ObjetoComboServicio.Nombre,
                            CodigoSubcliente: ObjetoComboServicio.CodigoSubcliente,
                            Estado: true,
                            
                            Costo: ObjetoComboServicio.Costo,
                            lstCiudades: ObjetoComboServicio.Municipio,
                            lstDetalle: ObjetoComboServicio.CodigoServicio
                            
                         };

        var params = '?Datos='+JSON.stringify(JsonSalida);

        console.log(params);

        var headers = new Headers();
        
        var options = new RequestOptions({ headers: headers });

        /*return this._http.post(UrlServicio + 'ComboServicios'+ params
            , '', options)
            .map(res => res.json());*/

        return this._http.post(UrlServicio + 'ComboDetalle'
            , JSON.stringify(JsonSalida), options)
            .map(res => res.json());

    }

    /*Metodo para buscar ComboServicios*/
    BuscarComboServicio(UrlApi){
        var params ="?Codigo=&Nombre=&CodigoSubcliente=&Estado=&CodigoSucursal=";
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
         
        return Cadena;
    }

}