import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../modelos/sesion';
import { SesionService } from '../../../servicios/sesion.service';
import Swal from 'sweetalert2';
import { TabService } from "../../../componentes/services/tab.service";
import { EmpresaComponent } from '../empresa.component';
import { EmpresaService } from '../../../servicios/empresa.service';
import { Empresa } from '../../../modelos/empresa';


@Component({
  selector: 'app-empresa-mostrar',
  templateUrl: './empresa-mostrar.component.html',
  styleUrls: ['./empresa-mostrar.component.scss']
})
export class EmpresaMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteEmpresa: Type<any> = EmpresaComponent;

  sesion: Sesion;

  constructor(private empresaService: EmpresaService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router) { }

  empresas: Empresa[];
  empresa: Empresa;
  empresa_buscar: Empresa=new Empresa();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  consultar() {
    this.empresaService.consultar().subscribe(
      res => {
        this.empresas = res.resultado as Empresa[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
      this.empresaService.buscar(this.empresa_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.empresas = res.resultado as Empresa[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
      );
  }

  seleccion(empresa: Empresa) {
    this.empresa=empresa;
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.empresa != null){
      this.empresaService.enviar(this.empresa.id);
      this.tabService.addNewTab(this.ComponenteEmpresa,'Actualizar Empresa');
    } else {
      Swal.fire('Error', "Selecciona un Estado Civil", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.empresaService.eliminar(this.empresa).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.empresa = res.resultado as Empresa
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }        
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  cambiar_buscar_codigo(){

  }

  cambiar_buscar_identificacion(){

  }

  cambiar_buscar_razon_social(){

  }

}
