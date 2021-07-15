import { Component, OnInit, HostListener, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { GrupoProducto } from '../../modelos/grupo-producto';
import { GrupoProductoService } from '../../servicios/grupo-producto.service';
import { TipoProductoService } from '../../servicios/tipo-producto.service';
import { TipoProducto } from '../../modelos/tipo-producto';
import { PresentacionBien } from '../../modelos/presentacion-bien';
import { MovimientoContable } from '../../modelos/movimiento-contable';
import { AfectacionContable } from '../../modelos/afectacion-contable';
import { AfectacionContableService } from '../../servicios/afectacion-contable.service';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grupo-producto',
  templateUrl: './grupo-producto.component.html',
  styleUrls: ['./grupo-producto.component.scss']
})
export class GrupoProductoComponent implements OnInit {

  columnasGrupoProducto: string[] = ['id', 'grupo', 'subgrupo', 'seccion', 'linea', 'sublinea', 'presentacion'];
  dataSource: MatTableDataSource<GrupoProducto>;
  clickedRows = new Set<GrupoProducto>();
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  abrirPanelNuevoGrupo = true;
  abrirPanelNuevoSubGrupo = false;
  abrirPanelNuevaSeccion = false;
  abrirPanelNuevaLinea = false;
  abrirPanelNuevaSubLinea = false;
  abrirPanelNuevaPresentacion = false;
  abrirPanelAdminGrupo = false;

  sesion: Sesion;
  estado: string = "ACTIVO";
  tipos_productos: TipoProducto[] = [];
  afectaciones: AfectacionContable[] = [];

  grupo_producto = new GrupoProducto();
  presentacion_bien = new PresentacionBien();
  movimiento_contable = new MovimientoContable();
  afectacion_contable = new AfectacionContable();

  grupos: string[] = [];
  subgrupos: string[] = [];

  collapsed = true;
  ComponenteGrupoProducto: Type<any> = GrupoProductoComponent;
  grupos_productos: GrupoProducto[];
  //grupo_producto: GrupoProducto= new GrupoProducto();
  grupo_producto_buscar: GrupoProducto = new GrupoProducto();

  constructor(private tabService: TabService, private grupoProductoService: GrupoProductoService,
    private tipoProductoService: TipoProductoService, private afectacionContableService: AfectacionContableService,
    private sesionService: SesionService, private router: Router) {  }

  ngOnInit() {
    this.sesion = this.sesionService.getSesion();
    this.construir_grupo_producto();
    this.consultar();
    this.tipoProductoService.consultar().subscribe(
      res => {
        this.tipos_productos = res.resultado as TipoProducto[];
        this.grupo_producto.tipo_producto = this.tipos_productos[0].id; // Falta el .id
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.grupoProductoService.consultar_grupos().subscribe(
      res => {
        this.grupos = res.resultado as string[];
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.afectacionContableService.consultar().subscribe(
      res => {
        this.afectaciones = res.resultado as AfectacionContable[];
        this.grupo_producto.movimiento_contable = this.afectaciones[0].id; // Falta el .id
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.key == 'G') //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == 'N') //ASHIFT + N
      this.nuevo(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == '') // SHIFT + E
      this.eliminar(null);
  }

  consultar_subgrupos(grupo: string) {
    this.grupo_producto.subgrupo = "";
    this.grupoProductoService.consultar_subgrupos(grupo).subscribe(
      res => {
        this.subgrupos = res.resultado as string[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  nuevo(event) {
    if (event != null)
      event.preventDefault();
    this.grupo_producto = new GrupoProducto();
  }

  crear(event) {
    if (event != null)
      event.preventDefault();
    this.grupoProductoService.crear(this.grupo_producto).subscribe(
      res => {
        this.grupo_producto = res.resultado as GrupoProducto;
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        let indice_tab_activo = constantes.tab_activo(this.tabService);
        this.tabService.removeTab(indice_tab_activo);
        this.tabService.addNewTab(GrupoProductoComponent, constantes.tab_crear_grupo_producto);
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  crear_grupo(event) {
    if (event != null)
      event.preventDefault(); // Cancela el evento si es nulo
    this.abrirPanelNuevoGrupo = false;
    this.abrirPanelNuevoSubGrupo = true;
    this.grupos.unshift(this.grupo_producto.grupo);
    this.consultar_subgrupos(this.grupo_producto.grupo);
    console.log(this.grupo_producto.grupo);
    console.log(this.grupos);
    console.log(this.subgrupos);
  }

  crear_subgrupo(event) {
    if (event != null)
      event.preventDefault();
    this.abrirPanelNuevoSubGrupo = false;
    this.abrirPanelNuevaSeccion = true;
    this.subgrupos.unshift(this.grupo_producto.subgrupo);
    console.log(this.grupo_producto.grupo);
    console.log(this.grupo_producto.subgrupo);
    console.log(this.subgrupos);
  }

  crear_seccion(event) {
    if (event != null)
      event.preventDefault();
    this.abrirPanelNuevaSeccion = false;
    this.abrirPanelNuevaPresentacion = true;
  }

  actualizar(event) {
    if (event != null)
      event.preventDefault();
    this.grupoProductoService.actualizar(this.grupo_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_producto = res.resultado as GrupoProducto;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  eliminar(grupo_producto: GrupoProducto) {
    this.grupoProductoService.eliminar(grupo_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_producto = res.resultado as GrupoProducto
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  construir_grupo_producto() {
    let presentacion_producto_id = 0;
    this.grupoProductoService.currentMessage.subscribe(message => presentacion_producto_id = message);
    if (presentacion_producto_id != 0) {
      this.grupoProductoService.obtener(presentacion_producto_id).subscribe(
        res => {
          this.grupo_producto = res.resultado as GrupoProducto
          this.grupoProductoService.enviar(0);
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
    }
  }

  consultar() {
    this.grupoProductoService.consultar().subscribe(
      res => {
        this.grupos_productos = res.resultado as GrupoProducto[];
        this.dataSource = new MatTableDataSource(this.grupos_productos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event != null)
      event.preventDefault();
    this.grupoProductoService.buscar(this.grupo_producto_buscar).subscribe(
      res => {
        this.grupos_productos = res.resultado as GrupoProducto[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(filaSeleccionada: GrupoProducto) {
    if (!this.clickedRows.has(filaSeleccionada)){
      this.clickedRows.clear();
      this.clickedRows.add(filaSeleccionada);
      this.grupo_producto = filaSeleccionada;
    } else {
      this.clickedRows.clear();
      this.grupo_producto = new GrupoProducto();
    }
  }

  actualizarLeer(event) {
    if (event != null)
      event.preventDefault();
    if (this.grupo_producto != null) {
      this.grupoProductoService.enviar(this.grupo_producto.id);
      let indice_tab_activo = constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteGrupoProducto, 'Actualizar Tabla de Grupo de Producto');
    } else {
      Swal.fire(constantes.error, "Selecciona un Grupo de Producto", constantes.error_swal);
    }
  }

  eliminarLeer(event) {
    if (event != null)
      event.preventDefault();
    this.grupoProductoService.eliminar(this.grupo_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.consultar();
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_buscar_codigo() {
    this.buscar(null);
  }

  cambiar_buscar_grupo() {
    this.buscar(null);
  }

  cambiar_buscar_sub_grupo() {
    this.buscar(null);
  }

  cambiar_buscar_seccion() {
    this.buscar(null);
  }

  cambiar_buscar_linea() {
    this.buscar(null);
  }

  cambiar_buscar_sub_linea() {
    this.buscar(null);
  }

  cambiar_buscar_presentacion() {
    this.buscar(null);
  }

}