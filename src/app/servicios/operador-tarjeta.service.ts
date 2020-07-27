import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
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

  crear(operador_tarjeta: OperadorTarjeta): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.operador_tarjeta, JSON.stringify(operador_tarjeta), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(operador_tarjeta_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.banco + '/' + operador_tarjeta_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.operador_tarjeta, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  consultarTipo(tipo: string): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.operador_tarjeta+util.tipo+"/"+tipo, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(operador_tarjeta: OperadorTarjeta): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.banco, JSON.stringify(operador_tarjeta), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(operador_tarjeta: OperadorTarjeta): Observable<Respuesta> {
    return this.http.delete(environment.host + util.ruta+util.banco + '/' + operador_tarjeta.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
