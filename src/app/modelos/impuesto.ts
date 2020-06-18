export class Impuesto {
    id:number;
    codigo:string;
    codigo_norma:string;
    porcentaje: number;

    constructor() {
        this.codigo="";
        this.codigo_norma="";
        this.porcentaje=0;
    }
}
