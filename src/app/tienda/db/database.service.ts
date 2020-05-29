import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../shared/usuario';
import { Product } from '../shared/product.model';
import { DATA } from '../mock-data';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService{

  constructor(private http: HttpClient) { }
  
  getUsuarios():Promise<Usuario[]>{
    //this.usuarios = [{contrasena: '1234', correo: 'admin@admin.com', nombre: 'Administrador'}];
    //return Promise.resolve(this.usuarios);

    return this.http.get<Usuario[]>('https://tienda-9303e.firebaseio.com/usuarios.json').toPromise().then(response=>response);
          //.then(response  =>  response.json() as Usuario[])
          /*.catch(function(){
            console.log("error");
          });*/
  }

  getProductos():Promise<Product[]>{
    //return this.http.get<Product[]>('https://tienda-9303e.firebaseio.com/productos.json').toPromise().then(response=>response);
    return Promise.resolve(DATA.products);
  }

  getPedidos():Promise<Product[]>{
    return this.http.get<Product[]>('https://tienda-9303e.firebaseio.com/pedidos.json').toPromise();
    
  }

  addPedido(producto:Product):Promise<Product>{
    const data = JSON.stringify(producto);
    var ver = this.http.post<Product[]>('https://tienda-9303e.firebaseio.com/pedidos.json', data)
      .toPromise()
      .then(response  =>  response);
    console.log(ver);
    return ;
  }
  
}
