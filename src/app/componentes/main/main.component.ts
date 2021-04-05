import { Component, OnInit } from '@angular/core';
import { Type } from '@angular/core';
import { TabService } from "../services/tab.service";
import { Tab } from "../../modelos/tab.model";
import { MenuComponent } from '../menu/menu.component';
import { OpcionMenu } from "../../modelos/opcion-menu.model";
import { MapsComponent } from '../pages/maps/maps.component';
import { UbicacionComponent } from '../../configuraciones/ubicacion/ubicacion.component';
import { UbicacionLeerComponent } from '../../configuraciones/ubicacion/ubicacion-leer/ubicacion-leer.component';
import { ClienteComponent } from "../../clientes/cliente/cliente.component";
import { ClienteLeerComponent } from '../../clientes/cliente/cliente-leer/cliente-leer.component';
import { GrupoClienteComponent } from '../../clientes/grupo-cliente/grupo-cliente.component';
import { GrupoClienteLeerComponent } from '../../clientes/grupo-cliente/grupo-cliente-leer/grupo-cliente-leer.component';
import { FacturaComponent } from "../../comprobantes/factura/factura.component";
import { FacturaLeerComponent } from '../../comprobantes/factura/factura-leer/factura-leer.component';
import { ProductoComponent } from "../../inventarios/producto/producto.component";
import { PromocionComponent } from "../../inventarios/promocion/promocion.component";
import { ProveedorComponent } from '../../compras/proveedor/proveedor.component';
import { FacturaCompraComponent } from '../../compras/factura-compra/factura-compra.component';
import { TransportistaComponent } from '../../entregas/transportista/transportista.component';
import { SaldoInicialInventarioComponent } from '../../inventarios/saldo-inicial-inventario/saldo-inicial-inventario.component';
import { ProductoLeerComponent } from '../../inventarios/producto/producto-leer/producto-leer.component';
import { ImportarComponent } from '../../configuraciones/importar/importar.component';
import { ExportarComponent } from '../../configuraciones/exportar/exportar.component';
import { CategoriaClienteComponent } from '../../clientes/categoria-cliente/categoria-cliente.component';
import { CategoriaClienteLeerComponent } from '../../clientes/categoria-cliente/categoria-cliente-leer/categoria-cliente-leer.component';
import { EstadoCivilComponent } from '../../clientes/estado-civil/estado-civil.component';
import { EstadoCivilLeerComponent } from '../../clientes/estado-civil/estado-civil-leer/estado-civil-leer.component';
import { FormaPagoComponent } from '../../clientes/forma-pago/forma-pago.component';
import { FormaPagoLeerComponent } from '../../clientes/forma-pago/forma-pago-leer/forma-pago-leer.component';
import { GeneroComponent } from '../../clientes/genero/genero.component';
import { GeneroLeerComponent } from '../../clientes/genero/genero-leer/genero-leer.component';
import { OrigenIngresoComponent } from '../../clientes/origen-ingreso/origen-ingreso.component';
import { OrigenIngresoLeerComponent } from '../../clientes/origen-ingreso/origen-ingreso-leer/origen-ingreso-leer.component';
import { PlazoCreditoComponent } from '../../clientes/plazo-credito/plazo-credito.component';
import { PlazoCreditoLeerComponent } from '../../clientes/plazo-credito/plazo-credito-leer/plazo-credito-leer.component';
import { TipoPagoComponent } from '../../clientes/tipo-pago/tipo-pago.component';
import { TipoPagoLeerComponent } from '../../clientes/tipo-pago/tipo-pago-leer/tipo-pago-leer.component';
import { TablaEquivalenciaMedidaComponent } from '../../inventarios/tabla-equivalencia-medida/tabla-equivalencia-medida.component';
import { TablaEquivalenciaMedidaLeerComponent } from '../../inventarios/tabla-equivalencia-medida/tabla-equivalencia-medida-leer/tabla-equivalencia-medida-leer.component';
import { UsuarioComponent } from '../../usuarios/usuario/usuario.component';
import { UsuarioMostrarComponent } from '../../usuarios/usuario/usuario-leer/usuario-leer.component';
import { EstablecimientoComponent } from '../../usuarios/establecimiento/establecimiento.component';
import { EstablecimientoMostrarComponent } from '../../usuarios/establecimiento/establecimiento-leer/establecimiento-leer.component';
import { PuntoVentaComponent } from '../../usuarios/punto-venta/punto-venta.component';
import { PuntoVentaLeerComponent } from '../../usuarios/punto-venta/punto-.venta-leer/punto-venta-leer.component';
import * as constantes from '../../constantes';
import { GrupoProductoComponent } from '../../inventarios/grupo-producto/grupo-producto.component';
import { GrupoProductoLeerComponent } from '../../inventarios/grupo-producto/grupo-producto-leer/grupo-producto-leer.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tabs = new Array<Tab>();
  tabs1 = new Array<Tab>();

  tabsGroup = new Array<any>();

  selectedTab: number = 0;
  selectedTab1: number = 0;

  selectedTabGroup: Array<number> = [];

  title: string = "Cliente";
  title1: string = "Cliente1";

  opciones = new Array<OpcionMenu>();

  constructor(private tabService: TabService) { }

  ngOnInit() {
    this.tabService.addNewTab1(MenuComponent, 'MENU');
    //una vez que te suscribes al evento observable tabSub se sigue recibiendo los tabs1 del tab.Service
    //para desuscribirse se necesita un evento take   
    this.tabService.tabSub1.subscribe(tabs1 => {
      this.tabs1 = tabs1;
      //devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada
      this.selectedTab1 = tabs1.findIndex(tab1 => tab1.active);
    });
    
    //Se suscribe al tab Interior
    this.tabService.tabSub.subscribe(tabs => {
      this.tabs = tabs;
      this.selectedTab = tabs.findIndex(tab => tab.active);
    });
    // Se subscribe al tabGroup
    this.tabService.tabsGroupSub.subscribe(tabsGroup => {
      this.tabsGroup = tabsGroup;
      for (let i = 0; i < this.tabs1.length - 1; i++) {
        this.selectedTabGroup[i] = tabsGroup[i].findIndex(tab => tab.active);
      }
    });
  }

  //El Tab se refiere al tab interno, es decir al relacionado con la barra de opciones 
  public tabChanged(event) {
    //console.log("tab interno changed");
    this.tabService.activarTab(event);
  }

  //El Tab1 se refiere al tab externo, es decir al principal
  public tabChanged1(event) {
    //console.log("tab externo changed");
    this.tabService.activarTab1(event);
    // Carga las opciones en el slide bar de acuerdo al titulo de la pestaña
    this.menuOpciones(this.tabs1[event.index].title);
  }

  removeTab(index: number): void {
    this.tabService.removeTab(index);
    this.tabService.indexarTab();
  }

  removeTab1(index: number): void {
    this.tabService.removeTab1(index);
    this.tabService.indexarTab1();
    this.menuOpciones(this.tabs1[this.selectedTab1].title);
  }

  // Para llenar las opciones del menu
  llenarOpciones(Componente: Type<any>, tabTitulo: string, opcionNombre: string) {
    this.opciones.push(new OpcionMenu(Componente, tabTitulo, opcionNombre));
  }

  menuOpciones(tabNombre: string) {
    this.opciones = [];
    if (tabNombre == constantes.modulo_clientes) {
      this.llenarOpciones(ClienteComponent,constantes.tab_crear_cliente, constantes.tab_crear_cliente);
      this.llenarOpciones(ClienteLeerComponent,constantes.tab_buscar_cliente,constantes.tab_buscar_cliente);
      this.llenarOpciones(GrupoClienteComponent,constantes.tab_crear_grupo_cliente, constantes.tab_crear_grupo_cliente);
      this.llenarOpciones(GrupoClienteLeerComponent,constantes.tab_buscar_grupo_cliente, constantes.tab_buscar_grupo_cliente);
      this.llenarOpciones(CategoriaClienteComponent,constantes.tab_crear_categoria_cliente, constantes.tab_crear_categoria_cliente);
      this.llenarOpciones(CategoriaClienteLeerComponent,constantes.tab_buscar_categoria_cliente, constantes.tab_buscar_categoria_cliente);
      this.llenarOpciones(EstadoCivilComponent,constantes.tab_crear_estado_civil, constantes.tab_crear_estado_civil);
      this.llenarOpciones(EstadoCivilLeerComponent, constantes.tab_buscar_estado_civil, constantes.tab_buscar_estado_civil);
      this.llenarOpciones(FormaPagoComponent, constantes.tab_crear_forma_pago, constantes.tab_crear_forma_pago);
      this.llenarOpciones(FormaPagoLeerComponent,constantes.tab_buscar_forma_pago, constantes.tab_buscar_forma_pago);
      this.llenarOpciones(GeneroComponent, constantes.tab_crear_genero, constantes.tab_crear_genero);
      this.llenarOpciones(GeneroLeerComponent,constantes.tab_buscar_genero, constantes.tab_buscar_genero);
      this.llenarOpciones(OrigenIngresoComponent,constantes.tab_crear_origen_ingreso, constantes.tab_crear_origen_ingreso);
      this.llenarOpciones(OrigenIngresoLeerComponent,constantes.tab_buscar_origen_ingreso,constantes.tab_buscar_origen_ingreso);
      this.llenarOpciones(PlazoCreditoComponent,constantes.tab_crear_plazo_credito, constantes.tab_crear_plazo_credito);
      this.llenarOpciones(PlazoCreditoLeerComponent,constantes.tab_buscar_plazo_credito,constantes.tab_buscar_plazo_credito);
      this.llenarOpciones(TipoPagoComponent,constantes.tab_crear_tipo_pago, constantes.tab_crear_tipo_pago);
      this.llenarOpciones(TipoPagoLeerComponent,constantes.tab_buscar_tipo_pago, constantes.tab_buscar_tipo_pago);
      this.llenarOpciones(MapsComponent,'Mapa Cliente','Mapa cliente');
    }

    if (tabNombre == constantes.modulo_compras) {
      this.llenarOpciones(ProveedorComponent, constantes.tab_crear_proveedor, constantes.tab_crear_proveedor);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_proveedor, constantes.tab_buscar_proveedor);
      this.llenarOpciones(FacturaCompraComponent, constantes.tab_crear_factura_compra, constantes.tab_crear_factura_compra);
    }

    if (tabNombre == constantes.modulo_ventas) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_inventarios) {
      this.llenarOpciones(ProductoComponent,constantes.tab_crear_producto, constantes.tab_crear_producto);
      this.llenarOpciones(ProductoLeerComponent,constantes.tab_buscar_producto, constantes.tab_buscar_producto);
      this.llenarOpciones(SaldoInicialInventarioComponent,constantes.tab_crear_saldo_inicial_inventario, constantes.tab_crear_saldo_inicial_inventario);
      this.llenarOpciones(TablaEquivalenciaMedidaComponent,constantes.tab_crear_tabla_equivalencia_medida, constantes.tab_crear_tabla_equivalencia_medida);
      this.llenarOpciones(TablaEquivalenciaMedidaLeerComponent, constantes.tab_buscar_tabla_equivalencia_medida, constantes.tab_buscar_tabla_equivalencia_medida);
      this.llenarOpciones(GrupoProductoComponent,constantes.tab_crear_grupo_producto, constantes.tab_crear_grupo_producto);
      this.llenarOpciones(GrupoProductoLeerComponent,constantes.tab_buscar_grupo_producto, constantes.tab_buscar_grupo_producto);
      this.llenarOpciones(PromocionComponent,'Promociones','Promociones/Combos');
    }

    if (tabNombre == constantes.modulo_contabilidad) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_financiero) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_activos_fijos) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_talento_humano) {
      this.llenarOpciones(TransportistaComponent,constantes.tab_crear_transportista,constantes.tab_crear_transportista);
    }

    if (tabNombre == constantes.modulo_produccion) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_importacion) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_configuracion) {
      this.llenarOpciones(GrupoClienteComponent, constantes.tab_crear_grupo_cliente, constantes.tab_crear_grupo_cliente);
      this.llenarOpciones(TransportistaComponent, constantes.tab_crear_transportista, constantes.tab_crear_transportista);
      this.llenarOpciones(UbicacionComponent,constantes.tab_crear_ubicacion, constantes.tab_crear_ubicacion);
      this.llenarOpciones(UbicacionLeerComponent, constantes.tab_buscar_ubicacion, constantes.tab_buscar_ubicacion);
      this.llenarOpciones(ImportarComponent, constantes.tab_crear_importacion, constantes.tab_crear_importacion);
      this.llenarOpciones(ExportarComponent, constantes.tab_crear_exportacion, constantes.tab_crear_exportacion);
    }
    
    if (tabNombre == constantes.modulo_estadisticas) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_control) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura,);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_auditoria) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_usuarios) {
      this.llenarOpciones(UsuarioComponent, constantes.tab_crear_usuario, constantes.tab_crear_usuario);
      this.llenarOpciones(UsuarioMostrarComponent, constantes.tab_buscar_usuario, constantes.tab_buscar_usuario);
      this.llenarOpciones(EstablecimientoComponent, constantes.tab_crear_establecimiento, constantes.tab_crear_establecimiento);
      this.llenarOpciones(EstablecimientoMostrarComponent,constantes.tab_buscar_establecimiento, constantes.tab_buscar_establecimiento);
      this.llenarOpciones(PuntoVentaComponent,constantes.tab_crear_punto_venta, constantes.tab_crear_punto_venta);
      this.llenarOpciones(PuntoVentaLeerComponent,constantes.tab_buscar_punto_venta, constantes.tab_buscar_punto_venta);
    }
  }  
}
