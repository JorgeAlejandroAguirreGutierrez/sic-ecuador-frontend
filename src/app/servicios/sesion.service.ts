import { Injectable } from '@angular/core';
import { Sesion } from '../modelos/sesion';
import { Resultado } from '../resultado';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient, private router: Router) { }

  obtenerIP(): Observable<string> {
    return this.http.get('https://api.ipify.org?format=json').pipe(
      map(response => response['ip'] as string),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  crear(sesion: Sesion): Observable<Resultado> {
    console.log(sesion);
    return this.http.post(environment.host + util.ruta + util.sesion, JSON.stringify(sesion), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  setSesion(sesion: Sesion) {
    localStorage.setItem('sesion', JSON.stringify(sesion));

  }

  getSesion(): Sesion {
    return JSON.parse(localStorage.getItem('sesion'));
  }
}
