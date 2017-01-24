import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpresaService {
    constructor(private _http: Http) { }

    GuardarEmpleado(empresaObject: any, urlService: string) {
        var data = {
            Nit: empresaObject.Nit,
            RazonSocial: empresaObject.RazonSocial,
            Direccion: empresaObject.Direccion,
            DireccionRecepcion: empresaObject.DireccionRecepcion,
            EmailEmpresa: empresaObject.EmailEmpresa,
            Telefono: empresaObject.Telefono,
            RutaRut: empresaObject.RutaRut,
            RutaCamaraComercio: empresaObject.RutaCamaraComercio,
            Representante: empresaObject.Representante,
            Observaciones: empresaObject.Observaciones,
            Estado: true,
            Contrato: empresaObject.Contrato,
            Contacto: empresaObject.Contacto,
            EmailContacto: empresaObject.EmailContacto
        };





       /* var params = "?RazonSocial=RazonSocial2&Direccion=Direccion2&DireccionRecepcion=DireccionRecepcion3&EmailEmpresa=EmailEmpresa3&Telefono=Telefono3&RutaRut=RutaRut3&RutaCamaraComercio=RutaCamaraComercio3&Representante=Representante3&Observaciones=Observaciones3&Estado=true&Contrato=Contrato3&Contacto=Contacto3&EmailContacto=EmailContacto&Nit=Nit23";*/

        var params = 'Nit='+empresaObject.Nit+'&RazonSocial='+empresaObject.RazonSocial+'&Direccion='+empresaObject.Direccion+'&DireccionRecepcion='+empresaObject.DireccionRecepcion+'&EmailEmpresa='+empresaObject.EmailEmpresa+'&Telefono='+empresaObject.Telefono+'&RutaRut='+empresaObject.RutaRut+'&RutaCamaraComercio='+empresaObject.RutaCamaraComercio+'&Representante='+empresaObject.Representante+'&Observaciones='+empresaObject.Observaciones+'&Estado='+true+'&Contrato='+empresaObject.Contrato+'&Contacto='+empresaObject.Contrato+'&EmailContacto='+empresaObject.EmailContacto;

        var headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(urlService + 'Empresa?'
            , data, {
                headers: headers
            })
            .map(res => res.json());

    }


}