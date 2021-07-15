export class GrupoProducto {
    id:number;
    codigo: string;
    tipo_producto: number;
    grupo: string;
    subgrupo : string;
    seccion: string;
    linea: string;
    sublinea: string;
    presentacion: string;
    presentacion_bien: number;
    movimiento_contable: number;

    constructor() {
        this.id=0;
        this.codigo="";
        this.tipo_producto=0;
        this.grupo="";
        this.subgrupo="";
        this.seccion="";
        this.linea="";
        this.sublinea="";
        this.presentacion="";
        this.presentacion_bien=0;
        this.movimiento_contable=0;
    }
}
