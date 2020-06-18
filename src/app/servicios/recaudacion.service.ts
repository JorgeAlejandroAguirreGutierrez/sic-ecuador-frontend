import { Injectable } from '@angular/core';
import { Resultado } from '../resultado';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Recaudacion } from '../modelos/recaudacion';

@Injectable({
  providedIn: 'root'
})
export class RecaudacionService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(recaudacion: Recaudacion): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.recaudacion, JSON.stringify(recaudacion), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(usuario_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.recaudacion + '/' + usuario_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.recaudacion, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(recaudacion: Recaudacion): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.recaudacion, JSON.stringify(recaudacion), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(recaudacion: Recaudacion): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.recaudacion + '/' + recaudacion.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
