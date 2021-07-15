import { Component, HostListener, OnInit, Type } from '@angular/core';
import { MedidaService } from '../../servicios/medida.service';
import { TabService } from '../../componentes/services/tab.service';
import { Medida } from '../../modelos/medida';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-medida',
  templateUrl: './medida.component.html',
  styleUrls: ['./medida.component.scss']
})
export class MedidaComponent implements OnInit {

  collapsed = true;
  sesion: Sesion;
  medida= new Medida();
  medidas: Medida[];
  ComponenteMedida: Type<any> = MedidaComponent;

  abrirPanelNuevaMedida = true;
  abrirPanelAdminMedida = false;

  //medida: Medida;
  medida_actualizar: Medida= new Medida();
  medida_buscar: Medida=new Medida();

  constructor(private tabService: TabService,private medidaService: MedidaService,
    private sesionService: SesionService,private router: Router) { }

  ngOnInit() {
    this.sesion= this.sesionService.getSesion();
    this.construir_medida();
    this.consultar();
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
    this.tabService.addNewTab(MedidaComponent, constantes.tab_crear_medida);
  }
  
  borrar(event){
    if (event!=null)
      event.preventDefault();
      if(this.medida.id!=0){
        let id=this.medida.id;
        let codigo=this.medida.codigo;
        this.medida=new Medida();
        this.medida.id=id;
        this.medida.codigo=codigo;
      }
      else{
        this.medida=new Medida();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.medidaService.crear(this.medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.medidaService.actualizar(this.medida).subscribe(
      res => {
        this.medida=res.resultado as Medida;
        this.consultar();
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevaMedida = true;
      this.abrirPanelAdminMedida = false;
    if (this.medida_actualizar.id != 0){
      this.medida={... this.medida_actualizar};
      this.medida_actualizar=new Medida();
    }
  }

  eliminar(medida: Medida) {
    this.medidaService.eliminar(medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.medida=res.resultado as Medida
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }
  
  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.medidaService.eliminar(this.medida).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.consultar();  
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_medida() {
    let medida_id=0;
    this.medidaService.currentMessage.subscribe(message => medida_id = message);
    if (medida_id!= 0) {
      await this.medidaService.obtenerAsync(medida_id).then(
        res => {
          Object.assign(this.medida, res.resultado as Medida);
          this.medidaService.enviar(0);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
  }


  consultar() {
    this.medidaService.consultar().subscribe(
      res => {
        this.medidas = res.resultado as Medida[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.medidaService.buscar(this.medida_buscar).subscribe(
        res => {
          this.medidas = res.resultado as Medida[]
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
  }

  seleccion(medida: Medida) {
    this.medida=medida;
  }

  cambiar_buscar_codigo(){
    this.buscar(null);
  }

  cambiar_buscar_codigo_norma(){
    this.buscar(null);
  }

  cambiar_buscar_descripcion(){
    this.buscar(null);
  }

  cambiar_buscar_abreviatura(){
    this.buscar(null);
  }
}
