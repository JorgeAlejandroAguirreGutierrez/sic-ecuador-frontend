import { Component, OnInit, ViewChild, HostListener  } from '@angular/core';
import { GrupoClienteService } from '../../servicios/grupo-cliente.service';
import { GrupoCliente } from '../../modelos/grupo-cliente';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-cliente',
  templateUrl: './grupo-cliente.component.html',
  styleUrls: ['./grupo-cliente.component.css']
})
export class GrupoClienteComponent implements OnInit {

  grupo_cliente= new GrupoCliente();
  grupos_clientes: GrupoCliente[];
  p_grupo_cliente= new GrupoCliente();

  @ViewChild("actualizar", {static:true}) modalActualizar: any;
  @ViewChild("eliminar", {static:true}) modalEliminar: any;

  constructor(private grupoClienteService: GrupoClienteService, private modalService: NgbModal) { }

  ngOnInit() {
    this.grupoClienteService.consultar().subscribe(
      res=>{
        this.grupos_clientes= res.resultado as GrupoCliente[]
      }
    );
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 71)
      this.crear();
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 78)
      this.nuevo();
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 69)
      this.open(this.modalActualizar);
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 66)
      console.log('SHIFT + B');
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 65)
      this.open(this.modalEliminar);
  }

  open(content: any) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_grupo_cliente);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_grupo_cliente);
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

  nuevo() {
    this.grupo_cliente = new GrupoCliente();
  }

  seleccion(grupo_cliente: GrupoCliente) {
    this.p_grupo_cliente = grupo_cliente;
  }

  crear() {
    this.grupoClienteService.crear(this.grupo_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.grupo_cliente=res.resultado as GrupoCliente;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(grupo_cliente: GrupoCliente) {
    this.grupoClienteService.actualizar(grupo_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.grupo_cliente=res.resultado as GrupoCliente;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(grupo_cliente: GrupoCliente) {
    this.grupoClienteService.eliminar(grupo_cliente).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.grupo_cliente=res.resultado as GrupoCliente
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
