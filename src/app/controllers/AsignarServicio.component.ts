import { Component, OnInit } from '@angular/core';
import { AsignarServicio } from '../models/AsignarServicio';
import { DatosServidor } from '../models/DatosServidor';
import { SolicitudServicioService } from '../services/SolicitudServicio.service';
import { FormatoService } from '../services/Formato.service';
import { AsignarServicioService } from '../services/AsignarServicio.service';

declare var alertify:any;
declare var success:any;
declare var error:any;

@Component({
    selector: 'AsignarServicio',
    templateUrl: '../views/AsignarServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SolicitudServicioService,FormatoService, AsignarServicioService]
})

export class AsignarServicioComponent implements OnInit {


    constructor(
        private _SolicitudServicioService: SolicitudServicioService,
        private _FormatoService: FormatoService,
        private _AsignarServicioService:AsignarServicioService
    ) { }


    //Variable que almacenara los datos de la
    DatosSolicitudesServicio = '';

    //Variable que almacenara los datos de combos servicios
    DatosComboServicios = '';

    //Variable que almacenara los datos de detalle
    DatosDetalleCombos = '';

    ObjetoAsignarServicio = new AsignarServicio('', '6', '');


    //Clase que usaremos para obtener el valor de la url del servicio
    DatosServidorModel = new DatosServidor();

    //Controlar preloader
    Cargando = false;

    //variable que almacenara los datos de Formato
    DatosFormato = '';

    //Variable que almacenara los datos de los analistas
    DatosAnalistas = '';

    ngOnInit() {

        this.BuscarSolicitudesServicio();
        this.BuscarFormatos();
        this.BuscarAnalistas();
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

    BuscarFormatos(){

        try {

            this._FormatoService.BuscarFormato(this.DatosServidorModel.url).subscribe(
                data => this.DatosFormato = data,
                error => alert(error)
            );
            
        } catch (error) {

            var DescripcionError = 'AsignarServicio.component.ts--->BuscarFormatos--->' + '  Error:  ' + error;
            console.log(DescripcionError);
            
        }

    }

    BuscarAnalistas(){

        try {
            
            this._AsignarServicioService.BuscarAnalistas(this.DatosServidorModel.url).subscribe(
                data => this.DatosAnalistas = data,
                error => alert(error)
            );
        } catch (error) {
            var DescripcionError = 'AsignarServicio.component.ts--->BuscarAnalistas--->' + '  Error:  ' + error;
            console.log(DescripcionError);
        }

    }

    AsignarServicio(CodigoAnalista){

        try {

            this.ObjetoAsignarServicio.CodigoAnalista = CodigoAnalista;

            if(this.ObjetoAsignarServicio.CodigoFormato == ''){
                alertify.error('Debe seleccionar el formato');
            }
            else {
                this._AsignarServicioService.AsignarServicio(this.ObjetoAsignarServicio, this.DatosServidorModel.url).subscribe(
                    data => alertify.success('Asignado correctamente'),
                    error => /*alertify.error('Ocurrio un error en la asignacion')*/alert(error),
                    () => this.BuscarSolicitudesServicio()
                );
            }
            
        } catch (error) {

            var DescripcionError = 'AsignarServicio.component.ts--->AsignarServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);
            
        }


    }



}