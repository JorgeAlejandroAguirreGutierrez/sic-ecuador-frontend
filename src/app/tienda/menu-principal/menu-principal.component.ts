import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  @Input() cantidadAgregados:Number;
  isCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}
