import { CategoriaProducto } from './categoria-producto';

export class SubGrupoProducto {
    id:number;
    codigo: string;
    nombre: string;
    categorias_productos: CategoriaProducto[];

    constructor() {
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.categorias_productos=[];
    }
}
