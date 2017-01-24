import { Component, OnInit } from '@angular/core';
import { Empleado } from '../models/Empleado';
import { DatosServidor } from '../models/DatosServidor';

@Component({
    selector: 'Empleado',
    templateUrl: '../views/Empleado.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [],
    
})

export class EmpleadoComponent implements OnInit {

    //Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del seridor donde consumiremos los servicios
    DatosServidorModel = new DatosServidor();

    model = new Empleado('', '', '', '', '');

    myOptions = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
    ];

    data;

    ngOnInit() {
        
    }

        
}