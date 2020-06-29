import { Injectable } from '@angular/core';
import { FormaPago } from '../modelos/forma-pago';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  constructor(private http: HttpClient) { }

  crear(forma_pago: FormaPago): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.forma_pago, JSON.stringify(forma_pago), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(forma_pago_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.forma_pago + '/' + forma_pago_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.forma_pago, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(forma_pago: FormaPago): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.forma_pago, JSON.stringify(forma_pago), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(forma_pago: FormaPago): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.forma_pago + '/' + forma_pago.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
