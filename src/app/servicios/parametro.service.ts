import { Injectable } from '@angular/core';
import { Parametro } from '../modelos/parametro';
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
export class ParametroService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(parametro: Parametro): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.parametro, JSON.stringify(parametro), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(parametro: Parametro): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.parametro + '/' + parametro.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.parametro, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(parametro: Parametro): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.parametro, JSON.stringify(parametro), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(parametro: Parametro): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.parametro + '/' + parametro.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerTipo(parametro: Parametro): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.parametro+util.tipo + '/' + parametro.tipo, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }  
}
