export class Empresa{

    constructor(

        public Nit: string,
        public RazonSocial: string,
        public Direccion: string,
        public DireccionRecepcion: string,
        public Representante: string,
        public Contacto: string,
        public EmailContacto: string,
        public Telefono: number,
        public EmailEmpresa: string,
        public RutaRut: any,
        public RutaCamaraComercio: any,
        public Contrato: any,
        public Archivos: any,
        public Observaciones?: string,
        public Codigo?: string
        
    ) {}

}