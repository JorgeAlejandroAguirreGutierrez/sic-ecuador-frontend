import { Component, HostListener, OnInit } from '@angular/core';
import { BodegaService } from '../../servicios/bodega.service';
import { TabService } from '../../componentes/services/tab.service';
import { Bodega } from '../../modelos/bodega';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {

  bodega= new Bodega();

  constructor(private tabService: TabService,private bodegaService: BodegaService) { }

  ngOnInit() {
    this.construir_bodega();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.tabService.addNewTab(BodegaComponent, constantes.tab_crear_bodega);
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.bodegaService.crear(this.bodega).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);

      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.bodegaService.actualizar(this.bodega).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.bodega=res.resultado as Bodega;
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminar(bodega: Bodega) {
    this.bodegaService.eliminar(bodega).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.bodega=res.resultado as Bodega
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  async construir_bodega() {
    let bodega_id=0;
    this.bodegaService.currentMessage.subscribe(message => bodega_id = message);
    if (bodega_id!= 0) {
      await this.bodegaService.obtenerAsync(bodega_id).then(
        res => {
          Object.assign(this.bodega, res.resultado as Bodega);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
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
