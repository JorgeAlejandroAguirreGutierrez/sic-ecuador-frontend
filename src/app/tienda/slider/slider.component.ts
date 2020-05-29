import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  title = 'owl-carousel';

  peliculas: any[] = [
    {
      name: 'Frozen 2',
      img: '../../assets/images/frozen.jpg',
      desc: 'Elsa, Anna, Kristoff y Olaf se adentran en el bosque para conocer la verdad sobre un antiguo misterio de su reino.'
    },
    {
      name: 'The Irishman',
      img: '../../assets/images/irishman.jpg',
      desc: 'Pennsylvania, 1956. Frank Sheeran, a war veteran of Irish origin who works as a truck driver.'
    },
    {
      name: 'Ajo',
      img: '../../assets/img/ajo.jpg',
      desc: 'El ajo es muy bueno para combatir el coronavirus.'
    },
    {
      name: 'Canela',
      img: '../../assets/img/canela.jpg',
      desc: 'El secreto de la cura de la gripe.'
    },
    {
      name: 'Brocoli',
      img: '../../assets/img/brocoli.png',
      desc: 'Tu cuerpo necesita verduras.'
    },
    {
      name: 'Kiwi',
      img: '../../assets/img/kiwi.jpg',
      desc: 'Es una fruta afrodisiaca.'
    }
  ];

  constructor(private config: NgbCarouselConfig) {
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.wrap = true; //para recorrer
  }

  ngOnInit() {
  }


  mySlideImages = ['../../assets/images/image1.jpg', '../../assets/images/image2.jpeg', '../../assets/images/image3.jpg'];
  myCarouselImages = ['../../assets/images/image1.jpg', '../../assets/images/image2.jpeg', '../../assets/images/image3.jpg'];

  mySlideOptions = { items: 1, dots: true, nav: true };
  myCarouselOptions = { items: 3, dots: true, nav: true };



}
