import { Component } from '@angular/core';
import { Persona } from '../models/Persona';


@Component({

    selector: 'Persona',
    templateUrl: '../views/Persona.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: []
})

export class PersonaComponent {


    model = new Persona('','','','','','','','','','','','','','','','');


}