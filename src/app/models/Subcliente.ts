export class Subcliente {
    constructor(
        public CodigoSucursal:string,
        public Nit:string,
        public RazonSocial:string,
        public Telefono:string,
        public Representante:string,
        public Estado?:string,
        public Codigo?:string    
    ){}
}