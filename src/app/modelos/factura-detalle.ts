import { Factura } from './factura';
import { Precio } from './precio';
import { Medida } from './medida';
import { Caracteristica } from './caracteristica';
import { Producto } from './producto';
import { Bodega } from './bodega';
import { Impuesto } from './impuesto';

export class FacturaDetalle {
  id: number;
  posicion: number;
  comentario: string;
  entregado: boolean;
  consignacion: number;
  cantidad: number;
  subsidio: number;
  sin_subsidio: number;
  //INDIVIDUALES
  valor_descuento_individual: number;
  porcentaje_descuento_individual: number;
  valor_porcentaje_descuento_individual: number;
  total_descuento_individual: number;
  //FIN INDIVIDUALES
  //TOTALES
  valor_descuento_individual_subtotales: number;
  porcentaje_descuento_individual_subtotales: number;
  valor_porcentaje_descuento_individual_subtotales: number;

  valor_descuento_individual_totales: number;
  porcentaje_descuento_individual_totales: number;
  valor_porcentaje_descuento_individual_totales: number;
  //FIN TOTALES
  total_sin_descuento: number;
  total_con_descuento: number;
  valor_iva_sin_descuento: number;
  valor_iva_con_descuento: number;
  
  medida: Medida;
  factura: Factura;
  //CARACTERISTICAS SELECCIONADAS
  caracteristicas: Caracteristica[];
  //PRECIO SELECCIONADO
  precio: Precio;
  //PRODUCTO SELECCIONADO
  producto: Producto;
  //IMPUESTO SELECCIONADO
  impuesto: Impuesto;
  

  constructor() {
    this.id=0;
    this.posicion=-1;
    this.entregado=false;
    this.comentario="";
    this.cantidad=0;
    this.valor_descuento_individual=0;
    this.porcentaje_descuento_individual=0;
    this.valor_porcentaje_descuento_individual=0;
    this.total_descuento_individual=0;
    this.valor_descuento_individual_subtotales=0;
    this.porcentaje_descuento_individual_subtotales=0;
    this.valor_porcentaje_descuento_individual_subtotales=0;
    this.valor_descuento_individual_totales=0;
    this.porcentaje_descuento_individual_totales=0;
    this.valor_porcentaje_descuento_individual_totales=0;
    this.total_sin_descuento=0;
    this.total_con_descuento=0;
    this.valor_iva_sin_descuento=0;
    this.valor_iva_con_descuento=0;
    this.producto=new Producto();
    this.precio=new Precio();
    this.medida=new Medida();
    this.impuesto=new Impuesto();
    this.caracteristicas=[];
  }

  private calcular_total_sin_descuento(){
    this.total_sin_descuento=0;
    this.total_sin_descuento=Number(this.cantidad)*this.precio.valor;
    this.total_sin_descuento= Number(this.total_sin_descuento.toFixed(2));
  }
  private calcular_valor_porcentaje_descuento(){
    this.valor_porcentaje_descuento_individual=0;
    this.valor_porcentaje_descuento_individual=Number(this.total_sin_descuento)*Number(this.porcentaje_descuento_individual)/100;
    this.valor_porcentaje_descuento_individual= Number(this.valor_porcentaje_descuento_individual.toFixed(2));
  }
  private calcular_total_descuento(){
    this.total_descuento_individual=0;
    this.total_descuento_individual=Number(this.valor_descuento_individual)+Number(this.valor_porcentaje_descuento_individual)+Number(this.valor_descuento_individual_totales)+Number(this.valor_porcentaje_descuento_individual_totales)+Number(this.valor_descuento_individual_subtotales)+Number(this.valor_porcentaje_descuento_individual_subtotales);    
    this.total_descuento_individual=Number(this.total_descuento_individual.toFixed(2));
  }
  private calcular_valor_iva_sin_descuento(){
    this.valor_iva_sin_descuento=0;
    this.valor_iva_sin_descuento=this.total_sin_descuento*this.impuesto.porcentaje/100;
    this.valor_iva_sin_descuento= Number(this.valor_iva_sin_descuento.toFixed(2));
  }
  private calcular_total_con_descuento(){
    this.total_con_descuento=0;
    this.total_con_descuento=Number(this.total_sin_descuento)-Number(this.total_descuento_individual);
    this.total_con_descuento= Number(this.total_con_descuento.toFixed(2));
  }
  private calcular_valor_iva_con_descuento(){
    this.valor_iva_con_descuento=0;
    this.valor_iva_con_descuento=Number(this.total_con_descuento)*Number(this.impuesto.porcentaje/100);
    this.valor_iva_con_descuento= Number(this.valor_iva_con_descuento.toFixed(2));
  }

  //CALCULAR DESCUENTO SUBTOTALES
  private calcular_valor_descuento_subtotales(factura: Factura){
    this.valor_descuento_individual_subtotales=((Number(factura.valor_descuento_subtotal)*this.total_sin_descuento)/factura.subtotal_sin_descuento);
    this.valor_descuento_individual_subtotales=Number(this.valor_descuento_individual_subtotales.toFixed(2));
  }
  private calcular_valor_porcentaje_descuento_subtotales(factura: Factura){
    this.valor_porcentaje_descuento_individual_subtotales=((factura.valor_porcentaje_descuento_subtotal*this.total_sin_descuento)/factura.subtotal_sin_descuento);
    this.valor_porcentaje_descuento_individual_subtotales=Number(this.valor_porcentaje_descuento_individual_subtotales.toFixed(2));
  }
  private calcular_porcentaje_descuento_subtotales(factura: Factura){
    this.porcentaje_descuento_individual_subtotales=this.valor_porcentaje_descuento_individual_subtotales/this.total_sin_descuento;
    this.porcentaje_descuento_individual_subtotales= Number(this.porcentaje_descuento_individual_subtotales.toFixed(2));
  }
  //FIN CALCULAR SUBTOTALES

  //CALCULAR DESCUENTOS TOTALES
  private calcular_valor_descuento_totales(factura: Factura){
    if (this.impuesto.porcentaje>0){
      this.valor_descuento_individual_totales=((Number(factura.valor_descuento_total)*this.total_sin_descuento)/factura.subtotal_sin_descuento)/((100+this.impuesto.porcentaje)/100);
    } else{
      this.valor_descuento_individual_totales=((Number(factura.valor_descuento_total)*this.total_sin_descuento)/factura.subtotal_sin_descuento);
    }
    this.valor_descuento_individual_totales=Number(this.valor_descuento_individual_totales.toFixed(2));
  }
  private calcular_valor_porcentaje_descuento_totales(factura: Factura){
    if (this.impuesto.porcentaje>0){
      this.valor_porcentaje_descuento_individual_totales=((factura.valor_porcentaje_descuento_total*this.total_sin_descuento)/factura.subtotal_sin_descuento)/((100+this.impuesto.porcentaje)/100);
    } else {
      this.valor_porcentaje_descuento_individual_totales=((factura.valor_porcentaje_descuento_total*this.total_sin_descuento)/factura.subtotal_sin_descuento);
    }
    this.valor_porcentaje_descuento_individual_totales=Number(this.valor_porcentaje_descuento_individual_totales.toFixed(2));
  }
  private calcular_porcentaje_descuento_totales(factura: Factura){
    this.porcentaje_descuento_individual_totales=this.valor_porcentaje_descuento_individual_totales/this.total_sin_descuento;
    this.porcentaje_descuento_individual_totales= Number(this.porcentaje_descuento_individual_totales.toFixed(2));
  }
  

  calcular(){
    this.calcular_total_sin_descuento();
    this.calcular_valor_porcentaje_descuento();
    this.calcular_total_descuento();
    this.calcular_valor_iva_sin_descuento();
    this.calcular_total_con_descuento();
    this.calcular_valor_iva_con_descuento();
  }
  calcular_descuentos_subtotales(factura: Factura){
    this.calcular_valor_descuento_subtotales(factura);
    this.calcular_valor_porcentaje_descuento_subtotales(factura);
    this.calcular_porcentaje_descuento_subtotales(factura);
  }
  calcular_descuentos_totales(factura: Factura){
    this.calcular_valor_descuento_totales(factura);
    this.calcular_valor_porcentaje_descuento_totales(factura);
    this.calcular_porcentaje_descuento_totales(factura);
  }
}
