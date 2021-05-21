import { Component, HostListener, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../servicios/establecimiento.service';
import { Establecimiento } from '../../modelos/establecimiento';
import Swal from 'sweetalert2';
import { TabService } from '../../componentes/services/tab.service';
import * as constantes from '../../constantes';
import { Empresa } from '../../modelos/empresa';
import { EmpresaService } from '../../servicios/empresa.service';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.scss']
})
export class EstablecimientoComponent implements OnInit {

  establecimiento= new Establecimiento();
  empresas: Empresa[]=[];

  constructor(private tabService: TabService,private establecimientoService: EstablecimientoService, private empresaService: EmpresaService) { }

  ngOnInit() {
    this.construir_establecimiento();
    this.consultar_empresas();
  }

  nuevo(event) {
    if (event!=null)
      event.preventDefault();
    this.establecimiento = new Establecimiento();
  }

  consultar_empresas(){
    this.empresaService.consultar().subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.empresas=res.resultado as Empresa[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.establecimientoService.crear(this.establecimiento).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.nuevo(null);
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.establecimientoService.actualizar(this.establecimiento).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        this.establecimiento=res.resultado as Establecimiento;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async construir_establecimiento() {
    let establecimiento_id=0;
    this.establecimientoService.currentMessage.subscribe(message => establecimiento_id = message);
    if (establecimiento_id!= 0) {
      await this.establecimientoService.obtenerAsync(establecimiento_id).then(
        res => {
          Object.assign(this.establecimiento, res.resultado as Establecimiento);
          this.establecimientoService.enviar(0);
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
    }
  }

  compareFn(a: any, b: any) {
    return a && b && a.id == b.id;
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 71) //SHIFT + G
      this.crear(null);
    if (($event.shiftKey || $event.metaKey) && $event.keyCode == 78) //ASHIFT + N
      this.nuevo(null);
  }

}
