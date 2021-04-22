import { Injectable } from '@angular/core';
import { Factura } from '../modelos/factura';
import { BehaviorSubject } from 'rxjs';
import { Respuesta } from '../respuesta';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(factura_id: number) {
    this.messageSource.next(factura_id);
  }

  crear(factura: Factura): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.factura, JSON.stringify(factura), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.factura, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(factura_id: number): Observable<Respuesta> {
    return this.http.get(environment.host + util.ruta + util.factura+ '/' + factura_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(factura: Factura): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.factura, JSON.stringify(factura), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(factura_id: number): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.factura + '/' + factura_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(factura_buscar: Factura): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.grupo_cliente+util.buscar, factura_buscar, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  generar_pdf(factura_id: number){
    return this.http.get(environment.host + util.ruta + util.factura+util.generar+util.pdf+'/'+factura_id, util.options_generar_archivo).pipe(
      map(response => response as Blob),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
}
