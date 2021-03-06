import { Component, OnInit, HostListener, Type } from '@angular/core';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { GeneroService } from '../../servicios/genero.service';
import { Genero } from '../../modelos/genero';
import { TabService } from '../../componentes/services/tab.service';


@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  genero= new Genero();
  collapsed = true;
  abrirPanelNuevoGenero = true;
  abrirPanelAdminGenero = false;

  sesion: Sesion;
  generos: Genero[];
  //genero: Genero;
  genero_actualizar: Genero= new Genero();
  genero_buscar: Genero=new Genero();

  constructor(private tabService: TabService,private generoService: GeneroService,
    private sesionService: SesionService,private router: Router) { }

  ngOnInit() {
    this.sesion = this.sesionService.getSesion();
    this.construir_genero();
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
    this.tabService.addNewTab(GeneroComponent, constantes.tab_crear_genero);
  }

  borrar(event){
    if (event!=null)
      event.preventDefault();
      if(this.genero.id!=0){
        let id=this.genero.id;
        let codigo=this.genero.codigo;
        this.genero=new Genero();
        this.genero.id=id;
        this.genero.codigo=codigo;
      }
      else{
        this.genero=new Genero();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.generoService.crear(this.genero).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);

      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.generoService.actualizar(this.genero).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.genero=res.resultado as Genero;
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevoGenero = true;
      this.abrirPanelAdminGenero = false;
    if (this.genero_actualizar.id != 0){
      this.genero={... this.genero_actualizar};
      this.genero_actualizar=new Genero();
    }
  }

  eliminar(genero: Genero) {
    this.generoService.eliminar(genero).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.genero=res.resultado as Genero
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.generoService.eliminar(this.genero).subscribe(
      res => {
          Swal.fire('Exito', res.mensaje, 'success');
          this.consultar();   
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  
  async construir_genero() {
    let genero_id=0;
    this.generoService.currentMessage.subscribe(message => genero_id = message);
    if (genero_id!= 0) {
      await this.generoService.obtenerAsync(genero_id).then(
        res => {
          Object.assign(this.genero, res.resultado as Genero);
          this.generoService.enviar(0);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
  }
 
  consultar() {
    this.generoService.consultar().subscribe(
      res => {
        this.generos = res.resultado as Genero[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.generoService.buscar(this.genero_buscar).subscribe(
      res => {
        this.generos = res.resultado as Genero[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(genero: Genero) {
    this.genero=genero;
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
