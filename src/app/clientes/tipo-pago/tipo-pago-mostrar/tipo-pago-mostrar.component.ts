import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { TipoPagoComponent } from '../tipo-pago.component';
import { TipoPagoService } from '../../../servicios/tipo-pago.service';
import { TipoPago } from '../../../modelos/tipo-pago';


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
      err => Swal.fire('Error', err.error.mensaje, 'error')
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
            Swal.fire('Error', res.mensaje, 'error');
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
      this.tabService.addNewTab(this.ComponenteTipoPago,'Actualizar Genero');
    } else {
      Swal.fire('Error', "Selecciona un Tipo de Pago", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.tipoPagoService.eliminar(this.tipo_pago).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.tipo_pago = res.resultado as TipoPago
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }        
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  cambiar_buscar_codigo(){

  }

  cambiar_buscar_descripcion(){

  }

  cambiar_buscar_abreviatura(){

  }

}
