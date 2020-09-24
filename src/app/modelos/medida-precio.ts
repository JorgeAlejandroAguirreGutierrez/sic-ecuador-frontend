import { Medida } from './medida';
import { Precio } from './precio';

export class MedidaPrecio {
    id: number;
    codigo:string;
    medida: Medida;
    precios: Precio[];

    constructor(){
        this.id=0;
        this.codigo="";
        this.medida=new Medida();
        this.precios=[];
    }
}