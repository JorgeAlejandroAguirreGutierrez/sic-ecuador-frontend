import { Component, OnInit } from '@angular/core';
import { TransportistaService } from '../servicios/transportista.service';
import { Transportista } from '../modelos/transportista';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transportista',
  templateUrl: './transportista.component.html',
  styleUrls: ['./transportista.component.css']
})
export class TransportistaComponent implements OnInit {

  transportista= new Transportista();
  transportistas: Transportista[];
  p_transportista= new Transportista();

  constructor(private transportistaService: TransportistaService, private modalService: NgbModal) { }

  ngOnInit() {
    this.transportistaService.consultar().subscribe(
      res=>{
        this.transportistas= res.resultado as Transportista[]
      }
    );
  }

  open(content: any, transportista: Transportista) {
    this.p_transportista=transportista;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_transportista);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_transportista);
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
    this.transportistaService.crear(this.transportista).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.transportista=res.resultado as Transportista;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(transportista: Transportista) {
    this.transportistaService.actualizar(transportista).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.transportista=res.resultado as Transportista;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(transportista: Transportista) {
    this.transportistaService.eliminar(transportista).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.transportista=res.resultado as Transportista
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
