import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../models/Sucursal';

@Component({
    selector: 'Sucursal',
    templateUrl: '../views/Sucursal.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: []
})

export class SucursalComponent implements OnInit {


    model = new Sucursal('','','','','');


    ngOnInit() {
        //alert();
    }

}