import { SubLineaProducto } from './sub-linea-producto';

export class LineaProducto {
    id:number;
    codigo: string;
    nombre: string;
    sub_lineas_productos: SubLineaProducto[];

    constructor() {
        this.id=0;
        this.nombre="";
        this.sub_lineas_productos=[];
    }
}
