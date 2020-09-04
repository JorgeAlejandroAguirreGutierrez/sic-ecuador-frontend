import { SubLineaProducto } from './sub-linea-producto';
import { CategoriaProducto } from './categoria-producto';

export class LineaProducto {
    id:number;
    codigo: string;
    nombre: string;
    categoria_producto: CategoriaProducto;
    sub_lineas_productos: SubLineaProducto[];

    constructor() {
        this.id=0;
        this.nombre="";
        this.categoria_producto=new CategoriaProducto();
        this.sub_lineas_productos=[];
    }
}
