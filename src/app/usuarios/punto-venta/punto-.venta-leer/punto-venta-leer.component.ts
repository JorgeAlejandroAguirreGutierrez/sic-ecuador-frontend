import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { PuntoVenta } from '../../../modelos/punto-venta';
import { PuntoVentaService } from '../../../servicios/punto-venta.service';
import { PuntoVentaComponent } from '../punto-venta.component';
import * as constantes from '../../../constantes';



@Component({
  selector: 'app-punto-venta-leer',
  templateUrl: './punto-venta-leer.component.html',
  styleUrls: ['./punto-venta-leer.component.scss']
})
export class PuntoVentaLeerComponent implements OnInit {

  collapsed = true;
  ComponentePuntoVenta: Type<any> = PuntoVentaComponent;

  sesion: Sesion;

  constructor(private puntoVentaService: PuntoVentaService, private tabService: TabService,
    private sesionService: SesionService, private router: Router) { }

  puntos_ventas: PuntoVenta[];
  punto_venta: PuntoVenta;
  punto_venta_buscar: PuntoVenta = new PuntoVenta();


  ngOnInit() {
    this.consultar();
    this.sesion = this.sesionService.getSesion();
  }

  consultar() {
    this.puntoVentaService.consultar().subscribe(
      res => {
        this.puntos_ventas = res.resultado as PuntoVenta[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event != null)
      event.preventDefault();
    this.puntoVentaService.buscar(this.punto_venta_buscar).subscribe(
      res => {
        this.puntos_ventas = res.resultado as PuntoVenta[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(punto_venta: PuntoVenta) {
    this.punto_venta = punto_venta;
  }

  nuevo(event) {
    if (event != null)
      event.preventDefault();
  }

  actualizar(event) {
    if (event != null)
      event.preventDefault();
    if (this.punto_venta != null) {
      this.puntoVentaService.enviar(this.punto_venta.id);
      this.tabService.addNewTab(this.ComponentePuntoVenta, 'Actualizar Punto Venta');
    } else {
      Swal.fire(constantes.error, "Selecciona un Punto de Venta", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event != null)
      event.preventDefault();
    this.puntoVentaService.eliminar(this.punto_venta).subscribe(
      res => {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.consultar();
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_buscar_codigo() {
    this.buscar(null);
  }

  cambiar_buscar_descripcion() {
    this.buscar(null);
  }

  cambiar_buscar_abreviatura() {
    this.buscar(null);
  }

}
