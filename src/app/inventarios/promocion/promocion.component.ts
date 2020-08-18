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
}

@Component({
  selector: 'componente-dialog',
  templateUrl: 'componente-dialog.html',
  styleUrls: ['./promocion.component.scss']
})
export class DialogComponente {}
