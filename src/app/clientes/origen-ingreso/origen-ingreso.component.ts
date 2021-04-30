import { Component, OnInit, HostListener } from '@angular/core';
import { OrigenIngresoService } from '../../servicios/origen-ingreso.service';
import { OrigenIngreso } from '../../modelos/origen-ingreso';
import { TabService } from '../../servicios/services/tab.service';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-origen-ingreso',
  templateUrl: './origen-ingreso.component.html',
  styleUrls: ['./origen-ingreso.component.scss']
})
export class OrigenIngresoComponent implements OnInit {

  origen_ingreso= new OrigenIngreso();

  constructor(private tabService: TabService,private origenIngresoService: OrigenIngresoService) { }

  ngOnInit() {
    this.construir_origen_ingreso();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.tabService.addNewTab(OrigenIngresoComponent, constantes.tab_crear_origen_ingreso);
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.crear(this.origen_ingreso).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.actualizar(this.origen_ingreso).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.origen_ingreso=res.resultado as OrigenIngreso;
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminar(origen_ingreso: OrigenIngreso) {
    this.origenIngresoService.eliminar(origen_ingreso).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.origen_ingreso=res.resultado as OrigenIngreso
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  async construir_origen_ingreso() {
    let origen_ingreso_id=0;
    this.origenIngresoService.currentMessage.subscribe(message => origen_ingreso_id = message);
    if (origen_ingreso_id!= 0) {
      await this.origenIngresoService.obtenerAsync(origen_ingreso_id).then(
        res => {
          Object.assign(this.origen_ingreso, res.resultado as OrigenIngreso);
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
