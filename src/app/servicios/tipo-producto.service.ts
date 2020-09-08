import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoProducto } from '../modelos/tipo-producto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  constructor(private http: HttpClient) { }

  crear(tipo_producto: TipoProducto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.tipo_producto, JSON.stringify(tipo_producto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(tipo_producto: TipoProducto): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.tipo_producto + '/' + tipo_producto.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.tipo_producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(tipo_producto: TipoProducto): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.tipo_producto, JSON.stringify(tipo_producto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(tipo_gasto: TipoProducto): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.banco + '/' + tipo_gasto.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
