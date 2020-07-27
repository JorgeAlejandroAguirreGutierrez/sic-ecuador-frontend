import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoComprobante } from '../modelos/tipo-comprobante';

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService {

  constructor(private http: HttpClient) { }

  crear(tipo_comprobante: TipoComprobante): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.tipo_comprobante, JSON.stringify(tipo_comprobante), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(tipo_comprobante_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.tipo_comprobante + '/' + tipo_comprobante_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.tipo_comprobante, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(tipo_comprobante: TipoComprobante): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.tipo_comprobante, JSON.stringify(tipo_comprobante), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(tipo_comprobante: TipoComprobante): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.tipo_comprobante + '/' + tipo_comprobante.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
