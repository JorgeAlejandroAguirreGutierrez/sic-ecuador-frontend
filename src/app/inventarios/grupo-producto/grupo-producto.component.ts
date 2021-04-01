import { Component, OnInit, HostListener } from '@angular/core';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { GrupoProducto } from 'src/app/modelos/grupo-producto';
import { GrupoProductoService } from 'src/app/servicios/grupo-producto.service';

@Component({
  selector: 'app-grupo-producto',
  templateUrl: './grupo-producto.component.html',
  styleUrls: ['./grupo-producto.component.scss']
})
export class GrupoProductoComponent implements OnInit {

  grupo_producto= new GrupoProducto();

  constructor(private tabService: TabService,private grupoProductoService: GrupoProductoService) { }

  ngOnInit() {
    this.construir_grupo_producto();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.grupo_producto = new GrupoProducto();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoProductoService.crear(this.grupo_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_producto=res.resultado as GrupoProducto;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoProductoService.actualizar(this.grupo_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_producto=res.resultado as GrupoProducto;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  eliminar(grupo_producto: GrupoProducto) {
    this.grupoProductoService.eliminar(grupo_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_producto=res.resultado as GrupoProducto
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  construir_grupo_producto() {
    let presentacion_producto_id=0;
    this.grupoProductoService.currentMessage.subscribe(message => presentacion_producto_id = message);
    if (presentacion_producto_id!= 0) {
      this.grupoProductoService.obtener(presentacion_producto_id).subscribe(
        res => {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.grupo_producto=res.resultado as GrupoProducto
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
    }
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 71) //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 78) //ASHIFT + N
      this.nuevo(null);
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 69) // SHIFT + E
      this.eliminar(null);
  }

}
