export class TipoContribuyente {
    id:number;
    codigo:string;
    tipo:string;
    subtipo:string;
    obligado_contabilidad: boolean;

    constructor() {
        this.id=0;
        this.tipo="";
        this.subtipo="";
        this.obligado_contabilidad=false;
    }
}
