import { Injectable } from '@angular/core';
import { OrigenIngreso } from '../modelos/origen-ingreso';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrigenIngresoService {

  constructor(private http: HttpClient) { }

  crear(origen_ingreso: OrigenIngreso): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.origen_ingreso, JSON.stringify(origen_ingreso), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(origen_ingreso_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.origen_ingreso + '/' + origen_ingreso_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.origen_ingreso, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(origen_ingreso: OrigenIngreso): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.origen_ingreso, JSON.stringify(origen_ingreso), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(origen_ingreso: OrigenIngreso): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.origen_ingreso + '/' + origen_ingreso.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
