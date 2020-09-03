import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Factura} from '../../modelos/factura';
import { FacturaService } from '../../servicios/factura.service';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TabService } from "../../services/tab.service";
import { ProductoComponent } from '../producto.component';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../modelos/producto';


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
    private sesionService: SesionService,private router: Router, private modalService: NgbModal) { }

  productos: Producto[];
  producto: Producto;
  producto_buscar: Producto=new Producto();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  cambiar_buscar_producto_nombre(){
    this.producto_buscar.nombre="";
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
      this.productoService.buscarNombre(this.producto_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.productos = res.resultado as Producto[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
      );
  }

  seleccion(producto: Producto) {
    this.producto=producto;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.producto!= null){
      this.productoService.enviar(this.producto.id);
      this.tabService.addNewTab(this.ComponenteProducto,'Actualizar Producto');
    } else {
      Swal.fire('Error', "Selecciona una Factura", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.productoService.eliminar(this.producto).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.producto = res.resultado as Producto
          this.ngOnInit();
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }        
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
