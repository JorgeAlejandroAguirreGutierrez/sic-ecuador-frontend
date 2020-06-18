import { Injectable } from '@angular/core';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bodega } from '../modelos/bodega';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  constructor(private http: HttpClient) { }

  crear(bodega: Bodega): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.bodega, JSON.stringify(bodega), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(bodega_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.bodega + '/' + bodega_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.bodega, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(bodega: Bodega): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.bodega, JSON.stringify(bodega), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(bodega: Bodega): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.bodega + '/' + bodega.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
