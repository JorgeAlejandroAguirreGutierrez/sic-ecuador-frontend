import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { FormaPagoComponent } from '../forma-pago.component';
import { FormaPago } from '../../../modelos/forma-pago';
import { FormaPagoService } from '../../../servicios/forma-pago.service';


@Component({
  selector: 'app-forma-pago-mostrar',
  templateUrl: './forma-pago-mostrar.component.html',
  styleUrls: ['./forma-pago-mostrar.component.scss']
})
export class FormaPagoMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteFormaPago: Type<any> = FormaPagoComponent;

  sesion: Sesion;

  constructor(private formaPagoService: FormaPagoService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  formas_pagos: FormaPago[];
  forma_pago: FormaPago;
  forma_pago_buscar: FormaPago=new FormaPago();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.formaPagoService.consultar().subscribe(
      res => {
        this.formas_pagos = res.resultado as FormaPago[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.formaPagoService.buscar(this.forma_pago_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.formas_pagos = res.resultado as FormaPago[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
      );
  }

  seleccion(forma_pago: FormaPago) {
    this.forma_pago=forma_pago;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.forma_pago != null){
      this.formaPagoService.enviar(this.forma_pago.id);
      this.tabService.addNewTab(this.ComponenteFormaPago,'Actualizar Forma de Pago');
    } else {
      Swal.fire('Error', "Selecciona una Forma de Pago", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.formaPagoService.eliminar(this.forma_pago).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.forma_pago = res.resultado as FormaPago
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
