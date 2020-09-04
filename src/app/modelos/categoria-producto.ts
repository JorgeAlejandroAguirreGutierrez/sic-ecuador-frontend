import { LineaProducto } from './linea-producto';
import { SubGrupoProducto } from './sub-grupo-producto';

export class CategoriaProducto {
    id:number;
    codigo: string;
    nombre: string;
    sub_grupo_producto: SubGrupoProducto;
    lineas_productos: LineaProducto[];

    constructor() {
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.sub_grupo_producto= new SubGrupoProducto();
        this.lineas_productos=[];
    }
}
