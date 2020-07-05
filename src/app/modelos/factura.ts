import { Cliente } from '../modelos/cliente';
import { Auxiliar } from '../modelos/auxiliar';
import { Usuario } from '../modelos/usuario';
import { FacturaDetalle } from './factura-detalle';
import { Sesion } from './sesion';

export class Factura {
  id: number;
  codigo: string;
  numero: string;
  fecha: Date;
  estado: boolean;
  eliminado: boolean;

  subtotal_sin_descuento: number;
  subtotal_con_descuento: number;
  descuento_total: number;
  subtotal_base12_sin_descuento: number;
  subtotal_base0_sin_descuento: number;
  subtotal_base12_con_descuento: number;
  subtotal_base0_con_descuento: number;
  importe_iva_sin_descuento: number;
  importe_iva_con_descuento: number;
  total_sin_descuento: number;
  total_con_descuento: number;

  //DESCUENTO_GENERAL
  valor_descuento_subtotal: number=0;
  porcentaje_descuento_subtotal: number=0;
  valor_porcentaje_descuento_subtotal: number= 0;
  valor_descuento_total: number=0;
  porcentaje_descuento_total: number=0;
  valor_porcentaje_descuento_total: number= 0;
  //FIN DESCUENTO_GENERAL

  comentario: string;

  cliente: Cliente;
  cliente_factura:Cliente;
  auxiliar: Auxiliar;
  vendedor: Usuario;
  sesion: Sesion;
  factura_detalles: FacturaDetalle[];
  
  constructor() {
    this.id=0;
    this.fecha=new Date();
    this.estado=true;
    this.eliminado=false;
    this.cliente=new Cliente();
    this.cliente_factura=new Cliente();
    this.auxiliar=null;
    this.vendedor=new Usuario();
    this.factura_detalles=[];
    this.comentario="";

    this.subtotal_sin_descuento=0;
    this.subtotal_con_descuento=0;
    this.descuento_total=0;
    this.subtotal_base12_sin_descuento=0;
    this.subtotal_base0_sin_descuento=0;
    this.subtotal_base12_con_descuento=0;
    this.subtotal_base0_con_descuento=0;
    this.importe_iva_sin_descuento=0;
    this.importe_iva_con_descuento=0;
    this.total_sin_descuento=0;
    this.total_con_descuento=0;

    
  }

  construir(){
    if (this.cliente==null) this.cliente=new Cliente();
    if (this.cliente_factura==null) this.cliente_factura=new Cliente();
    if (this.vendedor==null) this.vendedor=new Usuario();
    if (this.sesion==null) this.sesion=new Sesion();
    if (this.factura_detalles==null) this.factura_detalles=[];
 }

  private calcular_subtotal_sin_descuento(){
    this.subtotal_sin_descuento=0;
    this.factura_detalles.forEach((detalle, index)=> {
      this.subtotal_sin_descuento+=detalle.total_sin_descuento;
    });
    this.subtotal_sin_descuento=Number(this.subtotal_sin_descuento.toFixed(2));
  }

  private calcular_subtotal_con_descuento(){
    this.subtotal_con_descuento=0;
    this.factura_detalles.forEach((detalle, index)=> {
      this.subtotal_con_descuento+=detalle.total_con_descuento;
    });
    this.subtotal_con_descuento=Number(this.subtotal_con_descuento.toFixed(2));
  }

  private calcular_descuento_total(){
    this.descuento_total=0;
    this.factura_detalles.forEach((detalle, index)=> {
      this.descuento_total+=detalle.total_descuento_individual;
    });
    this.descuento_total= Number(this.descuento_total.toFixed(2));
  }

  private calcular_subtotal_base12_sin_descuento(){
    this.subtotal_base12_sin_descuento=0;
    this.factura_detalles.forEach((detalle, index)=> {
      if (detalle.impuesto.porcentaje==12){
        this.subtotal_base12_sin_descuento+=detalle.total_sin_descuento;
      }
    });
    this.subtotal_base12_sin_descuento= Number(this.subtotal_base12_sin_descuento.toFixed(2));
  }

  private calcular_subtotal_base0_sin_descuento(){
    this.subtotal_base0_sin_descuento=0;
    this.factura_detalles.forEach((detalle, index)=> {
      if (detalle.impuesto.porcentaje==0){
        this.subtotal_base0_sin_descuento+=detalle.total_sin_descuento;
      }
    });
    this.subtotal_base0_sin_descuento=Number(this.subtotal_base0_sin_descuento.toFixed(2));
  }

  private calcular_subtotal_base12_con_descuento(){
    this.subtotal_base12_con_descuento=0;
    this.factura_detalles.forEach((detalle, index)=> {
      if (detalle.impuesto.porcentaje==12){
        this.subtotal_base12_con_descuento+=detalle.total_con_descuento;
      }
    });
    this.subtotal_base12_con_descuento= Number(this.subtotal_base12_con_descuento.toFixed(2));
  }

  private calcular_subtotal_base0_con_descuento(){
    this.subtotal_base0_con_descuento=0;
    this.factura_detalles.forEach((detalle, index)=> {
      if (detalle.impuesto.porcentaje==0){
        this.subtotal_base0_con_descuento+=detalle.total_con_descuento;
      }
    });
    this.subtotal_base0_con_descuento=Number(this.subtotal_base0_con_descuento.toFixed(2));
  }

  private calcular_importe_iva_sin_descuento(){
    this.importe_iva_sin_descuento=0;
    this.importe_iva_sin_descuento=this.subtotal_base12_sin_descuento*12/100;
    this.importe_iva_sin_descuento=Number(this.importe_iva_sin_descuento.toFixed(2));
  }
  private calcular_importe_iva_con_descuento(){ 
    this.importe_iva_con_descuento=0;
    this.importe_iva_con_descuento=this.subtotal_base12_con_descuento*12/100;
    this.importe_iva_con_descuento= Number(this.importe_iva_con_descuento.toFixed(2));
  }
  private calcular_total_sin_descuento(){
    this.total_sin_descuento=0;
    this.total_sin_descuento=this.subtotal_base0_sin_descuento+this.subtotal_base12_sin_descuento+this.importe_iva_sin_descuento;
    this.total_sin_descuento=Number(this.total_sin_descuento.toFixed(2));
  }
  private calcular_total_con_descuento(){
    this.total_con_descuento=0;
    this.total_con_descuento=this.subtotal_base0_con_descuento+this.subtotal_base12_con_descuento+this.importe_iva_con_descuento-Number(this.valor_descuento_total);
    this.total_con_descuento=Number(this.total_con_descuento.toFixed(2));
  }
  private calcular_valor_porcentaje_descuento_total(){
    this.valor_porcentaje_descuento_total=this.total_con_descuento*(this.porcentaje_descuento_total/100);
    this.valor_porcentaje_descuento_total=Number(this.valor_porcentaje_descuento_total.toFixed(2));
  }
  calcular(){
    this.calcular_subtotal_sin_descuento();
    this.calcular_subtotal_con_descuento();
    this.calcular_descuento_total();
    this.calcular_subtotal_base12_sin_descuento();
    this.calcular_subtotal_base0_sin_descuento();
    this.calcular_subtotal_base12_con_descuento();
    this.calcular_subtotal_base0_con_descuento();
    this.calcular_importe_iva_sin_descuento();
    this.calcular_importe_iva_con_descuento();
    this.calcular_total_sin_descuento();
    this.calcular_total_con_descuento();
    this.calcular_valor_porcentaje_descuento_total();
  }

  normalizar(){
    if (this.cliente.id==0){
      this.cliente=null;
    }
    if (this.cliente_factura.id==0){
      this.cliente_factura=null;
    }
  }
  des_normalizar(){
    this.cliente=new Cliente();
    this.cliente_factura=new Cliente();
  }
}
