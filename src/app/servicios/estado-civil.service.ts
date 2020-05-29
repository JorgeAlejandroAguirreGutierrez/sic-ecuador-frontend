import { Injectable } from '@angular/core';
import { EstadoCivil } from '../modelos/estado-civil';
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
export class EstadoCivilService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(estado_civil: EstadoCivil): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.estado_civil, JSON.stringify(estado_civil), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(estado_civil_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.estado_civil + '/' + estado_civil_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.estado_civil, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(estado_civil: EstadoCivil): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.estado_civil, JSON.stringify(estado_civil), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(estado_civil: EstadoCivil): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.estado_civil + '/' + estado_civil.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
