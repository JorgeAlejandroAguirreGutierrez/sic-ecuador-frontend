import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  tabs = new Array<Tab>();
  tabs1 = new Array<Tab>();

  tabsGroup = new Array<any>();

  selectedTab: number;
  selectedTab1: number;

  selectedTabGroup: Array<number> = [];

  title: string = "Cliente";
  title1: string = "Cliente1";

  opciones = new Array<OpcionMenu>(); 

  constructor(private tabService: TabService) { }

  ngOnInit() {
    this.tabService.addNewTab1(MenuComponent,'MENU');
    //una vez que te suscribes al evento observable tabSub se sigue recibiendo los tabs1 del tab.Service
    //para desuscribirse se necesita un evento take   
    this.tabService.tabSub1.subscribe(tabs1 => {
      this.tabs1 = tabs1;
      //devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada
      this.selectedTab1 = tabs1.findIndex(tab1 => tab1.active);
    });
    //Se suscribe al tab Inferior
    this.tabService.tabSub.subscribe(tabs => {
      this.tabs = tabs;
      this.selectedTab = tabs.findIndex(tab => tab.active);
    });
    // Se subscribe al tabGroup
    this.tabService.tabsGroupSub.subscribe(tabsGroup => {
      this.tabsGroup = tabsGroup;
      for (let i = 0; i < this.tabs1.length-1; i++) {
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
  llenarOpciones(Componente: Type<any>, tabTitulo: string, opcionNombre: string){
    this.opciones.push(new OpcionMenu(Componente, tabTitulo, opcionNombre));
  }   

  menuOpciones(tabNombre: string){
    this.opciones = [];
    if (tabNombre == "CLIENTES") {
      // El componente, nombre del tab y la opción en el slidebar
      this.llenarOpciones(ClienteComponent,'Nuevo cliente','Crear cliente');
      this.llenarOpciones(ClienteMostrarComponent,'Buscar cliente','Buscar cliente');
      this.llenarOpciones(GrupoClienteComponent,'Crear Grupo Cliente','Crear Grupo Cliente');
      this.llenarOpciones(GrupoClienteMostrarComponent,'Mostrar Grupo Cliente','Mostrar Grupo Cliente');
      this.llenarOpciones(CategoriaClienteComponent,'Crear Categoria Cliente','Crear Categoria Cliente');
      this.llenarOpciones(CategoriaClienteMostrarComponent,'Mostrar Categoria Cliente','Mostrar Categoria Cliente');
      this.llenarOpciones(EstadoCivilComponent,'Crear Estado Civil','Crear Estado Civil');
      this.llenarOpciones(EstadoCivilMostrarComponent,'Mostrar Estado Civil','Mostrar Estado Civil');
      this.llenarOpciones(FormaPagoComponent,'Crear Forma de Pago','Crear Forma de Pago');
      this.llenarOpciones(FormaPagoMostrarComponent,'Mostrar Forma de Pago','Mostrar Forma de Pago');
      this.llenarOpciones(GeneroComponent,'Crear Genero','Crear Genero');
      this.llenarOpciones(GeneroMostrarComponent,'Mostrar Genero','Mostrar Genero');
      this.llenarOpciones(OrigenIngresoComponent,'Crear Origen de Ingreso','Crear Origen de Ingreso');
      this.llenarOpciones(OrigenIngresoMostrarComponent,'Mostrar Origen de Ingreso','Mostrar Origen de Ingreso');
      this.llenarOpciones(OrigenIngresoMostrarComponent,'Mostrar Origen de Ingreso','Mostrar Origen de Ingreso');
      this.llenarOpciones(PlazoCreditoComponent,'Crear Plazo de Credito','Crear Plazo de Credito');
      this.llenarOpciones(PlazoCreditoMostrarComponent,'Mostrar Plazo de Credito','Mostrar Plazo de Credito');
      this.llenarOpciones(MapsComponent,'Mapa Cliente','Mapa cliente');
    }

    if (tabNombre == "COMPRAS") {
      this.llenarOpciones(ProveedorComponent,'Nuevo proveedor','Crear Proveedor');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar proveedor','Buscar Proveedor');
      this.llenarOpciones(FacturaCompraComponent,'Registrar compra','Registrar Compra');
    }

    if (tabNombre == "VENTAS") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "INVENTARIOS") {
      this.llenarOpciones(ProductoComponent,'Crear Producto','Crear Producto');
      this.llenarOpciones(SaldoInicialInventarioComponent,'Crear Saldo Inicial','Crear Saldo Inicial');
      this.llenarOpciones(ProductoMostrarComponent,'Mostrar Productos','Mostrar Productos');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Producto','Buscar Producto');
      this.llenarOpciones(PromocionComponent,'Promociones','Promociones/Combos');
    }

    if (tabNombre == "CONTABILIDAD") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "FINANCIERO") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "ACTIVOS FIJOS") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "TALENTO HUMANO") {
      this.llenarOpciones(TransportistaComponent,'Crear Transportista','Crear Transportista');
    }

    if (tabNombre == "PRODUCCION") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "IMPORTACION") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "ESTADISTICAS") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "CONTROL") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "AUDITORIA") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "TUTORIALES") {
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
    }

    if (tabNombre == "CONFIGURACION") {
      this.llenarOpciones(UbicacionComponent,'Crear Ubicacion Cliente','Crear Ubicacion Cliente');
      this.llenarOpciones(UbicacionMostrarComponent,'Buscar Ubicacion Cliente','Buscar Ubicacion Cliente');
      this.llenarOpciones(ImportarComponent,'Importar', 'Importar');
      this.llenarOpciones(ExportarComponent,'Exportar', 'Exportar');
    }
  }  
}
