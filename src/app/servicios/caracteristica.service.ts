import { Injectable } from '@angular/core';
import { CategoriaCliente } from '../modelos/categoria-cliente';
import { Resultado } from '../resultado';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Caracteristica } from '../modelos/caracteristica';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  constructor(private http: HttpClient) { }

  crear(caracteristica: Caracteristica): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.caracteristica, JSON.stringify(caracteristica), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(caracteristica_id: number): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.caracteristica + '/' + caracteristica_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.caracteristica, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(caracteristica: Caracteristica): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.caracteristica, JSON.stringify(caracteristica), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(caracteristica: Caracteristica): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.caracteristica + '/' + caracteristica.id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
