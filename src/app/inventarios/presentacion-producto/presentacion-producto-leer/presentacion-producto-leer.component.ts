import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { PresentacionProductoComponent } from '../presentacion-producto.component';
import { PresentacionProductoService } from '../../../servicios/presentacion-producto.service';
import { PresentacionProducto } from '../../../modelos/presentacion-producto';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-presentacion-producto-leer',
  templateUrl: './presentacion-producto-leer.component.html',
  styleUrls: ['./presentacion-producto-leer.component.scss']
})
export class PresentacionProductoLeerComponent implements OnInit {

  collapsed = true;
  ComponentePresentacionProducto: Type<any> = PresentacionProductoComponent;

  sesion: Sesion;

  constructor(private presentacionProductoService: PresentacionProductoService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  presentaciones_productos: PresentacionProducto[];
  presentacion_producto: PresentacionProducto= new PresentacionProducto();
  presentacion_producto_buscar: PresentacionProducto=new PresentacionProducto();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.presentacionProductoService.consultar().subscribe(
      res => {
        this.presentaciones_productos = res.resultado as PresentacionProducto[]
        console.log(this.presentaciones_productos);
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.presentacionProductoService.buscar(this.presentacion_producto_buscar).subscribe(
      res => {
          this.presentaciones_productos = res.resultado as PresentacionProducto[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(presentacion_producto: PresentacionProducto) {
    this.presentacion_producto=presentacion_producto;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.presentacion_producto != null){
      this.presentacionProductoService.enviar(this.presentacion_producto.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponentePresentacionProducto,'Actualizar Tabla de Equivalencia Medida');
    } else {
      Swal.fire(constantes.error, "Selecciona una tabla de equivalencia medida", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.presentacionProductoService.eliminar(this.presentacion_producto).subscribe(
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
