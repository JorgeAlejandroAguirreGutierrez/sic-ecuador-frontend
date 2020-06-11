import { CuentaPropia } from './cuenta-propia';
import { Banco } from './banco';

export class Transferencia {
    id:number;
    codigo: string;
    fecha: Date;
    comprobante: string;
    valor: number;
    cuenta_propia: CuentaPropia;
    banco: Banco;

    constructor(){
        this.fecha=new Date();
        this.comprobante="";
        this.valor=0;
        this.cuenta_propia=new CuentaPropia();
        this.cuenta_propia=new CuentaPropia();
    }

}
