export class GrupoProducto {
    id:number;
    codigo: string;
    grupo: string;
    subgrupo: string;
    categoria: string;
    linea: string;
    sublinea: string;
    presentacion: string;

    constructor() {
        this.id=0;
        this.codigo="";
        this.grupo="";
        this.subgrupo="";
        this.categoria="";
        this.linea="";
        this.sublinea="";
        this.presentacion="";
    }
}
