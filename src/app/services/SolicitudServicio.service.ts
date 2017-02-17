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

    constructor(private _http: Http) { 


    }

    GuardarSolicitudServicio(ObjetoSolicitudServicio: any, FormDataSalida: any, UrlServicio: string) {

        FormDataSalida.append('Codigo', '');
        FormDataSalida.append('Nombre', ObjetoSolicitudServicio.Nombre);
        FormDataSalida.append('Cedula', ObjetoSolicitudServicio.Cedula);
        FormDataSalida.append('Direccion', ObjetoSolicitudServicio.Direccion);
        FormDataSalida.append('Telefono', ObjetoSolicitudServicio.Telefono);
        FormDataSalida.append('Celular', ObjetoSolicitudServicio.Celular);
        FormDataSalida.append('Cargo', ObjetoSolicitudServicio.Cargo);
        FormDataSalida.append('CodigoMunicipio', ObjetoSolicitudServicio.CodigoMunicipio);
        FormDataSalida.append('CodigoUsuario', '6'/*ObjetoSolicitudServicio.CodigoUsuario*/);
        FormDataSalida.append('CodigoSucursal', ObjetoSolicitudServicio.CodigoSucursal);
        FormDataSalida.append('lstServicioDetalle', ObjetoSolicitudServicio.lstServicioDetalle);
        
        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });

        this._http.post(UrlServicio + 'SolicitudServicio', FormDataSalida, options).map(res => {
                    let _res = res.json();
                    return _res;
                }).subscribe(data => alertify.success('Registrado correctamente'),
                             error => alertify.error('No se ha podido registrar')/*{
                    this.SolicitudServicio$.next(data.Data);
                    
    }*/);
    }


    ActualizarEmpleado(ObjetoEmpleado: any, UrlServicio: string) {

        var Datos = new FormData;

        Datos.append('Codigo', ObjetoEmpleado.Codigo);
        Datos.append('Telefono', ObjetoEmpleado.Telefono);
        Datos.append('Nombre', ObjetoEmpleado.Nombre);
        Datos.append('Celular', ObjetoEmpleado.Celular);
        Datos.append('Cargo', ObjetoEmpleado.Cargo);
        Datos.append('Email', ObjetoEmpleado.Email);
        Datos.append('Estado', ObjetoEmpleado.Estado);
        Datos.append('lstCodigoSucursal', ObjetoEmpleado.Sucursal);

        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Empleado'
            , Datos, options)
            .map(res => res.json());

    }


    BuscarEmpleado(UrlServicio) {


        var Parametros = '?Codigo=&Nombre=&CodigoUsuario=';

        Observable.interval(20000).subscribe(i=>{
            //return 
            this._http.get(UrlServicio + 'Empleado' + Parametros).map(res => {
                let _res = res.json();
                return _res;
            }).subscribe(data => {
                this.SolicitudServicio$.next(data.Data);
            });
        })


    }

    getEmpleados$(): Observable<any> {
        return this.SolicitudServicio$;

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