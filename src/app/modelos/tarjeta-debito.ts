import { OperadorTarjeta } from './operador-tarjeta';
import { Banco } from './banco';
import { FranquiciaTarjeta } from './franquicia-tarjeta';

export class TarjetaDebito {
  id:number;
  codigo: string;
  titular: boolean;
  identificacion:string;
  nombre: string;
  lote: string;
  valor: number;
  operador_tarjeta: OperadorTarjeta;
  franquicia_tarjeta:FranquiciaTarjeta;
  banco: Banco;

  constructor(){
    this.id=0;
    this.codigo="";
    this.titular=false;
    this.identificacion="";
    this.nombre="";
    this.lote="";
    this.valor=0;
    this.operador_tarjeta=new OperadorTarjeta();
    this.franquicia_tarjeta= new FranquiciaTarjeta();
    this.banco= new Banco;
  }
}


