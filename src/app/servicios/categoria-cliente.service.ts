import { Injectable } from '@angular/core';
import { CategoriaCliente } from '../modelos/categoria-cliente';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaClienteService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  enviar(categoria_cliente_id: number) {
    this.messageSource.next(categoria_cliente_id);
  }

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

  async obtenerAsync(categoria_cliente_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.categoria_cliente + '/' + categoria_cliente_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.categoria_cliente, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  buscar(categoria_cliente: CategoriaCliente): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.categoria_cliente+util.buscar, categoria_cliente, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
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
