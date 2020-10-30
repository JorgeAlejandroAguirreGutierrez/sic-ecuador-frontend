import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { UsuarioComponent } from '../usuario.component';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Usuario } from '../../../modelos/usuario';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-usuario-mostrar',
  templateUrl: './usuario-mostrar.component.html',
  styleUrls: ['./usuario-mostrar.component.scss']
})
export class UsuarioMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteUsuario: Type<any> = UsuarioComponent;

  sesion: Sesion;

  constructor(private usuarioService: UsuarioService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  usuarios: Usuario[];
  usuario: Usuario;
  usuario_buscar: Usuario=new Usuario();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.usuarioService.consultar().subscribe(
      res => {
        this.usuarios = res.resultado as Usuario[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.usuarioService.buscar(this.usuario_buscar).subscribe(
      res => {
          this.usuarios = res.resultado as Usuario[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  seleccion(usuario: Usuario) {
    this.usuario=usuario;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.usuario != null){
      this.usuarioService.enviar(this.usuario.id);
      this.tabService.addNewTab(this.ComponenteUsuario,'Actualizar Usuario');
    } else {
      Swal.fire(constantes.error, "Selecciona un Usuario", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.usuarioService.eliminar(this.usuario).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.usuario = res.resultado as Usuario
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }        
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  cambiar_buscar_codigo(){

  }

  cambiar_buscar_nombre(){

  }

  cambiar_buscar_correo(){

  }

}
