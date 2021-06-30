import { Injectable, Type } from '@angular/core';
import { SidebarItem } from "../../modelos/sidebar-item.model";
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

@Injectable({
  providedIn: 'root'
})
export class SidebarItemsService {

  opciones = new Array<SidebarItem>();

  constructor() { }

  // Para llenar las opciones del sideBar
  llenarOpciones(Componente: Type<any>, tabTitulo: string, itemNombre: string, icoItem: string) {
    this.opciones.push(new SidebarItem(Componente, tabTitulo, itemNombre, icoItem));
  }

  menuOpciones(tabNombre: string): SidebarItem[] {
    this.opciones = [];
    if (tabNombre == constantes.modulo_clientes) {
      this.llenarOpciones(ClienteComponent,constantes.tab_crear_cliente, constantes.item_crear_cliente, constantes.ico_crear_cliente);
      this.llenarOpciones(ClienteLeerComponent,constantes.tab_buscar_cliente,constantes.item_buscar_cliente, constantes.ico_buscar_cliente);
      this.llenarOpciones(GrupoClienteComponent,constantes.tab_crear_grupo_cliente, constantes.item_crear_grupo_cliente, constantes.ico_crear_grupo_cliente);
      //this.llenarOpciones(GrupoClienteLeerComponent,constantes.tab_buscar_grupo_cliente, constantes.item_buscar_grupo_cliente, constantes.ico_buscar_grupo_cliente);
      this.llenarOpciones(CategoriaClienteComponent,constantes.tab_crear_categoria_cliente, constantes.item_crear_categoria_cliente, constantes.ico_crear_categoria_cliente);
      //this.llenarOpciones(CategoriaClienteLeerComponent,constantes.tab_buscar_categoria_cliente, constantes.item_buscar_categoria_cliente, constantes.ico_buscar_categoria_cliente);
      this.llenarOpciones(FormaPagoComponent, constantes.tab_crear_forma_pago, constantes.item_crear_forma_pago, constantes.ico_crear_forma_pago);
      //this.llenarOpciones(FormaPagoLeerComponent,constantes.tab_buscar_forma_pago, constantes.item_buscar_forma_pago, constantes.ico_buscar_forma_pago);
      this.llenarOpciones(OrigenIngresoComponent,constantes.tab_crear_origen_ingreso, constantes.item_crear_origen_ingreso, constantes.ico_crear_origen_ingreso);
      //this.llenarOpciones(OrigenIngresoLeerComponent,constantes.tab_buscar_origen_ingreso,constantes.item_buscar_origen_ingreso, constantes.ico_buscar_origen_ingreso);
      this.llenarOpciones(PlazoCreditoComponent,constantes.tab_crear_plazo_credito, constantes.item_crear_plazo_credito, constantes.ico_crear_plazo_credito);
      //this.llenarOpciones(PlazoCreditoLeerComponent,constantes.tab_buscar_plazo_credito,constantes.item_buscar_plazo_credito, constantes.ico_buscar_plazo_credito);
      this.llenarOpciones(MapsComponent,constantes.tab_mapa_cliente, constantes.item_mapa_cliente,constantes.ico_mapa_cliente);
    }

    if (tabNombre == constantes.modulo_compras) {
      this.llenarOpciones(ProveedorComponent, constantes.tab_crear_proveedor, constantes.item_crear_proveedor, constantes.ico_crear_proveedor);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_proveedor, constantes.item_buscar_proveedor, constantes.ico_buscar_proveedor);
      this.llenarOpciones(FacturaCompraComponent, constantes.tab_crear_factura_compra, constantes.item_crear_factura_compra, constantes.ico_crear_factura_compra);
    }

    if (tabNombre == constantes.modulo_ventas) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_inventarios) {
      this.llenarOpciones(ProductoComponent,constantes.tab_crear_producto, constantes.item_crear_producto, constantes.ico_crear_producto);
      this.llenarOpciones(ProductoLeerComponent,constantes.tab_buscar_producto, constantes.item_buscar_producto, constantes.ico_buscar_producto);
      this.llenarOpciones(SaldoInicialInventarioComponent,constantes.tab_crear_saldo_inicial_inventario, constantes.item_crear_saldo_inicial_inventario, constantes.ico_crear_saldo_inicial_inventario);
      this.llenarOpciones(TablaEquivalenciaMedidaComponent,constantes.tab_crear_tabla_equivalencia_medida, constantes.item_crear_tabla_equivalencia_medida, constantes.ico_crear_tabla_equivalencia_medida);
      this.llenarOpciones(TablaEquivalenciaMedidaLeerComponent, constantes.tab_buscar_tabla_equivalencia_medida, constantes.item_buscar_tabla_equivalencia_medida, constantes.ico_buscar_tabla_equivalencia_medida);
      this.llenarOpciones(GrupoProductoComponent,constantes.tab_crear_grupo_producto, constantes.item_crear_grupo_producto, constantes.ico_crear_grupo_producto);
      this.llenarOpciones(GrupoProductoLeerComponent,constantes.tab_buscar_grupo_producto, constantes.item_buscar_grupo_producto, constantes.ico_buscar_grupo_producto);
      this.llenarOpciones(PromocionComponent,constantes.tab_promociones,constantes.item_promociones,constantes.ico_promociones);
    }

    if (tabNombre == constantes.modulo_contabilidad) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_financiero) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_activos_fijos) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_talento_humano) {
      this.llenarOpciones(TransportistaComponent,constantes.tab_crear_transportista,constantes.item_crear_transportista, constantes.ico_crear_transportista);
    }

    if (tabNombre == constantes.modulo_produccion) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_importacion) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_configuracion) {
      this.llenarOpciones(EstadoCivilComponent,constantes.tab_crear_estado_civil, constantes.item_crear_estado_civil, constantes.ico_crear_estado_civil);
      //this.llenarOpciones(EstadoCivilLeerComponent, constantes.tab_buscar_estado_civil, constantes.item_buscar_estado_civil, constantes.ico_buscar_estado_civil);
      this.llenarOpciones(GeneroComponent, constantes.tab_crear_genero, constantes.item_crear_genero, constantes.ico_crear_genero);
      this.llenarOpciones(TipoPagoComponent,constantes.tab_crear_tipo_pago, constantes.item_crear_tipo_pago, constantes.ico_crear_tipo_pago);
      //Integrar con TipoPago
      this.llenarOpciones(TipoPagoLeerComponent,constantes.tab_buscar_tipo_pago, constantes.item_buscar_tipo_pago, constantes.ico_buscar_tipo_pago);
      this.llenarOpciones(TransportistaComponent, constantes.tab_crear_transportista, constantes.item_crear_transportista, constantes.ico_crear_transportista);
      this.llenarOpciones(UbicacionComponent,constantes.tab_crear_ubicacion, constantes.item_crear_ubicacion, constantes.ico_crear_ubicacion);
      this.llenarOpciones(UbicacionLeerComponent, constantes.tab_buscar_ubicacion, constantes.item_buscar_ubicacion, constantes.ico_buscar_ubicacion);
      this.llenarOpciones(ImportarComponent, constantes.tab_crear_importacion, constantes.item_crear_importacion, constantes.ico_crear_importacion);
      this.llenarOpciones(ExportarComponent, constantes.tab_crear_exportacion, constantes.item_crear_exportacion, constantes.ico_crear_exportacion);
    }
    
    if (tabNombre == constantes.modulo_estadisticas) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_control) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_auditoria) {
      this.llenarOpciones(FacturaComponent, constantes.tab_crear_factura, constantes.item_crear_factura, constantes.ico_crear_factura);
      this.llenarOpciones(FacturaLeerComponent, constantes.tab_buscar_factura, constantes.item_buscar_factura, constantes.ico_buscar_factura);
    }

    if (tabNombre == constantes.modulo_usuarios) {
      this.llenarOpciones(UsuarioComponent, constantes.tab_crear_usuario, constantes.item_crear_usuario, constantes.ico_crear_usuario);
      this.llenarOpciones(UsuarioMostrarComponent, constantes.tab_buscar_usuario, constantes.item_buscar_usuario, constantes.ico_buscar_usuario);
      this.llenarOpciones(EstablecimientoComponent, constantes.tab_crear_establecimiento, constantes.item_crear_establecimiento, constantes.ico_crear_establecimiento);
      this.llenarOpciones(EstablecimientoMostrarComponent,constantes.tab_buscar_establecimiento, constantes.item_buscar_establecimiento, constantes.ico_buscar_establecimiento);
      this.llenarOpciones(PuntoVentaComponent,constantes.tab_crear_punto_venta, constantes.item_crear_punto_venta, constantes.ico_crear_punto_venta);
      this.llenarOpciones(PuntoVentaLeerComponent,constantes.tab_buscar_punto_venta, constantes.item_buscar_punto_venta, constantes.ico_buscar_punto_venta);
    }
    return this.opciones;
  }  
}
