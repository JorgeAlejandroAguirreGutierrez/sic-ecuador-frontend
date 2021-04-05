import { Component, HostListener, OnInit } from '@angular/core';
import { PuntoVentaService } from '../../servicios/punto-venta.service';
import { PuntoVenta } from '../../modelos/punto-venta';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { TabService } from '../../componentes/services/tab.service';
import { Establecimiento } from '../../modelos/establecimiento';
import { EstablecimientoService } from '../../servicios/establecimiento.service';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.scss']
})
export class PuntoVentaComponent implements OnInit {

  punto_venta= new PuntoVenta();
  establecimientos: Establecimiento[]=[];

  constructor(private tabService: TabService,private puntoVentaService: PuntoVentaService, private establecimientoService: EstablecimientoService) { }

  ngOnInit() {
    this.consultar_establecimientos();
    this.construir_punto_venta();
    
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.punto_venta = new PuntoVenta();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.puntoVentaService.crear(this.punto_venta).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.nuevo(null);

      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.puntoVentaService.actualizar(this.punto_venta).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.punto_venta=res.resultado as PuntoVenta;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_punto_venta() {
    let punto_venta_id=0;
    this.puntoVentaService.currentMessage.subscribe(message => punto_venta_id = message);
    if (punto_venta_id!= 0) {
      await this.puntoVentaService.obtenerAsync(punto_venta_id).then(
        res => {
          Object.assign(this.punto_venta, res.resultado as PuntoVenta);
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
    }
  }

  consultar_establecimientos(){
    this.establecimientoService.consultar().subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.establecimientos=res.resultado as Establecimiento[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  compareFn(a: any, b: any) {
    return a && b && a.id == b.id;
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 71) //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 78) //ASHIFT + N
      this.nuevo(null);
  }
}
