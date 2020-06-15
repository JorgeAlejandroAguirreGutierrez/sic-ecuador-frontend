import { Injectable } from '@angular/core';
import { ModeloTabla } from '../modelos/modelo-tabla';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Entrega } from '../modelos/entrega';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  constructor(private http: HttpClient) { }

  crear(entrega: Entrega): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.entrega, JSON.stringify(entrega), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(entrega_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.entrega + '/' + entrega_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.entrega, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(entrega: Entrega): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.entrega, JSON.stringify(entrega), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(entrega: Entrega): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.amortizacion + '/' + entrega.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
