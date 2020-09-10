import { Component, OnInit, ViewChild, HostListener  } from '@angular/core';
import { GrupoClienteService } from '../../servicios/grupo-cliente.service';
import { GrupoCliente } from '../../modelos/grupo-cliente';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-cliente',
  templateUrl: './grupo-cliente.component.html',
  styleUrls: ['./grupo-cliente.component.scss']
})
export class GrupoClienteComponent implements OnInit {

  grupo_cliente= new GrupoCliente();

  constructor(private tabService: TabService,private grupoClienteService: GrupoClienteService) { }

  ngOnInit() {
    this.construir_grupo_cliente();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.grupo_cliente = new GrupoCliente();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoClienteService.crear(this.grupo_cliente).subscribe(
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
    this.grupoClienteService.actualizar(this.grupo_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.grupo_cliente=res.resultado as GrupoCliente;
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(grupo_cliente: GrupoCliente) {
    this.grupoClienteService.eliminar(grupo_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.grupo_cliente=res.resultado as GrupoCliente
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  async construir_grupo_cliente() {
    let grupo_cliente_id=0;
    this.grupoClienteService.currentMessage.subscribe(message => grupo_cliente_id = message);
    if (grupo_cliente_id!= 0) {
      await this.grupoClienteService.obtenerAsync(grupo_cliente_id).then(
        res => {
          Object.assign(this.grupo_cliente, res.resultado as GrupoCliente);
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
