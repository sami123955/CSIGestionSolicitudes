import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CausanteNovedadService {
    constructor(private _http:Http){ }


GuardarCausanteNovedad(CausanteNovedadObject: any, urlService: string){
    var params = '?CodigoTipoNovedad='+CausanteNovedadObject.CodigoTipoNovedad+'&Nombre='+this.ValidarCadena(CausanteNovedadObject.Nombre)+'&Estado='+true+'&Codigo=';

    var headers = new Headers();
        
    var options = new RequestOptions({ headers: headers });

    return this._http.post(urlService + 'CausanteNovedad'+ params
            , '', options)
            .map(res => res.json());
}

    BuscarCausanteNovedad(UrlApi){
        var params ='?Nombre=&CodigoTipoNovedad=&Codigo=&Estado=';

        return this._http.get(UrlApi + 'CausanteNovedad' + params).map(res => res.json());;
    }

    ActualizarCausanteNovedad(CausanteNovedadObject:any, urlService:string){
        var params = '?Nombre='+this.ValidarCadena(CausanteNovedadObject.Nombre)+'&CodigoTipoNovedad='+CausanteNovedadObject.CodigoTipoNovedad+'&Codigo='+CausanteNovedadObject.Codigo+'&Estado='+CausanteNovedadObject.Estado;

        var headers = new Headers();

        var options = new RequestOptions({headers: headers});

        return this._http.post(urlService + 'CausanteNovedad'+ params
                ,'', options).map(res=>res.json());

    }

     //Metodo para eliminar caracteres especiales
    ValidarCadena(Cadena){
        Cadena=Cadena.replace(/'/g, '');
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