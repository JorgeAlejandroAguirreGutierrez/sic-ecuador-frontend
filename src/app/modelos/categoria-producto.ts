import { LineaProducto } from './linea-producto';

export class CategoriaProducto {
    id:number;
    codigo: string;
    nombre: string;
    lineas_productos: LineaProducto[];

    constructor() {
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.lineas_productos=[];
    }
}
