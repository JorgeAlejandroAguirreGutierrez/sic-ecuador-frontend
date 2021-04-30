import { Component, OnInit, Type } from '@angular/core';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../servicios/services/tab.service";
import { BodegaComponent } from '../bodega.component';
import { BodegaService } from '../../../servicios/bodega.service';
import { Bodega } from '../../../modelos/bodega';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-bodega-mostrar',
  templateUrl: './bodega-mostrar.component.html',
  styleUrls: ['./bodega-mostrar.component.css']
})
export class BodegaMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteBodega: Type<any> = BodegaComponent;

  sesion: Sesion;

  constructor(private bodegaService: BodegaService, private tabService: TabService, private sesionService: SesionService) { }

  bodegas: Bodega[];
  bodega: Bodega;
  bodega_buscar: Bodega=new Bodega();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.bodegaService.consultar().subscribe(
      res => {
        this.bodegas = res.resultado as Bodega[]
      }
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.bodegaService.buscarCodigo(this.bodega_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.bodegas = res.resultado as Bodega[]
          } else {
            Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
          }
        }
      );
  }

  seleccion(bodega: Bodega) {
    this.bodega=bodega;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.bodega != null){
      this.bodegaService.enviar(this.bodega.id);
      this.tabService.addNewTab(this.ComponenteBodega, constantes.tab_actualizar_bodega);
    } else {
      Swal.fire(constantes.error, "Selecciona un Producto", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.bodegaService.eliminar(this.bodega).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.bodega = res.resultado as Bodega
          this.ngOnInit();
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }        
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  cambiar_buscar_codigo(){

  }

}
