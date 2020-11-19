import { Injectable } from '@angular/core';
import { Medida } from '../modelos/medida';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  enviar(medida_id: number) {
    this.messageSource.next(medida_id);
  }

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

  async obtenerAsync(medida_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.medida + '/' + medida_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
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

  buscar(medida: Medida): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.medida+util.buscar+'/'+medida.codigo_norma + '/'+medida.descripcion, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
