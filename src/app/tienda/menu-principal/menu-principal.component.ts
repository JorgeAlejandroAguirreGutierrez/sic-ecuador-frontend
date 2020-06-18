import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parametro } from '../../modelos/parametro';
import { ParametroService } from '../../servicios/parametro.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  @Input() cantidadAgregados:Number;
  isCollapsed = true;
  url_logo: string ="";
  
  constructor(private parametroService: ParametroService) { }

  ngOnInit() {
    this.obtenerParametro();
  }

  obtenerParametro(){
    let parametro=new Parametro();
    parametro.tipo='LOGO';
    this.parametroService.obtenerTipo (parametro).subscribe(
      res => {
        parametro= res.resultado as Parametro
        this.url_logo=environment.prefijo_url_imagenes+parametro.nombre;
      }
    );
  }
  
  toggleSidebar() {
  }

  toggleSidebarPin() {
  }

}
