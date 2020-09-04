import { CategoriaProducto } from './categoria-producto';
import { GrupoProducto } from './grupo-producto';

export class SubGrupoProducto {
    id:number;
    codigo: string;
    nombre: string;
    grupo_producto: GrupoProducto;
    categorias_productos: CategoriaProducto[];

    constructor() {
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.grupo_producto=new GrupoProducto();
        this.categorias_productos=[];
    }
}
