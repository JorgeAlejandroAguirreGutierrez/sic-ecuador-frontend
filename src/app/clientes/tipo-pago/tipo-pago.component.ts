import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';
import { TipoPago } from '../../modelos/tipo-pago';
import { TipoPagoService } from '../../servicios/tipo-pago.service';

@Component({
  selector: 'app-tipo-pago',
  templateUrl: './tipo-pago.component.html',
  styleUrls: ['./tipo-pago.component.scss']
})
export class TipoPagoComponent implements OnInit {

  tipo_pago= new TipoPago();

  constructor(private tabService: TabService,private tipoPagoService: TipoPagoService) { }

  ngOnInit() {
    this.construir_tipo_pago();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.tipo_pago = new TipoPago();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.tipoPagoService.crear(this.tipo_pago).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.nuevo(null);

      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.tipoPagoService.actualizar(this.tipo_pago).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.tipo_pago=res.resultado as TipoPago;
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(tipo_pago: TipoPago) {
    this.tipoPagoService.eliminar(tipo_pago).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.tipo_pago=res.resultado as TipoPago
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  async construir_tipo_pago() {
    let tipo_pago_id=0;
    this.tipoPagoService.currentMessage.subscribe(message => tipo_pago_id = message);
    if (tipo_pago_id!= 0) {
      await this.tipoPagoService.obtenerAsync(tipo_pago_id).then(
        res => {
          Object.assign(this.tipo_pago, res.resultado as TipoPago);
        },
        err => Swal.fire('Error', err.error.mensaje, 'error')
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
