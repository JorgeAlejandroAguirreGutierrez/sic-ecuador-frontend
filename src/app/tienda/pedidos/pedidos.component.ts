import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductosService } from '../service/productos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  productosEnCarrito:Product[];
  cantidadAgregados:number;
  totalAPagar:number = 0;
  constructor(private productosService:ProductosService,private location: Location) { }

  ngOnInit() {
    this.productosEnCarrito = this.productosService.getProductosAgregadosAlCarrito();
    this.cantidadAgregados = this.productosEnCarrito.length;
    for (var index = 0; index < this.productosEnCarrito.length; index++) {
      var element:Product = this.productosEnCarrito[index];
      //const precio = parseFloat(element.price.replace(/\./g, '').replace(',', '.'));
      this.totalAPagar += parseFloat(element.price) * element.cantidadAComprar;

    }
  }


  goBack(): void {
      this.location.back();
  }

  cancelarPedidos():void{
    this.productosService.cleanProductosAgregadosAlCarrito();
    this.goBack();
  }

  pagarPedidos(): void{
    for (var index = 0; index < this.productosEnCarrito.length; index++) {
      var element:Product = this.productosEnCarrito[index];
      this.productosService.addPedido(element);
    }
    this.productosService.cleanProductosAgregadosAlCarrito();
    this.goBack();
  }

}
