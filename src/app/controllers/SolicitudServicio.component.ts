import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ComboServicioService } from '../services/ComboServicio.service';
import { DatosServidor } from '../models/DatosServidor';
import { MunicipioService } from '../services/Municipio.service';
import { SucursalService } from '../services/Sucursal.service';
import { SolicitudServicio } from '../models/SolicitudServicio';
import { SolicitudServicioService } from '../services/SolicitudServicio.service';


declare var alertify: any;
declare var success: any;
declare var error: any;
declare var $: any;

@Component({
    selector: 'SolicitudServicio',
    templateUrl: '../views/SolicitudServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [ComboServicioService, MunicipioService, SucursalService, SolicitudServicioService]
})

export class SolicitudServicioComponent implements OnInit {


    constructor(

        private _ComboServicioService: ComboServicioService,
        private _MunicipioService: MunicipioService,
        private _SucursalService: SucursalService,
        private _SolicitudServicioService: SolicitudServicioService
    ) { }


    SolicitudServicioObjeto = new SolicitudServicio('', '', '', '', '', '', '', '', '', []);

    //Variable que usaremos para almacenar los datos de combo de servicio
    DatosComboServicio = '';


    //Modelo de datos servidor para obte3ner url del servicio
    DatosServidorModel = new DatosServidor();

    //Obciones ComboServicio
    ObcionesComboServicio = [];


    //Variable que almacenara los datos de municipio
    DatosMunicipio = '';

    //Variable que almacenara los datos de Sucursal
    DatosSucursal = '';

    //Variable de salida que alamcenara todos los datos
    FormDataSalida: any;

    //Variable que usaremos para llenar la tabla
    DatosSolicitudServicio = '';

    //Variable usado para controlar preloader
    Cargando = false;

    //Variable que almacenara la configuracion para los select multipleas
    ConfiguracionSelect = {
        pullRight: true,
        pullLeft: true,
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default col-md-12',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: true,
        showUncheckAll: false,
        dynamicTitleMaxItems: 0,
    };



    ngOnInit() {


        this.BuscarMunicipios();
        this.BuscarSucursales();
        this.FormDataSalida = new FormData;
        this.BuscarSolicitudesServicio();

    }

    //Metodo que usaremos para crear las opciones tal y como el select multiple las espera
    ConstruirOpciones(Dato) {

        var Opciones = [];

        for (let item of Dato.Data) {

            Opciones.push({ id: item.Codigo, name: item.Nombre });

        }

        return Opciones;

    }


    BuscarComboServicio() {

        try {

            this._ComboServicioService.BuscarComboServicioMunicipio(this.DatosServidorModel.url, this.SolicitudServicioObjeto.CodigoMunicipio).subscribe(
                data => this.ObcionesComboServicio = this.ConstruirOpciones(data),
                error => alert(error)
            );

        } catch (error) {

            var DescripcionError = 'SolicitudServicio.component.ts--->BuscarComboServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }

    BuscarMunicipios() {

        try {
            //
            this._MunicipioService.BuscarMunicipio(this.DatosServidorModel.url).subscribe(
                data => this.DatosMunicipio = data,
                error => alert(error)
            );

        } catch (error) {
            var DescripcionError = 'SolicitudServicio.component.ts--->BuscarMunicipios--->' + '  Error:  ' + error;
            console.log(DescripcionError);
        }

    }

    BuscarSucursales() {

        try {

            this._SucursalService.BuscarSucursal(this.DatosServidorModel.url).subscribe(
                data => this.DatosSucursal = data,
                error => alert(error)
            );

        } catch (error) {

            var DescripcionError = 'SolicitudServicio.component.ts--->BuscarSucursales--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }


    CargarArchivo(event, typeFile) {


        try {

            let fileList: FileList = event.target.files;

            if (fileList.length > 0) {
                let file: File = fileList[0];

                switch (typeFile) {
                    case 'HojaVidaFile':

                        this.FormDataSalida.has('HojaVidaFile') ? this.FormDataSalida.delete('HojaVidaFile') : '';

                        this.FormDataSalida.append('HojaVidaFile', file, file.name);
                        break;
                    case 'AutorizacionEDCFile':
                        this.FormDataSalida.has('AutorizacionEDCFile') ? this.FormDataSalida.delete('AutorizacionEDCFile') : '';

                        this.FormDataSalida.append('AutorizacionEDCFile', file, file.name);
                        break;
                    case 'AutorizacionReferenciacionFile':
                        this.FormDataSalida.has('AutorizacionReferenciacionFile') ? this.FormDataSalida.delete('AutorizacionReferenciacionFile') : '';

                        this.FormDataSalida.append('AutorizacionReferenciacionFile', file, file.name);
                        break;
                    case 'AutorizacionCifinFile':
                        this.FormDataSalida.has('AutorizacionCifinFile') ? this.FormDataSalida.delete('AutorizacionCifinFile') : '';

                        this.FormDataSalida.append('AutorizacionCifinFile', file, file.name);
                        break;

                }

            }


        } catch (error) {

            var DescripcionError = 'SolicitudServicio.component.ts--->CargarArchivo--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }
    }

    GuardarSolicitudServicio() {


        try {

            if ((!this.FormDataSalida.has('HojaVidaFile')) || (!this.FormDataSalida.has('AutorizacionEDCFile')) || (!this.FormDataSalida.has('AutorizacionReferenciacionFile') || (!this.FormDataSalida.has('AutorizacionCifinFile')))) {

                alertify.error('Debe cargar todos los archivos');

            }
            else {
                this._SolicitudServicioService.CargandoPeticion = true;
                this._SolicitudServicioService.GuardarSolicitudServicio(this.SolicitudServicioObjeto, this.FormDataSalida, this.DatosServidorModel.url);
            }

        } catch (error) {

            var DescripcionError = 'SolicitudServicio.component.ts--->GuardarSolicitudServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);
        }

    }


    //Buscar solicitud servicio
    BuscarSolicitudesServicio() {

        try {

            this.Cargando = true;

            this._SolicitudServicioService.BuscarSolitudServicio(this.DatosServidorModel.url).subscribe(
                data => this.DatosSolicitudServicio = /*alert(JSON.stringify(*/data/*))*/,
                error => alert(error),
                () => this.AplicarDataTable()
            );

        } catch (error) {

            var DescripcionError = 'SolicitudServicio.component.ts--->BuscarSolicitudesServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }


    }

    CambiarFormatoFecha(FechaActual) {


        var FechaNueva = new Date(FechaActual).toLocaleDateString();

        return FechaNueva;
    }

    CargarDatos(codigo, Nombre, Cedula, Direccion, Telefono, Celular, Cargo, CodigoSucursal) {

        this.SolicitudServicioObjeto = new SolicitudServicio(Nombre, Cedula, Direccion, Telefono, Celular, Cargo, '', '', CodigoSucursal, [], codigo);

        this.FormDataSalida = new FormData;
    }

    ActualizarSolicitudServicio() {

        try {

            this.Cargando = true;

            this._SolicitudServicioService.ActualizarSolicitudServicio(this.DatosServidorModel.url, this.SolicitudServicioObjeto, this.FormDataSalida).subscribe(
                data => alertify.success('Actualizado correctamente'),
                error => alertify.error('Ocurrio un error al momento de actualziar'),
                () => location.reload()
            );

        } catch (error) {

            var DescripcionError = 'SolicitudServicio.component.ts--->ActualizarSolicitudServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }

    AplicarDataTable() {

        try {
            $(document).ready(function () {
                setTimeout(function () {
                    var Tabla = $('#SolicitudesServicioTabla').DataTable({
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

                    $('#SolicitudesServicioTabla tfoot th').each(function () {
                        var title = $(this).text();
                        $(this).html('<input type="text" class="form-control" placeholder="Buscar ' + title + '" />');
                    });


                    Tabla.columns().every(function () {
                        var that = this;

                        $('input', this.footer()).on('keyup change', function () {
                            if (that.search() !== this.value) {
                                that
                                    .search(this.value)
                                    .draw();
                            }
                        });
                    });

                }, 20);
            });

            this.Cargando = false

        } catch (error) {

            var DescripcionError = 'SolicitudServicio.component.ts--->AplicarDataTable--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }


    AnularSolicitud(Codigo){

        try {

            this._SolicitudServicioService.AnularSolicitud(this.DatosServidorModel.url, Codigo).subscribe(
                data => alertify.success('Anulado correctamente'),
                error => alertify.error('No se pudo anular'),
                () => location.reload()
            );

            
        } catch (error) {
            var DescripcionError = 'SolicitudServicio.component.ts--->AnularSolicitud--->' + '  Error:  ' + error;
            console.log(DescripcionError);
        }

    }


}