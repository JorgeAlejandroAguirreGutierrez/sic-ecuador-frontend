import { Component, OnInit, HostListener  } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as constantes from '../../constantes';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { GrupoClienteService } from '../../servicios/grupo-cliente.service';
import { GrupoCliente } from '../../modelos/grupo-cliente';

@Component({
  selector: 'app-grupo-cliente',
  templateUrl: './grupo-cliente.component.html',
  styleUrls: ['./grupo-cliente.component.scss']
})

export class GrupoClienteComponent implements OnInit {

  collapsed = true;
  abrirPanelNuevoGrupo = true;
  abrirPanelAdminGrupo = false;

  sesion: Sesion;

  grupos_clientes: GrupoCliente[];
  grupo_cliente: GrupoCliente= new GrupoCliente();
  grupo_cliente_actualizar: GrupoCliente= new GrupoCliente();
  grupo_cliente_buscar: GrupoCliente=new GrupoCliente();

  constructor(private grupoClienteService: GrupoClienteService,
              private sesionService: SesionService, private router: Router) { }

  ngOnInit() {
    this.sesion= this.sesionService.getSesion();
    this.consultar();
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
    this.grupo_cliente=new GrupoCliente();
  }

  borrar(event){
    if (event!=null){
      event.preventDefault()};
      if(this.grupo_cliente.id!=0){
        let id=this.grupo_cliente.id;
        let codigo=this.grupo_cliente.codigo;
        this.grupo_cliente=new GrupoCliente();
        this.grupo_cliente.id=id;
        this.grupo_cliente.codigo=codigo;
      }
      else{
        this.grupo_cliente=new GrupoCliente();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoClienteService.crear(this.grupo_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_cliente=new GrupoCliente();
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoClienteService.actualizar(this.grupo_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_cliente=new GrupoCliente();
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevoGrupo = true;
      this.abrirPanelAdminGrupo = false;
      if(this.grupo_cliente_actualizar.id!=0){
        this.grupo_cliente={... this.grupo_cliente_actualizar};
        this.grupo_cliente_actualizar=new GrupoCliente();
      }
      
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoClienteService.eliminar(this.grupo_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_cliente = res.resultado as GrupoCliente;     
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  consultar() {
    this.grupoClienteService.consultar().subscribe(
      res => {
        this.grupos_clientes = res.resultado as GrupoCliente[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoClienteService.buscar(this.grupo_cliente_buscar).subscribe(
      res => {
          this.grupos_clientes = res.resultado as GrupoCliente[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(grupo_cliente: GrupoCliente) {
    this.grupo_cliente_actualizar=grupo_cliente;
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
