import { Bodega } from './bodega';
import { FacturaDetalle } from './factura-detalle';

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
  factura_detalle: FacturaDetalle;
  constructor() {
    this.id=0;
    this.seleccionado=false;
    this.marca="";
    this.modelo="";
    this.bodega=new Bodega();
    this.factura_detalle=new FacturaDetalle();
  }
}
