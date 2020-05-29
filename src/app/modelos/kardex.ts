export class Kardex {
    id: number;
    codigo: string;
    fecha: Date;
    guia: string;
    factura: string;
    detalle: string;
    entrada: number;
    salida: number;
    stock: number;
    debe: number;
    haber: number;
    saldo: number;
    costo_unitario: number;
    costo_promedio: number;
    costo_ultimo: number;

    constructor() {
        this.id=0;
        this.stock=0;
        this.costo_promedio=0;
        this.costo_unitario=0;
    }
    
}
