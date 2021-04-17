import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import * as constantes from '../../../constantes';
import { GrupoProducto } from '../../../modelos/grupo-producto';
import { GrupoProductoService } from '../../../servicios/grupo-producto.service';
import { GrupoProductoComponent } from '../grupo-producto.component';


@Component({
  selector: 'app-grupo-producto-leer',
  templateUrl: './grupo-producto-leer.component.html',
  styleUrls: ['./grupo-producto-leer.component.scss']
})
export class GrupoProductoLeerComponent implements OnInit {

  collapsed = true;
  ComponenteGrupoProducto: Type<any> = GrupoProductoComponent;

  sesion: Sesion;

  constructor(private grupoProductoService: GrupoProductoService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  grupos_productos: GrupoProducto[];
  grupo_producto: GrupoProducto= new GrupoProducto();
  grupo_producto_buscar: GrupoProducto=new GrupoProducto();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.grupoProductoService.consultar().subscribe(
      res => {
        this.grupos_productos = res.resultado as GrupoProducto[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoProductoService.buscar(this.grupo_producto_buscar).subscribe(
      res => {
          this.grupos_productos = res.resultado as GrupoProducto[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(grupo_producto: GrupoProducto) {
    this.grupo_producto=grupo_producto;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.grupo_producto != null){
      this.grupoProductoService.enviar(this.grupo_producto.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteGrupoProducto,'Actualizar Tabla de Grupo de Producto');
    } else {
      Swal.fire(constantes.error, "Selecciona un Grupo de Producto", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoProductoService.eliminar(this.grupo_producto).subscribe(
      res => {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.consultar();   
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_buscar_codigo(){
    this.buscar(null);
  }

  cambiar_buscar_grupo(){
    this.buscar(null);
  }

  cambiar_buscar_sub_grupo(){
    this.buscar(null);
  }

  cambiar_buscar_categoria(){
    this.buscar(null);
  }

  cambiar_buscar_linea(){
    this.buscar(null);
  }

  cambiar_buscar_sub_linea(){
    this.buscar(null);
  }

  cambiar_buscar_presentacion(){
    this.buscar(null);
  }

}
