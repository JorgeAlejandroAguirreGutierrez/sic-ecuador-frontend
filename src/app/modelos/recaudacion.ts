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
    total_depositos: number;
    total_transferencias: number;
    total_debitos: number;
    total_creditos: number;
    total_compensaciones: number;
    cheques: Cheque[];
    depositos: Deposito[];
    transferencias: Transferencia[];
    tarjetas_creditos: TarjetaCredito[];
    tarjetas_debitos: TarjetaDebito[];
    compensaciones: Compensacion[];
    credito: Credito;
    cambio: number;

    constructor(){
        this.total=0;
        this.efectivo=0;
        this.cambio=0;
        this.total_depositos=0;
        this.total_transferencias=0;
        this.total_debitos=0;
        this.total_creditos=0;
        this.total_compensaciones=0;
        this.cheques= [];
        this.depositos=[];
        this.transferencias=[];
        this.tarjetas_debitos=[]
        this.tarjetas_creditos=[]
        this.compensaciones=[];
        this.credito=new Credito();
    }
}
