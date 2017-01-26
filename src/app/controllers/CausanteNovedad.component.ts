import { Component, OnInit } from '@angular/core';
import { CausanteNovedad } from '../models/CausanteNovedad';

@Component({
    selector: 'CausanteNovedad',
    templateUrl: '../views/CausanteNovedad.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: []
})

export class CausanteNovedadComponent implements OnInit {


    model = new CausanteNovedad('','','');


    ngOnInit() {
        //alert();
    }

}