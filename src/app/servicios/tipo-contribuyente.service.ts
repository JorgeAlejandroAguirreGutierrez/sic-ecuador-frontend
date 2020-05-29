import { Injectable } from '@angular/core';
import { TipoContribuyente } from '../modelos/tipo-contribuyente';
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
export class TipoContribuyenteService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(tipo_contribuyente: TipoContribuyente): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.tipo_contribuyente, JSON.stringify(tipo_contribuyente), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(tipo_contribuyente_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.tipo_contribuyente + '/' + tipo_contribuyente_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.tipo_contribuyente, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(tipo_contribuyente: TipoContribuyente): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.tipo_contribuyente, JSON.stringify(tipo_contribuyente), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(tipo_contribuyente: TipoContribuyente): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.servicio + '/' + tipo_contribuyente.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
