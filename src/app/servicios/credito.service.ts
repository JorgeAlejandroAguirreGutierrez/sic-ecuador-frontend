import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Credito } from '../modelos/credito';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  constructor(private http: HttpClient) { }

  crear(credito: Credito): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.credito, JSON.stringify(credito), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(credito_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.credito + '/' + credito_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.credito, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(credito: Credito): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.credito, JSON.stringify(credito), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(credito: Credito): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.credito + '/' + credito.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  construir(credito: Credito): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.credito+"/construir?saldo="+credito.saldo
    +"&periodicidad="+credito.periodicidad+"&periodicidad_numero="+credito.periodicidad_numero
    +"&periodicidad_total="+credito.periodicidad_total+"&cuotas="+credito.cuotas
    +"&fecha_primera_cuota="+credito.fecha_primera_cuota+"&tipo="+credito.tipo+"&sin_intereses="+credito.sin_intereses, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }
}
