import { Amortizacion } from './amortizacion';

export class Credito {
  id:number;
  codigo: string;
  saldo: number;
  tasa_interes_anual: number;
  periodicidad: string;
  periodicidad_numero: number;
  periodicidad_total: number;
  tasa_periodo: number;
  cuotas: number;
  fecha_primera_cuota: Date;
  fecha_consecion: Date;
  dividendo: number;
  tipo: string;
  sin_intereses: boolean;
  amortizaciones: Amortizacion[];

  constructor(){
    this.id=0;
    this.saldo=0;
    this.tasa_interes_anual=0;
    this.periodicidad="";
    this.periodicidad_numero=0;
    this.periodicidad_total=0;
    this.tasa_periodo=0;
    this.cuotas=0;
    this.fecha_primera_cuota=new Date();
    this.fecha_consecion=new Date();
    this.dividendo=0;
    this.tipo="";
    this.sin_intereses=false;
    this.amortizaciones=[];
  }

}
