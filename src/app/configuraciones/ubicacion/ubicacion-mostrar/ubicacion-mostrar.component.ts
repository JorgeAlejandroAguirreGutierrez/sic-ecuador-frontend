import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TabService } from "../../../interfaces/services/tab.service";
import { UbicacionComponent } from '../ubicacion.component';
import { Ubicacion } from '../../../modelos/ubicacion';
import { UbicacionService } from '../../../servicios/ubicacion.service';


@Component({
  selector: 'app-ubicacion-mostrar',
  templateUrl: './ubicacion-mostrar.component.html',
  styleUrls: ['./ubicacion-mostrar.component.css']
})
export class UbicacionMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteUbicacion: Type<any> = UbicacionComponent;

  sesion: Sesion;

  constructor(private ubicacionService: UbicacionService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router, private modalService: NgbModal) { }

  ubicaciones: Ubicacion[];
  ubicacion: Ubicacion;
  ubicacion_buscar: Ubicacion=new Ubicacion();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.ubicacionService.consultar().subscribe(
      res => {
        this.ubicaciones = res.resultado as Ubicacion[]
      }
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
  }

  seleccion(ubicacion: Ubicacion) {
    this.ubicacion=ubicacion;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.ubicacion!= null){
      this.ubicacionService.enviar(this.ubicacion.id);
      this.tabService.addNewTab(this.ComponenteUbicacion,'Actualizar Ubicacion');
    } else {
      Swal.fire('Error', "Selecciona una Ubicacion", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.ubicacionService.eliminar(this.ubicacion).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.ubicacion = res.resultado as Ubicacion
          this.ngOnInit();
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }        
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
