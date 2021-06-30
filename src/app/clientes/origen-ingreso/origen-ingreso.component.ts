import { Component, OnInit, HostListener, Type } from '@angular/core';
import { OrigenIngresoService } from '../../servicios/origen-ingreso.service';
import { OrigenIngreso } from '../../modelos/origen-ingreso';
import { TabService } from '../../componentes/services/tab.service';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-origen-ingreso',
  templateUrl: './origen-ingreso.component.html',
  styleUrls: ['./origen-ingreso.component.scss']
})
export class OrigenIngresoComponent implements OnInit {

  origen_ingreso= new OrigenIngreso();
  collapsed = true;
  ComponenteOrigenIngreso: Type<any> = OrigenIngresoComponent;

  sesion: Sesion;
  abrirPanelNuevoOrigen = true;
  abrirPanelAdminOrigen = false;

  origenes_ingresos: OrigenIngreso[];
  //origen_ingreso: OrigenIngreso;
  origen_ingreso_actualizar: OrigenIngreso= new OrigenIngreso();
  origen_ingreso_buscar: OrigenIngreso=new OrigenIngreso();

  constructor(private tabService: TabService,private origenIngresoService: OrigenIngresoService,
    private sesionService: SesionService,private router: Router) { }

  ngOnInit() {
    this.sesion= this.sesionService.getSesion();
    this.construir_origen_ingreso();
    this.consultar();
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.key == 'G') //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == 'N') //SHIFT + N
      this.nuevo(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == 'E') // SHIFT + E
      this.eliminar(null);
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.tabService.addNewTab(OrigenIngresoComponent, constantes.tab_crear_origen_ingreso);
  }
  
  borrar(event){
    if (event!=null)
      event.preventDefault();
      if(this.origen_ingreso.id!=0){
        let id=this.origen_ingreso.id;
        let codigo=this.origen_ingreso.codigo;
        this.origen_ingreso=new OrigenIngreso();
        this.origen_ingreso.id=id;
        this.origen_ingreso.codigo=codigo;
      }
      else{
        this.origen_ingreso=new OrigenIngreso();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.crear(this.origen_ingreso).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.actualizar(this.origen_ingreso).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.origen_ingreso=res.resultado as OrigenIngreso;
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevoOrigen = true;
      this.abrirPanelAdminOrigen = false;
    if (this.origen_ingreso_actualizar.id != 0){
      this.origen_ingreso={... this.origen_ingreso_actualizar};
      this.origen_ingreso_actualizar=new OrigenIngreso();
    }
  }

  eliminar(origen_ingreso: OrigenIngreso) {
    this.origenIngresoService.eliminar(origen_ingreso).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.origen_ingreso=res.resultado as OrigenIngreso
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.eliminar(this.origen_ingreso).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.consultar();  
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_origen_ingreso() {
    let origen_ingreso_id=0;
    this.origenIngresoService.currentMessage.subscribe(message => origen_ingreso_id = message);
    if (origen_ingreso_id!= 0) {
      await this.origenIngresoService.obtenerAsync(origen_ingreso_id).then(
        res => {
          Object.assign(this.origen_ingreso, res.resultado as OrigenIngreso);
          this.origenIngresoService.enviar(0);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
  }

   consultar() {
    this.origenIngresoService.consultar().subscribe(
      res => {
        this.origenes_ingresos = res.resultado as OrigenIngreso[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.buscar(this.origen_ingreso_buscar).subscribe(
      res => {
        this.origenes_ingresos = res.resultado as OrigenIngreso[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(origen_ingreso: OrigenIngreso) {
    this.origen_ingreso=origen_ingreso;
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
