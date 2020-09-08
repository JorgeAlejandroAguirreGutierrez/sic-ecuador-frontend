import { SubGrupoProducto } from './sub-grupo-producto';

export class GrupoProducto {
    id:number;
    codigo: string;
    nombre: string;
    sub_grupos_productos: SubGrupoProducto[];

    constructor() {
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.sub_grupos_productos=[];
    }
}
