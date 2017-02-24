import { Component, OnInit } from '@angular/core';
import { AsignarServicio } from '../models/AsignarServicio';
import { DatosServidor } from '../models/DatosServidor';
import { SolicitudServicioService } from '../services/SolicitudServicio.service';

@Component({
    selector: 'AsignarServicio',
    templateUrl: '../views/AsignarServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SolicitudServicioService]
})

export class AsignarServicioComponent implements OnInit {


    constructor(
        private _SolicitudServicioService: SolicitudServicioService
    ) { }


    //Variable que almacenara los datos de la
    DatosSolicitudesServicio = '';

    //Variable que almacenara los datos de combos servicios
    DatosComboServicios = '';

    //Variable que almacenara los datos de detalle
    DatosDetalleCombos = '';

    ObjetoAsignarServicio = new AsignarServicio('6');


    //Clase que usaremos para obtener el valor de la url del servicio
    DatosServidorModel = new DatosServidor();

    //Controlar preloader
    Cargando = false;



    ngOnInit() {

        this.BuscarSolicitudesServicio();

    }

    BuscarSolicitudesServicio() {

        this.Cargando = true;

        try {
            this._SolicitudServicioService.BuscarSolitudServicio(this.DatosServidorModel.url, '6').subscribe(
                data => this.DatosSolicitudesServicio = data,
                error => alert(error),
                () => this.Cargando = false
            );
        } catch (error) {

            var DescripcionError = 'AsignarServicio.component.ts--->BuscarSolicitudesServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }


    }

    CambiarFormatoFecha(FechaActual) {


        var FechaNueva = new Date(FechaActual).toLocaleDateString();

        return FechaNueva;
    }

    CargarCombosServicios(ListaCombos){

        this.DatosComboServicios = ListaCombos;
        
    }

    CargarDetalleCombo(ListaSolicitudDetalle){
        this.DatosDetalleCombos = ListaSolicitudDetalle;
    }



}