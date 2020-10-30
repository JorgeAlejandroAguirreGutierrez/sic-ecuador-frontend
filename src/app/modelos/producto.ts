import { TipoProducto } from './tipo-producto';
import { Kardex } from './kardex';
import { Impuesto } from './impuesto';
import { Caracteristica } from './caracteristica';
import { Bodega } from './bodega';
import { TipoGasto } from './tipo-gasto';
import { PresentacionProducto } from './presentacion-producto';
import { SubGrupoProducto } from './sub-grupo-producto';
import { CategoriaProducto } from './categoria-producto';
import { GrupoProducto } from './grupo-producto';
import { LineaProducto } from './linea-producto';
import { SubLineaProducto } from './sub-linea-producto';
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
  sub_grupo_producto: SubGrupoProducto;
  categoria_producto: CategoriaProducto;
  linea_producto: LineaProducto;
  sub_linea_producto: SubLineaProducto;
  presentacion_producto: PresentacionProducto;
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
    this.sub_grupo_producto=new SubGrupoProducto();
    this.categoria_producto=new CategoriaProducto();
    this.linea_producto=new LineaProducto();
    this.sub_linea_producto=new SubLineaProducto();
    this.presentacion_producto=new PresentacionProducto();
    this.impuesto=new Impuesto();
    this.bodega=new Bodega();

  }
}
