import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { OrigenIngresoComponent } from '../origen-ingreso.component';
import { OrigenIngresoService } from '../../../servicios/origen-ingreso.service';
import { OrigenIngreso } from '../../../modelos/origen-ingreso';


@Component({
  selector: 'app-origen-ingreso-mostrar',
  templateUrl: './origen-ingreso-mostrar.component.html',
  styleUrls: ['./origen-ingreso-mostrar.component.scss']
})
export class OrigenIngresoMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteOrigenIngreso: Type<any> = OrigenIngresoComponent;

  sesion: Sesion;

  constructor(private origenIngresoService: OrigenIngresoService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  origenes_ingresos: OrigenIngreso[];
  origen_ingreso: OrigenIngreso;
  origen_ingreso_buscar: OrigenIngreso=new OrigenIngreso();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.origenIngresoService.consultar().subscribe(
      res => {
        this.origenes_ingresos = res.resultado as OrigenIngreso[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.origenIngresoService.buscar(this.origen_ingreso_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.origenes_ingresos = res.resultado as OrigenIngreso[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
      );
  }

  seleccion(origen_ingreso: OrigenIngreso) {
    this.origen_ingreso=origen_ingreso;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.origen_ingreso != null){
      this.origenIngresoService.enviar(this.origen_ingreso.id);
      this.tabService.addNewTab(this.ComponenteOrigenIngreso,'Actualizar Origen de Ingreso');
    } else {
      Swal.fire('Error', "Selecciona un Origen de Ingreso", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.eliminar(this.origen_ingreso).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.origen_ingreso = res.resultado as OrigenIngreso
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }        
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  cambiar_buscar_codigo(){

  }

  cambiar_buscar_descripcion(){

  }

  cambiar_buscar_abreviatura(){

  }

}
