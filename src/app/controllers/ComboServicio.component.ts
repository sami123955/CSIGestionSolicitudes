import { Component, OnInit } from '@angular/core';
import { ComboServicio } from '../models/ComboServicio';
import { DatosServidor } from '../models/DatosServidor';
import { SucursalService } from '../services/Sucursal.service';
import { TipoServicioService } from '../services/TipoServicio.service';
import { SubclienteService } from '../services/Subcliente.service';
import { MunicipioService } from '../services/Municipio.service';
import { ComboServicioService } from '../services/ComboServicio.service';

//Importar libreria externas
declare var jQuery: any;
declare var $:any;
declare var alertify:any;
declare var success:any;
declare var error:any;
declare var DataTable: any;

@Component({
    selector: 'ComboServicio',
    templateUrl: '../views/ComboServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [SucursalService, TipoServicioService, SubclienteService, MunicipioService, ComboServicioService]
})
export class ComboServicioComponent implements OnInit{


    constructor (
                    private _SucursalService:SucursalService, 
                    private _TipoServicioService:TipoServicioService,
                    private _SubClienteService:SubclienteService,
                    private _MunicipioService:MunicipioService,
                    private _ComboServicioService:ComboServicioService
                ) {}

    //Instanciamos la clase de ComboServicio
    model = new ComboServicio('','','',[],'',[]);
    //Instanciamos la calse DatosServidor para que esta nos pueda proveer la url del servicios
    DatosServidorModel = new DatosServidor();

    //Variable que se encargara de controlar cuando mostrar el preloader
    Cargando = false;

    //Variable que almacenara las opciones para el select de municipio
    OpcionesMunicipio = [];
    //Variable que almacenar las opciones para el select de servicios
    OpcionesServicios = [];
    //Variable que almacenara la informacion de las sucursales
    DatosSucursal = '';
    //Variable que almacenara la informacion de los SubclienteService
    DatosSubCliente = '';

    //Variable que almacenara la informacion para el select de ComboServicio
    DatosComboServicio='';

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

    //Variable que usaremos para validar si ya se le aplica data table o No
    DataTable = false;

    //Variable que almacenara los datos a mostrar en el modal luego de dar click en el boton ver
    DatosServicio = '';

    ngOnInit() {
      //  this.Cargando = true;
        this.BuscarSucursales();
        this.BuscarServicios();
        this.BuscarSubClientes();
        this.BuscarMunicipios();
        this.BuscarComboServicio();
    }


    BuscarSucursales() {
        try {

           this._SucursalService.BuscarSucursal(this.DatosServidorModel.url).subscribe(
            data => this.DatosSucursal = data,
            error => alertify.error('No se ha podido realizar la peticion')
        ); 

        } catch (error) {
            var DescripcionError = 'ComboServicio.component.ts--->BuscarDepartamento--->'+'  Error:  ' + error;
            console.log(DescripcionError);
        }
        
    }

    BuscarServicios(){
        try {
           this._TipoServicioService.BuscarTipoServicio(this.DatosServidorModel.url).subscribe(
            data => this.OpcionesServicios = this.ConstruirOpciones(data),
            error => alertify.error('No se ha podido realizar la peticion')
        ); 
        } catch (error) {
            var DescripcionError = 'ComboServicio.component.ts--->BuscarDepartamento--->'+'  Error:  ' + error;
            console.log(DescripcionError);
        }
        
    }

    BuscarSubClientes(){
        try {
           this._SubClienteService.BuscarSubcliente(this.DatosServidorModel.url).subscribe(
            data => this.DatosSubCliente = data,
            error => alertify.error('No se ha podido realizar la peticion')
        ); 
        } catch (error) {

            var DescripcionError = 'ComboServicio.component.ts--->BuscarDepartamento--->'+'  Error:  ' + error;
            console.log(DescripcionError);
        }
        
    }

    BuscarComboServicio(){
        try {
          this.Cargando=true;
        this._ComboServicioService.BuscarComboServicio(this.DatosServidorModel.url).subscribe(
           data => this.DatosComboServicio=data,
           //data => /*this.DatosComboServicio=*/console.log(JSON.stringify(data)),
            
             error => alert(error),
            () => this.Cargando = false
            
        );  
        } catch (error) {

            var DescripcionError = 'ComboServicio.component.ts--->BuscarDepartamento--->'+'  Error:  ' + error;
            console.log(DescripcionError);
        }
        
    }

    BuscarMunicipios(){
        try {

            this._MunicipioService.BuscarMunicipio(this.DatosServidorModel.url).subscribe(
                data => this.OpcionesMunicipio = this.ConstruirOpciones(data),
                error => alertify.error(error)
            );
            
        } catch (error) {

            var DescripcionError = 'ComboServicio.component.ts--->BuscarDepartamento--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }
    }

    CargarDatosForm(CodigoSucursal,Nombre,CodigoSubcliente,Municipio,Costo,CodigoServicio,Codigo,Estado){
            this.model=new ComboServicio(CodigoSucursal,Nombre,CodigoSubcliente,Municipio,Costo,CodigoServicio,Codigo,Estado);
    }
    

    //Metodo que usaremos para crear las opciones tal y como el select multiple las espera
    ConstruirOpciones(Dato){

        var Opciones = [];

        for(let item of Dato.Data){

            Opciones.push({id: item.Codigo, name: item.Nombre});

        }

        return Opciones;

    }

    GuardarComboServicio() {

        try {
            this.Cargando=true;
            this._ComboServicioService.GuardarComboServicio(this.model, this.DatosServidorModel.url).subscribe(
            //data => alertify.success('Registrado correctamente'),
            data => alert(JSON.stringify(data)),
            error => alert(error),
            () => location.reload()
        );
            
        } catch (error) {

            var DescripcionError = 'ComboServicio.component.ts--->GuardarComboServicio--->'+'  Error:  ' + error;
            console.log(DescripcionError);
          
        }


        


    }

    AplicarDataTable(){
        try {
            
             if(this.DataTable==false){
        
                 $('#ComboServicioTabla').dataTable({
                     "bDestroy": true,
                            "language": {
                            "sProcessing":     "Procesando...",
                            "sLengthMenu":     "Mostrar _MENU_ registros",
                            "sZeroRecords":    "No se encontraron resultados",
                            "sEmptyTable":     "Ningún dato disponible en esta tabla",
                            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                            "sInfoPostFix":    "",
                            "sSearch":         "Buscar:",
                            "sUrl":            "",
                            "sInfoThousands":  ",",
                            "sLoadingRecords": "Cargando...",
                            "oPaginate": {
                                "sFirst":    "Primero",
                                "sLast":     "Último",
                                "sNext":     "Siguiente",
                                "sPrevious": "Anterior"
                            },
                            "oAria": {
                                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                            }
                        }
                 });
                 this.DataTable=true;
             }
        } catch (error) {
            
            var DescripcionError = 'ComboServicio.component.ts--->AplicarDataTable--->'+'  Error:  ' + error;
            console.log(DescripcionError);
        }
    }

    CargarTipoServicio(DetalleServicio){
        this.DatosServicio = DetalleServicio;
        

    }



}
