import { Injectable } from '@angular/core';
import { VehiculoTransporte } from '../modelos/vehiculo-transporte';
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
export class VehiculoTransporteService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(vehiculo_transporte: VehiculoTransporte): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.vehiculo_transporte, JSON.stringify(vehiculo_transporte), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.vehiculo_transporte, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(vehiculo_transporte_id: number): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.vehiculo_transporte+'/' + vehiculo_transporte_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(vehiculo_transporte: VehiculoTransporte): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.vehiculo_transporte, JSON.stringify(vehiculo_transporte), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(vehiculo_transporte: VehiculoTransporte): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.servicio + '/' + vehiculo_transporte.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
