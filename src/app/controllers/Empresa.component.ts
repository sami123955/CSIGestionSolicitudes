import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Empresa } from '../models/Empresa';
import { EmpresaService } from '../services/empresa.service';
import { DatosServidor } from '../models/DatosServidor';
import { LogsService } from '../services/Logs.service';
import { ModalDirective } from 'ng2-bootstrap/modal';

//Importar libreria externas
declare var $: any;
declare var alertify: any;
declare var success: any;
declare var error: any;
declare var DataTable: any;


@Component({
    selector: 'Empresa',
    templateUrl: '../views/Empresa.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [EmpresaService, LogsService],

})

export class EmpresaComponent implements OnInit {

    constructor(private _empresaService: EmpresaService) { }

    @ViewChild('EmpresaModal') public EmpresaModal: ModalDirective;
    @ViewChild('ModalActualizar') public ModalActualizar: ModalDirective;

    model = new Empresa('', '', '', '', '', '', '', '', '', '');


    //Variable que almacenara todos los datos de la consulta de empresa.
    DatosConsulta = '';

    //Variable que usaremos para controlar los preloaders
    loading = false;

    //Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del seridor donde consumiremos los servicios
    DatosServidorModel = new DatosServidor();

    //Variable que usaremos para validar si ya se le aplica data table o No
    DataTable = false;



    GuardarEmpresa(RutaRut, RutaCamaraComercio, Contrato) {

        try {

            if ((!this.model.Archivos.has('Rut')) || (!this.model.Archivos.has('camaraComercio')) || (!this.model.Archivos.has('Contrato'))) {
                alertify.error('Debe cargar todos los archivos');
            }
            else {
                this.loading = true;
                this._empresaService.GuardarEmpresa(this.model, this.DatosServidorModel.url)
                    .subscribe(
                    data => alertify.success('Registrado Correctamente'),
                    error => alert(error),
                    () => this.TerminarPeticion('Actualizar')
                    );

            }

        } catch (error) {

            var DescripcionError = 'Empresa.component.ts--->GuardarEmpresa--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }
    }

    BuscarEmpresa() {

        try {

            this._empresaService.searchCompany(this.DatosServidorModel.url).subscribe(
                data => this.DatosConsulta = data,
                error => alertify.error('No funciona'),
                () => this.AplicarDataTable()
            );

        } catch (error) {


            var DescripcionError = 'Empresa.component.ts--->BuscarEmpresa--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }


    CargarArchivo(event, typeFile) {


        try {


            let fileList: FileList = event.target.files;

            if (fileList.length > 0) {
                let file: File = fileList[0];

                switch (typeFile) {
                    case 'Rut':
                        this.model.Archivos.has('Rut') ? this.model.Archivos.delete('Rut') : '';

                        this.model.Archivos.append('Rut', file, file.name);
                        break;
                    case 'camaraComercio':
                        this.model.Archivos.has('camaraComercio') ? this.model.Archivos.delete('camaraComercio') : '';

                        this.model.Archivos.append('camaraComercio', file, file.name);
                        break;
                    case 'Contrato':
                        this.model.Archivos.has('Contrato') ? this.model.Archivos.delete('Contrato') : '';

                        this.model.Archivos.append('Contrato', file, file.name);
                        break;
                }

            }


        } catch (error) {

            var DescripcionError = 'Empresa.component.ts--->CargarArchivo--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }
    }

    ngOnInit() {
        //Preparamos el modelo para los archivos
        this.model.Archivos = new FormData();
        this.loading = true;
        this.BuscarEmpresa();
    }

    CargarDatosForm(Nit, RazonSocial, Direccion, DireccionRecepcion, Representante, Contacto, EmailContacto, Telefono, EmailEmpresa, Observaciones, Codigo, Estado, RutaRut, RutaCamaraComercio, Contrato) {

        this.model = new Empresa(Nit, RazonSocial, Direccion, DireccionRecepcion, Representante, Contacto, EmailContacto, Telefono, EmailEmpresa, '', Observaciones, Codigo, Estado, RutaRut, RutaCamaraComercio, Contrato);

        //Seteamos nuevamente el objeto formdata
        this.model.Archivos = new FormData();
    }

    ActualizarEmpresa() {

        try {

            this.loading = true;
            this._empresaService.ActualizarEmpresa(this.model, this.DatosServidorModel.url)
                .subscribe(
                data => alertify.success('Actualizado Correctamente'),
                error => alert(error),
                () => this.TerminarPeticion('Actualizar')
                );

        } catch (error) {

            var DescripcionError = 'Empresa.component.ts--->CargarArchivo--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }
    }

    AplicarDataTable() {

        try {

            this.loading = false;

            if (this.DataTable == false) {
                setTimeout(function () {
                    $('#EmpresaTabla').dataTable({
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

                    $('#EmpresaTabla').dataTable().fnDestroy();
                    setTimeout(function () {
                        $('#EmpresaTabla').DataTable({
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

            var DescripcionError = 'Empresa.component.ts--->AplicarDataTable--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }


    }

    LimpiarDatos() {

        this.model = new Empresa('', '', '', '', '', '', '', '', '', '', '');
        //Seteamos nuevamente el objeto formdata
        this.model.Archivos = new FormData();

    }

    TerminarPeticion(NombreModal) {

        this.BuscarEmpresa();
        this.OcultarModal(NombreModal);

    }

    /*METODO PARA CERRAR modal*/
    OcultarModal(NombreModal) {
        switch (NombreModal) {
            case 'Registrar':
                this.EmpresaModal.hide();
                break;

            case 'Actualizar':
                this.ModalActualizar.hide();
                break;
        }

    }


}





