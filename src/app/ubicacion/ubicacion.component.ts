import { Component, OnInit,ViewChild, HostListener } from '@angular/core';
import { UbicacionService } from '../servicios/ubicacion.service';
import { Ubicacion } from '../modelos/ubicacion';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  ubicacion= new Ubicacion();
  ubicaciones: Ubicacion[];
  p_ubicacion= new Ubicacion();

  @ViewChild("actualizar", {static:true}) modalActualizar: any;
  @ViewChild("eliminar", {static:true}) modalEliminar: any;

  constructor(private ubicacionService: UbicacionService, private modalService: NgbModal) { }

  ngOnInit() {
    this.ubicacionService.consultar().subscribe(
      res=>{
        this.ubicaciones= res.resultado as Ubicacion[]
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
        this.actualizar(this.p_ubicacion);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_ubicacion);
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
    this.ubicacion = new Ubicacion();
  }

  seleccion(ubicacion: Ubicacion) {
    this.p_ubicacion = ubicacion;
  }

  crear() {
    this.ubicacionService.crear(this.ubicacion).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.ubicacion=res.resultado as Ubicacion;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(ubicacion: Ubicacion) {
    this.ubicacionService.actualizar(ubicacion).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.ubicacion=res.resultado as Ubicacion;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(ubicacion: Ubicacion) {
    this.ubicacionService.eliminar(ubicacion).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.ubicacion=res.resultado as Ubicacion
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }
}
