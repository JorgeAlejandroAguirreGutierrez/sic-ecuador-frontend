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
    total_tarjetas_debitos: number;
    total_tarjetas_creditos: number;
    total_compensaciones: number;
    total_credito: number;
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
        this.total_cheques=0;
        this.total_depositos=0;
        this.total_transferencias=0;
        this.total_tarjetas_debitos=0;
        this.total_tarjetas_creditos=0;
        this.total_compensaciones=0;
        this.total_credito=0;
        this.cheques= [];
        this.depositos=[];
        this.transferencias=[];
        this.tarjetas_debitos=[]
        this.tarjetas_creditos=[]
        this.compensaciones=[];
        this.credito=new Credito();
    }

    private calcular_total_cheques(){
        this.total_cheques=0;
        this.cheques.forEach((cheque, index)=> {
            this.total_cheques=this.total_cheques+Number(cheque.valor);
        });  
    }
    private calcular_total_depositos(){
        this.total_depositos=0;
        this.depositos.forEach((deposito, index)=> {
            this.total_depositos=this.total_depositos+Number(deposito.valor);
        });  
    }
    private calcular_total_transferencias(){
        this.total_transferencias=0;
        this.transferencias.forEach((transferencia, index)=> {
            this.total_transferencias=this.total_transferencias+Number(transferencia.valor);
        });  
    }
    private calcular_total_tarjetas_debitos(){
        this.total_tarjetas_debitos=0;
        this.tarjetas_debitos.forEach((tarjeta_debito, index)=> {
            this.total_tarjetas_debitos=this.total_tarjetas_debitos+Number(tarjeta_debito.valor);
        });  
    }
    private calcular_total_tarjetas_creditos(){
        this.total_tarjetas_creditos=0;
        this.tarjetas_creditos.forEach((tarjeta_credito, index)=> {
            this.total_tarjetas_creditos=this.total_tarjetas_creditos+Number(tarjeta_credito.valor);
        });  
    }

    calcular_totales(){
        this.calcular_total_cheques();
        this.calcular_total_depositos();
        this.calcular_total_transferencias();
        this.calcular_total_tarjetas_debitos();
        this.calcular_total_tarjetas_creditos();
        
    }
}
