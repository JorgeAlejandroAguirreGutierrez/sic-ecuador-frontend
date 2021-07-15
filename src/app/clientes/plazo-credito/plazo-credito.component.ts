import { Component, OnInit, HostListener, Type} from '@angular/core';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { PlazoCreditoService } from '../../servicios/plazo-credito.service';
import { PlazoCredito } from '../../modelos/plazo-credito';
import { TabService } from '../../componentes/services/tab.service';

@Component({
  selector: 'app-plazo-credito',
  templateUrl: './plazo-credito.component.html',
  styleUrls: ['./plazo-credito.component.scss']
})
export class PlazoCreditoComponent implements OnInit {

  collapsed = true;
  sesion: Sesion;
  abrirPanelNuevoPlazoCredito = true;
  abrirPanelAdminPlazoCredito = false;

  plazo_credito= new PlazoCredito();

  plazos_creditos: PlazoCredito[];
  //plazo_credito: PlazoCredito;
  plazo_credito_actualizar: PlazoCredito= new PlazoCredito();
  plazo_credito_buscar: PlazoCredito=new PlazoCredito();

  constructor(private tabService: TabService,private plazoCreditoService: PlazoCreditoService,
    private sesionService: SesionService, private router: Router) { }

  ngOnInit() {
    this.sesion= this.sesionService.getSesion();
    this.construir_plazo_credito();
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
    this.tabService.addNewTab(PlazoCreditoComponent, constantes.tab_crear_plazo_credito);
  }

  borrar(event){
    if (event!=null)
      event.preventDefault();
      if(this.plazo_credito.id!=0){
        let id=this.plazo_credito.id;
        let codigo=this.plazo_credito.codigo;
        this.plazo_credito=new PlazoCredito();
        this.plazo_credito.id=id;
        this.plazo_credito.codigo=codigo;
      }
      else{
        this.plazo_credito=new PlazoCredito();
      }
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.plazoCreditoService.crear(this.plazo_credito).subscribe(
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
    this.plazoCreditoService.actualizar(this.plazo_credito).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.plazo_credito=res.resultado as PlazoCredito;
        this.consultar();
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  actualizarLeer(event){
    if (event!=null)
      event.preventDefault();
      this.abrirPanelNuevoPlazoCredito = true;
      this.abrirPanelAdminPlazoCredito = false;
    if (this.plazo_credito_actualizar.id != 0){
      this.plazo_credito={... this.plazo_credito_actualizar};
      this.plazo_credito_actualizar=new PlazoCredito();
    }
  }

  eliminar(plazo_credito: PlazoCredito) {
    this.plazoCreditoService.eliminar(plazo_credito).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.plazo_credito=res.resultado as PlazoCredito
      },
      err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
    );
  }

  eliminarLeer(event) {
    if (event!=null)
      event.preventDefault();
    this.plazoCreditoService.eliminar(this.plazo_credito).subscribe(
      res => {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.consultar();
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_plazo_credito() {
    let plazo_credito_id=0;
    this.plazoCreditoService.currentMessage.subscribe(message => plazo_credito_id = message);
    if (plazo_credito_id!= 0) {
      await this.plazoCreditoService.obtenerAsync(plazo_credito_id).then(
        res => {
          Object.assign(this.plazo_credito, res.resultado as PlazoCredito);
          this.plazoCreditoService.enviar(0);
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
  }

  consultar() {
    this.plazoCreditoService.consultar().subscribe(
      res => {
        this.plazos_creditos = res.resultado as PlazoCredito[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.plazoCreditoService.buscar(this.plazo_credito_buscar).subscribe(
        res => {
          this.plazos_creditos = res.resultado as PlazoCredito[]
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
  }

  seleccion(plazo_credito: PlazoCredito) {
    this.plazo_credito=plazo_credito;
  }

  cambiar_buscar_codigo(){
    this.buscar(null);
  }

  cambiar_buscar_descripcion(){
    this.buscar(null);
  }

  cambiar_buscar_plazo(){
    this.buscar(null);
  }
}
