import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductosService } from '../service/productos.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {

  @Input() product: Product;
  @Output() productoAgregar = new EventEmitter();

  cantidadAgregar:number=1;
  cantidadTotalUnidadesDisponibles:number;

  detailViewActive: boolean;

  constructor(private productosService: ProductosService) {

  }

  ngOnInit() {
    this.detailViewActive = false;
    this.cantidadTotalUnidadesDisponibles = this.product.unidadesDisponibles;
  }

  onProductClick() {
    this.detailViewActive = !this.detailViewActive;
  }

  //onAddToCart() {
  //  this.productosService.addProductToCart(this.product);
  //}

  agregarProductoAlCarrito(){
    //car 1
    this.productosService.addProductToCart(this.product, this.cantidadAgregar);
    //car 2
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
