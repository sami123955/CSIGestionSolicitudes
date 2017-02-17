import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


import { Subject, Observable } from "rxjs"

declare var alertify:any;
declare var success:any;
declare var error:any;



@Injectable()
export class SolicitudServicioService {

    SolicitudServicio$: Subject<any> = new Subject<any>();

    constructor(private _http: Http) {  }

    CargandoPeticion = false;

    GuardarSolicitudServicio(ObjetoSolicitudServicio: any, FormDataSalida: any, UrlServicio: string) {

        FormDataSalida.has('Codigo') ?  FormDataSalida.delete('Codigo') : '';
        FormDataSalida.append('Codigo', '');
        
        FormDataSalida.has('Nombre') ?  FormDataSalida.delete('Nombre') : '';
        FormDataSalida.append('Nombre', ObjetoSolicitudServicio.Nombre);

        FormDataSalida.has('Cedula') ?  FormDataSalida.delete('Cedula') : '';
        FormDataSalida.append('Cedula', ObjetoSolicitudServicio.Cedula);
        
        FormDataSalida.has('Direccion') ?  FormDataSalida.delete('Direccion') : '';
        FormDataSalida.append('Direccion', ObjetoSolicitudServicio.Direccion);
        
        FormDataSalida.has('Telefono') ?  FormDataSalida.delete('Telefono') : '';
        FormDataSalida.append('Telefono', ObjetoSolicitudServicio.Telefono);
        
        FormDataSalida.has('Celular') ?  FormDataSalida.delete('Celular') : '';
        FormDataSalida.append('Celular', ObjetoSolicitudServicio.Celular);
        
        FormDataSalida.has('Cargo') ?  FormDataSalida.delete('Cargo') : '';
        FormDataSalida.append('Cargo', ObjetoSolicitudServicio.Cargo);

        FormDataSalida.has('CodigoMunicipio') ?  FormDataSalida.delete('CodigoMunicipio') : '';
        FormDataSalida.append('CodigoMunicipio', ObjetoSolicitudServicio.CodigoMunicipio);

        FormDataSalida.has('CodigoUsuario') ?  FormDataSalida.delete('CodigoUsuario') : '';
        FormDataSalida.append('CodigoUsuario', '6'/*ObjetoSolicitudServicio.CodigoUsuario*/);

        FormDataSalida.has('CodigoSucursal') ?  FormDataSalida.delete('CodigoSucursal') : '';
        FormDataSalida.append('CodigoSucursal', ObjetoSolicitudServicio.CodigoSucursal);

        FormDataSalida.has('lstServicioDetalle') ?  FormDataSalida.delete('lstServicioDetalle') : '';
        FormDataSalida.append('lstServicioDetalle', ObjetoSolicitudServicio.lstServicioDetalle);
        
        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });

        this._http.post(UrlServicio + 'SolicitudServicio', FormDataSalida, options).map(res => {
                    let _res = res.json();
                    return _res;
                }).subscribe(data => this.ValidarResultado(data),
                             error => alertify.error('No se ha podido registrar')/*{
                    this.SolicitudServicio$.next(data.Data);
                    
    }*/);
    }


    ValidarResultado(Respuesta){

        if(Respuesta.TipoResultado == false){
            alertify.error(Respuesta.Mensaje);
        }
        else{
            alertify.success(Respuesta.Mensaje);
            this.CargandoPeticion = false;
        }

    }


    BuscarSolitudServicio(UrlServicio) {

        var Parametros = '?Codigo=&Nombre=&Cedula=&CodigoUsuario=&FuchaInicio=&FechaFin=&CodigoEstado=&CodigoSucursal=';

        this._http.get('SolicitudServicio').map(res => res.json());

    }

    ValidarCadena(Cadena) {

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