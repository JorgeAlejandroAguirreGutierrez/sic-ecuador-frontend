import { TipoProducto } from './tipo-producto';
import { GrupoProducto } from './grupo-producto';
import { Precio } from './precio';
import { Kardex } from './kardex';
import { Impuesto } from './impuesto';
import { Caracteristica } from './caracteristica';

export class Producto {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  linea: string;
  sublinea: string;
  presentacion: string;
  costo: string;
  consignacion: number;
  estado: number;
  tipo_gasto: string;
  serie_autogenerado: Boolean;
  stock_total: number;
  tipo_producto: TipoProducto;
  grupo_producto: GrupoProducto;
  impuesto: Impuesto;

  //HASONE
  kardex: Kardex;

  //HASMANY
  caracteristicas: Caracteristica[];
  bodegas_productos: BodegaProducto[];
  precios: Precio[];

  constructor() {
    this.id=0;
    this.codigo="";
    this.consignacion=0;
    this.serie_autogenerado=false;
    this.stock_total=0;
    this.precios=[];
    this.caracteristicas=[];
    this.bodegas_productos=[];
    this.tipo_producto=new TipoProducto();
    this.kardex=new Kardex();
    this.impuesto=new Impuesto();
  }
}
