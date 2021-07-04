import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes comunes para todas las paginas
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { ImportarComponent } from './configuraciones/importar/importar.component';
import { ExportarComponent } from './configuraciones/exportar/exportar.component';

// Componentes de Inicio
import { InicioSesionComponent, CambioCredencialesComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { MainComponent } from './componentes/main/main.component';
import { MenuComponent } from './componentes/menu/menu.component';

//Módulo de Configuraciones
import { DatoAdicionalComponent } from './configuraciones/dato-adicional/dato-adicional.component';
import { EmpresaComponent } from './configuraciones/empresa/empresa.component';
import { UbicacionComponent } from './configuraciones/ubicacion/ubicacion.component';
import { UbicacionLeerComponent } from './configuraciones/ubicacion/ubicacion-leer/ubicacion-leer.component';

// Módulo de Usuarios
import { SesionComponent } from './usuarios/sesion/sesion.component';
import { PermisoComponent } from './usuarios/permiso/permiso.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuarioMostrarComponent } from './usuarios/usuario/usuario-leer/usuario-leer.component';
import { EstablecimientoComponent } from './usuarios/establecimiento/establecimiento.component';
import { EstablecimientoMostrarComponent } from './usuarios/establecimiento/establecimiento-leer/establecimiento-leer.component';
import { PuntoVentaComponent } from './usuarios/punto-venta/punto-venta.component';
import { PuntoVentaLeerComponent } from './usuarios/punto-venta/punto-.venta-leer/punto-venta-leer.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';

// Molulo de Clientes
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { ClienteLeerComponent } from './clientes/cliente/cliente-leer/cliente-leer.component';
import { GrupoClienteComponent } from './clientes/grupo-cliente/grupo-cliente.component';
import { GrupoClienteLeerComponent } from './clientes/grupo-cliente/grupo-cliente-leer/grupo-cliente-leer.component';
import { TelefonoComponent } from './clientes/telefono/telefono.component';
import { CorreoComponent } from './clientes/correo/correo.component';
import { CelularComponent } from './clientes/celular/celular.component';
import { AuxiliarComponent } from './clientes/auxiliar/auxiliar.component';
import { DireccionComponent } from './clientes/direccion/direccion.component';
import { OrigenIngresoComponent } from './clientes/origen-ingreso/origen-ingreso.component';
import { OrigenIngresoLeerComponent } from './clientes/origen-ingreso/origen-ingreso-leer/origen-ingreso-leer.component';
import { CategoriaClienteComponent } from './clientes/categoria-cliente/categoria-cliente.component';
import { CategoriaClienteLeerComponent } from './clientes/categoria-cliente/categoria-cliente-leer/categoria-cliente-leer.component';
import { TipoRetencionComponent } from './clientes/tipo-retencion/tipo-retencion.component';
import { EstadoCivilComponent } from './clientes/estado-civil/estado-civil.component';
import { EstadoCivilLeerComponent } from './clientes/estado-civil/estado-civil-leer/estado-civil-leer.component';
import { GeneroComponent } from './clientes/genero/genero.component';
import { PlazoCreditoComponent } from './clientes/plazo-credito/plazo-credito.component';
import { PlazoCreditoLeerComponent } from './clientes/plazo-credito/plazo-credito-leer/plazo-credito-leer.component';
import { ImpuestoComponent } from './clientes/impuesto/impuesto.component';
import { RetencionComponent } from './clientes/retencion-cliente/retencion-cliente.component';
import { TipoContribuyenteComponent } from './clientes/tipo-contribuyente/tipo-contribuyente.component';
import { FormaPagoComponent } from './clientes/forma-pago/forma-pago.component';
import { FormaPagoLeerComponent } from './clientes/forma-pago/forma-pago-leer/forma-pago-leer.component';
import { TipoPagoComponent } from './clientes/tipo-pago/tipo-pago.component';
import { TipoPagoLeerComponent } from './clientes/tipo-pago/tipo-pago-leer/tipo-pago-leer.component';

//Módulo de Inventarios
import { BodegaComponent } from './inventarios/bodega/bodega.component';
import { BodegaLeerComponent } from './inventarios/bodega/bodega-leer/bodega-leer.component';
import { MedidaComponent } from './inventarios/medida/medida.component';
import { MedidaLeerComponent } from './inventarios/medida/medida-leer/medida-leer.component';
import { GrupoProductoComponent } from './inventarios/grupo-producto/grupo-producto.component';
import { GrupoProductoLeerComponent } from './inventarios/grupo-producto/grupo-producto-leer/grupo-producto-leer.component';
import { KardexComponent } from './inventarios/kardex/kardex.component';
import { ActivoFijoComponent } from './inventarios/activo-fijo/activo-fijo.component';
import { FiltroSerie } from './pipes/filtro-serie';
import { ProductoComponent } from './inventarios/producto/producto.component';
import { ServicioComponent } from './inventarios/servicio/servicio.component';
import { PromocionComponent, DialogComponente } from './inventarios/promocion/promocion.component';
import { TablaPromoIndComponent } from './inventarios/promocion/tabla-promo-ind/tabla-promo-ind.component';
import { TablaPromoGrupComponent } from './inventarios/promocion/tabla-promo-grup/tabla-promo-grup.component';
import { TablaComboComponent } from './inventarios/promocion/tabla-combo/tabla-combo.component';
import { TablaComponenteComponent } from './inventarios/promocion/tabla-componente/tabla-componente.component';
import { SaldoInicialInventarioComponent } from './inventarios/saldo-inicial-inventario/saldo-inicial-inventario.component';
import { ProductoLeerComponent } from './inventarios/producto/producto-leer/producto-leer.component';
import { TablaEquivalenciaMedidaComponent } from './inventarios/tabla-equivalencia-medida/tabla-equivalencia-medida.component';
import { TablaEquivalenciaMedidaLeerComponent } from './inventarios/tabla-equivalencia-medida/tabla-equivalencia-medida-leer/tabla-equivalencia-medida-leer.component';

//Módulo de Entregas
import { EntregaComponent } from './entregas/entrega/entrega.component';
import { TransportistaComponent } from './entregas/transportista/transportista.component';
import { VehiculoTransporteComponent } from './entregas/vehiculo-transporte/vehiculo-transporte.component';

//Módulo de Recaudaciones
import { FinanciamientoComponent } from './recaudaciones/financiamiento/financiamiento.component';
import { RecaudacionComponent } from './recaudaciones/recaudacion/recaudacion.component';
import { BancoComponent } from './recaudaciones/banco/banco.component';
import { DepositoTransferenciaComponent } from './recaudaciones/deposito-transferencia/deposito-transferencia.component';
import { TarjetaCreditoComponent } from './recaudaciones/tarjeta-credito/tarjeta-credito.component';
import { TarjetaDebitoComponent } from './recaudaciones/tarjeta-debito/tarjeta-debito.component';
import { CompensacionComponent } from './recaudaciones/compensacion/compensacion.component';
import { ChequeComponent } from './recaudaciones/cheque/cheque.component';

// Módulo de Comprobantes
import { FacturaComponent } from './comprobantes/factura/factura.component';
import { FacturaLeerComponent } from './comprobantes/factura/factura-leer/factura-leer.component';
import { EgresoComponent } from './comprobantes/egreso/egreso.component';
import { PedidoComponent } from './comprobantes/pedido/pedido.component';
import { ProformaComponent } from './comprobantes/proforma/proforma.component';

//Módulo de Compras
import { ProveedorComponent } from './compras/proveedor/proveedor.component';
import { FacturaCompraComponent } from './compras/factura-compra/factura-compra.component';
import { PagoCompraComponent } from './compras/pago-compra/pago-compra.component';

//Módulo de Contabilización
import { ContabilizacionComponent } from './contabilizaciones/contabilizacion/contabilizacion.component';
import { CuentaComponent } from './contabilizaciones/cuenta/cuenta.component';

// Otros - borrar al final
import { DashboardComponent } from './componentes/pages/dashboard/dashboard.component';
import { TablesComponent } from './componentes/pages/tables/tables.component';
import { FormsComponent } from './componentes/pages/forms/forms.component';
import { TypographyComponent } from './componentes/pages/typography/typography.component';
import { MapsComponent } from './componentes/pages/maps/maps.component';
import { NotificationsComponent } from './componentes/pages/notifications/notifications.component';

const routes: Routes = [
  {path: '',   redirectTo: '/iniciosesion', pathMatch: 'full'},
  {path: 'index', redirectTo: '/iniciosesion', pathMatch: 'full'},
  {path: 'iniciosesion', component: InicioSesionComponent},
  {path: 'main', component: MainComponent},
  {path: 'menu', component: MenuComponent},
  // Rutas del Modulo de configuración
  {path: 'cliente/ubicacion', component: UbicacionComponent},
  {path: 'cliente/ubicacion-mostrar', component: UbicacionLeerComponent},
  {path: 'cliente/empresa', component: EmpresaComponent},
  {path: 'cliente/datoadicional', component: DatoAdicionalComponent},
  // Rutas para el modulo de usuarios
  {path: 'usuario', component: UsuarioComponent},
  {path: 'usuario-mostrar', component: UsuarioMostrarComponent},
  {path: 'usuario/establecimiento', component: EstablecimientoComponent},
  {path: 'usuario/establecimiento-mostrar', component: EstablecimientoMostrarComponent},
  {path: 'usuario/puntoventa', component: PuntoVentaComponent},
  {path: 'usuario/puntoventa-mostrar', component: PuntoVentaLeerComponent},
  // Rutas para el modulo de clientes
  {path: 'cliente', component: ClienteComponent},
  {path: 'cliente-leer', component: ClienteLeerComponent},
  {path: 'cliente/plazocredito', component: PlazoCreditoComponent},
  {path: 'cliente/plazocredito-leer', component: PlazoCreditoLeerComponent},
  {path: 'cliente/impuesto', component: ImpuestoComponent},
  {path: 'cliente/retencion', component: RetencionComponent},
  {path: 'cliente/grupocliente', component: GrupoClienteComponent},
  {path: 'cliente/grupocliente-mostrar', component: GrupoClienteLeerComponent},
  {path: 'cliente/transportista', component: RetencionComponent},
  {path: 'cliente/tipocontribuyente', component: TipoContribuyenteComponent},
  {path: 'cliente/genero', component: GeneroComponent},
  {path: 'cliente/estadocivil', component: EstadoCivilComponent},
  {path: 'cliente/estadocivil-leer', component: EstadoCivilLeerComponent},
  {path: 'cliente/categoriacliente', component: CategoriaClienteComponent},
  {path: 'cliente/categoriacliente-leer', component: CategoriaClienteLeerComponent},
  {path: 'cliente/origeningreso', component: OrigenIngresoComponent},
  {path: 'cliente/origeningreso-leer', component: OrigenIngresoLeerComponent},
  {path: 'cliente/formapago', component: FormaPagoComponent},
  {path: 'cliente/formapago-leer', component: FormaPagoLeerComponent},
  {path: 'cliente/tipopago', component: TipoPagoComponent},
  {path: 'cliente/tipopago-leer', component: TipoPagoLeerComponent},
  // Rutas para el Modulo de inventarios
  {path: 'producto', component: ProductoComponent},
  {path: 'producto-leer', component: ProductoLeerComponent},
  {path: 'inventario/medida', component: MedidaComponent},
  {path: 'inventario/medida-leer', component: MedidaLeerComponent},
  {path: 'inventario/grupoproducto', component: GrupoProductoComponent},
  {path: 'inventario/grupoproducto-mostrar', component: GrupoProductoLeerComponent},
  {path: 'promocion', component: PromocionComponent},
  {path: 'inventario/tablaequivalenciamedida', component: TablaEquivalenciaMedidaComponent},
  {path: 'inventario/tablaequivalenciamedida-leer', component: TablaEquivalenciaMedidaLeerComponent},
  // Rutas para el modulo de entregas
  {path: 'entrega', component: EntregaComponent},
  {path: 'cliente/vehiculotransporte', component: VehiculoTransporteComponent},
  // Rutas para el modulo de recaudación
  {path: 'recaudacion', component: RecaudacionComponent},
  // Rutas para el modulo de compras
  {path: 'proveedor', component: ProveedorComponent},
  {path: 'factura-compra', component: FacturaCompraComponent},
  // Rutas para el módulo de comprobantes
  {path: 'factura', component: FacturaComponent},
  {path: 'factura-leer', component: FacturaLeerComponent},
  // Estos no se usa, borrar al final
  {path: 'dashboard', component: DashboardComponent},
  {path: 'forms', component: FormsComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent},
  //{path: '**',   redirectTo: '/iniciosesion', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  entryComponents: [ImportarComponent, ExportarComponent, CambioCredencialesComponent, UsuarioComponent, PuntoVentaComponent, 
    EstablecimientoComponent, ClienteComponent,GrupoClienteComponent, CategoriaClienteComponent, EstadoCivilComponent, 
    GeneroComponent, OrigenIngresoComponent, PlazoCreditoComponent, FormaPagoComponent, TipoPagoComponent, BodegaComponent, 
    SaldoInicialInventarioComponent, DialogComponente, TablaEquivalenciaMedidaComponent, MedidaComponent, GrupoProductoComponent,
    FacturaComponent,
  ]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  HeaderComponent,
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
  ImportarComponent,
  ExportarComponent, 
  InicioSesionComponent,
  MainComponent,
  MenuComponent,
  CambioCredencialesComponent,
  // configuración
  UbicacionComponent,
  UbicacionLeerComponent,
  EmpresaComponent,
  DatoAdicionalComponent,
  //Usuarios
  SesionComponent,
  PermisoComponent,
  UsuarioComponent,
  UsuarioMostrarComponent,
  EstablecimientoComponent,
  EstablecimientoMostrarComponent,
  PuntoVentaComponent,
  PuntoVentaLeerComponent,
  PerfilComponent,
  // Clientes
  ClienteComponent,
  ClienteLeerComponent,
  GrupoClienteComponent,
  GrupoClienteLeerComponent,
  TelefonoComponent,
  CorreoComponent,
  CelularComponent,
  AuxiliarComponent,
  DireccionComponent,
  PlazoCreditoComponent,
  PlazoCreditoLeerComponent,
  ImpuestoComponent,
  RetencionComponent,
  TipoContribuyenteComponent,
  OrigenIngresoComponent,
  OrigenIngresoLeerComponent,
  CategoriaClienteComponent,
  CategoriaClienteLeerComponent,
  TipoRetencionComponent,
  EstadoCivilComponent,
  EstadoCivilLeerComponent,
  GeneroComponent,
  FormaPagoComponent,
  FormaPagoLeerComponent,
  TipoPagoComponent,
  TipoPagoLeerComponent,
  // Inventarios
  ProductoComponent,
  ServicioComponent,
  GrupoProductoComponent,
  GrupoProductoLeerComponent,
  BodegaComponent,
  BodegaLeerComponent,
  MedidaComponent,
  MedidaLeerComponent,
  KardexComponent,
  ActivoFijoComponent,
  SaldoInicialInventarioComponent,
  ProductoLeerComponent,
  PromocionComponent,
  DialogComponente,
  TablaPromoIndComponent, 
  TablaPromoGrupComponent, 
  TablaComboComponent, 
  TablaComponenteComponent, 
  TablaEquivalenciaMedidaComponent,
  TablaEquivalenciaMedidaLeerComponent,
  FiltroSerie,
  // Entregas
  EntregaComponent,
  TransportistaComponent,
  VehiculoTransporteComponent,
  // Recaudación
  FinanciamientoComponent,
  RecaudacionComponent,
  BancoComponent,
  DepositoTransferenciaComponent,
  TarjetaCreditoComponent,
  TarjetaDebitoComponent,
  CompensacionComponent,
  ChequeComponent,
  //Comprobantes
  FacturaComponent,
  FacturaLeerComponent,
  EgresoComponent,
  PedidoComponent,
  ProformaComponent,
  // Compras
  ProveedorComponent, 
  FacturaCompraComponent, 
  PagoCompraComponent,
  // Contabilización
  ContabilizacionComponent,
  CuentaComponent, 
  //otros
  DashboardComponent,
  TablesComponent,
  FormsComponent,
  TypographyComponent,
  MapsComponent,
  NotificationsComponent
];
