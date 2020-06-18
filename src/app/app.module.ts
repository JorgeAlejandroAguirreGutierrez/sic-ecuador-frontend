import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule, MatSelectModule, MatAutocompleteModule, MatNativeDateModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatTabsModule, MatInputModule, MatCheckboxModule, MatExpansionModule, MatIconModule, MatSortModule } from '@angular/material';
import { MatFormFieldModule, MatCardModule, MatDividerModule, MatStepperModule, MatDatepickerModule} from '@angular/material';
import { MatToolbarModule, MatSidenavModule, MatMenuModule, MatListModule, MatGridListModule, MatBadgeModule } from '@angular/material';
import { TabContentComponent } from "./tab-content.component";
import { ContentContainerDirective } from "./content-container.directive";
import { TabService } from "./services/tab.service";

// Menu
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { FormsComponent } from './pages/forms/forms.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

import { HeaderComponent } from './header/header.component';
import { HtmlFooterComponent } from './footer/footer.component';
import { FooterComponent } from './components/footer/footer.component';

//tienda - Estructura: Cabecera y Menu
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TiendaComponent } from './tienda/tienda.component';
import { AppHeaderComponent } from './tienda/appheader/appheader.component';
import { AppSidebarComponent } from './tienda/appsidebar/appsidebar.component';
import { DemoMaterialModule } from './demo-material-module';
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

import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { DatoAdicionalComponent } from './dato-adicional/dato-adicional.component';
import { PlazoCreditoComponent } from './plazo-credito/plazo-credito.component';
import { ImpuestoComponent } from './impuesto/impuesto.component';
import { RetencionComponent } from './retencion-cliente/retencion-cliente.component';
import { TransportistaComponent } from './transportista/transportista.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { TipoContribuyenteComponent } from './tipo-contribuyente/tipo-contribuyente.component';
import { VehiculoTransporteComponent } from './vehiculo-transporte/vehiculo-transporte.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EstablecimientoComponent } from './establecimiento/establecimiento.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteMostrarComponent } from './cliente/cliente-mostrar/cliente-mostrar.component';

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

import { PerfilComponent } from './perfil/perfil.component';
import { MenuComponent } from './menu/menu.component';
import { GrupoClienteComponent } from './grupo-cliente/grupo-cliente.component';
import { TelefonoComponent } from './telefono/telefono.component';
import { CorreoComponent } from './correo/correo.component';
import { CelularComponent } from './celular/celular.component';
import { AuxiliarComponent } from './auxiliar/auxiliar.component';
import { DireccionComponent } from './direccion/direccion.component';
import { FormaPagoComponent } from './forma-pago/forma-pago.component';
import { TipoPagoComponent } from './tipo-pago/tipo-pago.component';
import { FinanciamientoComponent } from './financiamiento/financiamiento.component';
import { OrigenIngresoComponent } from './origen-ingreso/origen-ingreso.component';
import { CategoriaClienteComponent } from './categoria-cliente/categoria-cliente.component';
import { TipoRetencionComponent } from './tipo-retencion/tipo-retencion.component';
import { EstadoCivilComponent } from './estado-civil/estado-civil.component';
import { GeneroComponent } from './genero/genero.component';
import { RecaudacionComponent } from './recaudacion/recaudacion.component';
import { BancoComponent } from './banco/banco.component';
import { DepositoTransferenciaComponent } from './deposito-transferencia/deposito-transferencia.component';
import { TarjetaCreditoComponent } from './tarjeta-credito/tarjeta-credito.component';
import { TarjetaDebitoComponent } from './tarjeta-debito/tarjeta-debito.component';
import { CompensacionComponent } from './compensacion/compensacion.component';
import { ChequeComponent } from './cheque/cheque.component';
import { FacturaComponent } from './factura/factura.component';
import { FacturaMostrarComponent } from './factura/factura-mostrar/factura-mostrar.component';
import { EgresoComponent } from './egreso/egreso.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProformaComponent } from './proforma/proforma.component';
import { SesionComponent } from './sesion/sesion.component';
import { PermisoComponent } from './permiso/permiso.component';
import { ContabilizacionComponent } from './contabilizacion/contabilizacion.component';
import { BodegaComponent } from './bodega/bodega.component';
import { MedidaComponent } from './medida/medida.component';
import { KardexComponent } from './kardex/kardex.component';
import { ActivoFijoComponent } from './activo-fijo/activo-fijo.component';
import { MercaderiaComponent } from './mercaderia/mercaderia.component';
import { MainComponent } from './main/main.component';
import { EntregaComponent } from './entrega/entrega.component';
import { SliderComponent } from './tienda/slider/slider.component';
import { ZoomComponent } from './tienda/zoom/zoom.component';

import { FiltroSerie } from './pipes/filtro-serie';

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
    MercaderiaComponent,
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
    FiltroSerie
    ZoomComponent,
    ImageZoomComponent,
    SliderLightboxComponent,
    SliderCustomImageComponent
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
    FontAwesomeModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
    DemoMaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientJsonpModule,
    NgImageSliderModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DatoAdicionalService, PlazoCreditoService, ImpuestoService, RetencionService,
              TransportistaService, UbicacionService, TipoContribuyenteService, VehiculoTransporteService,
              EmpresaService, EstablecimientoService, PuntoVentaService, UsuarioService,
              ClienteService, FacturaService, TabService, UsuariosService, DatabaseService, ProductosService,
              DataService, CartService, NgImageSliderService,
              {
                provide: LocationStrategy,
                useClass: PathLocationStrategy
              }],
  bootstrap: [AppComponent],
  entryComponents: [ClienteComponent, FacturaComponent]  
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
