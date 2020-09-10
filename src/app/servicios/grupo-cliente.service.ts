import { Injectable } from '@angular/core';
import { GrupoCliente } from '../modelos/grupo-cliente';
import { Respuesta } from '../respuesta';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoClienteService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(grupo_cliente_id: number) {
    this.messageSource.next(grupo_cliente_id);
  }


  crear(grupo_cliente: GrupoCliente): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.grupo_cliente, JSON.stringify(grupo_cliente), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(grupo_cliente_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_cliente + '/' + grupo_cliente_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async obtenerAsync(grupo_cliente_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_cliente + '/' + grupo_cliente_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.grupo_cliente, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  buscar(grupo_cliente: GrupoCliente): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.grupo_cliente+util.buscar+'/'+grupo_cliente.codigo + '/'+grupo_cliente.descripcion+'/'+grupo_cliente.abreviatura, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
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
