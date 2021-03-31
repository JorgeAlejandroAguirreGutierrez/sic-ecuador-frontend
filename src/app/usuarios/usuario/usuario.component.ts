import { Component, HostListener, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../modelos/usuario';
import Swal from 'sweetalert2';
import { TabService } from '../../componentes/services/tab.service';
import * as constantes from '../../constantes';
import { Perfil } from '../../modelos/perfil';
import { PerfilService } from '../../servicios/perfil-service.service';
import { PuntoVenta } from '../../modelos/punto-venta';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario= new Usuario();
  perfiles: Perfil[]=[];
  puntos_ventas: PuntoVenta[]=[];

  constructor(private tabService: TabService,private usuarioService: UsuarioService, private perfilService: PerfilService) { }

  ngOnInit() {
    this.consultar_perfiles();
    this.consultar_puntos_ventas();
    this.construir_usuario();
    
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.usuario = new Usuario();
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.usuarioService.crear(this.usuario).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.nuevo(null);
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.usuario=res.resultado as Usuario;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_usuario() {
    let usuario_id=0;
    this.usuarioService.currentMessage.subscribe(message => usuario_id = message);
    if (usuario_id!= 0) {
      await this.usuarioService.obtenerAsync(usuario_id).then(
        res => {
          Object.assign(this.usuario, res.resultado as Usuario);
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
    }
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 71) //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 78) //ASHIFT + N
      this.nuevo(null);
  }

  consultar_perfiles(){
    this.perfilService.consultar().subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.perfiles=res.resultado as Perfil[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  consultar_puntos_ventas(){
    this.perfilService.consultar().subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.puntos_ventas=res.resultado as PuntoVenta[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

}
