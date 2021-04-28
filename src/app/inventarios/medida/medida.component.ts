import { Component, HostListener, OnInit } from '@angular/core';
import { MedidaService } from '../../servicios/medida.service';
import { TabService } from '../../componentes/services/tab.service';
import { Medida } from '../../modelos/medida';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medida',
  templateUrl: './medida.component.html',
  styleUrls: ['./medida.component.css']
})
export class MedidaComponent implements OnInit {

  medida= new Medida();

  constructor(private tabService: TabService,private medidaService: MedidaService) { }

  ngOnInit() {
    this.construir_medida();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.tabService.addNewTab(MedidaComponent, constantes.tab_crear_medida);
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.medidaService.crear(this.medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);

      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.medidaService.actualizar(this.medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.medida=res.resultado as Medida;
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminar(medida: Medida) {
    this.medidaService.eliminar(medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.medida=res.resultado as Medida
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  async construir_medida() {
    let medida_id=0;
    this.medidaService.currentMessage.subscribe(message => medida_id = message);
    if (medida_id!= 0) {
      await this.medidaService.obtenerAsync(medida_id).then(
        res => {
          Object.assign(this.medida, res.resultado as Medida);
          this.medidaService.enviar(0);
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
