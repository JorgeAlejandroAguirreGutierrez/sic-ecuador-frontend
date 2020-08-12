import { GrupoProducto } from './grupo-producto';

export class LineaProducto {
    id:number;
    codigo: string;
    linea: string;
    sublinea: string;
    presentacion: string;
    grupo_producto: GrupoProducto;

    constructor() {
        this.id=0;
        this.linea="";
        this.sublinea="";
        this.presentacion="";
        this.grupo_producto=new GrupoProducto();
    }
}
