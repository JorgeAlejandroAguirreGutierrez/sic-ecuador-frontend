import { Component, OnInit } from '@angular/core';
import { VehiculoTransporteService } from '../../servicios/vehiculo-transporte.service';
import { VehiculoTransporte } from '../../modelos/vehiculo-transporte';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-vehiculo-transporte',
  templateUrl: './vehiculo-transporte.component.html',
  styleUrls: ['./vehiculo-transporte.component.css']
})
export class VehiculoTransporteComponent implements OnInit {

  vehiculo_transporte= new VehiculoTransporte();
  ubicaciones: VehiculoTransporte[];
  p_ubicacion= new VehiculoTransporte();

  constructor(private vehiculoTransporteService: VehiculoTransporteService, private modalService: NgbModal) { }

  ngOnInit() {
    this.vehiculoTransporteService.consultar().subscribe(
      res=>{
        this.ubicaciones= res.resultado as VehiculoTransporte[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  open(content: any, vehiculo_transporte: VehiculoTransporte) {
    this.p_ubicacion=vehiculo_transporte;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_ubicacion);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_ubicacion);
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
    this.vehiculoTransporteService.crear(this.vehiculo_transporte).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.vehiculo_transporte=res.resultado as VehiculoTransporte;
        this.ngOnInit();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(vehiculo_transporte: VehiculoTransporte) {
    this.vehiculoTransporteService.actualizar(vehiculo_transporte).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.vehiculo_transporte=res.resultado as VehiculoTransporte;
        this.ngOnInit();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminar(vehiculo_transporte: VehiculoTransporte) {
    this.vehiculoTransporteService.eliminar(vehiculo_transporte).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.vehiculo_transporte=res.resultado as VehiculoTransporte
        this.ngOnInit();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

}
