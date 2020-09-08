import { Producto } from './producto';

export class SaldoInicialInventario {
    id: number;
    codigo: string;
    cantidad: number;
    costo_unitario: number;
    costo_total: number;
    producto: Producto;

    constructor(){
        this.id=0;
        this.codigo="";
        this.cantidad=0;
        this.costo_unitario=0;
        this.costo_total=0;
        this.producto=new Producto();
    }
}
