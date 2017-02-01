import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CausanteNovedadService {
    constructor(private _http: Http){ }


GuardarCausanteNovedad(CausanteNovedadObject: any, urlService: string){
    var params = '?CodigoTipoSucursal='+CausanteNovedadObject.CodigoTipoSucursal+'&Nombre='+CausanteNovedadObject.Nombre+'&Codigo=';

    var headers = new Headers();
        
    var options = new RequestOptions({ headers: headers });

    return this._http.post(urlService + 'CausanteNovedad'+ params
            , '', options)
            .map(res => res.json());
}

}