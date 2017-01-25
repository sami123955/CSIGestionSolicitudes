import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models/Empresa';
import { EmpresaService } from '../services/empresa.service';
import { DatosServidor } from '../models/DatosServidor';

//Importar libreria externas
declare var alertify:any;
declare var success:any;
declare var error:any


@Component ({
    selector: 'Empresa',
    templateUrl: '../views/Empresa.component.html',
    styleUrls: ['../../assets/css/Maestras.css'],
    providers: [EmpresaService],
    
})

export class EmpresaComponent implements OnInit {


    constructor(private _empresaService: EmpresaService){}

    model = new Empresa('', '', '', '', '', '', '', 0, '', 'ruta-rut', 'ruta-camaraComercio', 'ruta-contrato', '', 'notas');
    

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
            this._empresaService.GuardarEmpresa(this.model, this.DatosServidorModel.url)
            .subscribe(
                data => alertify.success('Registrado Correctamente')),
                error => alert(error),
                () => console.log('Finished')
            );
            
        }
    }

    searchCompany(){
        
        /*this._empresaService.searchCompany().subscribe(
            data =>  alertify.success(''),
            error => alertify.error('No funciona'),
            () => console.log('Finished')
        );*/
    }
    

    CargarArchivo(event, typeFile){
    
        let fileList: FileList = event.target.files;

        if(fileList.length > 0) {
            let file: File = fileList[0];   

            switch(typeFile){
                case 'Rut':
                    this.model.Archivos.delete('Rut');
                    this.model.Archivos.append('Rut', file, file.name);
                break;
                case 'camaraComercio':
                    this.model.Archivos.delete('camaraComercio');
                    this.model.Archivos.append('camaraComercio', file, file.name);
                break;
                case 'Contrato':
                    this.model.Archivos.delete('Contrato');
                    this.model.Archivos.append('Contrato', file, file.name);
                break;
            }
        }



    }
      
    ngOnInit() {
        //Preparamos el modelo para los archivos
        this.model.Archivos = new FormData();
    }

}


