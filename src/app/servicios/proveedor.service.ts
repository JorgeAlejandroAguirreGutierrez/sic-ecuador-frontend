import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Banco } from '../modelos/banco';
import { Proveedor } from '../modelos/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  crear(proveedor: Proveedor): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.proveedor, JSON.stringify(proveedor), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(proveedor: Proveedor): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.proveedor + '/' + proveedor.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.proveedor, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(proveedor: Proveedor): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta + util.proveedor, JSON.stringify(proveedor), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(proveedor: Proveedor): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta + util.proveedor + '/' + proveedor.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
