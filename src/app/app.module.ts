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

// Componentes de Angular Material
import { MaterialModule } from './componentes/material-module';

import { AppComponent } from './app.component';
import { ModeloService } from './servicios/modelo.service';

// Componentes generales para las pestañas
import { TabContentComponent } from "./componentes/tab-content.component";
import { ContentContainerDirective } from "./componentes/content-container.directive";
import { TabService } from "./componentes/services/tab.service";

// Diseño de tabla editable
import { TablaEditableComponent } from './componentes/tabla-editable/tabla-editable.component';
import { EditableComponent } from './componentes/tabla-editable/editable/editable.component';
import { ViewModeDirective } from './componentes/tabla-editable/editable/view-mode.directive';
import { EditModeDirective } from './componentes/tabla-editable/editable/edit-mode.directive';
import { FocusableDirective } from './componentes/tabla-editable/focusable.directive';
import { EditableOnEnterDirective } from './componentes/tabla-editable/editable/edit-on-enter.directive';

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
import { TablaEquivalenciaMedidaService } from './servicios/tabla-equivalencia-medida.service';
import { GrupoProductoService } from './servicios/grupo-producto.service';

// Importar las Rutas
import { AppRoutingModule } from './app-routing.module';
import { RoutingComponents } from './app-routing.module';

const routesTienda: Routes = [
  {path: 'tabla', component: TablaEditableComponent}, //retierar luego de las pruebas
  {path: 'tienda', component: TiendaComponent},
  {path: 'tienda/detalle-producto/:id', component: DetalleProductoComponent},
  {path: 'zoom', component: ZoomComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'slider', component: SliderComponent}, // Solo es de prueba
]

@NgModule({
  declarations: [
    AppComponent,
    TabContentComponent,
    ContentContainerDirective,
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
    ZoomComponent,
    ImageZoomComponent,
    SliderLightboxComponent,
    SliderCustomImageComponent,
    TablaEditableComponent,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective, 
    EditableOnEnterDirective, 
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientJsonpModule,
    NgImageSliderModule,
    MaterialModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(routesTienda, { relativeLinkResolution: 'legacy' })
  ],
  providers: [DatoAdicionalService, PlazoCreditoService, ImpuestoService, RetencionService, ModeloService,
              TransportistaService, UbicacionService, TipoContribuyenteService, VehiculoTransporteService,
              EmpresaService, EstablecimientoService, PuntoVentaService, UsuarioService, DatePipe,
              ClienteService, FacturaService, TabService, UsuariosService, DatabaseService, ProductosService,
              TablaEquivalenciaMedidaService, GrupoProductoService,
              DataService, CartService, NgImageSliderService,
              {
                provide: LocationStrategy,
                useClass: PathLocationStrategy
              }],
  bootstrap: [AppComponent],
  entryComponents: [ ]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
