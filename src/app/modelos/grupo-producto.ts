import { LineaProducto } from './linea-producto';

export class GrupoProducto {
    id:number;
    codigo: string;
    grupo: string;
    subgrupo: string;
    categoria: string;
    lineas_productos: LineaProducto[];

    constructor() {
        this.id=0;
        this.grupo="";
        this.subgrupo="";
        this.categoria="";
    }
}
