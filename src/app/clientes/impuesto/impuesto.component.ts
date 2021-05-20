import { Component, OnInit } from '@angular/core';
import { ImpuestoService } from '../../servicios/impuesto.service';
import { Impuesto } from '../../modelos/impuesto';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.scss']
})
export class ImpuestoComponent implements OnInit {

  impuesto= new Impuesto();
  impuestos: Impuesto[];
  p_impuesto= new Impuesto();

  constructor(private impuestoService: ImpuestoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.impuestoService.consultar().subscribe(
      res=>{
        this.impuestos= res.resultado as Impuesto[]
      }
    );
  }

  open(content: any, impuesto: Impuesto) {
    this.p_impuesto=impuesto;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_impuesto);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_impuesto);
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
    this.impuestoService.crear(this.impuesto).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.impuesto=res.resultado as Impuesto;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(impuesto: Impuesto) {
    this.impuestoService.actualizar(impuesto).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.impuesto=res.resultado as Impuesto;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(impuesto: Impuesto) {
    this.impuestoService.eliminar(impuesto).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.impuesto=res.resultado as Impuesto
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  seleccion(impuesto: Impuesto) {
    
  }

}
