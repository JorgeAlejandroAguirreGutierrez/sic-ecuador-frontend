import { Injectable } from '@angular/core';
import { DatabaseService } from '../db/database.service';
import { Usuario } from '../shared/usuario';
//import 'rxjs/Rx';

@Injectable()
export class UsuariosService{

  constructor(private databaseService:DatabaseService) { 
  }

  getUsuario(usuario:Usuario):Promise<Usuario>{
    return this.databaseService.getUsuarios().then(usuarios => {
      let usuarioEncontrado:Usuario = undefined;
      for (var index = 0; index < usuarios.length; index++) {
        let user = usuarios[index];
        if(user.contrasena == usuario.contrasena && user.correo == usuario.correo){
          usuarioEncontrado = user;
          break;
        }
      }
      return usuarioEncontrado;
    });
    
  }

}
