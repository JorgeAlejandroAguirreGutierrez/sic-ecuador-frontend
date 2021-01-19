import { Medida } from './medida';
import { Precio } from './precio';
import { Producto } from './producto';

export class MedidaPrecio {
    id: number;
    codigo:string;
    medida: Medida;
    producto: Producto;
    precios: Precio[];

    constructor(){
        this.id=0;
        this.codigo="";
        this.medida=new Medida();
        this.producto=new Producto();
        this.precios=[];
    }
}