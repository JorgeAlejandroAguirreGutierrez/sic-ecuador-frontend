import { Component, OnInit,ViewChild, HostListener } from '@angular/core';
import { UbicacionService } from '../servicios/ubicacion.service';
import { Ubicacion } from '../modelos/ubicacion';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {

  ubicacion= new Ubicacion();

  constructor(private ubicacionService: UbicacionService, private modalService: NgbModal) { }

  ngOnInit() {
    this.construir_ubicacion();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.ubicacion = new Ubicacion();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.ubicacionService.crear(this.ubicacion).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.nuevo(null);

      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar() {
    if (event!=null)
      event.preventDefault();
    this.ubicacionService.actualizar(this.ubicacion).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.ubicacion=res.resultado as Ubicacion;
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(ubicacion: Ubicacion) {
    this.ubicacionService.eliminar(ubicacion).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.ubicacion=res.resultado as Ubicacion
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  async construir_ubicacion() {
    let ubicacion_id=0;
    this.ubicacionService.currentMessage.subscribe(message => ubicacion_id = message);
    if (ubicacion_id!= 0) {
      await this.ubicacionService.obtenerAsync(ubicacion_id).then(
        res => {
          Object.assign(this.ubicacion, res.resultado as Ubicacion);
        },
        err => Swal.fire('Error', err.error.mensaje, 'error')
      );
    }
  }
}
