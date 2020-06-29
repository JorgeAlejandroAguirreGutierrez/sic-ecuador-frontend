import { Injectable } from '@angular/core';
import { CategoriaCliente } from '../modelos/categoria-cliente';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../modelos/producto';
import { Bodega } from '../modelos/bodega';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  crear(producto: Producto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.producto, JSON.stringify(producto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(producto: Producto): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.producto + '/' + producto.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  consultarBien(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.producto+util.tipo+util.bien, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  consultarServicio(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.producto+util.tipo+util.servicio, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  consultarActivoFijo(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.producto+util.tipo+util.activo_fijo, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(producto: Producto): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.producto, JSON.stringify(producto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(producto: Producto): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.producto + '/' + producto.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
