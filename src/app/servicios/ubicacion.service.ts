import { Injectable } from '@angular/core';
import { Ubicacion } from '../modelos/ubicacion';
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
export class UbicacionService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(ubicacion: Ubicacion): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.ubicacion, JSON.stringify(ubicacion), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async obtener(ubicacion: Ubicacion): Promise<Resultado> {
    return await this.http.get<Resultado>(environment.host + util.ruta + util.ubicacion + '/' + ubicacion.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.ubicacion, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(ubicacion: Ubicacion): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.ubicacion, JSON.stringify(ubicacion), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(ubicacion: Ubicacion): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.ubicacion + '/' + ubicacion.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerProvincias(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.ubicacion + '/provincia', util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerCantones(provincia: string): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.ubicacion + '/provincia/'+provincia+'/canton', util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerParroquias(canton: string): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.ubicacion + '/provincia/canton/'+canton+'/parroquia', util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async obtenerUbicacionID(ubicacion: Ubicacion): Promise<Resultado> {
    return await this.http.get<Resultado>(environment.host + util.ruta + util.ubicacion + '/'+ubicacion.provincia+'/'+ubicacion.canton+'/'+ubicacion.parroquia+'/id', util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }
}
