import { Injectable } from '@angular/core';
import { Genero } from '../modelos/genero';
import { Respuesta } from '../respuesta';
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
export class GeneroService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(genero: Genero): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.genero, JSON.stringify(genero), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(genero_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.genero + '/' + genero_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.genero, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(genero: Genero): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.genero, JSON.stringify(genero), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(genero: Genero): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.genero + '/' + genero.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
