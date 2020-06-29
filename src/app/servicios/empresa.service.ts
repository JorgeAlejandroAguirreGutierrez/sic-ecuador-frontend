import { Injectable } from '@angular/core';
import { Empresa } from '../modelos/empresa';
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
export class EmpresaService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(empresa: Empresa): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.empresa, JSON.stringify(empresa), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(empresa: Empresa): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.empresa + '/' + empresa.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.empresa, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(empresa: Empresa): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.empresa, JSON.stringify(empresa), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(empresa: Empresa): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.empresa + '/' + empresa.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
