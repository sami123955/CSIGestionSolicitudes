export class Empresa{

    constructor(

        public Nit: string,
        public RazonSocial: string,
        public Direccion: string,
        public DireccionRecepcion: string,
        public Representante: string,
        public Contacto: string,
        public EmailContacto: string,
        public Telefono: string,
        public EmailEmpresa: string,
        public Archivos: any,
        public Observaciones?: string,
        public Codigo?: number,
        public Estado?: boolean,
        public RutaRut?: string,
        public RutaCamaraComercio?: string,
        public Contrato?:string
        
    ) {}

}