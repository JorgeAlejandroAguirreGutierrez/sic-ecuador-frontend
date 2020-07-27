import { Injectable } from '@angular/core';
import { Medida } from '../modelos/medida';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  constructor(private http: HttpClient) { }

  crear(medida: Medida): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.medida, JSON.stringify(medida), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(medida: Medida): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.medida + '/' + medida.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.medida, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(medida: Medida): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.medida, JSON.stringify(medida), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(medida: Medida): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.producto + '/' + medida.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
