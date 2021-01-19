import { Component, OnInit, HostListener } from '@angular/core';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { PresentacionProducto } from '../../modelos/presentacion-producto';
import { PresentacionProductoService } from '../../servicios/presentacion-producto.service';

@Component({
  selector: 'app-presentacion-producto',
  templateUrl: './presentacion-producto.component.html',
  styleUrls: ['./presentacion-producto.component.scss']
})
export class PresentacionProductoComponent implements OnInit {

  presentacion_producto= new PresentacionProducto();

  constructor(private tabService: TabService,private presentacionProductoService: PresentacionProductoService) { }

  ngOnInit() {
    this.construir_presentacion_producto();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.presentacion_producto = new PresentacionProducto();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    console.log(this.presentacion_producto);
    this.presentacionProductoService.crear(this.presentacion_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.presentacion_producto=res.resultado as PresentacionProducto;
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    console.log(this.presentacion_producto);
    this.presentacionProductoService.actualizar(this.presentacion_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.presentacion_producto=res.resultado as PresentacionProducto;
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  eliminar(presentacion_producto: PresentacionProducto) {
    this.presentacionProductoService.eliminar(presentacion_producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.presentacion_producto=res.resultado as PresentacionProducto
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  async construir_presentacion_producto() {
    let presentacion_producto_id=0;
    this.presentacionProductoService.currentMessage.subscribe(message => presentacion_producto_id = message);
    if (presentacion_producto_id!= 0) {
      await this.presentacionProductoService.obtenerAsync(presentacion_producto_id).then(
        res => {
          Object.assign(this.presentacion_producto, res.resultado as PresentacionProducto);
        },
        err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
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
