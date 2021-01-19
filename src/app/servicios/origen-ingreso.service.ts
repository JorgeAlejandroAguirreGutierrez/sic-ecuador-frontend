import { Injectable } from '@angular/core';
import { OrigenIngreso } from '../modelos/origen-ingreso';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrigenIngresoService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(grupo_cliente_id: number) {
    this.messageSource.next(grupo_cliente_id);
  }

  crear(origen_ingreso: OrigenIngreso): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.origen_ingreso, JSON.stringify(origen_ingreso), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(origen_ingreso_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.origen_ingreso + '/' + origen_ingreso_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.origen_ingreso, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(origen_ingreso_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.origen_ingreso + '/' + origen_ingreso_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  buscar(origen_ingreso: OrigenIngreso): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.origen_ingreso+util.buscar, origen_ingreso, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizar(origen_ingreso: OrigenIngreso): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.origen_ingreso, JSON.stringify(origen_ingreso), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(origen_ingreso: OrigenIngreso): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.origen_ingreso + '/' + origen_ingreso.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
