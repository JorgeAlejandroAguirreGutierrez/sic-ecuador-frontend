import { PlazoCredito } from '../modelos/plazo-credito';
import { TipoPago } from '../modelos/tipo-pago';
import { FormaPago } from '../modelos/forma-pago';

export class Financiamiento {
    id: number;
    codigo: string;
    monto: number;
    tipo_pago: TipoPago;
    forma_pago: FormaPago;
    plazo_credito: PlazoCredito;

    constructor() {
        this.id=0;
        this.monto=0;
        this.tipo_pago=new TipoPago();
        this.forma_pago=new FormaPago();
        this.plazo_credito=new PlazoCredito();
     }



}
