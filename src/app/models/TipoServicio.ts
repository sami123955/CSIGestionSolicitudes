export class TipoServicio {

    constructor(
        public Nombre: string,
        public Descripcion: string,
        public Costos: any,
        public Codigo?: string,
        public Estado?:string
    ) {}

}