import { Component } from '@angular/core';
import { SolicitudesAsignadas } from '../models/SolicitudesAsignadas';
import { DatosServidor } from '../models/DatosServidor';
import { SolicitudAsignadasService } from '../services/SolicitudesAsignadas.service';

declare var $: any;


@Component({
    selector: 'SolicitudesAsignadas',
    templateUrl: '../views/SolicitudesAsignadas.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SolicitudAsignadasService]
})

export class SolicitudesAsignadasComponent {

    constructor(private _SolicitudAsignadasService: SolicitudAsignadasService) { }

    ObjetoSolicitudesAsignadas = new SolicitudesAsignadas('', '', '', '14', '');

    //Datos servidor
    DatosServidorModel = new DatosServidor();

    //Variable que almacenara las solicitudes de servicio
    DatosSolicitudesServicio = '';

    //Variable que almacenara los subservicios por solicitud
    DatosDetellaSolicitud = [];

    //Variable que usaremos para saber si ya se aplicó datatable o No
    DataTable = false;

    Cargando = false;

    BuscarServicios() {

        try {

            this.Cargando = true;

            this._SolicitudAsignadasService.BuscarSolitudServicio(this.DatosServidorModel.url, this.ObjetoSolicitudesAsignadas).subscribe(
                data => this.DatosSolicitudesServicio = data,
                error => alert(error),
                () => this.AplicarDataTable()
            );

        } catch (error) {

            var DescripcionError = 'SolicitudesAsignadas.component.ts--->BuscarServicios--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }

    CambiarFormatoFecha(Fecha) {

        var FechaNueva = new Date(Fecha).toLocaleDateString();

        return FechaNueva;

    }

    SetearDetalleSolicitud(ListaDetalle) {
        alert(JSON.stringify(ListaDetalle));
        this.DatosDetellaSolicitud = ListaDetalle;
    }

    AplicarDataTable() {


        try {
            
            this.Cargando = false;

            if (this.DatosSolicitudesServicio.length != 0) {

                if (this.DataTable == false) {
                    setTimeout(function () {
                        $('#TablaSolicitudes').dataTable({
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

                        $('#TablaSolicitudes').dataTable().fnDestroy();
                        setTimeout(function () {
                            $('#TablaSolicitudes').DataTable({
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


            }


        } catch (error) {
            var DescripcionError = 'SolicitudesAsignadas.component.ts--->AplicarDataTable--->' + '  Error:  ' + error;
            console.log(DescripcionError);
        }

    }

    RechazarServicio(Razon){

        //Iteramos el detalle de servicio para rechazar uno a uno
        for(let i of this.DatosDetellaSolicitud){

            this._SolicitudAsignadasService.RechazarServicio(this.DatosServidorModel.url, Razon, i.Codigo).subscribe(
                data => '',
                error => '',
                () => ''
            );

        }

    }


}