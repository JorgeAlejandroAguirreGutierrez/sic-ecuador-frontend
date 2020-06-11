import { RetencionCliente } from './retencion-cliente';
import { PuntoVenta } from './punto-venta';
import { Establecimiento } from './establecimiento';

export class RetencionVenta {
    id:number;
    codigo: string;
    secuencia: string;
    numero_autorizacion: string;
    total: number;
    retencion_cliente: RetencionCliente;
    establecimiento: Establecimiento;
    punto_venta: PuntoVenta;

    constructor() {
        this.id=0;
        this.codigo="";
        this.secuencia="";
        this.numero_autorizacion="";
        this.total=0;
        this.retencion_cliente=new RetencionCliente();
        this.punto_venta=new PuntoVenta();
    }
}
