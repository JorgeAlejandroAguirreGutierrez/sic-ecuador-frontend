import { Component, OnInit, HostListener, ɵConsole, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../servicios/cliente.service';
import { Cliente } from '../../../modelos/cliente';
import { Sesion } from '../../../modelos/sesion';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { ClienteComponent } from '../cliente.component';
import * as constantes from '../../../constantes';

@Component({
  selector: 'app-cliente-mostrar',
  templateUrl: './cliente-mostrar.component.html',
  styleUrls: ['./cliente-mostrar.component.css']
})
export class ClienteMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteCliente: Type<any> = ClienteComponent;

  clientes: Cliente[];
  cliente: Cliente;
  cliente_buscar=new Cliente();

  sesion: Sesion;

  constructor(private clienteService: ClienteService, private router: Router,
     private modalService: NgbModal, private tabService: TabService) { }

  ngOnInit() {
    this.consultar();
  }

   consultar() {
    this.clienteService.consultar().subscribe(
      res => {
        this.clientes = res.resultado as Cliente[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 71)
    console.log('SHIFT + G');
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 69)
    console.log('SHIFT + E');
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 66)
      console.log('SHIFT + B');
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 65)
      console.log('SHIFT + A');

  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    if (this.cliente_buscar.identificacion!="" && this.cliente_buscar.razon_social=="") {
      this.clienteService.buscarIdentificacion(this.cliente_buscar.identificacion).subscribe(
        res => {
          this.clientes = res.resultado as Cliente[]
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    } 
    else if (this.cliente_buscar.identificacion=="" && this.cliente_buscar.razon_social!="") {
      this.clienteService.buscarRazonSocial(this.cliente_buscar.razon_social).subscribe(
        res => {
          this.clientes = res.resultado as Cliente[]
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
    else {
      this.consultar();
    }
  }

  cambiar_buscar_identificacion(){
    this.cliente_buscar.razon_social="";
  }
  cambiar_buscar_razon_social(){
    this.cliente_buscar.identificacion="";
  }


  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.clienteService.enviar(this.cliente.id);
    this.tabService.addNewTab(this.ComponenteCliente,'Actualizar cliente');
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.clienteService.eliminar(this.cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.cliente = res.resultado as Cliente
        this.ngOnInit();
      },
      err => Swal.fire(constantes.exito, err.error.mensaje, constantes.exito_swal)
    );
  }

  seleccion(cliente: Cliente) {
    this.cliente=cliente;
  }
}
