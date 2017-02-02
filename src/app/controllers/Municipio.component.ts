import { Component } from '@angular/core';
import { Municipio } from '../models/Municipio';

@Component({
    selector: 'Municipio',
    templateUrl: '../views/Municipio.component.html',
    styleUrls: ['../../assets/css/Maestras.css']
})
export class MunicipioComponent {


    //Instanciamos la clase Municipio
    model = new Municipio('','');

    


}