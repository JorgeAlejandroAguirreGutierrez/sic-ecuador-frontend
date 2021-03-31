import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { GeneroComponent } from '../genero.component';
import { GeneroService } from '../../../servicios/genero.service';
import { Genero } from '../../../modelos/genero';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-genero-leer',
  templateUrl: './genero-leer.component.html',
  styleUrls: ['./genero-leer.component.scss']
})
export class GeneroLeerComponent implements OnInit {

  collapsed = true;
  ComponenteGenero: Type<any> = GeneroComponent;

  sesion: Sesion;

  constructor(private generoService: GeneroService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  generos: Genero[];
  genero: Genero;
  genero_buscar: Genero=new Genero();


  ngOnInit() {
    this.consultar();
    this.sesion = this.sesionService.getSesion();
  }

  consultar() {
    this.generoService.consultar().subscribe(
      res => {
        this.generos = res.resultado as Genero[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.generoService.buscar(this.genero_buscar).subscribe(
      res => {
        this.generos = res.resultado as Genero[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(genero: Genero) {
    this.genero=genero;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.genero != null){
      this.generoService.enviar(this.genero.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteGenero,'Actualizar Genero');
    } else {
      Swal.fire('Error', "Selecciona un Estado Civil", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.generoService.eliminar(this.genero).subscribe(
      res => {
          Swal.fire('Exito', res.mensaje, 'success');
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
