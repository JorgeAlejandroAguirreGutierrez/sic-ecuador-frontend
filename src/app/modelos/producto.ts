import { TipoProducto } from './tipo-producto';
import { Kardex } from './kardex';
import { Impuesto } from './impuesto';
import { Caracteristica } from './caracteristica';
import { Bodega } from './bodega';
import { TipoGasto } from './tipo-gasto';
import { GrupoProducto } from './grupo-producto';
import { MedidaPrecio } from './medida-precio';
import { Proveedor } from './proveedor';

export class Producto {
  id: number;
  codigo: string;
  nombre: string;
  costo: number;
  consignacion: boolean;
  estado: boolean;
  serie_autogenerado: number;
  stock_total: number;
  tipo_gasto: TipoGasto;
  tipo_producto: TipoProducto;
  grupo_producto: GrupoProducto;
  impuesto: Impuesto;
  proveedor: Proveedor;
  
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
    this.consignacion=false;
    this.serie_autogenerado=0;
    this.stock_total=0;
    this.estado=true;
    this.medidas_precios=[];
    this.caracteristicas=[];
    this.kardexs=[];
    this.tipo_producto=new TipoProducto();
    this.tipo_gasto=new TipoGasto();
    this.grupo_producto=new GrupoProducto();
    this.impuesto=new Impuesto();
    this.proveedor=new Proveedor();
    this.bodega=new Bodega();

  }
}
