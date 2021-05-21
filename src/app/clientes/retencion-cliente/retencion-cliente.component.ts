import { Component, OnInit } from '@angular/core';
import { RetencionService } from '../../servicios/retencion-cliente.service';
import { RetencionCliente } from '../../modelos/retencion-cliente';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retencion_cliente',
  templateUrl: './retencion-cliente.component.html',
  styleUrls: ['./retencion-cliente.component.scss']
})
export class RetencionComponent implements OnInit {

  retencion_cliente= new RetencionCliente();
  retenciones_clientes: RetencionCliente[];
  p_retencion_cliente= new RetencionCliente();

  constructor(private retencionService: RetencionService, private modalService: NgbModal) { }

  ngOnInit() {
    this.retencionService.obtener().subscribe(
      res=>{
        this.retenciones_clientes= res.resultado as RetencionCliente[]
      }
    );
  }

  open(content: any, retencion_cliente: RetencionCliente) {
    this.p_retencion_cliente=retencion_cliente;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_retencion_cliente);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_retencion_cliente);
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
    this.retencionService.crear(this.retencion_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.retencion_cliente=res.resultado as RetencionCliente;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(retencion_cliente: RetencionCliente) {
    this.retencionService.actualizar(retencion_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.retencion_cliente=res.resultado as RetencionCliente;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(retencion_cliente: RetencionCliente) {
    this.retencionService.eliminar(retencion_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.retencion_cliente=res.resultado as RetencionCliente
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  seleccion(retencion_cliente: RetencionCliente) {
    
  }

}
