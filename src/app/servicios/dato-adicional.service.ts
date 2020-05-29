import { Injectable } from '@angular/core';
import { DatoAdicional } from '../modelos/dato-adicional';
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
export class DatoAdicionalService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(dato_adicional: DatoAdicional): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.datoadicional, JSON.stringify(dato_adicional), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(dato_adicional_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.datoadicional + '/' + dato_adicional_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.datoadicional, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(dato_adicional: DatoAdicional): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.datoadicional, JSON.stringify(dato_adicional), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(dato_adicional: DatoAdicional): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.datoadicional + '/' + dato_adicional.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
