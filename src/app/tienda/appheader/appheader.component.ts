import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit {
  @Input() cantidadAgregados:Number;
  
  constructor() { }

  ngOnInit() {
  }
}
