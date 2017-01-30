import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models/Empresa';
import { EmpresaService } from '../services/empresa.service';
import { DatosServidor } from '../models/DatosServidor';

//Importar libreria externas
declare var jQuery: any;
declare var $: any;
declare var alertify:any;
declare var success:any;
declare var error:any;
declare var DataTable: any;


@Component ({
    selector: 'Empresa',
    templateUrl: '../views/Empresa.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [EmpresaService],
    
})

export class EmpresaComponent implements OnInit {


    constructor(private _empresaService: EmpresaService){}

    model = new Empresa('', '', '', '', '', '', '', '', '', '');
    

    //Variable que almacenara todos los datos de la consulta de empresa.
    DatosConsulta = '';

    //Variable que usaremos para controlar los preloaders
    loading = false;

     //Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del seridor donde consumiremos los servicios
    DatosServidorModel = new DatosServidor();

    GuardarEmpresa(RutaRut, RutaCamaraComercio, Contrato) {


        if((!this.model.Archivos.has('Rut')) || (!this.model.Archivos.has('camaraComercio')) || (!this.model.Archivos.has('Contrato'))) {
            alertify.error('Debe cargar todos los archivos');
        }
        else {
            this.loading = true;
            this._empresaService.GuardarEmpresa(this.model, this.DatosServidorModel.url)
            .subscribe(
                data => alertify.success('Registrado Correctamente'),
                error => alert(error),
                () => this.searchCompany()
            );

            
        }
    }

    searchCompany(){
        
        this._empresaService.searchCompany(this.DatosServidorModel.url).subscribe(
            data => this.DatosConsulta = data,
            error => alertify.error('No funciona'),
            () => this.LimpiarForm()
        );

        


    }
    

    CargarArchivo(event, typeFile){
    
        let fileList: FileList = event.target.files;

        if(fileList.length > 0) {
            let file: File = fileList[0];   

            switch(typeFile){
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



    }
      
    ngOnInit() {
        //Preparamos el modelo para los archivos
        this.model.Archivos = new FormData();
        this.loading = true;
        this.searchCompany();
    }


    LimpiarForm(){
        this.model = new Empresa('', '', '', '', '', '', '', '', '', '', '');
        //Seteamos nuevamente el objeto formdata
        this.model.Archivos = new FormData();

        //Cerramos modal
        $('.EmpresaModal').modal('hide');
        this.loading = false;

        //Aplicamos datatable
        $('#EmpresaTabla').dataTable({

            "bDestroy": true,

        });
        alert();

    }

    CargarDatosForm(Nit, RazonSocial, Direccion, DireccionRecepcion, Representante, Contacto, EmailContacto, Telefono, EmailEmpresa, Observaciones, Codigo, Estado, RutaRut, RutaCamaraComercio, Contrato){

        this.model = new Empresa(Nit,RazonSocial,Direccion,DireccionRecepcion, Representante, Contacto, EmailContacto, Telefono, EmailEmpresa, '',  Observaciones, Codigo, Estado, RutaRut, RutaCamaraComercio, Contrato);
        
        //Seteamos nuevamente el objeto formdata
        this.model.Archivos = new FormData();
    }

    ActualizarEmpresa() {

        this.loading = true;
            this._empresaService.ActualizarEmpresa(this.model, this.DatosServidorModel.url)
            .subscribe(
                data => alertify.success('Actualizado Correctamente'),
                error => alert(error),
                () => this.searchCompany()
            );
            
    }

}


