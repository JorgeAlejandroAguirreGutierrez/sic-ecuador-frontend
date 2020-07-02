import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from '../modelos/cliente';
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
export class ClienteService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(cliente_id: number) {
    this.messageSource.next(cliente_id);
  }

  crear(cliente: Cliente): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.cliente, JSON.stringify(cliente), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.cliente, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
  async consultarAsync(): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.cliente, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  async obtenerAsync(cliente_id: number): Promise<Respuesta> {
    return await this.http.get<Respuesta>(environment.host + util.ruta + util.cliente + '/' + cliente_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(cliente_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.cliente + '/' + cliente_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  obtenerIdentificacion(identificacion: string): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.cliente + util.identificacion+'/'+identificacion, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(cliente: Cliente): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.cliente, JSON.stringify(cliente), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(cliente: Cliente): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.cliente + '/' + cliente.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  validarIdentificacion(identificacion: string): Observable<Respuesta> {
    return this.http.get(environment.host+util.ruta+util.cliente + '/identificacion/validar/' + identificacion, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  validarTipoContribuyente(cliente: Cliente): Observable<Respuesta> {
    return this.http.get(environment.host+util.ruta+util.cliente + '/tipocontribuyente/validar/' + cliente.identificacion, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscarIdentificacion(identificacion: string): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.cliente+util.buscar+util.identificacion+'/'+identificacion, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  buscarRazonSocial(razon_social: string): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.cliente+util.buscar+util.razon_social+'/'+razon_social, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  importar(archivo: File): Observable<Respuesta> {
    const formData: FormData = new FormData();
    formData.append('clientes', archivo, archivo.name);
    return this.http.post(environment.host + util.ruta + util.cliente+util.importar, formData, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
