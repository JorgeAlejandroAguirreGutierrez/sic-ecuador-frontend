import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { GeneroService } from '../../servicios/genero.service';
import { Genero } from '../../modelos/genero';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  genero= new Genero();

  constructor(private tabService: TabService,private generoService: GeneroService) { }

  ngOnInit() {
    this.construir_genero();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.genero = new Genero();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.generoService.crear(this.genero).subscribe(
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
    this.generoService.actualizar(this.genero).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.genero=res.resultado as Genero;
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(genero: Genero) {
    this.generoService.eliminar(genero).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.genero=res.resultado as Genero
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  async construir_genero() {
    let genero_id=0;
    this.generoService.currentMessage.subscribe(message => genero_id = message);
    if (genero_id!= 0) {
      await this.generoService.obtenerAsync(genero_id).then(
        res => {
          Object.assign(this.genero, res.resultado as Genero);
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
