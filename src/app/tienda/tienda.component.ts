import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, 
  Directive, AfterViewInit } from '@angular/core';
import { MenuItems } from './shared/menu-items/menu-items';
import { AppHeaderComponent } from './appheader/appheader.component';
import { AppSidebarComponent } from './appsidebar/appsidebar.component';
import { Product } from './shared/product.model';
import { DataService } from './service/data.service';
import { CartService } from './service/cart.service';
import { ProductosService } from './service/productos.service';

import { FiltersComponent } from './filters/filters.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

/** @title Responsive sidenav */
@Component({
  selector: 'app-tienda-online',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  productos:Product[];
  productosBuscados:Product[];
  productoAAgregar:Product;
  cantidadAgregados:number;

  private _mobileQueryListener: () => void;

  ngAfterViewInit() {}

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private dataService: DataService, private cartService: CartService, 
    private productosService:ProductosService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // Importado otro modulo
  products: Product[];

  mainFilter: any;

  currentSorting: string;

//  @ViewChild('filtersComponent')
  filtersComponent: FiltersComponent;

//  @ViewChild('searchComponent')
  searchComponent: SearchBarComponent;

  sortFilters: any[] = [
    { name: 'Nombre (A to Z)', value: 'name' },
    { name: 'Precio (low to high)', value: 'priceAsc' },
    { name: 'Precio (high to low)', value: 'priceDes' }
  ];

  customFilters: any[] = [
    { name: 'Todo', value: 'all', checked: true },
    { name: 'Disponible', value: 'available', checked: false },
    { name: 'No disponible', value: 'unavailable', checked: false },
    { name: 'Mejor vendido', value: 'bestseller', checked: false }
  ];

  priceFilters: any[] = [
    { name: 'Todo', value: 'all', checked: true },
    { name: 'Precio > 30.000', value: 'more_30000', checked: false },
    { name: 'Precio < 10.000', value: 'less_10000', checked: false }
  ];

  originalData: any = [];

  ngOnInit() {
    this.dataService.getData().then(data => {
      this.originalData = data;
      this.mainFilter = {
        search: '',
        categories: this.originalData.categories.slice(0),
        customFilter: this.customFilters[0],
        priceFilter: this.priceFilters[0]
      };

      // Make a deep copy of the original data to keep it immutable
      this.products = this.originalData.products.slice(0);
      this.sortProducts('name');

      // Car 2
      this.cantidadAgregados = this.productosService.getProductosAgregadosAlCarrito().length;
      this.productosService.getProductos().then(productos => {
        this.productos = productos as Product[];
        this.productosBuscados = productos as Product[];
      });
    });
  }

  onURLChange(url) {
    this.dataService.getRemoteData(url).subscribe(data => {
      this.originalData = data;
      this.mainFilter = {
        search: '',
        categories: this.originalData.categories.slice(0),
        customFilter: this.customFilters[0],
        priceFilter: this.priceFilters[0]
      };

      // Make a deep copy of the original data to keep it immutable
      this.products = this.originalData.products.slice(0);
      this.sortProducts('name');
      this.filtersComponent.reset(this.customFilters, this.priceFilters);
      this.searchComponent.reset();
      this.productosService.flushCart();
    });
  }



  onSearchChange(search) {
    this.mainFilter.search = search.search;
    this.updateProducts({
      type: 'search',
      change: search.change
    });
  }

  onFilterChange(data) {
    if (data.type === 'category') {
      if (data.isChecked) {
        this.mainFilter.categories.push(data.filter);
      } else {
        this.mainFilter.categories = this.mainFilter.categories.filter(
          category => {
            return category.categori_id !== data.filter.categori_id;
          });
      }
    } else if (data.type === 'custom') {
      this.mainFilter.customFilter = data.filter;
    } else if (data.type === 'price') {
      this.mainFilter.priceFilter = data.filter;
    }
    this.updateProducts({
      type: data.type,
      change: data.change
    });
  }

  updateProducts(filter) {
    let productsSource = this.originalData.products;
    const prevProducts = this.products;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1) || (filter.type === 'category' && filter.change === -1)) {
      productsSource = this.products;
      filterAllData = false;
    }
    // console.log('filtering ' + productsSource.length + ' products')

    this.products = productsSource.filter(product => {
      // Filter by search
      if (filterAllData || filter.type === 'search') {
        if (!product.name.match(new RegExp(this.mainFilter.search, 'i'))) {
          return false;
        }
      }
      // Filter by categories
      if (filterAllData || filter.type === 'category') {
        let passCategoryFilter = false;
        product.categories.forEach(product_category => {
          if (!passCategoryFilter) {
            passCategoryFilter = this.mainFilter.categories.reduce((found, category) => {
                return found || product_category === category.categori_id;
            }, false);
          }
        });
        if (!passCategoryFilter) {
          return false;
        }
      }

      // Filter by custom filters
      if (filterAllData || filter.type === 'custom') {
        let passCustomFilter = false;
        const customFilter = this.mainFilter.customFilter.value;
        if (customFilter === 'all') {
          passCustomFilter = true;
        } else if (customFilter === 'available' && product.available) {
          passCustomFilter = true;
        } else if (customFilter === 'unavailable' && !product.available) {
          passCustomFilter = true;
        } else if (customFilter === 'bestseller' && product.best_seller) {
          passCustomFilter = true;
        }
        if (!passCustomFilter) {
          return false;
        }
      }

      // Filter by price filters
      if (filterAllData || filter.type === 'price') {
        let passPriceFilter = false;
        const customFilter = this.mainFilter.priceFilter.value;
        const productPrice = parseFloat(product.price.replace(/\./g, '').replace(',', '.'));
        if (customFilter === 'all') {
          passPriceFilter = true;
        } else if (customFilter === 'more_30000' && productPrice > 30000) {
          passPriceFilter = true;
        } else if (customFilter === 'less_10000' && productPrice < 10000) {
          passPriceFilter = true;
        }
        if (!passPriceFilter) {
          return false;
        }
      }

      return true;
    });

    // If the number of products increased after the filter has been applied then sort again
    // If the number of products remained equal, there's a high chance that the items have been reordered.
    if (prevProducts.length <= this.products.length && this.products.length > 1) {
      this.sortProducts(this.currentSorting);
    }

    // These two types of filters usually add new data to the products showcase so a sort is necessary
    if (filter.type === 'custom' || filter.type === 'price') {
      this.sortProducts(this.currentSorting);
    }
  }
  
  sortProducts(criteria) {
    // console.log('sorting ' + this.products.length + ' products')
    this.products.sort((a, b) => {
      const priceComparison = parseFloat(a.price.replace(/\./g, '')
      .replace(',', '.')) - parseFloat(b.price.replace(/\./g, '').replace(',', '.'));
      if (criteria === 'priceDes') {
        return -priceComparison;
      } else if (criteria === 'priceAsc') {
        return  priceComparison;
      } else if (criteria === 'name') {
        const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else {
        // Keep the same order in case of any unexpected sort criteria
        return -1;
      }
    });
    this.currentSorting = criteria;
  }

  buscarProductos(val){
    this.productosBuscados = [];
    for (var index = 0; index < this.productos.length; index++) {
      var element = this.productos[index];
      if(element.name.includes(val)){
        this.productosBuscados.push(element);
      }
    }
  }

  agregarProductoAlCarrito(event){
    let productoRecibido = event.producto as Product;
    this.productoAAgregar = new Product();
    this.productoAAgregar.id = productoRecibido.id;
    this.productoAAgregar.name = productoRecibido.name;
    this.productoAAgregar.price = productoRecibido.price;
    this.productoAAgregar.img = productoRecibido.img;
    this.productoAAgregar.unidadesDisponibles = productoRecibido.unidadesDisponibles;
    this.productoAAgregar.cantidadAComprar = event.cantidad;
    this.productosService.agregarProductoAlCarrito(this.productoAAgregar);
    this.cantidadAgregados = this.productosService.getProductosAgregadosAlCarrito().length;
  }


}
