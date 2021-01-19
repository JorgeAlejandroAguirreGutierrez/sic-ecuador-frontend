import { Component, OnInit } from '@angular/core';
import { Type } from '@angular/core';
import { TabService } from "../services/tab.service";
import { Tab } from "../../modelos/tab.model";
import { MenuComponent } from '../menu/menu.component';
import { OpcionMenu } from "../../modelos/opcion-menu.model";
import { MapsComponent } from '../pages/maps/maps.component';
import { UbicacionComponent } from '../../configuraciones/ubicacion/ubicacion.component';
import { UbicacionMostrarComponent } from '../../configuraciones/ubicacion/ubicacion-mostrar/ubicacion-mostrar.component';
import { ClienteComponent } from "../../clientes/cliente/cliente.component";
import { ClienteMostrarComponent } from '../../clientes/cliente/cliente-mostrar/cliente-mostrar.component';
import { GrupoClienteComponent } from '../../clientes/grupo-cliente/grupo-cliente.component';
import { FacturaComponent } from "../../comprobantes/factura/factura.component";
import { FacturaMostrarComponent } from '../../comprobantes/factura/factura-mostrar/factura-mostrar.component';
import { ProductoComponent } from "../../inventarios/producto/producto.component";
import { PromocionComponent } from "../../inventarios/promocion/promocion.component";
import { ProveedorComponent } from '../../compras/proveedor/proveedor.component';
import { FacturaCompraComponent } from '../../compras/factura-compra/factura-compra.component';
import { TransportistaComponent } from '../../entregas/transportista/transportista.component';
import { SaldoInicialInventarioComponent } from '../../inventarios/saldo-inicial-inventario/saldo-inicial-inventario.component';
import { ProductoMostrarComponent } from '../../inventarios/producto/producto-mostrar/producto-mostrar.component';
import { ImportarComponent } from '../../configuraciones/importar/importar.component';
import { ExportarComponent } from '../../configuraciones/exportar/exportar.component';
import { GrupoClienteMostrarComponent } from '../../clientes/grupo-cliente/grupo-cliente-mostrar/grupo-cliente-mostrar.component';
import { CategoriaClienteComponent } from '../../clientes/categoria-cliente/categoria-cliente.component';
import { CategoriaClienteMostrarComponent } from '../../clientes/categoria-cliente/categoria-cliente-mostrar/categoria-cliente-mostrar.component';
import { EstadoCivilComponent } from '../../clientes/estado-civil/estado-civil.component';
import { EstadoCivilMostrarComponent } from '../../clientes/estado-civil/estado-civil-mostrar/estado-civil-mostrar.component';
import { FormaPagoComponent } from '../../clientes/forma-pago/forma-pago.component';
import { FormaPagoMostrarComponent } from '../../clientes/forma-pago/forma-pago-mostrar/forma-pago-mostrar.component';
import { GeneroComponent } from '../../clientes/genero/genero.component';
import { GeneroMostrarComponent } from '../../clientes/genero/genero-mostrar/genero-mostrar.component';
import { OrigenIngresoComponent } from '../../clientes/origen-ingreso/origen-ingreso.component';
import { OrigenIngresoMostrarComponent } from '../../clientes/origen-ingreso/origen-ingreso-mostrar/origen-ingreso-mostrar.component';
import { PlazoCreditoComponent } from '../../clientes/plazo-credito/plazo-credito.component';
import { PlazoCreditoMostrarComponent } from '../../clientes/plazo-credito/plazo-credito-mostrar/plazo-credito-mostrar.component';
import { TipoPagoComponent } from '../../clientes/tipo-pago/tipo-pago.component';
import { TipoPagoMostrarComponent } from '../../clientes/tipo-pago/tipo-pago-mostrar/tipo-pago-mostrar.component';
import { TablaEquivalenciaMedidaComponent } from '../../inventarios/tabla-equivalencia-medida/tabla-equivalencia-medida.component';
import { TablaEquivalenciaMedidaMostrarComponent } from '../../inventarios/tabla-equivalencia-medida/tabla-equivalencia-medida-mostrar/tabla-equivalencia-medida-mostrar.component';
import { UsuarioComponent } from '../../usuarios/usuario/usuario.component';
import { UsuarioMostrarComponent } from '../../usuarios/usuario/usuario-mostrar/usuario-mostrar.component';
import { EstablecimientoComponent } from '../../usuarios/establecimiento/establecimiento.component';
import { EstablecimientoMostrarComponent } from '../../usuarios/establecimiento/establecimiento-mostrar/establecimiento-mostrar.component';
import { PuntoVentaComponent } from '../../usuarios/punto-venta/punto-venta.component';
import { PuntoVentaMostrarComponent } from '../../usuarios/punto-venta/punto-.venta-mostrar/punto-venta-mostrar.component';
import * as constantes from '../../constantes';
import { PresentacionProductoComponent } from '../../inventarios/presentacion-producto/presentacion-producto.component';
import { PresentacionProductoMostrarComponent } from '../../inventarios/presentacion-producto/presentacion-producto-mostrar/presentacion-producto-mostrar.component';

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
      this.llenarOpciones(ClienteMostrarComponent,constantes.tab_buscar_cliente,constantes.tab_buscar_cliente);
      this.llenarOpciones(GrupoClienteComponent,constantes.tab_crear_grupo_cliente, constantes.tab_crear_grupo_cliente);
      this.llenarOpciones(GrupoClienteMostrarComponent,constantes.tab_buscar_grupo_cliente, constantes.tab_buscar_grupo_cliente);
      this.llenarOpciones(CategoriaClienteComponent,constantes.tab_crear_categoria_cliente, constantes.tab_crear_categoria_cliente);
      this.llenarOpciones(CategoriaClienteMostrarComponent,constantes.tab_buscar_categoria_cliente, constantes.tab_buscar_categoria_cliente);
      this.llenarOpciones(EstadoCivilComponent,constantes.tab_crear_estado_civil, constantes.tab_crear_estado_civil);
      this.llenarOpciones(EstadoCivilMostrarComponent, constantes.tab_buscar_estado_civil, constantes.tab_buscar_estado_civil);
      this.llenarOpciones(FormaPagoComponent, constantes.tab_crear_forma_pago, constantes.tab_crear_forma_pago);
      this.llenarOpciones(FormaPagoMostrarComponent,constantes.tab_buscar_forma_pago, constantes.tab_buscar_forma_pago);
      this.llenarOpciones(GeneroComponent, constantes.tab_crear_genero, constantes.tab_crear_genero);
      this.llenarOpciones(GeneroMostrarComponent,constantes.tab_buscar_genero, constantes.tab_buscar_genero);
      this.llenarOpciones(OrigenIngresoComponent,constantes.tab_crear_origen_ingreso, constantes.tab_crear_origen_ingreso);
      this.llenarOpciones(OrigenIngresoMostrarComponent,constantes.tab_buscar_origen_ingreso,constantes.tab_buscar_origen_ingreso);
      this.llenarOpciones(PlazoCreditoComponent,constantes.tab_crear_plazo_credito, constantes.tab_crear_plazo_credito);
      this.llenarOpciones(PlazoCreditoMostrarComponent,constantes.tab_buscar_plazo_credito,constantes.tab_buscar_plazo_credito);
      this.llenarOpciones(TipoPagoComponent,constantes.tab_crear_tipo_pago, constantes.tab_crear_tipo_pago);
      this.llenarOpciones(TipoPagoMostrarComponent,constantes.tab_buscar_tipo_pago, constantes.tab_buscar_tipo_pago);
      this.llenarOpciones(MapsComponent,'Mapa Cliente','Mapa cliente');
    }

    if (tabNombre == constantes.modulo_compras) {
      this.llenarOpciones(ProveedorComponent, constantes.tab_crear_proveedor, constantes.tab_crear_proveedor);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_proveedor, constantes.tab_buscar_proveedor);
      this.llenarOpciones(FacturaCompraComponent, constantes.tab_crear_factura_compra, constantes.tab_crear_factura_compra);
    }

    if (tabNombre == constantes.modulo_ventas) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_inventarios) {
      this.llenarOpciones(ProductoComponent,constantes.tab_crear_producto, constantes.tab_crear_producto);
      this.llenarOpciones(ProductoMostrarComponent,constantes.tab_buscar_producto, constantes.tab_buscar_producto);
      this.llenarOpciones(SaldoInicialInventarioComponent,constantes.tab_crear_saldo_inicial_inventario, constantes.tab_crear_saldo_inicial_inventario);
      this.llenarOpciones(TablaEquivalenciaMedidaComponent,constantes.tab_crear_tabla_equivalencia_medida, constantes.tab_crear_tabla_equivalencia_medida);
      this.llenarOpciones(TablaEquivalenciaMedidaMostrarComponent, constantes.tab_buscar_tabla_equivalencia_medida, constantes.tab_buscar_tabla_equivalencia_medida);
      this.llenarOpciones(PresentacionProductoComponent,constantes.tab_crear_presentacion_producto, constantes.tab_crear_presentacion_producto);
      this.llenarOpciones(PresentacionProductoMostrarComponent,constantes.tab_buscar_presentacion_producto, constantes.tab_buscar_presentacion_producto);
      this.llenarOpciones(PromocionComponent,'Promociones','Promociones/Combos');
    }

    if (tabNombre == constantes.modulo_contabilidad) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_financiero) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_activos_fijos) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_talento_humano) {
      this.llenarOpciones(TransportistaComponent,constantes.tab_crear_transportista,constantes.tab_crear_transportista);
    }

    if (tabNombre == constantes.modulo_produccion) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_importacion) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_configuracion) {
      this.llenarOpciones(GrupoClienteComponent, constantes.tab_crear_grupo_cliente, constantes.tab_crear_grupo_cliente);
      this.llenarOpciones(TransportistaComponent, constantes.tab_crear_transportista, constantes.tab_crear_transportista);
      this.llenarOpciones(UbicacionComponent,constantes.tab_crear_ubicacion, constantes.tab_crear_ubicacion);
      this.llenarOpciones(UbicacionMostrarComponent, constantes.tab_buscar_ubicacion, constantes.tab_buscar_ubicacion);
      this.llenarOpciones(ImportarComponent, constantes.tab_crear_importacion, constantes.tab_crear_importacion);
      this.llenarOpciones(ExportarComponent, constantes.tab_crear_exportacion, constantes.tab_crear_exportacion);
    }
    
    if (tabNombre == constantes.modulo_estadisticas) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_control) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura,);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_auditoria) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.tab_crear_factura);
      this.llenarOpciones(FacturaMostrarComponent, constantes.tab_buscar_factura, constantes.tab_buscar_factura);
    }

    if (tabNombre == constantes.modulo_usuarios) {
      this.llenarOpciones(UsuarioComponent, constantes.tab_crear_usuario, constantes.tab_crear_usuario);
      this.llenarOpciones(UsuarioMostrarComponent, constantes.tab_buscar_usuario, constantes.tab_buscar_usuario);
      this.llenarOpciones(EstablecimientoComponent, constantes.tab_crear_establecimiento, constantes.tab_crear_establecimiento);
      this.llenarOpciones(EstablecimientoMostrarComponent,constantes.tab_buscar_establecimiento, constantes.tab_buscar_establecimiento);
      this.llenarOpciones(PuntoVentaComponent,constantes.tab_crear_punto_venta, constantes.tab_crear_punto_venta);
      this.llenarOpciones(PuntoVentaMostrarComponent,constantes.tab_buscar_punto_venta, constantes.tab_buscar_punto_venta);
    }
  }  
}
