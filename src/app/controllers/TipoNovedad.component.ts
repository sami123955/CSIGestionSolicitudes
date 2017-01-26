import { Component, OnInit } from '@angular/core';
import { TipoNovedad } from '../models/TipoNovedad';

@Component({
    selector: 'TipoNovedad',
    templateUrl: '../views/TipoNovedad.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: []
})

export class TipoNovedadComponent implements OnInit {


    model = new TipoNovedad('');


    ngOnInit() {
        //alert();
    }

}