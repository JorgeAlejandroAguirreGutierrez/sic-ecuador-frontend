import { Injectable } from '@angular/core';
import { PlazoCredito } from '../modelos/plazo-credito';
import { Resultado } from '../resultado';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlazoCreditoService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(plazo_credito: PlazoCredito): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.plazo_credito, JSON.stringify(plazo_credito), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(plazo_credito_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.plazo_credito + '/' + plazo_credito_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.plazo_credito, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(plazo_credito: PlazoCredito): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.plazo_credito, JSON.stringify(plazo_credito), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(plazo_credito: PlazoCredito): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.plazo_credito + '/' + plazo_credito.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
