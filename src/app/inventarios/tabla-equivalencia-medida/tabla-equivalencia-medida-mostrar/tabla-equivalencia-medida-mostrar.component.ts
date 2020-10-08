import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { TablaEquivalenciaMedidaComponent } from '../tabla-equivalencia-medida.component';
import { TablaEquivalenciaMedidaService } from '../../../servicios/tabla-equivalencia-medida.service';
import { TablaEquivalenciaMedida } from '../../../modelos/tabla-equivalencia-medida';


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
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.tablaEquivalenciaMedidaService.buscar(this.tabla_equivalencia_medida_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.tablas_equivalencias_medidas = res.resultado as TablaEquivalenciaMedida[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
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
      this.tabService.addNewTab(this.ComponenteTablaEquivalenciaMedida,'Actualizar Tabla de Equivalencia Medida');
    } else {
      Swal.fire('Error', "Selecciona una tabla de equivalencia medida", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.tablaEquivalenciaMedidaService.eliminar(this.tabla_equivalencia_medida).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.tabla_equivalencia_medida = res.resultado as TablaEquivalenciaMedida
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }        
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  cambiar_buscar_codigo(){

  }

  cambiar_buscar_medida1(){

  }

  cambiar_buscar_medida2(){

  }

}
