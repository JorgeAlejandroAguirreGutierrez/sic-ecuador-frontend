import { TipoComprobante } from './tipo-comprobante';

export class Compensacion {
    id:number;
    codigo: string;
    tipo:string;
    comprobante:string;
    fecha: Date;
    origen: string;
    motivo:string;
    fecha_vencimiento: Date;
    valor_inicial: number;
    valor_compensado: number;
    tipo_comprobante: TipoComprobante;

    constructor(){
        this.id=0;
        this.codigo="";
        this.tipo_comprobante=new TipoComprobante();
    }
}
