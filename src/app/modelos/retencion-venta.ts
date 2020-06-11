import { RetencionCliente } from './retencion-cliente';
import { PuntoVenta } from './punto-venta';
import { Establecimiento } from './establecimiento';

export class RetencionVenta {
    id:number;
    codigo: string;
    secuencia: string;
    autorizacion: string;
    base_imponible: number;
    valor: number;
    porcentaje: number;
    retencion_cliente: RetencionCliente;
    establecimiento: Establecimiento;
    punto_venta: PuntoVenta;

    constructor() {
        this.id=0;
        this.codigo="";
        this.secuencia="";
        this.autorizacion="";
        this.base_imponible=0;
        this.valor=0;
        this.porcentaje=0;
        this.retencion_cliente=new RetencionCliente();
        this.punto_venta=new PuntoVenta();
    }
}
