import { Injectable } from '@angular/core';
import { Establecimiento } from '../modelos/establecimiento';
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
export class EstablecimientoService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(establecimiento: Establecimiento): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.establecimiento, JSON.stringify(establecimiento), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(establecimiento_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.establecimiento + '/' + establecimiento_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.establecimiento, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(establecimiento: Establecimiento): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.establecimiento, JSON.stringify(establecimiento), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(establecimiento: Establecimiento): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.servicio + '/' + establecimiento.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
