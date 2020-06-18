import { Injectable } from '@angular/core';
import { ModeloTabla } from '../modelos/modelo-tabla';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeloTablaService {

  constructor(private http: HttpClient) { }

  crear(modelo_tabla: ModeloTabla): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.modelo_tabla, JSON.stringify(modelo_tabla), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(modelo_tabla_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.modelo_tabla + '/' + modelo_tabla_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.modelo_tabla, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(modelo_tabla: ModeloTabla): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.modelo_tabla, JSON.stringify(modelo_tabla), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(modelo_tabla: ModeloTabla): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.modelo_tabla + '/' + modelo_tabla.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
