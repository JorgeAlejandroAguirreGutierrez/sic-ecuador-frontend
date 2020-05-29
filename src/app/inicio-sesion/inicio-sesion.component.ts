import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sesion } from '../modelos/sesion';
import { SesionService } from '../servicios/sesion.service';
import { Empresa } from '../modelos/empresa';
import { Parametro } from '../modelos/parametro';
import { EmpresaService } from '../servicios/empresa.service';
import { ParametroService } from '../servicios/parametro.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  sesion = new Sesion();
  repetir_contrasena: string;
  empresa= new Empresa();
  empresas: Empresa[]=[];

  url_logo: string ="";
  url_empresa: string="";
  url_icoempresa: string = environment.prefijo_url_imagenes+"iconos/icoempresa.png";
  url_icousuario: string = environment.prefijo_url_imagenes+"iconos/icousuario.png";
  url_icocontrasenia: string = environment.prefijo_url_imagenes+"iconos/icocontrasenia.png";

  constructor(private sesionService: SesionService, private empresaService: EmpresaService, private parametroService: ParametroService, private router: Router) { }

  ngOnInit() {
    this.obtenerEmpresa();
    this.obtenerParametro();
    this.consultarEmpresas();
  }


  iniciarSesion() {
    this.sesionService.obtenerIP().subscribe(
      res => {
        this.sesion.sesion_ip=res;
        this.sesionService.crear(this.sesion).subscribe(
          res => {
            this.sesion=res.resultado as Sesion;
            this.sesionService.setSesion(this.sesion);
            Swal.fire('Exito', res.mensaje, 'success');
    
          },
          error => Swal.fire('Error', error.error.mensaje, 'error'),
          () => this.navigate()
        );
      },
      error => Swal.fire('Error', error.error.mensaje, 'error'),
    );
  }

  navigate() {
    this.router.navigateByUrl('/main');
  }

  activarSesion() {
    
  }

  consultarEmpresas() {
    this.empresaService.consultar().subscribe(
      res => {
        this.empresas = res.resultado as Empresa[]
      }
    );
  }

  obtenerEmpresa(){
    let empresa=new Empresa();
    empresa.id=1;
    this.empresaService.obtener(empresa).subscribe(
      res => {
        empresa= res.resultado as Empresa
        this.url_empresa=environment.prefijo_url_imagenes+"logos/"+empresa.logo;
      }
    );
  }

  obtenerParametro(){
    let parametro=new Parametro();
    parametro.tipo='logo';
    this.parametroService.obtenerTipo (parametro).subscribe(
      res => {
        parametro= res.resultado as Parametro
        this.url_logo=environment.prefijo_url_imagenes+parametro.nombre;
      }
    );
  }    
}
