import { Injectable } from '@angular/core';
import { CategoriaCliente } from '../modelos/categoria-cliente';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../modelos/producto';
import { Bodega } from '../modelos/bodega';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  enviar(producto_id: number) {
    this.messageSource.next(producto_id);
  }

  crear(producto: Producto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.producto, JSON.stringify(producto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(producto_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.producto + '/' + producto_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async obtenerAsync(producto_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.producto + '/' + producto_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })).toPromise();
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

  buscar(producto: Producto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.producto+util.buscar, producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
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
