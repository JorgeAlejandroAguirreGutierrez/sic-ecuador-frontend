import { Injectable } from '@angular/core';
import { GrupoCliente } from '../modelos/grupo-cliente';
import { Respuesta } from '../respuesta';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoClienteService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(grupo_cliente: GrupoCliente): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.grupo_cliente, JSON.stringify(grupo_cliente), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(ubicacion_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_cliente + '/' + ubicacion_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.grupo_cliente, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(grupo_cliente: GrupoCliente): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.grupo_cliente, JSON.stringify(grupo_cliente), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(grupo_cliente: GrupoCliente): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.grupo_cliente + '/' + grupo_cliente.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
