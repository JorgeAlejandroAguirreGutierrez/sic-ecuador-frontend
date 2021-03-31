import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { FormaPagoComponent } from '../forma-pago.component';
import { FormaPago } from '../../../modelos/forma-pago';
import { FormaPagoService } from '../../../servicios/forma-pago.service';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-forma-pago-leer',
  templateUrl: './forma-pago-leer.component.html',
  styleUrls: ['./forma-pago-leer.component.scss']
})
export class FormaPagoLeerComponent implements OnInit {

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
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.formaPagoService.buscar(this.forma_pago_buscar).subscribe(
      res => {
        this.formas_pagos = res.resultado as FormaPago[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
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
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteFormaPago,'Actualizar Forma de Pago');
    } else {
      Swal.fire(constantes.error, "Selecciona una Forma de Pago", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.formaPagoService.eliminar(this.forma_pago).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.forma_pago = res.resultado as FormaPago       
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_buscar_codigo(){
    this.buscar(null);
  }

  cambiar_buscar_descripcion(){
    this.buscar(null);
  }

  cambiar_buscar_abreviatura(){
    this.buscar(null);
  }

}
