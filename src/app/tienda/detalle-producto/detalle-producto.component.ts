import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../service/productos.service';
import { Product } from '../shared/product.model';
import { NgImageSliderModule, NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {
  producto:Product=new Product(); 
  cantidadAgregados:number;

  selectedImage: any;

  @ViewChild('nav') ds: NgImageSliderComponent;
  title = 'Ng Image Slider';
  showSlider = true;

//var zoom
  enabled: boolean;
  zoom: number;
  ratio: number;
  type: string;
  shape: string;
  cursor: string;
  cursorgap: number;
  mouseout: string;

  //var lightbox
  ligthboxShow: boolean = false;
  activeImageIndex: number = 0;
  visiableImageIndex: number = 0;

  infinite: boolean = true;
  speed: number = 1; // default speed in second
  textDirection: string = 'ltr';

  imageObject: any = [];
  arrowKeyMove: boolean = true;

  constructor(private location: Location, 
              private route: ActivatedRoute,
              private productosService: ProductosService) { this.setImageObject();}

  ngOnInit() {
    this.cantidadAgregados = this.productosService.getProductosAgregadosAlCarrito().length;
    this.route.params.subscribe(params => {
      if(params['id'] != null){
          this.consultarProductoPorId(Number.parseInt(params['id']));
      }
    });
    //Lightbox
    this.selectedImage = this.imageObject[0].image;
    //zoom
    this.enabled = true;
    this.zoom = 2.5;
    this.ratio = 300;
    this.type = 'center';
    this.shape = 'square';
    this.cursor = 'zoom-in';
    this.cursorgap = 10 ;
    this.mouseout = 'hidden';
  }

  agrandarImagen(image: String, index: number){
    this.selectedImage = image;
    this.activeImageIndex = index;
    console.log(this.activeImageIndex);
  }

  consultarProductoPorId(id:Number):void{
    this.productosService.getProductosById(id)
    .then(productoReturn => this.producto = productoReturn as Product);
  }
  goBack(): void {
      this.location.back();
  }

  zoomLoaded(target): void {
    console.log(target);
  }

  zoomError(error): void {
    console.error(error);
  }

  //Lightbox
  setImageObject() {
    this.imageObject = [{
        image: 'assets/images/tienda/aguacate.jpg',
        thumbImage: 'assets/images/tienda/aguacate.jpg',
        alt: 'imagen uno',
        title: 'Aguacate'
    }, {
        image: 'assets/images/tienda/ajo.jpg',
        thumbImage: 'assets/images/tienda/ajo.jpg',
        alt: 'imagen 2',
        title: 'Ajo'
    }, {
        image: 'assets/images/tienda/cebolla.jpg',
        thumbImage: 'assets/images/tienda/cebolla.jpg',
        alt: 'alt of imagen tres',
        title: 'Cebolla'
    }, {
        image: 'assets/images/tienda/fresa.jpg',
        thumbImage: 'assets/images/tienda/fresa.jpg',
        alt: 'imagen 4',
        title: 'Fresa'
    }, {
        image: 'assets/images/tienda/kiwi.jpg',
        thumbImage: 'assets/images/tienda/kiwi.jpg',
        alt: 'imagen 5',
        title: 'Kiwi'
    }, {
        image: 'assets/images/tienda/limon.jpg',
        thumbImage: 'assets/images/tienda/limon.jpg',
        alt: 'alt of imagen 6',
        title: 'Limon'
    }];
}

imageOnClick(index) {
    console.log('index', index);
    this.ligthboxShow = true;
    //this.sliderAnimationSpeed = 1;
}

lightboxClose() {
    console.log('lightbox close');
    this.ligthboxShow = false;
}

arrowOnClick(event) {
    console.log('arrow click event', event);
}

lightboxArrowClick(event) {
    console.log('popup arrow click', event);
}

prevImageClick() {
    this.ds.prev();
}

nextImageClick() {
    this.ds.next();
}
lightboxArrowClickHandler($event){

}


//for lightbox

}
