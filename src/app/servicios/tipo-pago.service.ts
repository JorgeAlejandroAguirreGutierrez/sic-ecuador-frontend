import { Injectable } from '@angular/core';
import { TipoPago } from '../modelos/tipo-pago';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(grupo_cliente_id: number) {
    this.messageSource.next(grupo_cliente_id);
  }

  crear(tipo_pago: TipoPago): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.tipo_pago, JSON.stringify(tipo_pago), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(tipo_pago_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.tipo_pago + '/' + tipo_pago_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.tipo_pago, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(tipo_pago_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.tipo_pago + '/' + tipo_pago_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  buscar(tipo_pago: TipoPago): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.tipo_pago+util.buscar+'/'+tipo_pago.codigo + '/'+tipo_pago.descripcion+'/'+tipo_pago.abreviatura, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizar(tipo_pago: TipoPago): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.tipo_pago, JSON.stringify(tipo_pago), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(tipo_pago: TipoPago): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.tipo_pago + '/' + tipo_pago.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
