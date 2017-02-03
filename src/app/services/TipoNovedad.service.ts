import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TipoNovedadService{
    constructor (private _http: Http){}

    GuardarTipoNovedad(TipoNovedadObject: any, urlService: string){

        var params='?Codigo=&Nombre='+TipoNovedadObject.Nombre+'&Estado='+true;

        var headers=new Headers();

        var options=new RequestOptions({headers:headers});

        return this._http.post(urlService + 'TipoNovedad'+ params
               , '', options)
               .map(res => res.json());
    }

    searchCompany(UrlApi) {

        var params = "Codigo=&Nombre=&Estado";

        return this._http.get(UrlApi + 'TipoNovedad?' + params).map(res => res.json());
    }

    BuscarTipoNovedad(UrlApi){
        var params='?Codigo=&Nombre=&Estado=';
        return this._http.get(UrlApi + 'TipoNovedad' + params).map(res => res.json());
    }

    ActualizarTipoNovedad(TipoNovedadObject:any, urlService:string){
        
        var params ='?Codigo='+TipoNovedadObject.Codigo+'&Nombre='+TipoNovedadObject.Nombre+'&Estado='+TipoNovedadObject.Estado;

        var headers = new Headers();

        var options = new RequestOptions({headers: headers});

        return this._http.post(urlService + 'TipoNovedad'+ params
                    ,'', options).map(res=>res.json());
    }
}