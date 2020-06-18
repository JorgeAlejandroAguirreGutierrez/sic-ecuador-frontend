import { Injectable } from '@angular/core';
import { Transportista } from '../modelos/transportista';
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
export class TransportistaService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(transportista: Transportista): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.transportista, JSON.stringify(transportista), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.transportista, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(transportista_id: number): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.transportista + '/' + transportista_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(transportista: Transportista): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.transportista, JSON.stringify(transportista), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(transportista: Transportista): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.servicio + '/' + transportista.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
