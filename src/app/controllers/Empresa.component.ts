import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models/Empresa';
import { EmpresaService } from '../services/empresa.service';
import { DatosServidor } from '../models/DatosServidor';


@Component ({
    selector: 'Empresa',
    templateUrl: '../views/Empresa.component.html',
    styleUrls: ['../../assets/css/Empresa.css'],
    providers: [EmpresaService],
    
})

export class EmpresaComponent implements OnInit {


    constructor(private _empresaService: EmpresaService){}

    model = new Empresa('', '', '', '', '', '', '', 0, '', 'ruta-rut', 'ruta-camaraComercio', 'ruta-contrato', '', 'notas');
    

     //Instanciamos la siguiente clase, para acceder al atributo url, y así dinamicamente se cambiará la ruta del seridor donde consumiremos los servicios
    DatosServidorModel = new DatosServidor();

    GuardarEmpresa(RutaRut, RutaCamaraComercio, Contrato) {
        this._empresaService.GuardarEmpresa(this.model, this.DatosServidorModel.url)
            .subscribe(
                data => alert(JSON.stringify(data)),
                error => alert(error),
                () => console.log('Finished')
            );

/*
            //Obtenemos los archivos

            let fileListRutaRut: FileList = RutaRut.target.files;

            if(fileListRutaRut.length > 0){
                alert();
    }*/
    }


   /* ngOnInit() {
        this.searchCompany();
}*/

    searchCompany(){

       // this.builtTable();
        
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
            console.log(file);
            console.log(typeFile);

            switch(typeFile){
                case 'Rut':
                    this.model.Archivos.append('Rut', file, file.name);
                break;
                case 'camaraComercio':
                    this.model.Archivos.append('camaraComercio', file, file.name);
                break;
                case 'Contrato':
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


