import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { OrigenIngresoComponent } from '../origen-ingreso.component';
import { OrigenIngresoService } from '../../../servicios/origen-ingreso.service';
import { OrigenIngreso } from '../../../modelos/origen-ingreso';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-origen-ingreso-leer',
  templateUrl: './origen-ingreso-leer.component.html',
  styleUrls: ['./origen-ingreso-leer.component.scss']
})
export class OrigenIngresoLeerComponent implements OnInit {

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
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.buscar(this.origen_ingreso_buscar).subscribe(
      res => {
        this.origenes_ingresos = res.resultado as OrigenIngreso[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(origen_ingreso: OrigenIngreso) {
    this.origen_ingreso=origen_ingreso;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
    this.tabService.addNewTab(OrigenIngresoComponent, constantes.tab_crear_origen_ingreso);
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.origen_ingreso != null){
      this.origenIngresoService.enviar(this.origen_ingreso.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteOrigenIngreso, constantes.tab_actualizar_origen_ingreso);
    } else {
      Swal.fire(constantes.error, "Selecciona un Origen de Ingreso", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.origenIngresoService.eliminar(this.origen_ingreso).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.consultar();  
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_buscar_codigo(){
    this.buscar(null);
  }

  cambiar_buscar_descripcion(){
    this.buscar(null);
  }

  cambiar_buscar_abreviatura(){
    this.buscar(null);
  }

}
