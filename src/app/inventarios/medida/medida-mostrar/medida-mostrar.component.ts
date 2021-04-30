import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../servicios/services/tab.service";
import { MedidaComponent } from '../medida.component';
import { MedidaService } from '../../../servicios/medida.service';
import { Medida } from '../../../modelos/medida';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-medida-mostrar',
  templateUrl: './medida-mostrar.component.html',
  styleUrls: ['./medida-mostrar.component.scss']
})
export class MedidaMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteMedida: Type<any> = MedidaComponent;

  sesion: Sesion;

  constructor(private medidaService: MedidaService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  medidas: Medida[];
  medida: Medida;
  medida_buscar: Medida=new Medida();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.medidaService.consultar().subscribe(
      res => {
        this.medidas = res.resultado as Medida[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.medidaService.buscar(this.medida_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.medidas = res.resultado as Medida[]
          } else {
            Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
          }
        }
      );
  }

  seleccion(medida: Medida) {
    this.medida=medida;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.medida != null){
      this.medidaService.enviar(this.medida.id);
      this.tabService.addNewTab(this.ComponenteMedida, constantes.tab_actualizar_medida);
    } else {
      Swal.fire(constantes.error, "Selecciona un Estado Civil", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.medidaService.eliminar(this.medida).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.medida = res.resultado as Medida
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }        
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  cambiar_buscar_codigo(){

  }

  cambiar_buscar_codigo_norma(){
    
  }

  cambiar_buscar_descripcion(){

  }

  cambiar_buscar_abreviatura(){

  }

}
