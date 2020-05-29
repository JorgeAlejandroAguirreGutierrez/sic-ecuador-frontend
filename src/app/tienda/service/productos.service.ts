import { Injectable } from '@angular/core';
import { DatabaseService } from '../db/database.service';
import { Product } from '../shared/product.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class ProductosService {

  productosTemporalesCarrito:Product[]=[];

  constructor(private databaseService:DatabaseService) { 
  }

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
    this.productosTemporalesCarrito.push(producto);
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
