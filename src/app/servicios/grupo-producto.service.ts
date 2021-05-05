import { Injectable } from '@angular/core';
import { Respuesta } from '../respuesta';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { GrupoProducto } from '../modelos/grupo-producto';

@Injectable({
  providedIn: 'root'
})
export class GrupoProductoService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  enviar(categoria_cliente_id: number) {
    this.messageSource.next(categoria_cliente_id);
  }

  crear(grupo_producto: GrupoProducto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.grupo_producto, JSON.stringify(grupo_producto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar_grupos(): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto+ util.consultar_grupos, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar_subgrupos(grupo: string): Observable<Respuesta> {
    let params = new HttpParams().set("grupo", grupo)
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto+ util.consultar_subgrupos, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar_categorias(grupo: string, subgrupo:string): Observable<Respuesta> {
    let params = new HttpParams().set("grupo", grupo)
                                 .set("subgrupo", subgrupo)
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto+ util.consultar_categorias, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar_lineas(grupo: string, subgrupo:string, categoria: string): Observable<Respuesta> {
    let params = new HttpParams().set("grupo", grupo)
                                 .set("subgrupo", subgrupo)
                                 .set("categoria", categoria)
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto+ util.consultar_lineas, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar_sublineas(grupo: string, subgrupo:string, categoria: string, linea: string): Observable<Respuesta> {
    let params = new HttpParams().set("grupo", grupo)
                                 .set("subgrupo", subgrupo)
                                 .set("categoria", categoria)
                                 .set("linea", linea)
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto+ util.consultar_sublineas, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar_presentaciones(grupo: string, subgrupo:string, categoria: string, linea: string, sublinea: string): Observable<Respuesta> {
    let params = new HttpParams().set("grupo", grupo)
                                 .set("subgrupo", subgrupo)
                                 .set("categoria", categoria)
                                 .set("linea", linea)
                                 .set("sublinea", sublinea)
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto+ util.consultar_presentaciones, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener_grupo_producto(grupo: string, subgrupo:string, categoria: string, linea: string, sublinea: string, presentacion:string): Observable<Respuesta> {
    let params = new HttpParams().set("grupo", grupo)
                                 .set("subgrupo", subgrupo)
                                 .set("categoria", categoria)
                                 .set("linea", linea)
                                 .set("sublinea", sublinea)
                                 .set("presentacion", presentacion)
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto+ util.obtener_grupo_producto, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(grupo_producto_id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(environment.host + util.ruta + util.grupo_producto + '/' + grupo_producto_id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      }));
  }

  buscar(grupo_producto: GrupoProducto): Observable<Respuesta> {
    return this.http.post(environment.host + util.ruta + util.grupo_producto+util.buscar, grupo_producto, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizar(grupo_producto: GrupoProducto): Observable<Respuesta> {
    return this.http.put(environment.host+util.ruta+util.grupo_producto, JSON.stringify(grupo_producto), util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(grupo_producto: GrupoProducto): Observable<Respuesta> {
    return this.http.delete(environment.host+util.ruta+util.impuesto + '/' + grupo_producto.id, util.options).pipe(
      map(response => response as Respuesta),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
