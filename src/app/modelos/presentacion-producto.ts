import { SubLineaProducto } from './sub-linea-producto';

export class PresentacionProducto {
    id:number;
    codigo: string;
    nombre: string;
    sub_linea_producto: SubLineaProducto;

    constructor() {
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.sub_linea_producto=new SubLineaProducto();
    }
}
