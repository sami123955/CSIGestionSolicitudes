import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpleadoService {
    constructor(private _http: Http) { }

    GuardarEmpleado(ObjetoEmpleado: any, UrlServicio: string) {


        var Datos = new FormData;

        Datos.append('Codigo', '');
        Datos.append('Telefono', ObjetoEmpleado.Telefono);
        Datos.append('Nombre', ObjetoEmpleado.Nombre);
        Datos.append('Celular', ObjetoEmpleado.Celular);
        Datos.append('Cargo', ObjetoEmpleado.Cargo);
        Datos.append('Email', ObjetoEmpleado.Email);
        Datos.append('Estado', true);
        Datos.append('lstCodigoSucursal', ObjetoEmpleado.Sucursal);

        //var params = 'Codigo=&Nombre='+ObjetoEmpleado.Nombre+'&Telefono='+ObjetoEmpleado.Telefono+'&Celular='+ObjetoEmpleado.Celular+'&Cargo='+ObjetoEmpleado.Cargo+'&Estado='+true;

        var headers = new Headers();

        var options = new RequestOptions({ headers: headers });

        return this._http.post(UrlServicio + 'Empleado'
            , Datos, options)
            .map(res => res.json());
    }


    ActualizarEmpleado(ObjetoEmpleado: any, UrlServicio: string){

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


    BuscarEmpleado(UrlServicio){


        var Parametros = '?Codigo=&Nombre=&CodigoUsuario=';

        return this._http.get(UrlServicio + 'Empleado' + Parametros).map(res => res.json());

    }

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