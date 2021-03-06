import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bodega } from '../modelos/bodega';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  enviar(bodega_id: number) {
    this.messageSource.next(bodega_id);
  }

  crear(bodega: Bodega): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.bodega, JSON.stringify(bodega), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(bodega_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.bodega + '/' + bodega_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async obtenerAsync(bodega_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.bodega + '/' + bodega_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.bodega, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(bodega: Bodega): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.bodega, JSON.stringify(bodega), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(bodega: Bodega): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.bodega + '/' + bodega.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscarCodigo(bodega: Bodega): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.bodega+util.buscar+util.codigo+'/'+bodega.codigo, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
