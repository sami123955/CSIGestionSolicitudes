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
        FormDataSalida.append('CodigoUsuario', '13'/*ObjetoSolicitudServicio.CodigoUsuario*/);

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
            alertify.success('Registro satisfactorio');
            this.CargandoPeticion = false;
        }

    }


    BuscarSolitudServicio(UrlServicio) {

        var Parametros = '?Codigo=&Nombre=&Cedula=&CodigoUsuario=13&FechaInicio=&FechaFin=&CodigoEstado=&CodigoSucursal=';

        return this._http.get(UrlServicio + 'SolicitudServicio' + Parametros).map(res => res.json());

    }


    ActualizarSolicitudServicio(UrlServicio: string, SolicitudServicioObjeto: any, FormDataSalida: any){


        var Datos = new FormData;

        Datos.append('Codigo', SolicitudServicioObjeto.Codigo);
        Datos.append('Nombre', SolicitudServicioObjeto.Nombre);
        Datos.append('Cedula', SolicitudServicioObjeto.Cedula);
        Datos.append('Direccion', SolicitudServicioObjeto.Direccion);
        Datos.append('Telefono', SolicitudServicioObjeto.Telefono);
        Datos.append('Celular', SolicitudServicioObjeto.Celular);
        Datos.append('Cargo', SolicitudServicioObjeto.Cargo);
        Datos.append('CodigoSucursal', SolicitudServicioObjeto.CodigoSucursal);
        Datos.append('CodigoMunicipio', '');
        Datos.append('CodigoUsuario', '13'/*SolicitudServicioObjeto.CodigoUsuario*/);
        Datos.append('CodigoSucursal', '');
        Datos.append('lstServicioDetalle', '');
        Datos.append('HojaVidaFile', FormDataSalida.get('HojaVidaFile'));
        Datos.append('AutorizacionEDCFile', FormDataSalida.get('AutorizacionEDCFile'));
        Datos.append('AutorizacionReferenciacionFile', FormDataSalida.get('AutorizacionReferenciacionFile'));
        Datos.append('AutorizacionCifinFile', FormDataSalida.get('AutorizacionCifinFile'));

        var header = new Headers();

        var options = new RequestOptions({headers: header});


        return this._http.post(UrlServicio + 'SolicitudServicio', Datos, options).map(res => res.json());

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