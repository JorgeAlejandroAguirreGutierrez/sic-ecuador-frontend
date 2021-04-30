import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../servicios/services/tab.service";
import { UbicacionComponent } from '../ubicacion.component';
import { Ubicacion } from '../../../modelos/ubicacion';
import { UbicacionService } from '../../../servicios/ubicacion.service';


@Component({
  selector: 'app-ubicacion-mostrar',
  templateUrl: './ubicacion-mostrar.component.html',
  styleUrls: ['./ubicacion-mostrar.component.scss']
})
export class UbicacionMostrarComponent implements OnInit {

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
      }
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.ubicacionService.buscar(this.ubicacion_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.ubicaciones = res.resultado as Ubicacion[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
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

  cambiar_buscar_ubicacion_codigo_norma(){

  }

  cambiar_buscar_ubicacion_provincia(){

  }

  cambiar_buscar_ubicacion_canton(){

  }
  cambiar_buscar_ubicacion_parroquia(){
    
  }

}
