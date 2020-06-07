import { Bodega } from './bodega';

export class Caracteristica {
  id: number;
  codigo: string;
  descripcion: string;
  color: string;
  marca: string;
  modelo: string;
  serie: string;
  seleccionado: boolean;
  bodega: Bodega;

  constructor() {
    this.id=0;
    this.seleccionado=false;
    this.marca="";
    this.modelo="";
    this.bodega=new Bodega();
  }
}
