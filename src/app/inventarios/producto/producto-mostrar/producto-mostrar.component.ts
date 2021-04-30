import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../servicios/services/tab.service";
import { ProductoComponent } from '../producto.component';
import { ProductoService } from '../../../servicios/producto.service';
import { Producto } from '../../../modelos/producto';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-producto-mostrar',
  templateUrl: './producto-mostrar.component.html',
  styleUrls: ['./producto-mostrar.component.css']
})
export class ProductoMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteProducto: Type<any> = ProductoComponent;

  sesion: Sesion;

  constructor(private productoService: ProductoService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  productos: Producto[];
  producto: Producto;
  producto_buscar: Producto=new Producto();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.productoService.consultar().subscribe(
      res => {
        this.productos = res.resultado as Producto[]
      }
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.productoService.buscar(this.producto_buscar).subscribe(
      res => {
        if (res.resultado!=null) {
          this.productos = res.resultado as Producto[]
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  seleccion(producto: Producto) {
    this.producto=producto;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.producto != null){
      this.productoService.enviar(this.producto.id);
      this.tabService.addNewTab(this.ComponenteProducto, constantes.tab_actualizar_producto);
    } else {
      Swal.fire(constantes.error, "Selecciona un Producto", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.productoService.eliminar(this.producto).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.producto = res.resultado as Producto
          this.ngOnInit();
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }        
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

}
