import { Component, OnInit, HostListener, Type } from '@angular/core';
import { FormaPago } from '../../modelos/forma-pago';
import { TabService } from '../../componentes/services/tab.service';
import { FormaPagoService } from '../../servicios/forma-pago.service';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.scss']
})

export class FormaPagoComponent implements OnInit {

  collapsed = true;
  ComponenteFormaPago: Type<any> = FormaPagoComponent;

  sesion: Sesion;
  abrirPanelNuevoFormaPago = true;
  abrirPanelAdminFormaPago = false;

  forma_pago= new FormaPago();
  formas_pagos: FormaPago[];
  //forma_pago: FormaPago;
  forma_pago_actualizar: FormaPago= new FormaPago();
  forma_pago_buscar: FormaPago=new FormaPago();

  constructor(private tabService: TabService,private formaPagoService: FormaPagoService,
    private sesionService: SesionService,private router: Router) { }

  ngOnInit() {
    this.construir_forma_pago();
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.key == "G") //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == "N") //ASHIFT + N
      this.nuevo(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == "E") // SHIFT + E
      this.eliminar(null);
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
  }

  borrar(event){
    if (event!=null)
      event.preventDefault();
      if(this.forma_pago.id!=0){
        let id=this.forma_pago.id;
        let codigo=this.forma_pago.codigo;
        this.forma_pago=new FormaPago();
        this.forma_pago.id=id;
        this.forma_pago.codigo=codigo;
      }
      else{
        this.forma_pago=new FormaPago();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.formaPagoService.crear(this.forma_pago).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.nuevo(null);
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.formaPagoService.actualizar(this.forma_pago).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.forma_pago=res.resultado as FormaPago;
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevoFormaPago = true;
      this.abrirPanelAdminFormaPago = false;
    if (this.forma_pago_actualizar.id != 0){
      this.forma_pago={... this.forma_pago_actualizar};
      this.forma_pago_actualizar=new FormaPago();
    }
  }

  eliminar(forma_pago: FormaPago) {
    this.formaPagoService.eliminar(forma_pago).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.forma_pago=res.resultado as FormaPago
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.formaPagoService.eliminar(this.forma_pago).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.forma_pago = res.resultado as FormaPago
        this.consultar();
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_forma_pago() {
    let forma_pago_id=0;
    this.formaPagoService.currentMessage.subscribe(message => forma_pago_id = message);
    if (forma_pago_id!= 0) {
      await this.formaPagoService.obtenerAsync(forma_pago_id).then(
        res => {
          Object.assign(this.forma_pago, res.resultado as FormaPago);
          this.formaPagoService.enviar(0);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
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
