import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { UbicacionComponent } from '../ubicacion.component';
import { Ubicacion } from '../../../modelos/ubicacion';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-ubicacion-leer',
  templateUrl: './ubicacion-leer.component.html',
  styleUrls: ['./ubicacion-leer.component.scss']
})
export class UbicacionLeerComponent implements OnInit {

  collapsed = true;
  ComponenteUbicacion: Type<any> = UbicacionComponent;

  sesion: Sesion;

  constructor(private ubicacionService: UbicacionService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

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
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.ubicacionService.buscar(this.ubicacion_buscar).subscribe(
        res => {
          this.ubicaciones = res.resultado as Ubicacion[]
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
  }

  seleccion(ubicacion: Ubicacion) {
    this.ubicacion=ubicacion;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.ubicacion != null){
      this.ubicacionService.enviar(this.ubicacion.id);
      this.tabService.addNewTab(this.ComponenteUbicacion,'Actualizar Ubicacion');
    } else {
      Swal.fire('Error', "Selecciona un Producto", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.ubicacionService.eliminar(this.ubicacion).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.consultar();
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_buscar_ubicacion_codigo_norma(){
    this.buscar(null);
  }

  cambiar_buscar_ubicacion_provincia(){
    this.buscar(null);
  }

  cambiar_buscar_ubicacion_canton(){
    this.buscar(null);
  }
  cambiar_buscar_ubicacion_parroquia(){
    this.buscar(null);
  }

}
