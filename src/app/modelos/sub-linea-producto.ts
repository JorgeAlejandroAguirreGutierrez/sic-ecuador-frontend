import { PresentacionProducto } from './presentacion-producto';
import { LineaProducto } from './linea-producto';

export class SubLineaProducto {
    id:number;
    codigo: string;
    nombre: string;
    linea_producto: LineaProducto;
    presentaciones_productos: PresentacionProducto[];

    constructor() {
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.linea_producto=new LineaProducto();
        this.presentaciones_productos=[];
    }
}
