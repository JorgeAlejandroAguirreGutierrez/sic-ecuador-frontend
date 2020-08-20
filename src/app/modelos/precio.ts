import { Medida } from './medida';
import { Segmento } from './segmento';

export class Precio {
    id: number;
    codigo: string;
    costo: number;
    margen_contribucion: number;
    precio_venta_publico: number;
    precio_venta_publico_iva: number;
    precio_venta_publico_manual: number;
    utilidad: number;
    utilidad_porcentaje: number;
    medida: Medida;
    segmento: Segmento;

    constructor() {
        this.id=0;
        this.codigo="";
        this.costo=0;
        this.margen_contribucion=0;
        this.precio_venta_publico=0;
        this.precio_venta_publico_iva=0;
        this.precio_venta_publico_manual=0;
        this.utilidad=0;
        this.utilidad_porcentaje=0;
        this.medida=new Medida();
        this.segmento=new Segmento();

    }
}