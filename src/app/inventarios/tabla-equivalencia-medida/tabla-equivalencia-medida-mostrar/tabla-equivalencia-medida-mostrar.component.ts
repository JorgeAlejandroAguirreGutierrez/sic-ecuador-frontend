import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { TablaEquivalenciaMedidaComponent } from '../tabla-equivalencia-medida.component';
import { TablaEquivalenciaMedidaService } from '../../../servicios/tabla-equivalencia-medida.service';
import { TablaEquivalenciaMedida } from '../../../modelos/tabla-equivalencia-medida';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-tabla-equivalencia-medida-mostrar',
  templateUrl: './tabla-equivalencia-medida-mostrar.component.html',
  styleUrls: ['./tabla-equivalencia-medida-mostrar.component.scss']
})
export class TablaEquivalenciaMedidaMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteTablaEquivalenciaMedida: Type<any> = TablaEquivalenciaMedidaComponent;

  sesion: Sesion;

  constructor(private tablaEquivalenciaMedidaService: TablaEquivalenciaMedidaService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  tablas_equivalencias_medidas: TablaEquivalenciaMedida[];
  tabla_equivalencia_medida: TablaEquivalenciaMedida;
  tabla_equivalencia_medida_buscar: TablaEquivalenciaMedida=new TablaEquivalenciaMedida();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.tablaEquivalenciaMedidaService.consultar().subscribe(
      res => {
        this.tablas_equivalencias_medidas = res.resultado as TablaEquivalenciaMedida[]
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.tablaEquivalenciaMedidaService.buscar(this.tabla_equivalencia_medida_buscar).subscribe(
      res => {
          this.tablas_equivalencias_medidas = res.resultado as TablaEquivalenciaMedida[]
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  seleccion(tabla_equivalencia_medida: TablaEquivalenciaMedida) {
    this.tabla_equivalencia_medida=tabla_equivalencia_medida;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.tabla_equivalencia_medida != null){
      this.tablaEquivalenciaMedidaService.enviar(this.tabla_equivalencia_medida.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteTablaEquivalenciaMedida,'Actualizar Tabla de Equivalencia Medida');
    } else {
      Swal.fire(constantes.error, "Selecciona una tabla de equivalencia medida", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.tablaEquivalenciaMedidaService.eliminar(this.tabla_equivalencia_medida).subscribe(
      res => {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.tabla_equivalencia_medida = res.resultado as TablaEquivalenciaMedida      
      },
      err => Swal.fire(constantes.error, err.error.message, constantes.error_swal)
    );
  }

  cambiar_buscar_codigo(){
    this.tabla_equivalencia_medida_buscar.medida1.descripcion=constantes.vacio;
    this.tabla_equivalencia_medida_buscar.medida2.descripcion=constantes.vacio;
    this.tabla_equivalencia_medida_buscar.equivalencia=0;
  }

  cambiar_buscar_medida1(){
    this.tabla_equivalencia_medida_buscar.codigo=constantes.vacio;
    this.tabla_equivalencia_medida_buscar.medida2.descripcion=constantes.vacio;
    this.tabla_equivalencia_medida_buscar.equivalencia=0;
  }

  cambiar_buscar_medida2(){
    this.tabla_equivalencia_medida_buscar.codigo=constantes.vacio;
    this.tabla_equivalencia_medida_buscar.medida1.descripcion=constantes.vacio;
    this.tabla_equivalencia_medida_buscar.equivalencia=0;
  }

  cambiar_buscar_equivalencia(){
    this.tabla_equivalencia_medida_buscar.codigo=constantes.vacio;
    this.tabla_equivalencia_medida_buscar.medida1.descripcion=constantes.vacio;
    this.tabla_equivalencia_medida_buscar.medida2.descripcion=constantes.vacio;
  }

}
