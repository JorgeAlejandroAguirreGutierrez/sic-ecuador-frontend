import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { EstadoCivilComponent } from '../estado-civil.component';
import { EstadoCivilService } from '../../../servicios/estado-civil.service';
import { EstadoCivil } from '../../../modelos/estado-civil';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-estado-civil-mostrar',
  templateUrl: './estado-civil-mostrar.component.html',
  styleUrls: ['./estado-civil-mostrar.component.scss']
})
export class EstadoCivilMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteEstadoCivil: Type<any> = EstadoCivilComponent;

  sesion: Sesion;

  constructor(private estadoCivilService: EstadoCivilService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  estados_civiles: EstadoCivil[];
  estado_civil: EstadoCivil;
  estado_civil_buscar: EstadoCivil=new EstadoCivil();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.estadoCivilService.consultar().subscribe(
      res => {
        this.estados_civiles = res.resultado as EstadoCivil[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.estadoCivilService.buscar(this.estado_civil_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.estados_civiles = res.resultado as EstadoCivil[]
          } else {
            Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
          }
        }
      );
  }

  seleccion(estado_civil: EstadoCivil) {
    this.estado_civil=estado_civil;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.estado_civil != null){
      this.estadoCivilService.enviar(this.estado_civil.id);
      this.tabService.addNewTab(this.ComponenteEstadoCivil,'Actualizar Estado Civil');
    } else {
      Swal.fire(constantes.error, "Selecciona un Estado Civil", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.estadoCivilService.eliminar(this.estado_civil).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.estado_civil = res.resultado as EstadoCivil
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }        
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  cambiar_buscar_codigo(){

  }

  cambiar_buscar_descripcion(){

  }

  cambiar_buscar_abreviatura(){

  }

}
