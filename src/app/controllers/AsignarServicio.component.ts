import { Component, OnInit, ViewChild } from '@angular/core';
import { AsignarServicio } from '../models/AsignarServicio';
import { DatosServidor } from '../models/DatosServidor';
import { SolicitudServicioService } from '../services/SolicitudServicio.service';
import { FormatoService } from '../services/Formato.service';
import { AsignarServicioService } from '../services/AsignarServicio.service';
import { ElementRef } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal';

declare var alertify: any;
declare var success: any;
declare var error: any;
declare var $: any;
declare var fnDestroy: any;

@Component({
    selector: 'AsignarServicio',
    templateUrl: '../views/AsignarServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SolicitudServicioService, FormatoService, AsignarServicioService]
})

export class AsignarServicioComponent implements OnInit {

    @ViewChild('SubServiciosModal') public SubServiciosModal: ModalDirective;

    constructor(
        private _SolicitudServicioService: SolicitudServicioService,
        private _FormatoService: FormatoService,
        private _AsignarServicioService: AsignarServicioService,
        private elRef: ElementRef
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

    DataTable = false;

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
                () => this.AplicarDataTable()
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

    CargarCombosServicios(ListaCombos) {

        this.DatosComboServicios = ListaCombos;

    }

    CargarDetalleCombo(ListaSolicitudDetalle) {
        this.DatosDetalleCombos = ListaSolicitudDetalle;
    }

    BuscarFormatos() {

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

    BuscarAnalistas() {

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

    AsignarServicio(CodigoAnalista) {

        try {

            this.ObjetoAsignarServicio.CodigoAnalista = CodigoAnalista;

            if (this.ObjetoAsignarServicio.CodigoFormato == '') {
                alertify.error('Debe seleccionar el formato');
            }
            else {
                this._AsignarServicioService.AsignarServicio(this.ObjetoAsignarServicio, this.DatosServidorModel.url).subscribe(
                    data => alertify.success('Asignado correctamente'),
                    error => alertify.error('Ocurrio un error en la asignacion'),
                    () => this.BuscarSolicitudesServicio()
                );

                this.OcultarSubServiciosModal();

            }

        } catch (error) {

            var DescripcionError = 'AsignarServicio.component.ts--->AsignarServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }


    }

    AplicarDataTable() {

        try {

            this.Cargando = false;

            if (this.DataTable == false) {
                setTimeout(function () {
                    $('#TablaSolicitudesServicio').dataTable({
                        "bDestroy": true,
                        "language": {
                            "sProcessing": "Procesando...",
                            "sLengthMenu": "Mostrar _MENU_ registros",
                            "sZeroRecords": "No se encontraron resultados",
                            "sEmptyTable": "Ningún dato disponible en esta tabla",
                            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                            "sInfoPostFix": "",
                            "sSearch": "Buscar:",
                            "sUrl": "",
                            "sInfoThousands": ",",
                            "sLoadingRecords": "Cargando...",
                            "oPaginate": {
                                "sFirst": "Primero",
                                "sLast": "Último",
                                "sNext": "Siguiente",
                                "sPrevious": "Anterior"
                            },
                            "oAria": {
                                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                            }
                        }
                    });
                }, 20);

                this.DataTable = true;
            }
            else {
                $(document).ready(function () {

                    $('#TablaSolicitudesServicio').dataTable().fnDestroy();
                    setTimeout(function () {
                       $('#TablaSolicitudesServicio').DataTable({
                            "language": {
                                "sProcessing": "Procesando...",
                                "sLengthMenu": "Mostrar _MENU_ registros",
                                "sZeroRecords": "No se encontraron resultados",
                                "sEmptyTable": "Ningún dato disponible en esta tabla",
                                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                                "sInfoPostFix": "",
                                "sSearch": "Buscar:",
                                "sUrl": "",
                                "sInfoThousands": ",",
                                "sLoadingRecords": "Cargando...",
                                "oPaginate": {
                                    "sFirst": "Primero",
                                    "sLast": "Último",
                                    "sNext": "Siguiente",
                                    "sPrevious": "Anterior"
                                },
                                "oAria": {
                                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                                }
                            }
                        });

                    }, 20);


                });


            }



        } catch (error) {

            var DescripcionError = 'AsignarServicio.component.ts--->AplicarDataTable--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }

    /*METODO PARA CERRAR modal*/
    public OcultarSubServiciosModal(): void {
        this.SubServiciosModal.hide();
    }


    //Change de hace calidad o hace analista

    HaceCalidadHaceAnalista(CodigoDetalle, TipoPeticion, event) {


        try {

            this._AsignarServicioService.HaceCalidadHaceAnalista(this.DatosServidorModel.url, CodigoDetalle, TipoPeticion, event.target.checked).subscribe(
                data => '',
                error => alert(error),
                () => this.BuscarSolicitudesServicio()
            );

        } catch (error) {

            var DescripcionError = 'AsignarServicio.component.ts--->HaceCalidadHaceAnalista--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }
    }


}