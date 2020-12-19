import { Injectable } from '@angular/core';
import { PresentacionProducto } from '../modelos/presentacion-producto';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresentacionProductoService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  enviar(presentacion_producto_id: number) {
    this.messageSource.next(presentacion_producto_id);
  }

  crear(presentacion_producto: PresentacionProducto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.presentacion_producto, presentacion_producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(presentacion_producto_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.presentacion_producto + '/' + presentacion_producto_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async obtenerAsync(presentacion_producto_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.presentacion_producto + '/' + presentacion_producto_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.presentacion_producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  buscar(presentacion_producto: PresentacionProducto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.presentacion_producto+util.buscar, presentacion_producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizar(presentacion_producto: PresentacionProducto): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.presentacion_producto, presentacion_producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(presentacion_producto: PresentacionProducto): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.presentacion_producto + '/' + presentacion_producto.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
