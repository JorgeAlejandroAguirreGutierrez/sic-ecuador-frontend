import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { MedidaPrecio } from '../modelos/medida-precio';

@Injectable({
  providedIn: 'root'
})
export class MedidaPrecioService {

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  enviar(medida_precio_id: number) {
    this.messageSource.next(medida_precio_id);
  }

  crear(medida_precio: MedidaPrecio): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.medida_precio, medida_precio, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(medida_precio_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.medida_precio + '/' + medida_precio_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async obtenerAsync(medida_precio_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.medida_precio + '/' + medida_precio_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.medida_precio, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(medida_precio: MedidaPrecio): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.medida, medida_precio, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(medida_precio: MedidaPrecio): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.medida_precio + '/' + medida_precio.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(medida_precio: MedidaPrecio): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.medida_precio+util.buscar, medida_precio, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
