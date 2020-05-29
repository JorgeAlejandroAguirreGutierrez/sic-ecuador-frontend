import { Producto } from './producto';
import { Kardex } from './kardex';
import { Bodega } from './bodega';
import { Caracteristica } from './caracteristica';

export class BodegaProducto {
    id: number;
    codigo: string;
    producto: Producto;
    kardex: Kardex;
    bodega: Bodega;
    caracteristicas: Caracteristica[];

    constructor(){
        this.id=0;
        this.codigo="";
        this.producto=new Producto();
        this.kardex=new Kardex();
        this.bodega=new Bodega();
        this.caracteristicas=[];
    }
}
