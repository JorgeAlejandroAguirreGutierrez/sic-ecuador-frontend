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
  selector: 'app-punto-venta-mostrar',
  templateUrl: './punto-venta-mostrar.component.html',
  styleUrls: ['./punto-venta-mostrar.component.scss']
})
export class PuntoVentaMostrarComponent implements OnInit {

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
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event != null)
      event.preventDefault();
    this.puntoVentaService.buscar(this.punto_venta_buscar).subscribe(
      res => {
        this.puntos_ventas = res.resultado as PuntoVenta[];
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
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
        if (res.resultado != null) {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.punto_venta = res.resultado as PuntoVenta;
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  cambiar_buscar_codigo() {
  }

  cambiar_buscar_descripcion() {
  }

  cambiar_buscar_abreviatura() {
  }

}
