import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Banco } from '../modelos/banco';
import { TipoGasto } from '../modelos/tipo-gasto';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoService {

  constructor(private http: HttpClient) { }

  crear(tipo_gasto: TipoGasto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.tipo_gasto, JSON.stringify(tipo_gasto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(tipo_gasto: TipoGasto): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.tipo_gasto + '/' + tipo_gasto.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.tipo_gasto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(tipo_gasto: TipoGasto): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.banco, JSON.stringify(tipo_gasto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(tipo_gasto: TipoGasto): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.banco + '/' + tipo_gasto.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
