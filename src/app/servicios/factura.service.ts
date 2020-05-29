import { Injectable } from '@angular/core';
import { Factura } from '../modelos/factura';
import { BehaviorSubject } from 'rxjs';
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
export class FacturaService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(factura_id: number) {
    this.messageSource.next(factura_id);
  }

  crear(factura: Factura): Observable<Resultado> {
    return this.http.post(environment.host + util.ruta + util.factura, JSON.stringify(factura), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.factura, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(factura_id: number): Observable<Resultado> {
    return this.http.get(environment.host + util.ruta + util.factura+ '/' + factura_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(factura: Factura): Observable<Resultado> {
    return this.http.put(environment.host+util.ruta+util.factura, JSON.stringify(factura), util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(factura_id: number): Observable<Resultado> {
    return this.http.delete(environment.host+util.ruta+util.factura + '/' + factura_id, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscarNumero(factura: Factura): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.factura+util.buscar+util.numero+'/'+factura.numero, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscarClienteRazonSocial(factura: Factura): Observable<Resultado> {
    return this.http.get<Resultado>(environment.host + util.ruta + util.factura+util.buscar+util.cliente+util.razon_social+'/'+factura.cliente.razon_social, util.options).pipe(
      map(response => response as Resultado),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
}
