import { TipoProducto } from './tipo-producto';
import { Kardex } from './kardex';
import { Impuesto } from './impuesto';
import { Caracteristica } from './caracteristica';
import { Bodega } from './bodega';
import { TipoGasto } from './tipo-gasto';
import { GrupoProducto } from './grupo-producto';
import { MedidaPrecio } from './medida-precio';

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
  grupo_producto: GrupoProducto;
  impuesto: Impuesto;
  
  //BODEGA SELECCIONADO
  bodega: Bodega;
  //HASMANY
  caracteristicas: Caracteristica[];
  kardexs: Kardex[];
  medidas_precios: MedidaPrecio[];

  constructor() {
    this.id=0;
    this.codigo="";
    this.nombre="";
    this.consignacion=0;
    this.serie_autogenerado=0;
    this.stock_total=0;
    this.estado=0;
    this.medidas_precios=[];
    this.caracteristicas=[];
    this.kardexs=[];
    this.tipo_producto=new TipoProducto();
    this.tipo_gasto=new TipoGasto();
    this.grupo_producto=new GrupoProducto();
    this.impuesto=new Impuesto();
    this.bodega=new Bodega();

  }
}
