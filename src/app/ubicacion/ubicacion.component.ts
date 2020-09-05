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

  actualizar(ubicacion: Ubicacion) {
    this.ubicacionService.actualizar(ubicacion).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.ubicacion=res.resultado as Ubicacion;
        this.ngOnInit();
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
}
