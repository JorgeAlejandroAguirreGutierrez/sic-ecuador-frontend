import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import * as constantes from '../../../constantes';
import { BancoComponent } from '../banco.component';
import { BancoService } from '../../../servicios/banco.service';
import { Banco } from '../../../modelos/banco';


@Component({
  selector: 'app-banco-leer',
  templateUrl: './banco-leer.component.html',
  styleUrls: ['./banco-leer.component.scss']
})
export class BancoLeerComponent implements OnInit {

  collapsed = true;
  ComponenteBanco: Type<any> = BancoComponent;

  sesion: Sesion;

  constructor(private bancoService: BancoService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  bancos: Banco[];
  banco: Banco= new Banco();
  banco_buscar: Banco=new Banco();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.bancoService.consultar().subscribe(
      res => {
        this.bancos = res.resultado as Banco[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    this.bancoService.buscar(this.banco_buscar).subscribe(
      res => {
          this.bancos = res.resultado as Banco[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccion(banco: Banco) {
    this.banco=banco;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.banco != null){
      this.bancoService.enviar(this.banco.id);
      let indice_tab_activo= constantes.tab_activo(this.tabService);
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(this.ComponenteBanco,'Actualizar un Banco');
    } else {
      Swal.fire(constantes.error, "Selecciona un Banco", constantes.error_swal);
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.bancoService.eliminar(this.banco).subscribe(
      res => {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.consultar();   
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_buscar_codigo(){
    this.buscar(null);
  }

  cambiar_buscar_nombre(){
    this.buscar(null);
  }
  cambiar_buscar_tipo(){
    this.buscar(null);
  }
  cambiar_buscar_abreviatura(){
    this.buscar(null);
  }
}
