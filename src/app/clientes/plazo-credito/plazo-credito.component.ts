import { Component, OnInit, ViewChild, HostListener} from '@angular/core';
import { PlazoCreditoService } from '../../servicios/plazo-credito.service';
import { PlazoCredito } from '../../modelos/plazo-credito';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plazo-credito',
  templateUrl: './plazo-credito.component.html',
  styleUrls: ['./plazo-credito.component.scss']
})
export class PlazoCreditoComponent implements OnInit {

  plazo_credito= new PlazoCredito();

  constructor(private tabService: TabService,private plazoCreditoService: PlazoCreditoService) { }

  ngOnInit() {
    this.construir_plazo_credito();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.plazo_credito = new PlazoCredito();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.plazoCreditoService.crear(this.plazo_credito).subscribe(
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
    this.plazoCreditoService.actualizar(this.plazo_credito).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.plazo_credito=res.resultado as PlazoCredito;
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(plazo_credito: PlazoCredito) {
    this.plazoCreditoService.eliminar(plazo_credito).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.plazo_credito=res.resultado as PlazoCredito
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  async construir_plazo_credito() {
    let plazo_credito_id=0;
    this.plazoCreditoService.currentMessage.subscribe(message => plazo_credito_id = message);
    if (plazo_credito_id!= 0) {
      await this.plazoCreditoService.obtenerAsync(plazo_credito_id).then(
        res => {
          Object.assign(this.plazo_credito, res.resultado as PlazoCredito);
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
