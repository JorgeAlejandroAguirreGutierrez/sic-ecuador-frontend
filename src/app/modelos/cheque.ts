import { Recaudacion } from '../modelos/recaudacion';
import { Banco } from '../modelos/banco';

export class Cheque {
  id:number;
  numero: string;
  tipo: string;
  fecha: Date;
  fecha_efectivizacion: Date;
  valor: number;
  banco: Banco;

  constructor(){
    this.numero="";
    this.tipo="";
    this.fecha=new Date();
    this.fecha_efectivizacion=new Date();
    this.valor=0;
    this.banco=new Banco();
  }

}
