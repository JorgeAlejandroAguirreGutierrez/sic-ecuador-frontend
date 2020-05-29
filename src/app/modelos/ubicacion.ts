export class Ubicacion {
    id:number;
    codigo:string;
    codigo_norma: string;
    provincia:string;
    canton:string;
    parroquia:string;

    constructor() {
        this.id=0;
        this.provincia="";
        this.canton="";
        this.parroquia="";
    }
    
}
