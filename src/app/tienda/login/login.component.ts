import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { Usuario } from '../shared/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = { nombre: undefined , correo: undefined, contrasena: undefined};
  msnUsuarioNoEncontrado: String = undefined;

  constructor(private usuariosService:UsuariosService, 
  private router: Router) { }

  login(){
    this.msnUsuarioNoEncontrado = undefined;
    this.usuariosService.getUsuario(this.usuario).then(usuarioConsultado => {
      if(undefined == usuarioConsultado){
        this.msnUsuarioNoEncontrado = "Usuario no valido";
      }else{
        this.router.navigateByUrl('/tienda');
      }
    });
    
  }

}
