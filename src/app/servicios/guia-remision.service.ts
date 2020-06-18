import { Injectable } from '@angular/core';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { GuiaRemision } from '../modelos/guia-remision';

@Injectable({
  providedIn: 'root'
})
export class GuiaRemisionService {

  constructor(private http: HttpClient) { }

  crear(guia_remision: GuiaRemision): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.guia_remision, JSON.stringify(guia_remision), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(guia_remision_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.guia_remision + '/' + guia_remision_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.guia_remision, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(guia_remision: GuiaRemision): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.entrega, JSON.stringify(guia_remision), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(guia_remision: GuiaRemision): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.amortizacion + '/' + guia_remision.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
