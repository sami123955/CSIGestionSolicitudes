import { Component, OnInit } from '@angular/core';
import { TipoServicio } from '../models/TipoServicio';
import { TipoServicioService } from '../services/TipoServicio.service';
import { DatosServidor } from '../models/DatosServidor';
import { EmpresaService } from '../services/empresa.service';
import { SucursalService } from '../services/Sucursal.service';
import { MunicipioService } from '../services/Municipio.service';
import { Costos } from '../models/Costos';

declare var $: any;
declare var alertify: any;
declare var success: any;
declare var error: any;

@Component({
    selector: 'TipoServico',
    templateUrl: '../views/TipoServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [TipoServicioService, EmpresaService, SucursalService, MunicipioService]
})
export class TipoServicioComponent implements OnInit {

    constructor(
        private _TipoServicioService: TipoServicioService,
        private _EmpresaService: EmpresaService,
        private _SucursalService: SucursalService,
        private _MunicipioService: MunicipioService

    ) { }

    //Instanciamos clase
    model = new TipoServicio('', '', []);

    //Instanicamos el objeto que se encarga de almacenar los datos de los Costos
    ObjetosCostos = new Costos('', '', [], '');


    //Variable que se encargara de controlar cuando mostrar el preloader
    Cargando = false;


    //Instanciamos la clase que se encargara de traernos la url del servidor donde se alojan los servicios
    DatosServidorModel = new DatosServidor();

    //Variable que almacenara los datos para la tabla
    DatosTipoServicio = '';

    //Variable que usaremos para validar si ya se le aplica data table o No
    DataTable = false;

    //Variable que almacenara los datos de la empresa
    DatosEmpresa = '';

    //Variable que almacenara los datos de las Sucursales
    DatosSucursal = '';

    OpcionesMunicipios = [];


    //Variable que almacenara los Costos
    ArrCostos = [];

    //Variable que almacenara los nombres de los municipios que tengan asignados los Costos
    NombresMunicipios = '';


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

    GuardarTipoServicio() {

        try {

            if (this.ArrCostos.length == 0) {
                alertify.error('Primero debe agregar los costos del servicio');
            }
            else {

                this.Cargando = true;

                this._TipoServicioService.GuardarTipoServicio(this.model, this.ArrCostos, this.DatosServidorModel.url)
                    .subscribe(
                    data => alertify.success('Registrado Correctamente'),
                    error => alert(error),
                    () => location.reload()//this.BuscarTipoServicio()
                    );
            }



        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->GuardarTipoServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }


    BuscarTipoServicio() {
        try {
            this._TipoServicioService.BuscarTipoServicio(this.DatosServidorModel.url).subscribe(
                data => this.DatosTipoServicio = data,
                error => alertify.error('No funciona'),
                () => this.LimpiarCampos()
            );
        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->BuscarTipoServicio--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }
    }


    ngOnInit() {
        this.Cargando = true;
        this.BuscarTipoServicio();
        this.BuscarEmpresas();
    }

    LimpiarCampos() {
        this.AplicarDataTable();

        this.Cargando = false;
    }


    CargarCampos(Nombre, Descripcion, Codigo, Estado, lstTipoServicioCosto) {
        this.model = new TipoServicio(Nombre, Descripcion, [], Codigo, Estado);

        this.ArrCostos = lstTipoServicioCosto;
    }

    ActualizarTipoEmpresa() {


        try {

            if (this.ArrCostos.length == 0) {
                alertify.error('Primero debe ingresar los costos.');
            }
            else {
                this.Cargando = true;

                this._TipoServicioService.ActualizarTipoServicio(this.model, this.ArrCostos, this.DatosServidorModel.url)
                    .subscribe(
                    data => alertify.success('Actualizado Correctamente'),
                    error => alert(error),
                    () => location.reload()//this.BuscarTipoServicio()
                    );
            }

        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->ActualizarTipoEmpresa--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }


    }


    AplicarDataTable() {

        try {


            setTimeout(function () {
                $('#TipoServicioTabla').dataTable({

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

        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->AplicarDataTable--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }


    }

    BuscarEmpresas() {

        try {
            this._EmpresaService.searchCompany(this.DatosServidorModel.url).subscribe(
                data => this.DatosEmpresa = data,
                error => alert(error)
            );
        } catch (error) {
            var DescripcionError = 'TipoServicio.component.ts--->BuscarEmpresas--->' + '  Error:  ' + error;
            console.log(DescripcionError);
        }

    }

    BuscarSucursal(event) {

        try {


            var CodigoEmpresa = event.target.value.split('|');

            this._SucursalService.BuscarSucursalEmpresa(this.DatosServidorModel.url, CodigoEmpresa[0]).subscribe(
                data => this.DatosSucursal = data,
                error => alert(error)
            );

        } catch (error) {
            var DescripcionError = 'TipoServicio.component.ts--->BuscarSucursal--->' + '  Error:  ' + error;
            console.log(DescripcionError);
        }

    }

    BuscarMunicipios(CodigoSucursal) {
        try {


            //Consultamos los municipios disponibles
            this._MunicipioService.BuscarMunicipioSucursal(this.ObjetosCostos.CodigoSucursal.split('|')[0], this.DatosServidorModel.url).subscribe(
                data => this.OpcionesMunicipios = this.ConstruirOpciones(data),
                error => alert(error),
                () => this.ValidarOpcionesRepetidas(CodigoSucursal)
            );

            

        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->BuscarMunicipios--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }
    }

    ValidarOpcionesRepetidas(CodigoSucursal){

        //En caso tal de que haya costos previamente asignados vamos a eliminar manualmente los municipios ya asignados a una sucursal
            if (this.ArrCostos.length != 0) {

                 var Salida = [];

                //Iteramos dicho array para verificar la sucursal
                for (let i of this.ArrCostos) {

                    //Verificamos si el codigo sucursal que se ha elegido sea el mismo de la iteracion
                    if (i.CodigoSucursal.split('|')[0] == CodigoSucursal/*.target.value*/.split('|')[0]) {
                        
                        

                        var ContadorMunicipios = 0;

                        //Iteramos las opciones con las que actualmente cuenta el select de municipios
                        for(let j of this.OpcionesMunicipios){

                            //Iteramos municipios de la sucursal
                            for(let k of i.CodigosMunicipios){
                                if(j.id.split('|')[0] == k){

                                    var DatosActuales = this.OpcionesMunicipios;

                                    delete DatosActuales[ContadorMunicipios];

                                    this.OpcionesMunicipios = [];

                                    for(let l of DatosActuales){
                                        if((l != undefined) && (l != '') && (l != null)){

                                            this.OpcionesMunicipios.push(l);
                                        }
                                    }
                                    
                                }
                            }

                            ContadorMunicipios = ContadorMunicipios + 1;

                        }
                    }
                }
            }

    }

    //Metodo que usaremos para crear las opciones tal y como el select multiple las espera
    ConstruirOpciones(Dato) {

        var Opciones = [];

        for (let item of Dato.Data) {

            Opciones.push({ id: item.Codigo + '|' + item.Nombre, name: item.Nombre });

        }

        return Opciones;

    }

    ObtenerValoresOpciones(Datos, Posicion) {

        var Salida = [];

        for (let item of Datos) {
            Salida.push(item.split('|')[Posicion]);
        }

        return Salida;
    }

    AgregarCosto() {

        try {

            var JsonCosto = {};

            //CodigoEmpresa
            JsonCosto['CodigoEmpresa'] = this.ObjetosCostos.CodigoEmpresa.split('|')[0];
            //CodigoSucursal
            JsonCosto['CodigoSucursal'] = this.ObjetosCostos.CodigoSucursal.split('|')[0];
            //CodigoEmpresa
            JsonCosto['NombreSucursal'] = this.ObjetosCostos.CodigoSucursal.split('|')[1];
            //Municipios
            JsonCosto['CodigosMunicipios'] = this.ObtenerValoresOpciones(this.ObjetosCostos.Municipios, 0);
            //Nombres Municipios
            JsonCosto['NombresMunicipios'] = this.ObtenerValoresOpciones(this.ObjetosCostos.Municipios, 1);
            //Costo
            JsonCosto['Costo'] = this.ObjetosCostos.Costo;

            //Agregamos nueva posicion
            this.ArrCostos.push(JsonCosto);

            console.log(JSON.stringify(this.ArrCostos));

            this.ObjetosCostos = new Costos('', '', [], '');

        } catch (error) {

            var DescripcionError = 'TipoServicio.component.ts--->BuscarMunicipios--->' + '  Error:  ' + error;
            console.log(DescripcionError);

        }

    }


    EliminarCosto(Posicion, CodigoSucursal) {
        
        this.ArrCostos.splice(Posicion,1);
        this.BuscarMunicipios(this.ObjetosCostos.CodigoSucursal);

    }


}