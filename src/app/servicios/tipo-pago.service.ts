import { Injectable } from '@angular/core';
import { TipoPago } from '../modelos/tipo-pago';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  constructor(private http: HttpClient) { }

  crear(tipo_pago: TipoPago): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.tipo_pago, JSON.stringify(tipo_pago), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(tipo_pago_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.tipo_pago + '/' + tipo_pago_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.tipo_pago, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(tipo_pago: TipoPago): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.tipo_pago, JSON.stringify(tipo_pago), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(tipo_pago: TipoPago): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.tipo_pago + '/' + tipo_pago.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
