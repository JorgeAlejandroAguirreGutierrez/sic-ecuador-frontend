import { TarjetaCredito } from '../modelos/tarjeta-credito';
import { TarjetaDebito } from '../modelos/tarjeta-debito';
import { Cheque } from './cheque';
import { Compensacion } from './compensacion';
import { Credito } from './credito';
import { Deposito } from './deposito';
import { Transferencia } from './transferencia';

export class Recaudacion {
    id:number;
    fecha: Date;
    total: number;
    comentario: string;
    efectivo: number;
    total_cheques: number;
    total_depositos_transferencias: number;
    total_compensaciones: number;
    cheques: Cheque[];
    depositos: Deposito[];
    transferencias: Transferencia[];
    tarjeta_credito: TarjetaCredito;
    tarjeta_debito: TarjetaDebito;
    compensacion: Compensacion;
    credito: Credito;
    cambio: number;

    constructor(){
        this.cheques= [];
        this.depositos=[];
        this.transferencias=[];
        this.total=0;
        this.efectivo=0;
        this.cambio=0;
        this.tarjeta_debito=new TarjetaDebito();
        this.tarjeta_credito=new TarjetaCredito();
        this.credito=new Credito();
    }
}
