import { Injectable } from '@angular/core';
import { Impuesto } from '../modelos/impuesto';
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
export class ImpuestoService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(impuesto: Impuesto): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.impuesto, JSON.stringify(impuesto), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.impuesto, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(plazo_credito_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.impuesto + '/' + plazo_credito_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  obtenerImpuestoPorcentaje(porcentaje: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.impuesto + util.impuesto_porcentaje+'/'+porcentaje, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(impuesto: Impuesto): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.impuesto, JSON.stringify(impuesto), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(impuesto: Impuesto): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.impuesto + '/' + impuesto.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
