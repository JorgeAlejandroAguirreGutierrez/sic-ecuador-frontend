import { Component, OnInit, ViewChild, HostListener} from '@angular/core';
import { PlazoCreditoService } from '../servicios/plazo-credito.service';
import { PlazoCredito } from '../modelos/plazo-credito';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plazo-credito',
  templateUrl: './plazo-credito.component.html',
  styleUrls: ['./plazo-credito.component.css']
})
export class PlazoCreditoComponent implements OnInit {

  plazo_credito = new PlazoCredito();
  plazos_creditos: PlazoCredito[];
  p_plazo_credito = new PlazoCredito();

  @ViewChild("actualizar", {static:true}) modalActualizar: any;
  @ViewChild("eliminar", {static:true}) modalEliminar: any;

  constructor(private plazoCreditoService: PlazoCreditoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.plazoCreditoService.consultar().subscribe(
      res => {
        this.plazos_creditos = res.resultado as PlazoCredito[]
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
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      if (result == "actualizar") {
        this.actualizar(this.p_plazo_credito);
      }
      if (result == "eliminar") {
        this.eliminar(this.p_plazo_credito);
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
      return `with: ${reason}`;
    }
  }

  seleccion(plazo_credito: PlazoCredito) {
    this.p_plazo_credito = plazo_credito;
  }

  crear() {
    this.plazoCreditoService.crear(this.plazo_credito).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.plazo_credito = res.resultado as PlazoCredito;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  nuevo() {
    this.plazo_credito = new PlazoCredito();
  }

  actualizar(plazo_credito: PlazoCredito) {
    this.plazoCreditoService.actualizar(plazo_credito).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.plazo_credito = res.resultado as PlazoCredito;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(plazo_credito: PlazoCredito) {
    this.plazoCreditoService.eliminar(plazo_credito).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.plazo_credito = res.resultado as PlazoCredito
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
