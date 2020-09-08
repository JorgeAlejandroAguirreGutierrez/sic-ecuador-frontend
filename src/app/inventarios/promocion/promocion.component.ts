import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.scss']
})
export class PromocionComponent implements OnInit {

  panelOpenState = false;
  habilitar_componente = false;

  auxiliar_provincias: any[]=[];
  auxiliar_parroquias: any[]=[];
  grupos_clientes: any[]=[];

  constructor(private modalService: NgbModal, public dialog: MatDialog) { }

  ngOnInit() {

  }

  open(content: any, event) {
    if (event!=null)
      event.preventDefault();
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {

    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponente);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

  crear(event){
    if (event!=null)
      event.preventDefault();
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
  }

  seleccionar_auxiliar_provincia(valor: any){

  }

  seleccionar_auxiliar_parroquia(valor: any){

  }

  validar_identificacion(){

  }

  agregar_factura_detalle(){

  }

  guardar(){

  }
}

@Component({
  selector: 'componente-dialog',
  templateUrl: 'componente-dialog.html',
  styleUrls: ['./promocion.component.scss']
})
export class DialogComponente {
  auxiliar_provincias: any[]=[];
  auxiliar_parroquias: any[]=[];

  validar_identificacion(){

  }

  agregar_factura_detalle(){

  }
  seleccionar_auxiliar_provincia(valor: any){

  }
  seleccionar_auxiliar_parroquia(valor: any){
    
  }
}
