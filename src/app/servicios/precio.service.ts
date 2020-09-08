import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelos/modelo';
import { Precio } from '../modelos/precio';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  constructor(private http: HttpClient) { }

  crear(precio: Precio): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.precio, JSON.stringify(precio), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(precio_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.precio + '/' + precio_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.precio, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(precio: Precio): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.modelo, JSON.stringify(precio), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(precio: Precio): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.modelo + '/' + precio.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  importar(archivo: File, modelo: Modelo): Observable<Respuesta> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    return this.http.post(environment.host + util.ruta + '/'+modelo.endpoint + util.importar, formData, util.options_cargar_archivo).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  exportar(modelo: Modelo): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + '/'+modelo.endpoint + util.importar, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
