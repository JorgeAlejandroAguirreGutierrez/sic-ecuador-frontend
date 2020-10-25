import { Injectable } from '@angular/core';
import { PuntoVenta } from '../modelos/punto-venta';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError, switchAll } from 'rxjs/operators';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuntoVentaService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(punto_venta_id: number) {
    this.messageSource.next(punto_venta_id);
  }

  crear(punto_venta: PuntoVenta): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.punto_venta, JSON.stringify(punto_venta), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(punto_venta_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.punto_venta + '/' + punto_venta_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultarEstablecimiento(establecimiento_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.punto_venta+util.establecimiento + '/' + establecimiento_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.punto_venta, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(punto_venta_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.punto_venta + '/' + punto_venta_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }


  actualizar(punto_venta: PuntoVenta): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.punto_venta, JSON.stringify(punto_venta), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(punto_venta: PuntoVenta): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.punto_venta + '/' + punto_venta.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(punto_venta: PuntoVenta): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.usuario+util.buscar+'/'+punto_venta.codigo + '/'+punto_venta.descripcion, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
