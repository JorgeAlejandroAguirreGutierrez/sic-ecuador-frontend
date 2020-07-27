import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Banco } from '../modelos/banco';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient) { }

  crear(banco: Banco): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.banco, JSON.stringify(banco), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(banco_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.banco + '/' + banco_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.banco, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(banco: Banco): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.banco, JSON.stringify(banco), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(banco: Banco): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.banco + '/' + banco.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
