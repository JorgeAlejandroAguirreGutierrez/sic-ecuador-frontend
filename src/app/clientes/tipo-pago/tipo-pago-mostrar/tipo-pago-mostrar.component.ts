import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../servicios/services/tab.service";
import { TipoPagoComponent } from '../tipo-pago.component';
import { TipoPagoService } from '../../../servicios/tipo-pago.service';
import { TipoPago } from '../../../modelos/tipo-pago';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-tipo-pago-mostrar',
  templateUrl: './tipo-pago-mostrar.component.html',
  styleUrls: ['./tipo-pago-mostrar.component.scss']
})
export class TipoPagoMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteTipoPago: Type<any> = TipoPagoComponent;

  sesion: Sesion;

  constructor(private tipoPagoService: TipoPagoService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  tipos_pagos: TipoPago[];
  tipo_pago: TipoPago;
  tipo_pago_buscar: TipoPago=new TipoPago();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.tipoPagoService.consultar().subscribe(
      res => {
        this.tipos_pagos = res.resultado as TipoPago[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.tipoPagoService.buscar(this.tipo_pago_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.tipos_pagos = res.resultado as TipoPago[]
          } else {
            Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
          }
        }
      );
  }

  seleccion(tipo_pago: TipoPago) {
    this.tipo_pago=tipo_pago;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.tipo_pago != null){
      this.tipoPagoService.enviar(this.tipo_pago.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteTipoPago,'Actualizar Genero');
    } else {
      Swal.fire(constantes.error, "Selecciona un Tipo de Pago", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.tipoPagoService.eliminar(this.tipo_pago).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.tipo_pago = res.resultado as TipoPago
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }        
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  cambiar_buscar_codigo(){

  }

  cambiar_buscar_descripcion(){

  }

  cambiar_buscar_abreviatura(){

  }

}
