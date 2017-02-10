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




    model = new Persona('','','','','','','','','','','','','','','','','','','');

    //Instanciamos el modelo de DatosServidor para obtener la url del servicio que vamos a consumuir
    DatosServidorModel = new DatosServidor();

    //Variable que almacenara los datos de los bancos
    DatosBanco = '';

    //Variable que almacenara los datos de los tipo de cuenta
    DatosTipoCuenta = '';

    //Variable que almacenara los datos de municipios 
    DatosMunicipio = '';

    //Variable que almacenar los datos del rol
    DatosRol = '';

    //Variable que usaremos para controlar el preloader
    Cargando = false;

    //Variable que almacenara los datos de la persona
    DatosPersona = '';

    ngOnInit() {


        this.model.Archivo = new FormData();

        this.BuscarBanco();
        this.BuscarTipoCuenta();
        this.BuscarMunicipios();
        this.BuscarRoles();
        this.BuscarPersona();
        
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

    BuscarRoles(){

        try {

            this._PersonaService.BuscarRoles(this.DatosServidorModel.url).subscribe(
                data => this.DatosRol = data,
                error => alert(error)
            );
            
        } catch (error) {
            
            var DescripcionError = 'Persona.component.ts--->BuscarRoles--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }

    }

    GuardarPersona(){

        try {

            this.Cargando = true;

            this._PersonaService.GuardarPersona(this.model, this.DatosServidorModel.url).subscribe(
            data => this.TerminarPeticion(data),
            error => alert(error)
            );


        } catch (error) {

            var DescripcionError = 'Persona.component.ts--->GuardarPersona--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }

        
    }


    //Metodo que usaremos para validar que accion se hara en el momento que se registra o actualiza una persona, 
    TerminarPeticion(Data){

        if(Data.TipoResultado == false){

            alertify.error(Data.Mensaje);
            this.Cargando = false;

        }

        else {


            alertify.success(Data.Mensaje);
            location.reload();

        }

    }


    CargarArchivo(event){


        try {
            

            let fileList: FileList = event.target.files;

            if(fileList.length > 0) {
                let file: File = fileList[0];   


                        this.model.Archivo.has('FotoPersona') ? this.model.Archivo.delete('FotoPersona') : '';
                        
                        this.model.Archivo.append('FotoPersona', file, file.name);

                        console.log(this.model.Archivo);           
            }


        } catch (error) {

            var DescripcionError = 'Empresa.component.ts--->CargarArchivo--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }
    }


    BuscarPersona(){

        try {

            this._PersonaService.BuscarPersona(this.DatosServidorModel.url).subscribe(
            data => this.DatosPersona = /*console.log(JSON.stringify(*/data/*))*/,
            error => alertify.error(error)
            );

        } catch (error) {

            var DescripcionError = 'Empresa.component.ts--->BuscarPersona--->'+'  Error:  ' + error;
            console.log(DescripcionError);
            
        }


        

    }

    CargarDatos(Nombre, Cedula, Direccion, Barrio, Telefono, Telefono2, Celular, Email, Email2, Profesion, CodigoMunicipio, FechaIngreso, FechaCumpleanios, Foto, CodigoBanco, CodigoTipoCuenta, NumeroCuenta, CodigoRol, Codigo, Estado){

        this.model = new Persona(Nombre, Cedula, Direccion, Barrio, Telefono, Telefono2, Celular, Email, Email2, Profesion, CodigoMunicipio, FechaIngreso, FechaCumpleanios, Foto, CodigoBanco, CodigoTipoCuenta, '', NumeroCuenta, CodigoRol, Codigo, Estado);

        this.model.Archivo = new FormData();
    }

    ActualizarPersona(){

        try {
            
        } catch (error) {
            
            var DescripcionError = 'Empresa.component.ts--->BuscarPersona--->'+'  Error:  ' + error;
            console.log(DescripcionError);

        }

    }




}