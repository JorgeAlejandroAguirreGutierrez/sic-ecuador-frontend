import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { FranquiciaTarjeta } from '../modelos/franquicia-tarjeta';

@Injectable({
  providedIn: 'root'
})
export class FranquiciaTarjetaService {

  constructor(private http: HttpClient) { }

  crear(franquicia_tarjeta: FranquiciaTarjeta): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.franquicia_tarjeta, JSON.stringify(franquicia_tarjeta), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(franquicia_tarjeta_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.banco + '/' + franquicia_tarjeta_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.franquicia_tarjeta, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(franquicia_tarjeta: FranquiciaTarjeta): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.banco, JSON.stringify(franquicia_tarjeta), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(franquicia_tarjeta: FranquiciaTarjeta): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.banco + '/' + franquicia_tarjeta.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
