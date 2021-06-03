import { Component, OnInit, HostListener  } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as constantes from '../../constantes';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { TabService } from '../../componentes/services/tab.service';
import { GrupoClienteService } from '../../servicios/grupo-cliente.service';
import { GrupoCliente } from '../../modelos/grupo-cliente';

@Component({
  selector: 'app-grupo-cliente',
  templateUrl: './grupo-cliente.component.html',
  styleUrls: ['./grupo-cliente.component.scss']
})

export class GrupoClienteComponent implements OnInit {

  grupo_cliente= new GrupoCliente();
  collapsed = true;
  abrirPanelNuevoGrupo = true;
  abrirPanelAdminGrupo = false;

  sesion: Sesion;
  //ComponenteGrupoCliente: Type<any> = GrupoClienteComponent;

  grupos_clientes: GrupoCliente[];
  //grupo_cliente: GrupoCliente;
  grupo_cliente_buscar: GrupoCliente=new GrupoCliente();

  constructor(private tabService: TabService,private grupoClienteService: GrupoClienteService,
              private sesionService: SesionService, private router: Router) { }

  ngOnInit() {
    this.sesion= this.sesionService.getSesion();
    this.consultar();
    this.construir_grupo_cliente();
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
    this.tabService.addNewTab(GrupoClienteComponent, constantes.tab_crear_grupo_cliente);
  }

  // Este metodo es el que quiero corregir
  borrar(event){
    console.log(event);
    if (event!=null){
      event.preventDefault()};
      this.grupo_cliente.id = 0;
      this.grupo_cliente.codigo = "";
      this.grupo_cliente.descripcion = "";
      this.grupo_cliente.abreviatura = "";
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoClienteService.crear(this.grupo_cliente).subscribe(
      res => {
        this.grupo_cliente=res.resultado as GrupoCliente
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
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
        this.grupo_cliente=res.resultado as GrupoCliente;
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevoGrupo = true;
      this.abrirPanelAdminGrupo = false;
    /*if (this.grupo_cliente != null){
      this.grupoClienteService.enviar(this.grupo_cliente.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteGrupoCliente,'Actualizar Grupo Cliente');
    } else {
      Swal.fire('Error', "Selecciona un Grupo Cliente", 'error');
    }*/
  }

  eliminar(grupo_cliente: GrupoCliente) {
    this.grupoClienteService.eliminar(grupo_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.grupo_cliente=res.resultado as GrupoCliente
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoClienteService.eliminar(this.grupo_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.grupo_cliente = res.resultado as GrupoCliente;     
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_grupo_cliente() {
    let grupo_cliente_id=0;
    this.grupoClienteService.currentMessage.subscribe(message => grupo_cliente_id = message);
    if (grupo_cliente_id!= 0) {
      await this.grupoClienteService.obtenerAsync(grupo_cliente_id).then(
        res => {
          Object.assign(this.grupo_cliente, res.resultado as GrupoCliente);
          this.grupoClienteService.enviar(0);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
  }

  // Desde aqui lo que estaba en leer Grupo CLiente
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
    this.grupo_cliente=grupo_cliente;
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
