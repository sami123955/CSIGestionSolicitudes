import { Component, OnInit } from '@angular/core';
import { ComboServicio } from '../models/ComboServicio';
import { DatosServidor } from '../models/DatosServidor';
import { SucursalService } from '../services/Sucursal.service';
import { TipoServicioService } from '../services/TipoServicio.service';
import { SubclienteService } from '../services/Subcliente.service';



declare var $:any;
declare var alertify:any;
declare var success:any;
declare var error:any;

@Component({
    selector: 'ComboServicio',
    templateUrl: '../views/ComboServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SucursalService, TipoServicioService, SubclienteService]
})
export class ComboServicioComponent implements OnInit{


    constructor (
                    private _SucursalService:SucursalService, 
                    private _TipoServicioService:TipoServicioService,
                    private _SubClienteService:SubclienteService
                ) {}

    //Instanciamos la clase de ComboServicio
    model = new ComboServicio('','','',[],'',[]);
    //Instanciamos la calse DatosServidor para que esta nos pueda proveer la url del servicios
    DatosServidorModel = new DatosServidor();


    //Variable que almacenara las opciones para el select de municipio
    OpcionesMunicipio = [{id: '1', name:'Prueba'}];
    //Variable que almacenar las opciones para el select de servicios
    OpcionesServicios = [];
    //Variable que almacenara la informacion de las sucursales
    DatosSucursal = '';
    //Variable que almacenara la informacion de los SubclienteService
    DatosSubCliente = '';


    //Variable que almacenara la configuracion para los select multipleas
    ConfiguracionSelect = {
        pullRight: true,
        pullLeft:true,
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
        this.BuscarSucursales();
        this.BuscarServicios();
        this.BuscarSubClientes();
    }


    BuscarSucursales() {
        this._SucursalService.BuscarSucursal(this.DatosServidorModel.url).subscribe(
            data => this.DatosSucursal = data,
            error => alertify.error('No se ha podido realizar la peticion')
        );
    }

    BuscarServicios(){
        this._TipoServicioService.BuscarTipoServicio(this.DatosServidorModel.url).subscribe(
            data => this.OpcionesServicios = this.ConstruirOpciones(data),
            error => alertify.error('No se ha podido realizar la peticio')
        );
    }

    BuscarSubClientes(){
        this._SubClienteService.BuscarSubcliente(this.DatosServidorModel.url).subscribe(
            data => this.DatosSubCliente = data,
            error => alertify.error('No se ha podido realizar la peticion')
        );
    }

    //Metodo que usaremos para crear las opciones tal y como el select multiple las espera
    ConstruirOpciones(Dato){

        var Opciones = [];

        for(let item of Dato.Data){

            Opciones.push({id: item.Codigo, name: item.Nombre});

        }

        return Opciones;

    }



}
