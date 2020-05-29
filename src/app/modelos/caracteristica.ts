import { BodegaProducto } from './bodega-producto';

export class Caracteristica {
  id: number;
  codigo: string;
  descripcion: string;
  color: string;
  marca: string;
  modelo: string;
  serie: string;
  seleccionado: boolean;
  bodega_producto: BodegaProducto;

  constructor() {
    this.id=0;
    this.seleccionado=false;
    this.marca="";
    this.modelo="";
    this.bodega_producto=new BodegaProducto();
  }
}
