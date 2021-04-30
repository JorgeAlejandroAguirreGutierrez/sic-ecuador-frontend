import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../servicios/services/tab.service";
import { PlazoCreditoComponent } from '../plazo-credito.component';
import { PlazoCreditoService } from '../../../servicios/plazo-credito.service';
import { PlazoCredito } from '../../../modelos/plazo-credito';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-plazo-credito-mostrar',
  templateUrl: './plazo-credito-mostrar.component.html',
  styleUrls: ['./plazo-credito-mostrar.component.scss']
})
export class PlazoCreditoMostrarComponent implements OnInit {

  collapsed = true;
  ComponentePlazoCredito: Type<any> = PlazoCreditoComponent;

  sesion: Sesion;

  constructor(private plazoCreditoService: PlazoCreditoService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  plazos_creditos: PlazoCredito[];
  plazo_credito: PlazoCredito;
  plazo_credito_buscar: PlazoCredito=new PlazoCredito();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.plazoCreditoService.consultar().subscribe(
      res => {
        this.plazos_creditos = res.resultado as PlazoCredito[]
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.plazoCreditoService.buscar(this.plazo_credito_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.plazos_creditos = res.resultado as PlazoCredito[]
          } else {
            Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
          }
        }
      );
  }

  seleccion(plazo_credito: PlazoCredito) {
    this.plazo_credito=plazo_credito;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.plazo_credito != null){
      this.plazoCreditoService.enviar(this.plazo_credito.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponentePlazoCredito,constantes.tab_actualizar_plazo_credito);
    } else {
      Swal.fire(constantes.error, "Selecciona un Plazo de Credito", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.plazoCreditoService.eliminar(this.plazo_credito).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.plazo_credito = res.resultado as PlazoCredito
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

  cambiar_buscar_plazo(){

  }

}
