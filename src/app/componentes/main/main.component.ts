import { Component, OnInit } from '@angular/core';
import { Type } from '@angular/core';
import { TabService } from "../services/tab.service";
import { Tab } from "../../modelos/tab.model";
import { MenuComponent } from '../menu/menu.component';
import { OpcionMenu } from "../../modelos/opcion-menu.model";
import { MapsComponent } from '../pages/maps/maps.component';
import { UbicacionComponent } from '../../configuraciones/ubicacion/ubicacion.component';
import { UbicacionMostrarComponent } from '../../configuraciones/ubicacion/ubicacion-mostrar/ubicacion-mostrar.component';
import { AdministracionComponent } from '../../configuraciones/administracion/administracion.component';
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
      this.llenarOpciones(UbicacionComponent,'Crear Ubicacion Cliente','Crear Ubicacion Cliente');
      this.llenarOpciones(UbicacionMostrarComponent,'Buscar Ubicacion Cliente','Buscar Ubicacion Cliente');
      this.llenarOpciones(GrupoClienteComponent,'Crear Grupo Cliente','Crear Grupo Cliente');
      this.llenarOpciones(TransportistaComponent,'Crear Transportista','Crear Transportista');
      this.llenarOpciones(MapsComponent,'Ubicacion Cliente','Ubicacion cliente');
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
      this.llenarOpciones(FacturaComponent,'Crear Factura','Crear Factura');
      this.llenarOpciones(FacturaMostrarComponent,'Buscar Factura','Buscar Factura');
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
      this.llenarOpciones(AdministracionComponent,'Importar/Exportar','Importar/Exportar');
    }
  }  
}
