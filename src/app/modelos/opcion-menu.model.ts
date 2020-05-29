import { Type } from '@angular/core';

export class OpcionMenu {
  public id: number;
  public nombre: string;
  public tabTitulo: string;
  public active: boolean;
  public componente: Type<any>;

  constructor(componente: Type<any>, tabTitulo: string, nombre: string) {
    this.componente = componente;
    this.tabTitulo = tabTitulo;
    this.nombre = nombre;
  }
}

