import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { GrupoClienteComponent } from '../grupo-cliente.component';
import { GrupoClienteService } from '../../../servicios/grupo-cliente.service';
import { GrupoCliente } from '../../../modelos/grupo-cliente';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-grupo-cliente-mostrar',
  templateUrl: './grupo-cliente-mostrar.component.html',
  styleUrls: ['./grupo-cliente-mostrar.component.scss']
})
export class GrupoClienteMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteGrupoCliente: Type<any> = GrupoClienteComponent;

  sesion: Sesion;

  constructor(private grupoClienteService: GrupoClienteService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  grupos_clientes: GrupoCliente[];
  grupo_cliente: GrupoCliente;
  grupo_cliente_buscar: GrupoCliente=new GrupoCliente();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.grupoClienteService.consultar().subscribe(
      res => {
        this.grupos_clientes = res.resultado as GrupoCliente[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.grupoClienteService.buscar(this.grupo_cliente_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.grupos_clientes = res.resultado as GrupoCliente[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
      );
  }

  seleccion(grupo_cliente: GrupoCliente) {
    this.grupo_cliente=grupo_cliente;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.grupo_cliente != null){
      this.grupoClienteService.enviar(this.grupo_cliente.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteGrupoCliente,'Actualizar Grupo Cliente');
    } else {
      Swal.fire('Error', "Selecciona un Grupo Cliente", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.grupoClienteService.eliminar(this.grupo_cliente).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.grupo_cliente = res.resultado as GrupoCliente
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
