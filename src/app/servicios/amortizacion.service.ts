import { Injectable } from '@angular/core';
import { ModeloTabla } from '../modelos/modelo-tabla';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Amortizacion } from '../modelos/Amortizacion';

@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {

  constructor(private http: HttpClient) { }

  crear(amortizacion: Amortizacion): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.amortizacion, JSON.stringify(amortizacion), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(amortizacion_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.amortizacion + '/' + amortizacion_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.amortizacion, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(amortizacion: ModeloTabla): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.amortizacion, JSON.stringify(amortizacion), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(amortizacion: Amortizacion): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.amortizacion + '/' + amortizacion.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
