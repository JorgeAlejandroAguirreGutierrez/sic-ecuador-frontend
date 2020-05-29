import { Injectable } from '@angular/core';
import { PuntoVenta } from '../modelos/punto-venta';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError, switchAll } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuntoVentaService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(punto_venta: PuntoVenta): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.punto_venta, JSON.stringify(punto_venta), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(usuario_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.punto_venta + '/' + usuario_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.punto_venta, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(punto_venta: PuntoVenta): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.punto_venta, JSON.stringify(punto_venta), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(punto_venta: PuntoVenta): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.servicio + '/' + punto_venta.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
