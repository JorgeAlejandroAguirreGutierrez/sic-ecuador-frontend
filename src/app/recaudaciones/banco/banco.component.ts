import { Component, OnInit, HostListener } from '@angular/core';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { Banco } from '../../modelos/banco';
import { BancoService } from '../../servicios/banco.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.scss']
})
export class BancoComponent implements OnInit {

  banco= new Banco();

  constructor(private tabService: TabService,private bancoService: BancoService) { }

  ngOnInit() {
    this.construir_banco();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.banco = new Banco();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.bancoService.crear(this.banco).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.banco=res.resultado as Banco;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.bancoService.actualizar(this.banco).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.banco=res.resultado as Banco;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  eliminar(banco: Banco) {
    this.bancoService.eliminar(banco).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.banco=res.resultado as Banco
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  construir_banco() {
    let banco_id=0;
    this.bancoService.currentMessage.subscribe(message => banco_id = message);
    if (banco_id!= 0) {
      this.bancoService.obtener(banco_id).subscribe(
        res => {
          this.banco=res.resultado as Banco
          this.bancoService.enviar(0);
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
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
