import { Component, OnInit, HostListener, Type } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { CategoriaCliente } from '../../modelos/categoria-cliente';
import { TabService } from '../../componentes/services/tab.service';
import { CategoriaClienteService } from '../../servicios/categoria-cliente.service';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-categoria-cliente',
  templateUrl: './categoria-cliente.component.html',
  styleUrls: ['./categoria-cliente.component.scss']
})

export class CategoriaClienteComponent implements OnInit {

  collapsed = true;
  abrirPanelNuevaCalificacion = true;
  abrirPanelAdminCalificacion = false;

  ComponenteCategoriaCliente: Type<any> = CategoriaClienteComponent;

  sesion: Sesion;
  categoria_cliente= new CategoriaCliente();

  constructor(private tabService: TabService,private categoriaClienteService: CategoriaClienteService,
    private sesionService: SesionService,private router: Router) { }

    categorias_clientes: CategoriaCliente[];
    //categoria_cliente: CategoriaCliente;
    categoria_cliente_actualizar: CategoriaCliente= new CategoriaCliente();
    categoria_cliente_buscar: CategoriaCliente=new CategoriaCliente();

  ngOnInit() {
    this.construir_categoria_cliente();
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }
  
  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.key == 'G') //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == 'N') //ASHIFT + N
      this.nuevo(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == 'E') // SHIFT + E
      this.eliminar(null);
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.categoria_cliente = new CategoriaCliente();
  }

  borrar(event){
    if (event!=null)
      event.preventDefault();
      if(this.categoria_cliente.id!=0){
        let id=this.categoria_cliente.id;
        let codigo=this.categoria_cliente.codigo;
        this.categoria_cliente=new CategoriaCliente();
        this.categoria_cliente.id=id;
        this.categoria_cliente.codigo=codigo;
      }
      else{
        this.categoria_cliente=new CategoriaCliente();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.categoriaClienteService.crear(this.categoria_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.nuevo(null);
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.categoriaClienteService.actualizar(this.categoria_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.categoria_cliente=res.resultado as CategoriaCliente;
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevaCalificacion = true;
      this.abrirPanelAdminCalificacion = false;
    if (this.categoria_cliente_actualizar.id != 0){
      this.categoria_cliente={... this.categoria_cliente_actualizar};
      this.categoria_cliente_actualizar=new CategoriaCliente();
    }
  }

  eliminar(categoria_cliente: CategoriaCliente) {
    this.categoriaClienteService.eliminar(categoria_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.categoria_cliente=res.resultado as CategoriaCliente
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.categoriaClienteService.eliminar(this.categoria_cliente).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.categoria_cliente = res.resultado as CategoriaCliente 
        this.consultar();     
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_categoria_cliente() {
    let categoria_cliente_id=0;
    this.categoriaClienteService.currentMessage.subscribe(message => categoria_cliente_id = message);
    if (categoria_cliente_id!= 0) {
      await this.categoriaClienteService.obtenerAsync(categoria_cliente_id).then(
        res => {
          Object.assign(this.categoria_cliente, res.resultado as CategoriaCliente);
          this.categoriaClienteService.enviar(0);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
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
