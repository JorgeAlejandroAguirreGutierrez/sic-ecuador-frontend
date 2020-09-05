import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { GeneroService } from '../../servicios/genero.service';
import { Genero } from '../../modelos/genero';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  genero= new Genero();
  generos: Genero[];
  p_genero= new Genero();

  @ViewChild("actualizar", {static:true}) modalActualizar: any;
  @ViewChild("eliminar", {static:true}) modalEliminar: any;

  constructor(private generoService: GeneroService, private modalService: NgbModal) { }

  ngOnInit() {
    this.generoService.consultar().subscribe(
      res=>this.generos=res.resultado as Genero[]
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

  seleccion(genero: Genero) {
    this.p_genero = genero;
  }

  nuevo() {
    this.genero = new Genero();
  }

  open(content: any) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_genero);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_genero);
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
    this.generoService.crear(this.genero).subscribe(
      res => {
        console.log(res);
        Swal.fire('Exito', res.mensaje, 'success');
        this.genero=res.resultado as Genero;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(genero: Genero) {
    this.generoService.actualizar(genero).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.genero=res.resultado as Genero;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(genero: Genero) {
    this.generoService.eliminar(genero).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.genero=res.resultado as Genero;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
