import { Component, OnInit, HostListener } from '@angular/core';
import { CategoriaCliente } from '../../modelos/categoria-cliente';
import { TabService } from '../../componentes/services/tab.service';
import { CategoriaClienteService } from '../../servicios/categoria-cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-cliente',
  templateUrl: './categoria-cliente.component.html',
  styleUrls: ['./categoria-cliente.component.scss']
})
export class CategoriaClienteComponent implements OnInit {

  categoria_cliente= new CategoriaCliente();

  constructor(private tabService: TabService,private categoriaClienteService: CategoriaClienteService) { }

  ngOnInit() {
    this.construir_categoria_cliente();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.categoria_cliente = new CategoriaCliente();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.categoriaClienteService.crear(this.categoria_cliente).subscribe(
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
    this.categoriaClienteService.actualizar(this.categoria_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.categoria_cliente=res.resultado as CategoriaCliente;
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(categoria_cliente: CategoriaCliente) {
    this.categoriaClienteService.eliminar(categoria_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.categoria_cliente=res.resultado as CategoriaCliente
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  async construir_categoria_cliente() {
    let categoria_cliente_id=0;
    this.categoriaClienteService.currentMessage.subscribe(message => categoria_cliente_id = message);
    if (categoria_cliente_id!= 0) {
      await this.categoriaClienteService.obtenerAsync(categoria_cliente_id).then(
        res => {
          Object.assign(this.categoria_cliente, res.resultado as CategoriaCliente);
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
