import { SidebarService } from '../../componentes/services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../servicios/empresa.service';
import { Empresa } from '../../modelos/empresa';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  url_logo: string = "";
  nombre_empresa: string = "";

  constructor(private sidebarService: SidebarService, private empresaService: EmpresaService) { }
  isCollapsed = true;

  ngOnInit() {
    this.obtenerEmpresa();

  }

  obtenerEmpresa() {
    let empresa = new Empresa();
    empresa.id = 1;
    this.empresaService.obtener(empresa).subscribe(
      res => {
        empresa = res.resultado as Empresa
        this.url_logo = environment.prefijo_url_imagenes + "logos/" + empresa.logo;
        this.nombre_empresa = empresa.razon_social;
      }
    );
  }

  toggleSidebarPin() {
    this.sidebarService.toggleSidebarPin();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

}
