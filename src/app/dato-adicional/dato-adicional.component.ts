import { Component, OnInit } from '@angular/core';
import { DatoAdicionalService } from '../servicios/dato-adicional.service';
import { DatoAdicional } from '../modelos/dato-adicional';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dato-adicional',
  templateUrl: './dato-adicional.component.html',
  styleUrls: ['./dato-adicional.component.css']
})
export class DatoAdicionalComponent implements OnInit {

  dato_adicional= new DatoAdicional();
  datos_adicionales: DatoAdicional[];
  p_dato_adicional= new DatoAdicional();

  constructor(private datoAdicionalService: DatoAdicionalService, private modalService: NgbModal) { }

  ngOnInit() {
    this.datoAdicionalService.obtener().subscribe(
      res=>this.datos_adicionales=res.resultado as DatoAdicional[]
    );
  }

  open(content: any, dato_adicional: DatoAdicional) {
    this.p_dato_adicional=dato_adicional;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_dato_adicional);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_dato_adicional);
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
    this.datoAdicionalService.crear(this.dato_adicional).subscribe(
      res => {
        console.log(res);
        Swal.fire('Exito', res.mensaje, 'success');
        this.dato_adicional=res.resultado as DatoAdicional;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(dato_adicional: DatoAdicional) {
    this.datoAdicionalService.actualizar(dato_adicional).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.dato_adicional=res.resultado as DatoAdicional;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(dato_adicional: DatoAdicional) {
    this.datoAdicionalService.eliminar(dato_adicional).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.dato_adicional=res.resultado as DatoAdicional;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  seleccion(dato_adicional: DatoAdicional) {
    
  }

}
