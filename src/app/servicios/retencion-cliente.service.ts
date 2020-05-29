import { Injectable } from '@angular/core';
import { RetencionCliente } from '../modelos/retencion-cliente';
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
export class RetencionService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(retencion_cliente: RetencionCliente): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.retencion_cliente, JSON.stringify(retencion_cliente), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(impuesto_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.retencion_cliente + '/' + impuesto_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.retencion_cliente, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(retencion_cliente: RetencionCliente): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.retencion_cliente, JSON.stringify(retencion_cliente), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(retencion_cliente: RetencionCliente): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.retencion_cliente + '/' + retencion_cliente.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
