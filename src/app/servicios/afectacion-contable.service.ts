import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import * as util from '../util';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AfectacionContable } from '../modelos/afectacion-contable';

@Injectable({
  providedIn: 'root'
})
export class AfectacionContableService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  enviar(afectacion_contable_id: number) {
    this.messageSource.next(afectacion_contable_id);
  }

  crear(afectacion_contable: AfectacionContable): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.afectacion_contable, JSON.stringify(afectacion_contable), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(afectacion_contable_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.afectacion_contable + '/' + afectacion_contable_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.afectacion_contable, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  buscar(afectacion_contable: AfectacionContable): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.afectacion_contable+util.buscar, afectacion_contable, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizar(afectacion_contable: AfectacionContable): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.afectacion_contable, JSON.stringify(afectacion_contable), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(afectacion_contable: AfectacionContable): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.afectacion_contable + '/' + afectacion_contable.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
