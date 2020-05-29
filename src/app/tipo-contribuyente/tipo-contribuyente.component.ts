import { Component, OnInit } from '@angular/core';
import { TipoContribuyenteService } from '../servicios/tipo-contribuyente.service';
import { TipoContribuyente } from '../modelos/tipo-contribuyente';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-contribuyente',
  templateUrl: './tipo-contribuyente.component.html',
  styleUrls: ['./tipo-contribuyente.component.css']
})
export class TipoContribuyenteComponent implements OnInit {

  tipo_contribuyente= new TipoContribuyente();
  tipos_contribuyentes: TipoContribuyente[];
  p_tipo_contribuyente= new TipoContribuyente();

  constructor(private tipoContribuyenteService: TipoContribuyenteService, private modalService: NgbModal) { }

  ngOnInit() {
    this.tipoContribuyenteService.consultar().subscribe(
      res=>{
        this.tipos_contribuyentes= res.resultado as TipoContribuyente[]
      }
    );
  }

  open(content: any, tipo_contribuyente: TipoContribuyente) {
    this.p_tipo_contribuyente=tipo_contribuyente;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_tipo_contribuyente);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_tipo_contribuyente);
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
    this.tipoContribuyenteService.crear(this.tipo_contribuyente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.tipo_contribuyente=res.resultado as TipoContribuyente;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(tipo_contribuyente: TipoContribuyente) {
    this.tipoContribuyenteService.actualizar(tipo_contribuyente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.tipo_contribuyente=res.resultado as TipoContribuyente;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(tipo_contribuyente: TipoContribuyente) {
    this.tipoContribuyenteService.eliminar(tipo_contribuyente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.tipo_contribuyente=res.resultado as TipoContribuyente
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
