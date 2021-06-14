import { Component, OnInit, HostListener, Type } from '@angular/core';
import { TabService } from '../../componentes/services/tab.service';
import { EstadoCivil } from '../../modelos/estado-civil';
import { EstadoCivilService } from '../../servicios/estado-civil.service';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.scss']
})
export class EstadoCivilComponent implements OnInit {

  collapsed = true;
  abrirPanelNuevoEstadoCivil = true;
  abrirPanelAdminEstadoCivil = false;

  sesion: Sesion;
  estado_civil= new EstadoCivil();

  estados_civiles: EstadoCivil[];
  //estado_civil: EstadoCivil;
  estado_civil_actualizar: EstadoCivil= new EstadoCivil();
  estado_civil_buscar: EstadoCivil=new EstadoCivil();
  ComponenteEstadoCivil: Type<any> = EstadoCivilComponent;

  constructor(private tabService: TabService,private estadoCivilService: EstadoCivilService,
    private sesionService: SesionService,private router: Router) { }

  ngOnInit() {
    this.construir_estado_civil();
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
      if(this.estado_civil.id!=0){
        let id=this.estado_civil.id;
        let codigo=this.estado_civil.codigo;
        this.estado_civil=new EstadoCivil();
        this.estado_civil.id=id;
        this.estado_civil.codigo=codigo;
      }
      else{
        this.estado_civil=new EstadoCivil();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.estadoCivilService.crear(this.estado_civil).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.nuevo(null);
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.exito_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.estadoCivilService.actualizar(this.estado_civil).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.estado_civil=res.resultado as EstadoCivil;
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevoEstadoCivil = true;
      this.abrirPanelAdminEstadoCivil = false;
    if (this.estado_civil_actualizar.id != 0){
      this.estado_civil={... this.estado_civil_actualizar};
      this.estado_civil_actualizar=new EstadoCivil();
    }
  }

  eliminar(estado_civil: EstadoCivil) {
    this.estadoCivilService.eliminar(estado_civil).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.error_swal);
        this.estado_civil=res.resultado as EstadoCivil
        this.consultar(); 
      },
      err => Swal.fire(constantes.exito, err.error.mensaje, constantes.exito_swal)
    );
  }

  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.estadoCivilService.eliminar(this.estado_civil).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.estado_civil = res.resultado as EstadoCivil
          this.consultar(); 
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }        
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  async construir_estado_civil() {
    let estado_civil_id=0;
    this.estadoCivilService.currentMessage.subscribe(message => estado_civil_id = message);
    if (estado_civil_id!= 0) {
      await this.estadoCivilService.obtenerAsync(estado_civil_id).then(
        res => {
          Object.assign(this.estado_civil, res.resultado as EstadoCivil);
          this.estadoCivilService.enviar(0);
        },
        err => Swal.fire(constantes.exito, err.error.mensaje, constantes.exito_swal)
      );
    }
  }

  consultar() {
    this.estadoCivilService.consultar().subscribe(
      res => {
        this.estados_civiles = res.resultado as EstadoCivil[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.estadoCivilService.buscar(this.estado_civil_buscar).subscribe(
      res => {
        if (res.resultado!=null) {
          this.estados_civiles = res.resultado as EstadoCivil[]
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  seleccion(estado_civil: EstadoCivil) {
    this.estado_civil=estado_civil;
  }

  cambiar_buscar_codigo(){
    this.estado_civil_buscar.descripcion="";
    this.estado_civil_buscar.abreviatura="";
  }

  cambiar_buscar_descripcion(){
    this.estado_civil_buscar.codigo="";
    this.estado_civil_buscar.abreviatura="";
  }

  cambiar_buscar_abreviatura(){
    this.estado_civil_buscar.codigo="";
    this.estado_civil_buscar.descripcion="";
  }
}
