import { Component, OnInit } from '@angular/core';
import { PuntoVentaService } from '../servicios/punto-venta.service';
import { PuntoVenta } from '../modelos/punto-venta';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.css']
})
export class PuntoVentaComponent implements OnInit {

  punto_venta= new PuntoVenta();
  empresas: PuntoVenta[];
  p_usuario= new PuntoVenta();

  constructor(private puntoVentaService: PuntoVentaService, private modalService: NgbModal) { }

  ngOnInit() {
    this.puntoVentaService.obtener().subscribe(
      res=>this.empresas=res.resultado as PuntoVenta[]
    );
  }

  open(content: any, punto_venta: PuntoVenta) {
    this.p_usuario=punto_venta;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_usuario);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_usuario);
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
    this.puntoVentaService.crear(this.punto_venta).subscribe(
      res => {
        console.log(res);
        Swal.fire('Exito', res.mensaje, 'success');
        this.punto_venta=res.resultado as PuntoVenta;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(punto_venta: PuntoVenta) {
    this.puntoVentaService.actualizar(punto_venta).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.punto_venta=res.resultado as PuntoVenta;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(punto_venta: PuntoVenta) {
    this.puntoVentaService.eliminar(punto_venta).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.punto_venta=res.resultado as PuntoVenta;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
