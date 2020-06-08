import { Injectable } from '@angular/core';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { OperadorTarjeta } from '../modelos/operador-tarjeta';

@Injectable({
  providedIn: 'root'
})
export class OperadorTarjetaService {

  constructor(private http: HttpClient) { }

  crear(operador_tarjeta: OperadorTarjeta): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.operador_tarjeta, JSON.stringify(operador_tarjeta), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(operador_tarjeta_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.banco + '/' + operador_tarjeta_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.operador_tarjeta, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(operador_tarjeta: OperadorTarjeta): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.banco, JSON.stringify(operador_tarjeta), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(operador_tarjeta: OperadorTarjeta): Observable<Resultado> {
    return this.http.delete(environment.host + util.ruta+util.banco + '/' + operador_tarjeta.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
