import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { MedidaComponent } from '../medida.component';
import { MedidaService } from '../../../servicios/medida.service';
import { Medida } from '../../../modelos/medida';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-medida-leer',
  templateUrl: './medida-leer.component.html',
  styleUrls: ['./medida-leer.component.scss']
})
export class MedidaLeerComponent implements OnInit {

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
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.medidaService.buscar(this.medida_buscar).subscribe(
        res => {
          this.medidas = res.resultado as Medida[]
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
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
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.consultar();  
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_buscar_codigo(){
    this.buscar(null);
  }

  cambiar_buscar_codigo_norma(){
    this.buscar(null);
  }

  cambiar_buscar_descripcion(){
    this.buscar(null);
  }

  cambiar_buscar_abreviatura(){
    this.buscar(null);
  }

}
