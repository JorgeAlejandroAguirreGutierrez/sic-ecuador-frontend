import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
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
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(usuario: Usuario): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.usuario, JSON.stringify(usuario), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(usuario_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.usuario + '/' + usuario_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.usuario, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(usuario: Usuario): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.usuario, JSON.stringify(usuario), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(usuario: Usuario): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.servicio + '/' + usuario.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
