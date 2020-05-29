import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, of, Observable, throwError } from 'rxjs';
import { CuentaPropia } from '../modelos/cuenta-propia';
import { environment } from '../../environments/environment';
import * as util from '../util';
import { Resultado } from '../resultado';

@Injectable({
  providedIn: 'root'
})
export class CuentaPropiaService {
  
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(cuenta_propia_id: number) {
    this.messageSource.next(cuenta_propia_id);
  }

  crear(cuenta_propia: CuentaPropia): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.cuenta_propia, JSON.stringify(cuenta_propia), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.cuenta_propia, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(factura_id: number): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.cuenta_propia+ '/' + factura_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(cuenta_propia: CuentaPropia): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.cuenta_propia, JSON.stringify(cuenta_propia), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(factura_id: number): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.cuenta_propia + '/' + factura_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
