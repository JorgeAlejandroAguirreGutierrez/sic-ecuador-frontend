import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
// Componentes de Angular Material
import { DemoMaterialModule } from './componentes/demo-material-module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatNativeDateModule} from '@angular/material/core';


// Diseño de la pagina, Menus y componentes
import { AppComponent } from './app.component';

import { DashboardComponent } from './componentes/pages/dashboard/dashboard.component';
import { TablesComponent } from './componentes/pages/tables/tables.component';
import { FormsComponent } from './componentes/pages/forms/forms.component';
import { TypographyComponent } from './componentes/pages/typography/typography.component';
import { MapsComponent } from './componentes/pages/maps/maps.component';
import { NotificationsComponent } from './componentes/pages/notifications/notifications.component';

import { HeaderComponent } from './componentes/header/header.component';
import { HtmlFooterComponent } from './componentes/footer/footer.component';
import { FooterComponent } from './componentes/components/footer/footer.component';
import { NavbarComponent } from './componentes/components/navbar/navbar.component';
import { SidebarComponent } from './componentes/components/sidebar/sidebar.component';

// Componentes de las pestañas
import { MainComponent } from './componentes/main/main.component';
import { TabContentComponent } from "./componentes/tab-content.component";
import { ContentContainerDirective } from "./componentes/content-container.directive";
import { TabService } from "./componentes/services/tab.service";
import { MenuComponent } from './componentes/menu/menu.component';

// Diseño de tabla editable
import { TablaEditableComponent } from './componentes/tabla-editable/tabla-editable.component';
import { EditableComponent } from './componentes/tabla-editable/editable/editable.component';
import { ViewModeDirective } from './componentes/tabla-editable/editable/view-mode.directive';
import { EditModeDirective } from './componentes/tabla-editable/editable/edit-mode.directive';
import { FocusableDirective } from './componentes/tabla-editable/focusable.directive';
import { EditableOnEnterDirective } from './componentes/tabla-editable/editable/edit-on-enter.directive';

//Módulo de Configuraciones
import { DatoAdicionalComponent } from './configuraciones/dato-adicional/dato-adicional.component';
import { EmpresaComponent } from './configuraciones/empresa/empresa.component';
import { UbicacionComponent } from './configuraciones/ubicacion/ubicacion.component';
import { UbicacionMostrarComponent } from './configuraciones/ubicacion/ubicacion-mostrar/ubicacion-mostrar.component';

import { ModeloService } from './servicios/modelo.service';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

// Módulo de Usuarios
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { EstablecimientoComponent } from './usuarios/establecimiento/establecimiento.component';
import { PuntoVentaComponent } from './usuarios/punto-venta/punto-venta.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { SesionComponent } from './usuarios/sesion/sesion.component';
import { PermisoComponent } from './usuarios/permiso/permiso.component';

// Molulo de Clientes
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { ClienteMostrarComponent } from './clientes/cliente/cliente-mostrar/cliente-mostrar.component';
import { GrupoClienteComponent } from './clientes/grupo-cliente/grupo-cliente.component';
import { TelefonoComponent } from './clientes/telefono/telefono.component';
import { CorreoComponent } from './clientes/correo/correo.component';
import { CelularComponent } from './clientes/celular/celular.component';
import { AuxiliarComponent } from './clientes/auxiliar/auxiliar.component';
import { DireccionComponent } from './clientes/direccion/direccion.component';
import { OrigenIngresoComponent } from './clientes/origen-ingreso/origen-ingreso.component';
import { CategoriaClienteComponent } from './clientes/categoria-cliente/categoria-cliente.component';
import { TipoRetencionComponent } from './clientes/tipo-retencion/tipo-retencion.component';
import { EstadoCivilComponent } from './clientes/estado-civil/estado-civil.component';
import { GeneroComponent } from './clientes/genero/genero.component';
import { PlazoCreditoComponent } from './clientes/plazo-credito/plazo-credito.component';
import { ImpuestoComponent } from './clientes/impuesto/impuesto.component';
import { RetencionComponent } from './clientes/retencion-cliente/retencion-cliente.component';
import { TipoContribuyenteComponent } from './clientes/tipo-contribuyente/tipo-contribuyente.component';

//Módulo de Inventarios
import { BodegaComponent } from './inventarios/bodega/bodega.component';
import { MedidaComponent } from './inventarios/medida/medida.component';
import { KardexComponent } from './inventarios/kardex/kardex.component';
import { ActivoFijoComponent } from './inventarios/activo-fijo/activo-fijo.component';
import { FiltroSerie } from './pipes/filtro-serie';
import { ProductoComponent } from './inventarios/producto/producto.component';
import { PromocionComponent, DialogComponente } from './inventarios/promocion/promocion.component';
import { TablaPromoIndComponent } from './inventarios/promocion/tabla-promo-ind/tabla-promo-ind.component';
import { TablaPromoGrupComponent } from './inventarios/promocion/tabla-promo-grup/tabla-promo-grup.component';
import { TablaComboComponent } from './inventarios/promocion/tabla-combo/tabla-combo.component';
import { TablaComponenteComponent } from './inventarios/promocion/tabla-componente/tabla-componente.component';

//Módulo de Entregas
import { EntregaComponent } from './entregas/entrega/entrega.component';
import { TransportistaComponent } from './entregas/transportista/transportista.component';
import { VehiculoTransporteComponent } from './entregas/vehiculo-transporte/vehiculo-transporte.component';

//Módulo de Recaudaciones
import { FormaPagoComponent } from './recaudaciones/forma-pago/forma-pago.component';
import { TipoPagoComponent } from './recaudaciones/tipo-pago/tipo-pago.component';
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
import { FacturaMostrarComponent } from './comprobantes/factura/factura-mostrar/factura-mostrar.component';
import { EgresoComponent } from './comprobantes/egreso/egreso.component';
import { PedidoComponent } from './comprobantes/pedido/pedido.component';
import { ProformaComponent } from './comprobantes/proforma/proforma.component';

//Módulo de Contabilización
import { ContabilizacionComponent } from './contabilizaciones/contabilizacion/contabilizacion.component';
import { CuentaComponent } from './contabilizaciones/cuenta/cuenta.component';

//Módulo de Compras
import { ProveedorComponent } from './compras/proveedor/proveedor.component';
import { FacturaCompraComponent } from './compras/factura-compra/factura-compra.component';
import { PagoCompraComponent } from './compras/pago-compra/pago-compra.component';

//Tienda - Estructura: Cabecera y Menu
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TiendaComponent } from './tienda/tienda.component';
import { AppHeaderComponent } from './tienda/appheader/appheader.component';
import { AppSidebarComponent } from './tienda/appsidebar/appsidebar.component';
import { SharedModule } from './tienda/shared/shared.module';
import { SpinnerComponent } from './tienda/shared/spinner.component';

//tienda 1
import { LoginComponent } from './tienda/login/login.component';
import { MenuPrincipalComponent } from './tienda/menu-principal/menu-principal.component';
import { UsuariosService } from './tienda/service/usuarios.service';
import { DatabaseService } from './tienda/db/database.service';
import { ProductosService } from './tienda/service/productos.service';
import { DetalleProductoComponent } from './tienda/detalle-producto/detalle-producto.component';
import { PedidosComponent } from './tienda/pedidos/pedidos.component';

//tienda 2
import { HttpClientJsonpModule } from '@angular/common/http';
import { SearchBarComponent } from './tienda/search-bar/search-bar.component';
import { FiltersComponent } from './tienda/filters/filters.component';
import { CartComponent } from './tienda/cart/cart.component';
import { ContenidoComponent } from './tienda/contenido/contenido.component';
import { SortFiltersComponent } from './tienda/sort-filters/sort-filters.component';
import { DataService } from './tienda/service/data.service';
import { CartService } from './tienda/service/cart.service';
import { UrlFormComponent } from './tienda/url-form/url-form.component';

//Zoom y Slider
import { ImageZoomComponent } from './tienda/zoom/image-zoom/image-zoom.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SliderLightboxComponent } from './tienda/lib/slider-lightbox/slider-lightbox.component';
import { SliderCustomImageComponent } from './tienda/lib/slider-custom-image/slider-custom-image.component';
import { NgImageSliderService } from './tienda/lib/ng-image-slider.service';
import { SliderComponent } from './tienda/slider/slider.component';
import { ZoomComponent } from './tienda/zoom/zoom.component';

//Servicios
import { DatoAdicionalService} from './servicios/dato-adicional.service';
import { PlazoCreditoService} from './servicios/plazo-credito.service';
import { ImpuestoService } from './servicios/impuesto.service';
import { RetencionService } from './servicios/retencion-cliente.service';
import { TransportistaService } from './servicios/transportista.service';
import { UbicacionService } from './servicios/ubicacion.service';
import { TipoContribuyenteService } from './servicios/tipo-contribuyente.service';
import { VehiculoTransporteService } from './servicios/vehiculo-transporte.service';
import { EmpresaService } from './servicios/empresa.service';
import { EstablecimientoService } from './servicios/establecimiento.service';
import { PuntoVentaService } from './servicios/punto-venta.service';
import { UsuarioService } from './servicios/usuario.service';
import { ClienteService } from './servicios/cliente.service';
import { FacturaService } from './servicios/factura.service';
import { ImportarComponent } from './configuraciones/importar/importar.component';
import { ExportarComponent } from './configuraciones/exportar/exportar.component';
import { SaldoInicialInventarioComponent } from './inventarios/saldo-inicial-inventario/saldo-inicial-inventario.component';
import { ProductoMostrarComponent } from './inventarios/producto/producto-mostrar/producto-mostrar.component';

const routes: Routes = [
  {path: 'index', redirectTo: '/iniciosesion', pathMatch: 'full'},
  {path: 'iniciosesion', component: InicioSesionComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'cliente/datoadicional', component: DatoAdicionalComponent},
  {path: 'cliente/plazocredito', component: PlazoCreditoComponent},
  {path: 'cliente/impuesto', component: ImpuestoComponent},
  {path: 'cliente/retencion', component: RetencionComponent},
  {path: 'cliente/grupocliente', component: GrupoClienteComponent},
  {path: 'cliente/transportista', component: RetencionComponent},
  {path: 'cliente/tipocontribuyente', component: TipoContribuyenteComponent},
  {path: 'cliente/vehiculotransporte', component: VehiculoTransporteComponent},
  {path: 'cliente/ubicacion', component: UbicacionComponent},
  {path: 'cliente/ubicacion-mostrar', component: UbicacionMostrarComponent},
  {path: 'cliente/empresa', component: EmpresaComponent},
  {path: 'cliente/usuario', component: UsuarioComponent},
  {path: 'cliente/establecimiento', component: EstablecimientoComponent},
  {path: 'cliente/puntoventa', component: PuntoVentaComponent},
  {path: 'cliente/genero', component: GeneroComponent},
  {path: 'cliente/categoriacliente', component: CategoriaClienteComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'cliente-mostrar', component: ClienteMostrarComponent},
  {path: 'factura', component: FacturaComponent},
  {path: 'factura-mostrar', component: FacturaMostrarComponent},
  {path: 'recaudacion', component: RecaudacionComponent},
  {path: 'entrega', component: EntregaComponent},
  {path: 'main', component: MainComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'producto-mostrar', component: ProductoMostrarComponent},
  {path: 'tabla', component: TablaEditableComponent},
  {path: 'promocion', component: PromocionComponent},
  {path: 'proveedor', component: ProveedorComponent},
  {path: 'factura-compra', component: FacturaCompraComponent},
  {path: 'tabla', component: TablaEditableComponent}, //retierar luego de las pruebas
  {path: 'tienda', component: TiendaComponent},
  {path: 'tienda/detalle-producto/:id', component: DetalleProductoComponent},
  {path: 'zoom', component: ZoomComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    TabContentComponent,
    ContentContainerDirective,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    TablesComponent,
    FormsComponent,
    TypographyComponent,
    MapsComponent,
    NotificationsComponent,    
    HeaderComponent,
    FooterComponent,
    HtmlFooterComponent,
    InicioSesionComponent,
    DatoAdicionalComponent,
    PlazoCreditoComponent,
    ImpuestoComponent,
    RetencionComponent,
    TransportistaComponent,
    UbicacionComponent,
    TipoContribuyenteComponent,
    VehiculoTransporteComponent,
    ClienteComponent,
    ClienteMostrarComponent,
    UbicacionMostrarComponent,
    EmpresaComponent,
    UsuarioComponent,
    EstablecimientoComponent,
    PuntoVentaComponent,
    PerfilComponent,
    MenuComponent,
    GrupoClienteComponent,
    TelefonoComponent,
    CorreoComponent,
    CelularComponent,
    AuxiliarComponent,
    DireccionComponent,
    FormaPagoComponent,
    TipoPagoComponent,
    FinanciamientoComponent,
    OrigenIngresoComponent,
    CategoriaClienteComponent,
    TipoRetencionComponent,
    EstadoCivilComponent,
    GeneroComponent,
    RecaudacionComponent,
    BancoComponent,
    DepositoTransferenciaComponent,
    TarjetaCreditoComponent,
    TarjetaDebitoComponent,
    CompensacionComponent,
    ChequeComponent,
    FacturaComponent,
    FacturaMostrarComponent,
    EgresoComponent,
    PedidoComponent,
    ProformaComponent,
    SesionComponent,
    PermisoComponent,
    ContabilizacionComponent,
    BodegaComponent,
    MedidaComponent,
    KardexComponent,
    ActivoFijoComponent,
    MainComponent,
    EntregaComponent,
    TiendaComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent,
    MenuPrincipalComponent,
    DetalleProductoComponent,
    PedidosComponent,
    SearchBarComponent,
    FiltersComponent,
    CartComponent,
    ContenidoComponent,
    SortFiltersComponent,
    UrlFormComponent,
    SliderComponent,
    FiltroSerie,
    ZoomComponent,
    ImageZoomComponent,
    SliderLightboxComponent,
    SliderCustomImageComponent,
    ImportarComponent,
    ProductoComponent,
    TablaEditableComponent,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective, 
    EditableOnEnterDirective, 
    ExportarComponent, 
    SaldoInicialInventarioComponent,
    ProductoMostrarComponent,
    PromocionComponent,
    DialogComponente,
    ProveedorComponent, 
    FacturaCompraComponent, 
    TablaPromoIndComponent, 
    TablaPromoGrupComponent, 
    TablaComboComponent, 
    TablaComponenteComponent, 
    CuentaComponent, 
    PagoCompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule,
    MatAutocompleteModule, MatCardModule, MatExpansionModule, MatDividerModule, MatIconModule, MatStepperModule,
    MatDatepickerModule, MatNativeDateModule, MatTableModule, MatSortModule, MatPaginatorModule, MatToolbarModule,
    MatSidenavModule, MatMenuModule, MatListModule, MatGridListModule, MatBadgeModule, MatDialogModule,
    DemoMaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientJsonpModule,
    NgImageSliderModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [DatoAdicionalService, PlazoCreditoService, ImpuestoService, RetencionService, ModeloService,
              TransportistaService, UbicacionService, TipoContribuyenteService, VehiculoTransporteService,
              EmpresaService, EstablecimientoService, PuntoVentaService, UsuarioService, DatePipe,
              ClienteService, FacturaService, TabService, UsuariosService, DatabaseService, ProductosService,
              DataService, CartService, NgImageSliderService,
              {
                provide: LocationStrategy,
                useClass: PathLocationStrategy
              }],
  bootstrap: [AppComponent],
  entryComponents: [ClienteComponent, FacturaComponent, ImportarComponent, ExportarComponent, SaldoInicialInventarioComponent, DialogComponente]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
