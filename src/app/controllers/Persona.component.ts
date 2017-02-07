import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/Persona';
import { DatosServidor } from '../models/DatosServidor';
import { MunicipioService } from '../services/Municipio.service';
import { PersonaService } from '../services/Persona.service';


declare var $:any;
declare var alertify:any;
declare var success:any;
declare var error:any;

@Component({

    selector: 'Persona',
    templateUrl: '../views/Persona.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [PersonaService, MunicipioService]
})

export class PersonaComponent implements OnInit{


    constructor (
        private _PersonaService:PersonaService,
        private _MunicipioService:MunicipioService
    ) {}




    model = new Persona('','','','','','','','','','','','','','','','','');

    //Instanciamos el modelo de DatosServidor para obtener la url del servicio que vamos a consumuir
    DatosServidorModel = new DatosServidor();

    //Variable que almacenara los datos de los bancos
    DatosBanco = '';

    //Variable que almacenara los datos de los tipo de cuenta
    DatosTipoCuenta = '';

    //Variable que almacenara los datos de municipios 
    DatosMunicipio = '';

    ngOnInit() {


        this.model.Archivo = new FormData();

        this.BuscarBanco();
        this.BuscarTipoCuenta();
        this.BuscarMunicipios();
    }

    BuscarBanco() {

        try {
            
        } catch (error) {
            
        }

        this._PersonaService.BuscarBanco(this.DatosServidorModel.url).subscribe(
            data => this.DatosBanco = data,
            error => alert(error),
        );

    }

    BuscarTipoCuenta() {

        try {

            this._PersonaService.BuscarTipoCuenta(this.DatosServidorModel.url).subscribe(
            data => this.DatosTipoCuenta = data,
            error => alert(error)
            );

        } catch (error) {

            var DescripcionError = 'Persona.component.ts--->BuscarTipoCuenta--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

    }

    BuscarMunicipios() {


        try {

            this._MunicipioService.BuscarMunicipio(this.DatosServidorModel.url).subscribe(
                data => this.DatosMunicipio = data,
                error => alert(error)
            );
            
        } catch (error) {

            var DescripcionError = 'Persona.component.ts--->BuscarMunicipios--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }


    }

    GuardarPersona(){

        console.log(this.model.Telefono2);

        this._PersonaService.GuardarPersona(this.model, this.DatosServidorModel.url).subscribe(
            data => alertify.success('Registrado Correctamente'),
            error => alert(error)
        );

        
    }


    CargarArchivo(event){


        try {
            

            let fileList: FileList = event.target.files;

            if(fileList.length > 0) {
                let file: File = fileList[0];   


                        this.model.Archivo.has('Foto') ? this.model.Archivo.delete('Rut') : '';
                        
                        this.model.Archivo.append('Foto', file, file.name);

                        console.log(this.model.Archivo);           
            }


        } catch (error) {

            var DescripcionError = 'Empresa.component.ts--->CargarArchivo--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }
    }




}