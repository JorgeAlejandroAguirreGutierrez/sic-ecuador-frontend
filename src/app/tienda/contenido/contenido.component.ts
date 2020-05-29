import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../shared/product.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {

  @Input() product: Product;
  @Output() productoAgregar = new EventEmitter();

  cantidadAgregar:Number;
  cantidadTotalUnidadesDisponibles:number;

  detailViewActive: boolean;

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.detailViewActive = false;
    this.cantidadTotalUnidadesDisponibles = this.product.unidadesDisponibles;
  }

  onProductClick() {
    this.detailViewActive = !this.detailViewActive;
  }

  onAddToCart() {
    this.cartService.addProductToCart(this.product);
  }

  agregarProductoAlCarrito(){
    this.product.unidadesDisponibles = this.cantidadTotalUnidadesDisponibles;
    this.productoAgregar.emit(
      {
        producto:this.product, 
        cantidad:this.cantidadAgregar
      }
    );
  }
  calcularUnidadesDisponibles(val:number){
    this.cantidadTotalUnidadesDisponibles = this.product.unidadesDisponibles-val;
  }
}
