import { PlazoCredito } from './plazo-credito';

export class Credito {
  id:number;
  plazo_credito: PlazoCredito;
  amortizacion: string;
  modelo: string;
  fecha_primera_cuota: Date;
  interes_mensual: number;
  interes_anual: number;
  valor_seguro: number;
  recargos: number;
  saldo: number;

  constructor(){
    this.id=0;
    this.plazo_credito=new PlazoCredito();
    this.amortizacion="";
    this.modelo="";
    this.fecha_primera_cuota=new Date();
    this.interes_mensual=0;
    this.interes_anual=0;
    this.valor_seguro=0;
    this.recargos=0;
    this.saldo=0;
  }

}
