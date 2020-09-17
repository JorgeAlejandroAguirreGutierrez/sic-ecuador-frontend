import { Injectable } from '@angular/core';
import { FormaPago } from '../modelos/forma-pago';
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
export class FormaPagoService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(forma_pago_id: number) {
    this.messageSource.next(forma_pago_id);
  }

  crear(forma_pago: FormaPago): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.forma_pago, JSON.stringify(forma_pago), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(forma_pago_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.forma_pago + '/' + forma_pago_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.forma_pago, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(forma_pago_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.forma_pago + '/' + forma_pago_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  actualizar(forma_pago: FormaPago): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.forma_pago, JSON.stringify(forma_pago), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(forma_pago: FormaPago): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.forma_pago + '/' + forma_pago.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(forma_pago: FormaPago): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.forma_pago+util.buscar+'/'+forma_pago.codigo + '/'+forma_pago.descripcion+'/'+forma_pago.abreviatura, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
