import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { ProductoComponent } from '../producto.component';
import { ProductoService } from '../../../servicios/producto.service';
import { Producto } from '../../../modelos/producto';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-producto-leer',
  templateUrl: './producto-leer.component.html',
  styleUrls: ['./producto-leer.component.scss']
})
export class ProductoLeerComponent implements OnInit {

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
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.productoService.buscar(this.producto_buscar).subscribe(
      res => {
        this.productos = res.resultado as Producto[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
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
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.consultar();        
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

}
