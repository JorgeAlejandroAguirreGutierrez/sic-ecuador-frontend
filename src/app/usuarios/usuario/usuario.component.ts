import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../modelos/usuario';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario= new Usuario();
  empresas: Usuario[];
  p_usuario= new Usuario();

  constructor(private usuarioService: UsuarioService, private modalService: NgbModal) { }

  ngOnInit() {
    this.usuarioService.obtener().subscribe(
      res=>this.empresas=res.resultado as Usuario[]
    );
  }

  open(content: any, usuario: Usuario) {
    this.p_usuario=usuario;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_usuario);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_usuario);
      }
    }, (reason) => {
      
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  crear() {
    this.usuarioService.crear(this.usuario).subscribe(
      res => {
        console.log(res);
        Swal.fire('Exito', res.mensaje, 'success');
        this.usuario=res.resultado as Usuario;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(usuario: Usuario) {
    this.usuarioService.actualizar(usuario).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.usuario=res.resultado as Usuario;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(usuario: Usuario) {
    this.usuarioService.eliminar(usuario).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.usuario=res.resultado as Usuario;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
