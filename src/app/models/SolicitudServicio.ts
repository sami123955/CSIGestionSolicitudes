export class SolicitudServicio {

    constructor(

        
        public Nombre:string,
        public Cedula:string,
        public Direccion:string,
        public Telefono:string,
        public Celular:string,
        public Cargo:string,
        public CodigoMunicipio:string,
        public CodigoUsuario:string,
        public CodigoSucursal:string,
        public lstServicioDetalle:any,
        public Codigo?:string

    ){}

}