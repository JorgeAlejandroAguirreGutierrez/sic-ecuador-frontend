import { Injectable } from '@angular/core';
import { CategoriaCliente } from '../modelos/categoria-cliente';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaClienteService {

  constructor(private http: HttpClient) { }

  crear(categoria_cliente: CategoriaCliente): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.categoria_cliente, JSON.stringify(categoria_cliente), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(categoria_cliente_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.categoria_cliente + '/' + categoria_cliente_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.categoria_cliente, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(categoria_cliente: CategoriaCliente): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.categoria_cliente, JSON.stringify(categoria_cliente), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(categoria_cliente: CategoriaCliente): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.categoria_cliente + '/' + categoria_cliente.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
