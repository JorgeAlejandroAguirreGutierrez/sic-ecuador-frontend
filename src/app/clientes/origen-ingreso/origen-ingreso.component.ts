import { Component, OnInit } from '@angular/core';
import { OrigenIngresoService } from '../../servicios/origen-ingreso.service';
import { OrigenIngreso } from '../../modelos/origen-ingreso';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-origen-ingreso',
  templateUrl: './origen-ingreso.component.html',
  styleUrls: ['./origen-ingreso.component.css']
})
export class OrigenIngresoComponent implements OnInit {

  origen_ingreso= new OrigenIngreso();
  origenes_ingresos: OrigenIngreso[];
  p_origen_ingreso= new OrigenIngreso();

  constructor(private origenIngresoService: OrigenIngresoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.origenIngresoService.consultar().subscribe(
      res=>this.origenes_ingresos=res.resultado as OrigenIngreso[]
    );
  }

  open(content: any, origen_ingreso: OrigenIngreso) {
    this.p_origen_ingreso=origen_ingreso;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_origen_ingreso);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_origen_ingreso);
      }
    }, (reason) => {
      
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  crear() {
    this.origenIngresoService.crear(this.origen_ingreso).subscribe(
      res => {
        console.log(res);
        Swal.fire('Exito', res.mensaje, 'success');
        this.origen_ingreso=res.resultado as OrigenIngreso;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(origen_ingreso: OrigenIngreso) {
    this.origenIngresoService.actualizar(origen_ingreso).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.origen_ingreso=res.resultado as OrigenIngreso;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(origen_ingreso: OrigenIngreso) {
    this.origenIngresoService.eliminar(origen_ingreso).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.origen_ingreso=res.resultado as OrigenIngreso;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }
}
