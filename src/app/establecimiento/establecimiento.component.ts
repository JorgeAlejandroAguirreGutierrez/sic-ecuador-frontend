import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../servicios/establecimiento.service';
import { Establecimiento } from '../modelos/establecimiento';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.css']
})
export class EstablecimientoComponent implements OnInit {

  establecimiento= new Establecimiento();
  empresas: Establecimiento[];
  p_establecimiento= new Establecimiento();

  constructor(private establecimientoService: EstablecimientoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.establecimientoService.consultar().subscribe(
      res=>this.empresas=res.resultado as Establecimiento[]
    );
  }

  open(content: any, establecimiento: Establecimiento) {
    this.p_establecimiento=establecimiento;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_establecimiento);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_establecimiento);
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
    this.establecimientoService.crear(this.establecimiento).subscribe(
      res => {
        console.log(res);
        Swal.fire('Exito', res.mensaje, 'success');
        this.establecimiento=res.resultado as Establecimiento;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(establecimiento: Establecimiento) {
    this.establecimientoService.actualizar(establecimiento).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.establecimiento=res.resultado as Establecimiento;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(establecimiento: Establecimiento) {
    this.establecimientoService.eliminar(establecimiento).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.establecimiento=res.resultado as Establecimiento;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
