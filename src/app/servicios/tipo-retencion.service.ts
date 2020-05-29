import { Injectable } from '@angular/core';
import { TipoRetencion } from '../modelos/tipo-retencion';
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
export class TipoRetencionService {

  constructor(private http: HttpClient, private router: Router) { }

  obtenerIvaBien(): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.tipo_retencion + '/ivabien', util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerIvaServicio(): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.tipo_retencion + '/ivaservicio', util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  obtenerRentaBien(): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.tipo_retencion + '/rentabien', util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  obtenerRentaServicio(): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.tipo_retencion + '/rentaservicio', util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
