export class MovimientoContable {
    id:number;
    codigo: string;
    inventario: string;
    costo_venta: string;
    devolucion_compra: string;
    descuento_compra: string;
    venta: string;
    devolucion_venta: string;
    descuento_venta: string;
    decolucion_costo_venta: string;
    afectacion_contable: number;

    constructor() {
        this.id=0;
        this.codigo="";
        this.inventario="";
        this.costo_venta="";
        this.devolucion_compra="";
        this.descuento_compra="";
        this.venta="";
        this.devolucion_venta="";
        this.descuento_venta="";
        this.decolucion_costo_venta="";
        this.afectacion_contable=0;
    }
    
}
