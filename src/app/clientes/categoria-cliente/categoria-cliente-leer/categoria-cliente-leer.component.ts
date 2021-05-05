import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { CategoriaClienteComponent } from '../categoria-cliente.component';
import { CategoriaClienteService } from '../../../servicios/categoria-cliente.service';
import { CategoriaCliente } from '../../../modelos/categoria-cliente';
import * as constantes from '../../../constantes';


@Component({
  selector: 'app-categoria-cliente-leer',
  templateUrl: './categoria-cliente-leer.component.html',
  styleUrls: ['./categoria-cliente-leer.component.scss']
})
export class CategoriaClienteLeerComponent implements OnInit {

  collapsed = true;
  ComponenteCategoriaCliente: Type<any> = CategoriaClienteComponent;

  sesion: Sesion;

  constructor(private categoriaClienteService: CategoriaClienteService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  categorias_clientes: CategoriaCliente[];
  categoria_cliente: CategoriaCliente;
  categoria_cliente_buscar: CategoriaCliente=new CategoriaCliente();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.categoriaClienteService.consultar().subscribe(
      res => {
        this.categorias_clientes = res.resultado as CategoriaCliente[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.categoriaClienteService.buscar(this.categoria_cliente_buscar).subscribe(
      res => {
        this.categorias_clientes = res.resultado as CategoriaCliente[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(categoria_cliente: CategoriaCliente) {
    this.categoria_cliente=categoria_cliente;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.categoria_cliente != null){
      this.categoriaClienteService.enviar(this.categoria_cliente.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteCategoriaCliente,'Actualizar Categoria Cliente');
    } else {
      Swal.fire(constantes.error, "Selecciona un Grupo Cliente", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.categoriaClienteService.eliminar(this.categoria_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.categoria_cliente = res.resultado as CategoriaCliente      
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
