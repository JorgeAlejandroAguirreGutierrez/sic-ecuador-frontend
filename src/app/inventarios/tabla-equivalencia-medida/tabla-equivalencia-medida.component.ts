import { Component, OnInit, HostListener } from '@angular/core';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';
import { TablaEquivalenciaMedida } from '../../modelos/tabla-equivalencia-medida';
import { TablaEquivalenciaMedidaService } from '../../servicios/tabla-equivalencia-medida.service';
import { Medida } from '../../modelos/medida';
import { MedidaService } from '../../servicios/medida.service';

@Component({
  selector: 'app-tabla-equivalencia-medida',
  templateUrl: './tabla-equivalencia-medida.component.html',
  styleUrls: ['./tabla-equivalencia-medida.component.scss']
})
export class TablaEquivalenciaMedidaComponent implements OnInit {

  tabla_equivalencia_medida= new TablaEquivalenciaMedida();
  medidas1: Medida[]=[];
  medidas2: Medida[]=[];

  constructor(private tabService: TabService,private tablaEquivalenciaMedidaService: TablaEquivalenciaMedidaService, private medidaService: MedidaService) { }

  ngOnInit() {
    this.construir_tabla_equivalencia_medida();
    this.medidaService.consultar().subscribe(
      res => {
        this.medidas1 = res.resultado as Medida[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );

    this.medidaService.consultar().subscribe(
      res => {
        this.medidas2 = res.resultado as Medida[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.tabla_equivalencia_medida = new TablaEquivalenciaMedida();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.tablaEquivalenciaMedidaService.crear(this.tabla_equivalencia_medida).subscribe(
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
    this.tablaEquivalenciaMedidaService.actualizar(this.tabla_equivalencia_medida).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.tabla_equivalencia_medida=res.resultado as TablaEquivalenciaMedida;
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(tabla_equivalencia_medida: TablaEquivalenciaMedida) {
    this.tablaEquivalenciaMedidaService.eliminar(tabla_equivalencia_medida).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.tabla_equivalencia_medida=res.resultado as TablaEquivalenciaMedida
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  async construir_tabla_equivalencia_medida() {
    let tabla_equivalencia_medida_id=0;
    this.tablaEquivalenciaMedidaService.currentMessage.subscribe(message => tabla_equivalencia_medida_id = message);
    if (tabla_equivalencia_medida_id!= 0) {
      await this.tablaEquivalenciaMedidaService.obtenerAsync(tabla_equivalencia_medida_id).then(
        res => {
          Object.assign(this.tabla_equivalencia_medida, res.resultado as TablaEquivalenciaMedida);
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
