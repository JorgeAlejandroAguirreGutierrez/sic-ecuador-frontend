import { Component, OnInit, HostListener } from '@angular/core';
import { TabService } from '../../componentes/services/tab.service';
import { EstadoCivil } from '../../modelos/estado-civil';
import { EstadoCivilService } from '../../servicios/estado-civil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.scss']
})
export class EstadoCivilComponent implements OnInit {

  estado_civil= new EstadoCivil();

  constructor(private tabService: TabService,private estadoCivilService: EstadoCivilService) { }

  ngOnInit() {
    this.construir_estado_civil();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.estado_civil = new EstadoCivil();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.estadoCivilService.crear(this.estado_civil).subscribe(
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
    this.estadoCivilService.actualizar(this.estado_civil).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.estado_civil=res.resultado as EstadoCivil;
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(estado_civil: EstadoCivil) {
    this.estadoCivilService.eliminar(estado_civil).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.estado_civil=res.resultado as EstadoCivil
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  async construir_estado_civil() {
    let estado_civil_id=0;
    this.estadoCivilService.currentMessage.subscribe(message => estado_civil_id = message);
    if (estado_civil_id!= 0) {
      await this.estadoCivilService.obtenerAsync(estado_civil_id).then(
        res => {
          Object.assign(this.estado_civil, res.resultado as EstadoCivil);
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
