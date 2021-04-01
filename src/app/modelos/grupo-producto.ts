export class GrupoProducto {
    id:number;
    codigo: string;
    grupo: string;
    sub_grupo: string;
    categoria: string;
    linea: string;
    sub_linea: string;
    presentacion: string;

    constructor() {
        this.id=0;
        this.codigo="";
        this.grupo="";
        this.sub_grupo="";
        this.categoria="";
        this.linea="";
        this.sub_linea="";
        this.presentacion="";
    }
}
