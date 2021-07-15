import { Component, OnInit, HostListener, Type } from '@angular/core';
import { TabService } from '../../componentes/services/tab.service';
import Swal from 'sweetalert2';
import { TablaEquivalenciaMedida } from '../../modelos/tabla-equivalencia-medida';
import { TablaEquivalenciaMedidaService } from '../../servicios/tabla-equivalencia-medida.service';
import { Medida } from '../../modelos/medida';
import { MedidaService } from '../../servicios/medida.service';
import * as constantes from '../../constantes';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-tabla-equivalencia-medida',
  templateUrl: './tabla-equivalencia-medida.component.html',
  styleUrls: ['./tabla-equivalencia-medida.component.scss']
})

export class TablaEquivalenciaMedidaComponent implements OnInit {

  collapsed = true;
  abrirPanelNuevaEquivalencia = true;
  abrirPanelAdminEquivalencia = false;

  sesion: Sesion;
  tabla_equivalencia_medida= new TablaEquivalenciaMedida();
  tablas_equivalencias_medidas: TablaEquivalenciaMedida[];
  //tabla_equivalencia_medida: TablaEquivalenciaMedida;
  tabla_equivalencia_medida_actualizar: TablaEquivalenciaMedida=new TablaEquivalenciaMedida();
  tabla_equivalencia_medida_buscar: TablaEquivalenciaMedida=new TablaEquivalenciaMedida();

  constructor(private tabService: TabService,private tablaEquivalenciaMedidaService: TablaEquivalenciaMedidaService, private medidaService: MedidaService,
    private sesionService: SesionService,private router: Router) { }

  ngOnInit() {
    this.sesion= this.sesionService.getSesion();
    this.construir_tabla_equivalencia_medida();
    this.consultar();
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.key == 'G') //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == 'N') //ASHIFT + N
      this.nuevo(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == 'E') // SHIFT + E
      this.eliminar(null);
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.tabla_equivalencia_medida = new TablaEquivalenciaMedida();
  }

  borrar(event){
    if (event!=null)
      event.preventDefault();
      if(this.tabla_equivalencia_medida.id!=0){
        let id=this.tabla_equivalencia_medida.id;
        let codigo=this.tabla_equivalencia_medida.codigo;
        this.tabla_equivalencia_medida=new TablaEquivalenciaMedida();
        this.tabla_equivalencia_medida.id=id;
        this.tabla_equivalencia_medida.codigo=codigo;
      }
      else{
        this.tabla_equivalencia_medida=new TablaEquivalenciaMedida();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.tablaEquivalenciaMedidaService.crear(this.tabla_equivalencia_medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.tablaEquivalenciaMedidaService.actualizar(this.tabla_equivalencia_medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.tabla_equivalencia_medida=res.resultado as TablaEquivalenciaMedida;
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevaEquivalencia = true;
      this.abrirPanelAdminEquivalencia = false;
    if (this.tabla_equivalencia_medida_actualizar.id != 0){
      this.tabla_equivalencia_medida={... this.tabla_equivalencia_medida_actualizar};
      this.tabla_equivalencia_medida_actualizar=new TablaEquivalenciaMedida();
    }
  }

  eliminar(tabla_equivalencia_medida: TablaEquivalenciaMedida) {
    this.tablaEquivalenciaMedidaService.eliminar(tabla_equivalencia_medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.tabla_equivalencia_medida=res.resultado as TablaEquivalenciaMedida
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.tablaEquivalenciaMedidaService.eliminar(this.tabla_equivalencia_medida).subscribe(
      res => {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.consultar();
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_tabla_equivalencia_medida() {
    let tabla_equivalencia_medida_id=0;
    this.tablaEquivalenciaMedidaService.currentMessage.subscribe(message => tabla_equivalencia_medida_id = message);
    if (tabla_equivalencia_medida_id!= 0) {
      await this.tablaEquivalenciaMedidaService.obtenerAsync(tabla_equivalencia_medida_id).then(
        res => {
          Object.assign(this.tabla_equivalencia_medida, res.resultado as TablaEquivalenciaMedida);
          this.tablaEquivalenciaMedidaService.enviar(0);
        },
        err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
      );
    }
  }

  compareFn(a: any, b: any) {
    return a && b && a.id == b.id;
  }

  consultar() {
    this.tablaEquivalenciaMedidaService.consultar().subscribe(
      res => {
        this.tablas_equivalencias_medidas = res.resultado as TablaEquivalenciaMedida[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.tablaEquivalenciaMedidaService.buscar(this.tabla_equivalencia_medida_buscar).subscribe(
      res => {
          this.tablas_equivalencias_medidas = res.resultado as TablaEquivalenciaMedida[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(tabla_equivalencia_medida: TablaEquivalenciaMedida) {
    this.tabla_equivalencia_medida=tabla_equivalencia_medida;
  }

  cambiar_buscar_codigo(){
    this.buscar(null);
  }

  cambiar_buscar_medida1(){
    this.buscar(null);
  }

  cambiar_buscar_medida2(){
    this.buscar(null);
  }

  cambiar_buscar_equivalencia(){
    this.buscar(null);;
  }

}
