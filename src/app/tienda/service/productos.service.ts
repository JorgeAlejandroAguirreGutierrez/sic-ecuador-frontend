import { Injectable } from '@angular/core';
import { DatabaseService } from '../db/database.service';
import { Product } from '../shared/product.model';
import { HttpClient } from '@angular/common/http';
//import 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class ProductosService {
//car 1
  products: any[] = []; 
  cartTotal = 0;

  private productAddedSource = new Subject<any>();


  productAdded$ = this.productAddedSource.asObservable();

//Car 2
  productosTemporalesCarrito:Product[]=[]; 

  constructor(private databaseService:DatabaseService) { 
  }

//Car 1
addProductToCart(product:Product, cantidad:number) {
  let exists = false;
  const parsedPrice = parseFloat(product.price.replace(/\./g, '').replace(',', '.'));
  this.cartTotal += parsedPrice;
  // Busca el producto en el carrito e incrementa la cantidad
  this.products = this.products.map(_product => {
    if (_product.product.id === product.id) {
      _product.quantity+=cantidad;
      _product.product.cantidadAComprar = _product.quantity;
      exists = true;
    }
    return _product;
  });
  // Agrega un nuevo producto al carrito si este es un nuevo producto en el carrito
  if (!exists) {
    //product.parsedPrice = parsedPrice; //Habilitar cuando precio sea de tipo float
    product.cantidadAComprar = cantidad;
    this.products.push({
      product: product,
      quantity: cantidad
    });
  }
  //console.log(this.products);
  this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
}

deleteProductFromCart(product) {
  this.products = this.products.filter(_product => {
    if (_product.product.id === product.id) {
      this.cartTotal -= _product.product.parsedPrice * _product.quantity;
      return false;
    }
    return true;
   });
  this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
}
//Igual a clean carrito
flushCart() {
  this.products = [];
  this.cartTotal = 0;
  this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
}

//car 2  
  getProductos():Promise<Product[]>{
    return this.databaseService.getProductos().then(productos => {
      var productoAll:Product[] = productos as Product[];
      return this.databaseService.getPedidos().then(response => {
        let pedidos:Product[]=response as Product[];
        for (let pedido in pedidos) {
          var elementPedido = pedidos[pedido] as Product;
          for (var index = 0; index < productoAll.length; index++) {
            var elementProducto = productoAll[index];
            if(elementProducto.id === elementPedido.id){
              elementProducto.unidadesDisponibles -= elementPedido.cantidadAComprar;
            }
          }
        }
        return productoAll;
      });
    });
  }
  
  getProductosById(id:Number):Promise<Product>{
    // Retorna el producto encontrado una vez que resuelve de forma asyncrona getProductos, es decir:
    // busca el producto por id, (then) solo cuando ha recibido todos los productos de la promesa getProductos()
    return this.getProductos()
    .then(
      productos => {
        let productosAux = productos as Product[];
        var productoEncontrado:Product=undefined;
        for (var index = 0; index < productosAux.length; index++) {
          var element:Product = productosAux[index];
          if(id === element.id){
            productoEncontrado = element;
            break;
          }
        }
        return productoEncontrado;
      }
    );
  }

  agregarProductoAlCarrito(producto:Product):any{
    let exists = false;
    // Busca el producto en el carrito e incrementa la cantidad
    this.productosTemporalesCarrito = this.productosTemporalesCarrito.map(_product => {
      if (_product.id === producto.id) {
        _product.cantidadAComprar+=producto.cantidadAComprar;
        exists = true;
      }
      return _product;
    });
    // Agrega un nuevo producto al carrito si este es un nuevo producto en el carrito
    if (!exists) {
      this.productosTemporalesCarrito.push(producto);
      };
  }

  getProductosAgregadosAlCarrito():Product[]{
    return this.productosTemporalesCarrito;
  }

  cleanProductosAgregadosAlCarrito(){
    this.productosTemporalesCarrito = [];
  }
  
  addPedido(producto:Product):Promise<Product>{
    return this.databaseService.addPedido(producto);
  }
}
