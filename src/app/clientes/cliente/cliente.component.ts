import { Router } from '@angular/router';
import { Component, OnInit, HostListener, Input, Type } from '@angular/core';
import * as constantes from '../../constantes';
import { ClienteService } from '../../servicios/cliente.service';
import { GeneroService } from '../../servicios/genero.service';
import { EstadoCivilService } from '../../servicios/estado-civil.service';
import { OrigenIngresoService } from '../../servicios/origen-ingreso.service';
import { CategoriaClienteService } from '../../servicios/categoria-cliente.service';
import { PlazoCreditoService } from '../../servicios/plazo-credito.service';
import { FormaPagoService } from '../../servicios/forma-pago.service';
import { TipoPagoService } from '../../servicios/tipo-pago.service';
import { UbicacionService } from '../../servicios/ubicacion.service';
import { Cliente } from '../../modelos/cliente';
import { GrupoCliente } from '../../modelos/grupo-cliente'
import { Genero } from '../../modelos/genero';
import { EstadoCivil } from '../../modelos/estado-civil';
import { OrigenIngreso } from '../../modelos/origen-ingreso';
import { CategoriaCliente } from '../../modelos/categoria-cliente';
import { PlazoCredito } from '../../modelos/plazo-credito';
import { FormaPago } from '../../modelos/forma-pago';
import { TipoPago } from '../../modelos/tipo-pago';
import { Telefono } from '../../modelos/telefono';
import { Celular } from '../../modelos/celular';
import { Correo } from '../../modelos/correo';
import { Ubicacion } from '../../modelos/ubicacion';
import { TipoContribuyente } from '../../modelos/tipo-contribuyente';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { GrupoClienteService } from '../../servicios/grupo-cliente.service';
import { TipoRetencionService } from '../../servicios/tipo-retencion.service';
import { TipoRetencion } from '../../modelos/tipo-retencion';
import { SesionService } from '../../servicios/sesion.service';
import { Sesion } from '../../modelos/sesion';
import { Auxiliar } from '../../modelos/auxiliar';
import { EmpresaService } from '../../servicios/empresa.service';
import { Empresa } from '../../modelos/empresa';
import { environment } from '../../../environments/environment';
import { TipoContribuyenteService } from '../../servicios/tipo-contribuyente.service';
import { TelefonoAuxiliar } from '../../modelos/telefono-auxiliar';
import { CorreoAuxiliar } from '../../modelos/correo-auxiliar';
import { CelularAuxiliar } from '../../modelos/celular-auxiliar';
import { TabService } from '../../componentes/services/tab.service';
//import { ClienteLeerComponent } from '../cliente/cliente-leer/cliente-leer.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  collapsed = true;
  //ComponenteLeerCliente: Type<any> = ClienteLeerComponent;
  habilitar_tipo_contribuyente = false;
  indice_tipo_contribuyente: number = -1;
  habilitar_celular_telefono_correo_auxiliar = true;

  cliente: Cliente;
  cliente_crear: Cliente;
  cliente_actualizar: Cliente;
  clientes: Cliente[];
  auxiliar: Auxiliar = new Auxiliar();
  grupos_clientes: GrupoCliente[];
  generos: Genero[];
  estados_civiles: EstadoCivil[];
  origenes_ingresos: OrigenIngreso[];
  categorias_clientes: CategoriaCliente[];
  plazos_creditos: PlazoCredito[];
  tipos_pagos: TipoPago[];
  formas_pagos: FormaPago[];
  tipos_contribuyentes: TipoContribuyente[] = [];

  cliente_provincia: string = "";
  cliente_canton: string = "";
  cliente_parroquia: string = "";
  auxiliar_provincia: string = "";
  auxiliar_canton: string = "";
  auxiliar_parroquia: string = "";
  telefono = new Telefono();
  celular = new Celular();
  correo = new Correo();
  auxiliar_telefono = new TelefonoAuxiliar();
  auxiliar_celular = new CelularAuxiliar();
  auxiliar_correo = new CorreoAuxiliar();

  provincias: Ubicacion[];
  cantones: Ubicacion[];
  parroquias: Ubicacion[];
  auxiliar_provincias: Ubicacion[];
  auxiliar_cantones: Ubicacion[];
  auxiliar_parroquias: Ubicacion[];
  activacion_s_es_oi: boolean = true;
  activacion_plazo_credito: boolean = false;

  tipos_retenciones_iva_bien: TipoRetencion[];
  tipos_retenciones_iva_servicio: TipoRetencion[];
  tipos_retenciones_renta_bien: TipoRetencion[];
  tipos_retenciones_renta_servicio: TipoRetencion[];

  archivoImportar: File = null;
  panelOpenState = false;
  value = 'Clear me';

  sesion: Sesion;

  url_logo: string = "";
  nombre_empresa: string = "";
  url_avatar: string = environment.prefijo_url_imagenes + "avatar/avatar1.png";

  constructor(private clienteService: ClienteService, private generoService: GeneroService,
    private estadoCivilService: EstadoCivilService, private origenIngresoService: OrigenIngresoService,
    private categoriaClienteService: CategoriaClienteService, private plazoCreditoService: PlazoCreditoService,
    private tipoPagoService: TipoPagoService, private formaPagoService: FormaPagoService,
    private ubicacionService: UbicacionService, private grupoClienteService: GrupoClienteService,
    private tipoRetencionService: TipoRetencionService, private router: Router, private tabService: TabService,
    private sesionService: SesionService, private empresaService: EmpresaService,
    private tipoContribuyenteService: TipoContribuyenteService, private modalService: NgbModal) { }

  validar_sesion() {
    this.sesion = this.sesionService.getSesion();
    if (this.sesion == undefined)
      this.router.navigate(['/iniciosesion']);
  }

  ngOnInit() {
    this.cliente = new Cliente();
    this.validar_sesion();
    this.construir_cliente();
    this.obtener_empresa();
    this.obtener_sesion();
    this.tipoContribuyenteService.consultar().subscribe(
      res => {
        this.tipos_contribuyentes = res.resultado as TipoContribuyente[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.grupoClienteService.consultar().subscribe(
      res => {
        this.grupos_clientes = res.resultado as GrupoCliente[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.generoService.consultar().subscribe(
      res => {
        this.generos = res.resultado as Genero[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.estadoCivilService.consultar().subscribe(
      res => {
        this.estados_civiles = res.resultado as EstadoCivil[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.origenIngresoService.consultar().subscribe(
      res => {
        this.origenes_ingresos = res.resultado as OrigenIngreso[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.categoriaClienteService.consultar().subscribe(
      res => {
        this.categorias_clientes = res.resultado as CategoriaCliente[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.plazoCreditoService.consultar().subscribe(
      res => {
        this.plazos_creditos = res.resultado as PlazoCredito[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.tipoPagoService.consultar().subscribe(
      res => {
        this.tipos_pagos = res.resultado as TipoPago[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.formaPagoService.consultar().subscribe(
      res => {
        this.formas_pagos = res.resultado as FormaPago[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.ubicacionService.obtenerProvincias().subscribe(
      res => {
        this.provincias = res.resultado as Ubicacion[];
        this.auxiliar_provincias = res.resultado as Ubicacion[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.tipoRetencionService.obtenerIvaBien().subscribe(
      res => {
        this.tipos_retenciones_iva_bien = res.resultado as TipoRetencion[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.tipoRetencionService.obtenerIvaServicio().subscribe(
      res => {
        this.tipos_retenciones_iva_servicio = res.resultado as TipoRetencion[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.tipoRetencionService.obtenerRentaBien().subscribe(
      res => {
        this.tipos_retenciones_renta_bien = res.resultado as TipoRetencion[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.tipoRetencionService.obtenerRentaServicio().subscribe(
      res => {
        this.tipos_retenciones_renta_servicio = res.resultado as TipoRetencion[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if (($event.shiftKey || $event.metaKey) && $event.key == "G")
      this.crearCliente(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == "N")
      this.nuevoCliente(null);
    if (($event.shiftKey || $event.metaKey) && $event.key == "E")
      console.log('SHIFT + E');
    if (($event.shiftKey || $event.metaKey) && $event.key == "B")
      //this.buscarCliente(null);
      console.log('SHIFT + B');
    if (($event.shiftKey || $event.metaKey) && $event.key == "A")
      console.log('SHIFT + A');

  }

  construir_cliente() {
    let cliente_id = 0;
    this.clienteService.currentMessage.subscribe(message => cliente_id = message);
    if (cliente_id != 0) {
      this.clienteService.obtener(cliente_id).subscribe(
        res => {
          Object.assign(this.cliente, res.resultado as Cliente);
          this.cliente.construir();
          this.validar_sexo_estado_civil_origen_ingreso();
          this.ubicacion_normalizar_actualizar();
          console.log(this.cliente);
          this.clienteService.enviar(0);
        },
        err => {
          Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
        }
      )
    }
  }

  ubicacion_normalizar_actualizar() {
    if (this.cliente.direccion.ubicacion != null) {
      this.cliente_provincia = this.cliente.direccion.ubicacion.provincia;
      this.cliente_canton = this.cliente.direccion.ubicacion.canton;
      this.cliente_parroquia = this.cliente.direccion.ubicacion.parroquia;
    }
    this.provincia(this.cliente_provincia);
    this.canton(this.cliente_canton);
  }
  obtener_sesion() {
    this.sesion = this.sesionService.getSesion();
  }

  obtener_empresa() {
    let empresa = new Empresa();
    empresa.id = 1;
    this.empresaService.obtener(empresa).subscribe(
      res => {
        empresa = res.resultado as Empresa
        this.url_logo = environment.prefijo_url_imagenes + "logos/" + empresa.logo;
        this.nombre_empresa = empresa.razon_social;
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  nuevoCliente(event) {
    if (event != null)
      event.preventDefault();
    this.tabService.addNewTab(ClienteComponent, constantes.tab_crear_cliente);
  }
/* // Este componente genera dependencia circular
  buscarCliente(event) {
    if (event != null)
      event.preventDefault();
    this.tabService.addNewTab(this.ComponenteLeerCliente, constantes.tab_buscar_cliente);
  }
*/
  open(content: any, event) {
    if (event != null)
      event.preventDefault();
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  validar_identificacion() {
    this.clienteService.obtenerIdentificacion(this.cliente.identificacion).subscribe(
      res => {
        this.clienteService.validarIdentificacion(this.cliente.identificacion).subscribe(
          res => {
              this.cliente.tipo_identificacion = res.resultado.tipo_identificacion;
              this.cliente.tipo_contribuyente = res.resultado.tipo_contribuyente as TipoContribuyente
              if (this.cliente.tipo_contribuyente == null) {
                this.habilitar_tipo_contribuyente = true;
              } else {
                this.cliente.tipo_contribuyente = this.obtener_tipo_contribuyente();
              }
              this.validar_sexo_estado_civil_origen_ingreso();
          },
          err => {
            this.cliente.tipo_identificacion = '';
            this.cliente.tipo_contribuyente= new TipoContribuyente();
            Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
          }
        );
      },
      err => {
        this.cliente.tipo_identificacion = '';
        this.cliente.tipo_contribuyente= new TipoContribuyente();
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  validar_tipo_contribuyente() {
    this.cliente.tipo_contribuyente = this.tipos_contribuyentes[this.indice_tipo_contribuyente];
  }
  obtener_tipo_contribuyente() {
    for (let i = 0; i < this.tipos_contribuyentes.length; i++) {
      if (this.cliente.tipo_contribuyente.id == this.tipos_contribuyentes[i].id)
        return this.tipos_contribuyentes[i];
    }
  }

  cambiar_razon_social_auxiliar() {
    if (this.auxiliar.razon_social != "") {
      this.habilitar_celular_telefono_correo_auxiliar = false;
    }
  }

  cambiar_forma_pago() {
    if (this.cliente.financiamiento.forma_pago.descripcion == "PREPAGO") {
      this.activacion_plazo_credito = true;
      this.cliente.financiamiento.plazo_credito = null;
    } else {
      this.activacion_plazo_credito = false;
    }
  }

  crear_telefono() {
    this.cliente.telefonos.push(this.telefono);
    this.telefono = new Telefono();
  }
  crear_telefono_auxiliar() {
    if (this.cliente.auxiliares.length > 0 && this.auxiliar.razon_social == "") {
      this.cliente.auxiliares.slice(-1)[0].telefonos.push(this.auxiliar_telefono);
    } else {
      this.auxiliar.telefonos.push(this.auxiliar_telefono);
    }
    this.auxiliar_telefono = new TelefonoAuxiliar();
  }
  eliminar_telefono(i: number) {
    this.cliente.telefonos.splice(i, 1);
  }
  eliminar_telefono_auxiliar(i: number) {
    this.auxiliar.telefonos.splice(i, 1);
    this.auxiliar_telefono = new TelefonoAuxiliar();
  }

  crear_celular() {
    this.cliente.celulares.push(this.celular);
    this.celular = new Celular();
  }
  crear_celular_auxiliar() {
    if (this.cliente.auxiliares.length > 0 && this.auxiliar.razon_social == "") {
      this.cliente.auxiliares.slice(-1)[0].celulares.push(this.auxiliar_celular);
    }
    else {
      this.auxiliar.celulares.push(this.auxiliar_celular);
    }
    this.auxiliar_celular = new CelularAuxiliar();
  }
  eliminar_celular(i: number) {

    this.cliente.celulares.splice(i, 1);
  }
  eliminar_celular_auxiliar(i: number) {
    this.auxiliar.celulares.splice(i, 1);
    this.auxiliar_celular = new CelularAuxiliar();
  }

  crear_correo() {
    this.cliente.correos.push(this.correo);
    this.correo = new Correo();
  }
  crear_correo_auxiliar() {
    if (this.cliente.auxiliares.length > 0 && this.auxiliar.razon_social == "") {
      this.cliente.auxiliares.slice(-1)[0].correos.push(this.auxiliar_correo);
    } else {
      this.auxiliar.correos.push(this.auxiliar_correo);
    }
    this.auxiliar_correo = new CorreoAuxiliar();
  }
  eliminar_correo(i: number) {
    this.cliente.correos.splice(i, 1);
  }
  eliminar_correo_auxiliar(i: number) {
    this.auxiliar.correos.splice(i, 1);
    this.auxiliar_correo = new CorreoAuxiliar();
  }

  async crear_auxiliar() {
    if (this.auxiliar_telefono.numero != undefined)
      this.auxiliar.telefonos.push(this.auxiliar_telefono);
    if (this.auxiliar_telefono.numero != undefined)
      this.auxiliar.celulares.push(this.auxiliar_celular);
    if (this.auxiliar_correo.email != undefined)
      this.auxiliar.correos.push(this.auxiliar_correo);
    let ubicacion: Ubicacion = new Ubicacion();
    ubicacion.provincia = this.auxiliar_provincia;
    ubicacion.canton = this.auxiliar_canton;
    ubicacion.parroquia = this.auxiliar_parroquia;
    if (ubicacion.provincia != "" && ubicacion.canton != "" && ubicacion.parroquia != "") {
      await this.ubicacionService.obtenerUbicacionID(ubicacion).then(
        res => {
          this.auxiliar.direccion.ubicacion = res.resultado as Ubicacion;
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
    }
    this.cliente.auxiliares.push(this.auxiliar);
    this.auxiliar = new Auxiliar();
    this.habilitar_celular_telefono_correo_auxiliar = false;
    this.auxiliar_provincia = "";
    this.auxiliar_canton = "";
    this.auxiliar_parroquia = "";
    this.auxiliar_telefono = new TelefonoAuxiliar();
    this.auxiliar_celular = new CelularAuxiliar();
    this.auxiliar_correo = new CorreoAuxiliar();
  }

  eliminar_auxiliar(i: number) {
    this.cliente.auxiliares.splice(i, 1);
    if (this.cliente.auxiliares.length < 1)
      this.habilitar_celular_telefono_correo_auxiliar = true;
  }

  async crearCliente(event) {
    if (event != null)
      event.preventDefault();
    //AGREGAR AUXILIAR
    if (this.auxiliar.razon_social != constantes.vacio && this.auxiliar.direccion.direccion != constantes.vacio) {
      if (this.auxiliar_telefono.numero != constantes.vacio)
        this.auxiliar.telefonos.push(this.auxiliar_telefono);
      if (this.auxiliar_telefono.numero != constantes.vacio)
        this.auxiliar.celulares.push(this.auxiliar_celular);
      if (this.auxiliar_correo.email != constantes.vacio)
        this.auxiliar.correos.push(this.auxiliar_correo);
      let ubicacion: Ubicacion = new Ubicacion();
      ubicacion.provincia = this.auxiliar_provincia;
      ubicacion.canton = this.auxiliar_canton;
      ubicacion.parroquia = this.auxiliar_parroquia;
      if (ubicacion.provincia != "" && ubicacion.canton != "" && ubicacion.parroquia != "") {
        await this.ubicacionService.obtenerUbicacionID(ubicacion).then(
          res => {
            this.auxiliar.direccion.ubicacion = res.resultado as Ubicacion;
          },
          err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
        );
      }
      this.cliente.auxiliares.push(this.auxiliar);
    }

    //CLIENTE
    if (this.cliente.direccion.ubicacion.provincia != "" && this.cliente.direccion.ubicacion.canton != "" && this.cliente.direccion.ubicacion.parroquia != "") {
      await this.ubicacionService.obtenerUbicacionID(this.cliente.direccion.ubicacion).then(
        res => {
          this.cliente.direccion.ubicacion = res.resultado as Ubicacion;
        },
        err => Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      );
    }
    this.cliente.punto_venta = this.sesion.usuario.punto_venta;
    if (this.telefono.numero != constantes.vacio)
      this.cliente.telefonos.push(this.telefono);
    if (this.celular.numero != constantes.vacio)
      this.cliente.celulares.push(this.celular);
    if (this.correo.email != constantes.vacio)
      this.cliente.correos.push(this.correo);
    console.log(this.cliente);
    this.clienteService.crear(this.cliente).subscribe(
      res => {
        this.cliente = res.resultado as Cliente;
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        let indice_tab_activo = constantes.tab_activo(this.tabService);
        this.tabService.removeTab(indice_tab_activo);
        this.tabService.addNewTab(ClienteComponent, constantes.tab_crear_cliente);
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  async actualizar(event) {
    if (event != null)
      event.preventDefault();
    //AGREGAR AUXILIARES
    if (this.auxiliar.razon_social != constantes.vacio) {
      if (this.auxiliar_telefono.numero != constantes.vacio)
        this.auxiliar.telefonos.push(this.auxiliar_telefono);
      if (this.auxiliar_telefono.numero != constantes.vacio)
        this.auxiliar.celulares.push(this.auxiliar_celular);
      if (this.auxiliar_correo.email != constantes.vacio)
        this.auxiliar.correos.push(this.auxiliar_correo);
      let ubicacion: Ubicacion = new Ubicacion();
      ubicacion.provincia = this.auxiliar_provincia;
      ubicacion.canton = this.auxiliar_canton;
      ubicacion.parroquia = this.auxiliar_parroquia;
      if (ubicacion.provincia != constantes.vacio && ubicacion.canton != constantes.vacio && ubicacion.parroquia != constantes.vacio) {
        await this.ubicacionService.obtenerUbicacionID(ubicacion).then(
          res => {
            this.auxiliar.direccion.ubicacion = res.resultado as Ubicacion;
          },
          err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
        );
      }
      this.cliente.auxiliares.push(this.auxiliar);
    }
    //CLIENTE
    console.log(this.cliente);
    if (this.cliente.direccion.ubicacion.provincia != "" && this.cliente.direccion.ubicacion.canton != "" && this.cliente.direccion.ubicacion.parroquia != "") {
      await this.ubicacionService.obtenerUbicacionID(this.cliente.direccion.ubicacion).then(
        res => {
          this.cliente.direccion.ubicacion = res.resultado as Ubicacion;
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
    }

    this.clienteService.actualizar(this.cliente).subscribe(
      res => {
        if (res.resultado != null) {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.cliente = res.resultado as Cliente;
          this.auxiliar_cantones = [];
          this.auxiliar_parroquias = [];

          this.auxiliar_provincia = "";
          this.auxiliar_canton = "";
          this.auxiliar_parroquia = "";
          this.auxiliar_telefono = new TelefonoAuxiliar();
          this.auxiliar_celular = new CelularAuxiliar();
          this.auxiliar_correo = new CorreoAuxiliar();
          this.auxiliar = new Auxiliar();
        }
        else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  eliminar(cliente: Cliente) {
    this.clienteService.eliminar(cliente).subscribe(
      res => {
        if (res.resultado != null) {
          Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
          this.cliente = res.resultado as Cliente
          this.ngOnInit();
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  provincia(provincia: string) {
    this.cliente.direccion.ubicacion.provincia = provincia;
    this.ubicacionService.obtenerCantones(provincia).subscribe(
      res => {
        if (res.resultado != null) {
          this.cantones = res.resultado as Ubicacion[];
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  seleccionar_auxiliar_provincia(provincia: string) {
    this.auxiliar.direccion.ubicacion.provincia = provincia;
    this.ubicacionService.obtenerCantones(provincia).subscribe(
      res => {
        if (res.resultado != null) {
          this.auxiliar_cantones = res.resultado as Ubicacion[];
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  canton(canton: string) {
    this.cliente.direccion.ubicacion.canton = canton;
    this.ubicacionService.obtenerParroquias(canton).subscribe(
      res => {
        if (res.resultado != null) {
          this.parroquias = res.resultado as Ubicacion[];
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccionar_auxiliar_canton(canton: string) {
    this.auxiliar.direccion.ubicacion.provincia = canton;
    this.ubicacionService.obtenerParroquias(canton).subscribe(
      res => {
        if (res.resultado != null) {
          this.auxiliar_parroquias = res.resultado as Ubicacion[];
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  parroquia(parroquia: string) {
    this.cliente.direccion.ubicacion.parroquia = parroquia;
  }

  seleccionar_auxiliar_parroquia(parroquia: string) {
    this.auxiliar.direccion.ubicacion.parroquia = parroquia;
  }

  validar_telefono() {
    let digito = this.telefono.numero.substr(0, 1);
    if (this.telefono.numero.length != 11 || digito != "0") {
      this.telefono.numero = "";
      Swal.fire(constantes.error, "Telefono Invalido", constantes.error_swal);
    }
  }
  validar_telefono_auxiliar() {
    let digito = this.auxiliar_telefono.numero.substr(0, 1);
    if (this.auxiliar_telefono.numero.length != 11 || digito != "0") {
      this.auxiliar_telefono.numero = "";
      Swal.fire(constantes.error, "Telefono Invalido", constantes.error_swal);
    }
  }

  validar_celular() {
    let digito = this.celular.numero.substr(0, 2);
    if (this.celular.numero.length != 12 || digito != "09") {
      this.celular.numero = "";
      Swal.fire(constantes.error, "Celular Invalido", constantes.error_swal);
    }
  }

  validar_celular_auxiliar() {
    let digito = this.auxiliar_celular.numero.substr(0, 2);
    if (this.auxiliar_celular.numero.length != 12 || digito != "09") {
      this.auxiliar_celular.numero = "";
      Swal.fire(constantes.error, "Celular Invalido", constantes.error_swal);
    }
  }

  validar_correo() {
    let arroba = this.correo.email.includes("@");
    if (!arroba) {
      this.correo.email = "";
      Swal.fire(constantes.error, "Correo Invalido", constantes.error_swal);
    }
  }
  validar_correo_auxiliar() {
    let arroba = this.auxiliar_correo.email.includes("@");
    if (!arroba) {
      this.auxiliar_correo.email = "";
      Swal.fire(constantes.error, "Correo Invalido", constantes.error_swal);
    }
  }

  validar_sexo_estado_civil_origen_ingreso() {
    if (this.cliente.tipo_contribuyente.tipo == constantes.tipo_contribuyente_juridica) {
      this.activacion_s_es_oi = true;
    } else {
      this.activacion_s_es_oi = false;
      if (this.cliente.id == 0) {
        this.cliente.genero = this.generos[0];
        this.cliente.estado_civil = this.estados_civiles[0];
        this.cliente.origen_ingreso = this.origenes_ingresos[0];
        this.cliente.categoria_cliente = this.categorias_clientes[0];
      }
    }
  }

  compareFn(a: any, b: any) {
    return a && b && a.id == b.id;
  }

  importar(archivos: FileList) {
    let archivoImportar = archivos.item(0);
    this.clienteService.importar(archivoImportar).subscribe(
      res => {
        if (res.resultado != null) {
          this.auxiliar_cantones = res.resultado as Ubicacion[];
        } else {
          Swal.fire(constantes.error, res.mensaje, constantes.error_swal);
        }
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
}
