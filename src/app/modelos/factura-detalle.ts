import { Factura } from './factura';
import { Precio } from './precio';
import { Medida } from './medida';
import { Caracteristica } from './caracteristica';
import { Producto } from './producto';
import { Bodega } from './bodega';

export class FacturaDetalle {
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
  valor_descuento_totales: number;
  porcentaje_descuento_totales: number;
  valor_porcentaje_descuento_totales: number;
  total_descuento_totales: number;
  //FIN TOTALES
  subtotal_sin_descuento: number;
  subtotal_con_descuento: number;
  valor_iva_sin_descuento: number;
  valor_iva_con_descuento: number;
  
  medida: Medida;
  factura: Factura;
  //CARACTERISTICAS SELECCIONADAS
  caracteristicas: Caracteristica[];
  //PRECIO SELECCIONADO
  precio: Precio;
  producto: Producto;
  

  constructor() {
    this.entregado=false;
    this.comentario="";
    this.cantidad=0;
    this.valor_descuento_individual=0;
    this.porcentaje_descuento_individual=0;
    this.valor_porcentaje_descuento_individual=0;
    this.total_descuento_individual=0;
    this.valor_descuento_totales=0;
    this.porcentaje_descuento_totales=0;
    this.valor_porcentaje_descuento_totales=0;
    this.total_descuento_totales=0;
    this.subtotal_sin_descuento=0;
    this.valor_iva_sin_descuento=0;
    this.subtotal_con_descuento=0;
    this.valor_iva_con_descuento=0;
    this.producto=new Producto();
    this.precio=new Precio();
    this.medida=new Medida();
    this.caracteristicas=[];
  }

  private calcular_subtotal_sin_descuento(){
    this.subtotal_sin_descuento=0;
    this.subtotal_sin_descuento=Number(this.cantidad)*this.precio.valor;
    this.subtotal_sin_descuento= Number(this.subtotal_sin_descuento.toFixed(2));
  }
  private calcular_valor_porcentaje_descuento(){
    this.valor_porcentaje_descuento_individual=0;
    this.valor_porcentaje_descuento_individual=Number(this.subtotal_sin_descuento)*Number(this.porcentaje_descuento_individual)/100;
    this.valor_porcentaje_descuento_individual= Number(this.valor_porcentaje_descuento_individual.toFixed(2));
  }
  private calcular_total_descuento(){
    this.total_descuento_individual=0;
    this.total_descuento_individual=Number(this.valor_descuento_individual)+Number(this.valor_porcentaje_descuento_individual)+Number(this.valor_descuento_totales)+Number(this.valor_porcentaje_descuento_totales);    
    this.total_descuento_individual= Number(this.total_descuento_individual.toFixed(2));
  }
  private calcular_valor_iva_sin_descuento(){
    this.valor_iva_sin_descuento=0;
    this.valor_iva_sin_descuento=this.subtotal_sin_descuento*this.producto.impuesto.porcentaje/100;
    this.valor_iva_sin_descuento= Number(this.valor_iva_sin_descuento.toFixed(2));
  }
  private calcular_subtotal_con_descuento(){
    this.subtotal_con_descuento=0;
    this.subtotal_con_descuento=Number(this.subtotal_sin_descuento)-Number(this.total_descuento_individual);
    this.subtotal_con_descuento= Number(this.subtotal_con_descuento.toFixed(2));
  }
  private calcular_valor_iva_con_descuento(){
    this.valor_iva_con_descuento=0;
    this.valor_iva_con_descuento=Number(this.subtotal_con_descuento)*Number(this.producto.impuesto.porcentaje/100);
    this.valor_iva_con_descuento= Number(this.valor_iva_con_descuento.toFixed(2));
  }

  //CALCULAR TOTALES
  private calcular_valor_descuento_individual_general(factura:Factura){
    if (factura.subtotal_sin_descuento>0){
      this.valor_descuento_individual=factura.valor_descuento_subtotal*this.subtotal_sin_descuento/factura.subtotal_sin_descuento;
      this.valor_descuento_individual= Number(this.valor_descuento_individual.toFixed(2));
    }
  }
  private calcular_porcentaje_descuento_individual_general(factura: Factura){
    this.porcentaje_descuento_individual=Number(factura.porcentaje_descuento_subtotal);
    this.porcentaje_descuento_individual= Number(this.porcentaje_descuento_individual.toFixed(2));
  }
  private calcular_valor_descuento_totales(factura: Factura){
    if (this.producto.impuesto.porcentaje>0){
      this.valor_descuento_totales=((Number(factura.valor_descuento_total)*this.subtotal_sin_descuento)/factura.subtotal_sin_descuento)/((100+this.producto.impuesto.porcentaje)/100);
    } else{
      this.valor_descuento_totales=((Number(factura.valor_descuento_total)*this.subtotal_sin_descuento)/factura.subtotal_sin_descuento);
    }
    this.valor_descuento_totales=Number(this.valor_descuento_totales.toFixed(2));
  }
  private calcular_valor_porcentaje_descuento_totales(factura: Factura){
    if (this.producto.impuesto.porcentaje>0){
      this.valor_porcentaje_descuento_totales=((factura.valor_porcentaje_descuento_total*this.subtotal_sin_descuento)/factura.subtotal_sin_descuento)/((100+this.producto.impuesto.porcentaje)/100);
    } else {
      this.valor_porcentaje_descuento_totales=((factura.valor_porcentaje_descuento_total*this.subtotal_sin_descuento)/factura.subtotal_sin_descuento);
    }
    this.valor_porcentaje_descuento_totales=Number(this.valor_porcentaje_descuento_totales.toFixed(2));
  }
  private calcular_porcentaje_descuento_totales(factura: Factura){
    this.porcentaje_descuento_totales=this.valor_porcentaje_descuento_totales/this.subtotal_sin_descuento;
    this.porcentaje_descuento_totales= Number(this.porcentaje_descuento_totales.toFixed(2));
  }
  //FIN CALCULAR TOTALES

  calcular(){
    this.calcular_subtotal_sin_descuento();
    this.calcular_valor_porcentaje_descuento();
    this.calcular_total_descuento();
    this.calcular_valor_iva_sin_descuento();
    this.calcular_subtotal_con_descuento();
    this.calcular_valor_iva_con_descuento();
  }
  calcular_totales(factura: Factura){
    this.calcular_valor_descuento_individual_general(factura);
    this.calcular_porcentaje_descuento_individual_general(factura);
    this.calcular_valor_descuento_totales(factura);
    this.calcular_valor_porcentaje_descuento_totales(factura);
    this.calcular_porcentaje_descuento_totales(factura);
  }
}
