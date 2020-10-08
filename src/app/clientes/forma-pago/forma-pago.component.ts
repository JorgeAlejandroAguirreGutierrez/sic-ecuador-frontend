import { Component, OnInit, HostListener } from '@angular/core';
import { FormaPago } from '../../modelos/forma-pago';
import { TabService } from '../../componentes/services/tab.service';
import { FormaPagoService } from '../../servicios/forma-pago.service';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.scss']
})
export class FormaPagoComponent implements OnInit {

  forma_pago= new FormaPago();

  constructor(private tabService: TabService,private formaPagoService: FormaPagoService) { }

  ngOnInit() {
    this.construir_forma_pago();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.forma_pago = new FormaPago();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.formaPagoService.crear(this.forma_pago).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.nuevo(null);

      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.formaPagoService.actualizar(this.forma_pago).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.forma_pago=res.resultado as FormaPago;
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminar(forma_pago: FormaPago) {
    this.formaPagoService.eliminar(forma_pago).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.forma_pago=res.resultado as FormaPago
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  async construir_forma_pago() {
    let forma_pago_id=0;
    this.formaPagoService.currentMessage.subscribe(message => forma_pago_id = message);
    if (forma_pago_id!= 0) {
      await this.formaPagoService.obtenerAsync(forma_pago_id).then(
        res => {
          Object.assign(this.forma_pago, res.resultado as FormaPago);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 71) //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 78) //ASHIFT + N
      this.nuevo(null);
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 69) // SHIFT + E
      this.eliminar(null);
  }

}
