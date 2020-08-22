import { TipoProducto } from './tipo-producto';
import { Precio } from './precio';
import { Kardex } from './kardex';
import { Impuesto } from './impuesto';
import { Caracteristica } from './caracteristica';
import { Bodega } from './bodega';
import { TipoGasto } from './tipo-gasto';
import { PresentacionProducto } from './presentacion-producto';

export class Producto {
  id: number;
  codigo: string;
  nombre: string;
  costo: number;
  consignacion: number;
  estado: number;
  serie_autogenerado: number;
  stock_total: number;
  tipo_gasto: TipoGasto;
  tipo_producto: TipoProducto;
  presentacion_producto: PresentacionProducto;
  impuesto: Impuesto;
  //HASONE
  kardex: Kardex;
  //BODEGA SELECCIONADO
  bodega: Bodega;
  //HASMANY
  caracteristicas: Caracteristica[];
  precios: Precio[];

  constructor() {
    this.id=0;
    this.codigo="";
    this.consignacion=0;
    this.serie_autogenerado=0;
    this.stock_total=0;
    this.estado=0;
    this.precios=[];
    this.caracteristicas=[];
    this.tipo_producto=new TipoProducto();
    this.tipo_gasto=new TipoGasto();
    this.presentacion_producto=new PresentacionProducto();
    this.kardex=new Kardex();
    this.impuesto=new Impuesto();
    this.bodega=new Bodega();

  }
}
