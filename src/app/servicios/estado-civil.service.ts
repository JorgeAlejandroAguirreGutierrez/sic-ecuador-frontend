import { Injectable } from '@angular/core';
import { EstadoCivil } from '../modelos/estado-civil';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError, switchAll } from 'rxjs/operators';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(estado_civil_id: number) {
    this.messageSource.next(estado_civil_id);
  }

  crear(estado_civil: EstadoCivil): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.estado_civil, JSON.stringify(estado_civil), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(estado_civil_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.estado_civil + '/' + estado_civil_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.estado_civil, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(estado_civil_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.estado_civil + '/' + estado_civil_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  buscar(estado_civil: EstadoCivil): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.estado_civil+util.buscar, estado_civil, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizar(estado_civil: EstadoCivil): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.estado_civil, JSON.stringify(estado_civil), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(estado_civil: EstadoCivil): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.estado_civil + '/' + estado_civil.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
