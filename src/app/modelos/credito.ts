import { PlazoCredito } from './plazo-credito';

export class Credito {
  id:number;
  plazo_credito: PlazoCredito;

  constructor(){
    this.plazo_credito=new PlazoCredito();
  }

}
