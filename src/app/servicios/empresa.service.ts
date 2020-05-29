import { Injectable } from '@angular/core';
import { Empresa } from '../modelos/empresa';
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
export class EmpresaService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(empresa: Empresa): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.empresa, JSON.stringify(empresa), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(empresa: Empresa): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.empresa + '/' + empresa.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.empresa, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(empresa: Empresa): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.empresa, JSON.stringify(empresa), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(empresa: Empresa): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.empresa + '/' + empresa.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
