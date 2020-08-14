import { PresentacionProducto } from './presentacion-producto';

export class SubLineaProducto {
    id:number;
    codigo: string;
    nombre: string;
    presentaciones_productos: PresentacionProducto[];

    constructor() {
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.presentaciones_productos=[];
    }
}
