import { Component, OnInit } from '@angular/core';
import { Subcliente } from '../models/Subcliente';

@Component({
    selector: 'Subcliente',
    templateUrl: '../views/Subcliente.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: []
})

export class SubclienteComponent implements OnInit {


    model = new Subcliente('','','','','','','',);


    ngOnInit() {
        //alert();
    }

}