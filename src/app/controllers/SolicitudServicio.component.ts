import { Component, OnInit } from '@angular/core';
import { ComboServicioService } from '../services/ComboServicio.service';
import { DatosServidor } from '../models/DatosServidor';
import { MunicipioService } from '../services/Municipio.service';
import { SucursalService } from '../services/Sucursal.service';
import { SolicitudServicio } from '../models/SolicitudServicio';
import { SolicitudServicioService } from '../services/SolicitudServicio.service';

declare var alertify:any;
declare var success:any;
declare var error:any;

@Component({
    selector: 'SolicitudServicio',
    templateUrl: '../views/SolicitudServicio.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [ComboServicioService, MunicipioService, SucursalService, SolicitudServicioService]
})

export class SolicitudServicioComponent implements OnInit{


    constructor(
               
                    private _ComboServicioService:ComboServicioService,
                    private _MunicipioService:MunicipioService,
                    private _SucursalService:SucursalService,
                    private _SolicitudServicioService:SolicitudServicioService
               ){}


    SolicitudServicioObjeto = new SolicitudServicio('','','','','','','','','',[]);

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
    FormDataSalida:any;

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


    ngOnInit(){
        
        
        this.BuscarMunicipios();
        this.BuscarSucursales();
        this.FormDataSalida = new FormData;
    }


    //Metodo que usaremos para crear las opciones tal y como el select multiple las espera
    ConstruirOpciones(Dato){

        var Opciones = [];

        for(let item of Dato.Data){

            Opciones.push({id: item.Codigo, name: item.Nombre});

        }

        return Opciones;

    }


    BuscarComboServicio(){

        try {
            
            this._ComboServicioService.BuscarComboServicioMunicipio(this.DatosServidorModel.url, this.SolicitudServicioObjeto.CodigoMunicipio).subscribe(
                data => this.ObcionesComboServicio = this.ConstruirOpciones(data),
                error => alert(error)
            );
            
        } catch (error) {
            
            var DescripcionError = 'SolicitudServicio.component.ts--->BuscarComboServicio--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }

    }

    BuscarMunicipios(){

        try {
            //
            this._MunicipioService.BuscarMunicipio(this.DatosServidorModel.url).subscribe(
                data => this.DatosMunicipio = data,
                error => alert(error)
            );
            
        } catch (error) {
            var DescripcionError = 'SolicitudServicio.component.ts--->BuscarMunicipios--->'+'  Error:  ' + error;
            console.log(DescripcionError);
        }

    }

    BuscarSucursales(){

        try {

            this._SucursalService.BuscarSucursal(this.DatosServidorModel.url).subscribe(
                data => this.DatosSucursal = data,
                error => alert(error)
            );
            
        } catch (error) {

            var DescripcionError = 'SolicitudServicio.component.ts--->BuscarSucursales--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

    }


     CargarArchivo(event, typeFile){


        try {

            let fileList: FileList = event.target.files;

            if(fileList.length > 0) {
                let file: File = fileList[0];   

                switch(typeFile){
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

            var DescripcionError = 'SolicitudServicio.component.ts--->CargarArchivo--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }
    }

    GuardarSolicitudServicio(){


        try {

            if((!this.FormDataSalida.has('HojaVidaFile')) || (!this.FormDataSalida.has('AutorizacionEDCFile')) || (!this.FormDataSalida.has('AutorizacionReferenciacionFile') || (!this.FormDataSalida.has('AutorizacionCifinFile')))){
                
                alertify.error('Debe cargar todos los archivos');

            }
            else{
                    this._SolicitudServicioService.CargandoPeticion = true;
                    this._SolicitudServicioService.GuardarSolicitudServicio(this.SolicitudServicioObjeto, this.FormDataSalida, this.DatosServidorModel.url);    
            }
            
        } catch (error) {
            
            var DescripcionError = 'SolicitudServicio.component.ts--->GuardarSolicitudServicio--->'+'  Error:  ' + error;
            console.log(DescripcionError);
        }

    }

    

}