import { Injectable } from '@angular/core';
import { ModeloTabla } from '../modelos/modelo-tabla';
import { Respuesta } from '../respuesta';
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

  crear(modelo_tabla: ModeloTabla): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.modelo_tabla, JSON.stringify(modelo_tabla), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(modelo_tabla_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.modelo_tabla + '/' + modelo_tabla_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.modelo_tabla, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(modelo_tabla: ModeloTabla): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.modelo_tabla, JSON.stringify(modelo_tabla), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(modelo_tabla: ModeloTabla): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.modelo_tabla + '/' + modelo_tabla.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
