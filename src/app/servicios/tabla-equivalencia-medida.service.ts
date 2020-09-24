import { Injectable } from '@angular/core';
import { Ubicacion } from '../modelos/ubicacion';
import { Respuesta } from '../respuesta';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { TablaEquivalenciaMedida } from '../modelos/tabla-equivalencia-medida';
import { Medida } from '../modelos/medida';

@Injectable({
  providedIn: 'root'
})
export class TablaEquivalenciaMedidaService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(tabla_equivalencia_medida_id: number) {
    this.messageSource.next(tabla_equivalencia_medida_id);
  }

  crear(tabla_equivalencia_medida: TablaEquivalenciaMedida): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.tabla_equivalencia_medida, JSON.stringify(tabla_equivalencia_medida), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async obtenerAsync(tabla_equivalencia_medida_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.tabla_equivalencia_medida + '/' + tabla_equivalencia_medida_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    ).toPromise();
  }

  consultar(): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.tabla_equivalencia_medida, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(tabla_equivalencia_medida: TablaEquivalenciaMedida): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.tabla_equivalencia_medida, JSON.stringify(tabla_equivalencia_medida), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(tabla_equivalencia_medida: TablaEquivalenciaMedida): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.tabla_equivalencia_medida + '/' + tabla_equivalencia_medida.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerMedida1Medida2(medida1: Medida, medida2: Medida): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.tabla_equivalencia_medida+'/'+medida1.id + '/'+medida2.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(tabla_equivalencia_medida: TablaEquivalenciaMedida): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.tabla_equivalencia_medida+util.buscar+'/'+tabla_equivalencia_medida.medida1.id + '/'+tabla_equivalencia_medida.medida2.id+'/'+tabla_equivalencia_medida.equivalencia, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
