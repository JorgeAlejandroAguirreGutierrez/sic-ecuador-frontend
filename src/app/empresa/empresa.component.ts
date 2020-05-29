import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../servicios/empresa.service';
import { Empresa } from '../modelos/empresa';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  empresa= new Empresa();
  empresas: Empresa[];
  p_empresa= new Empresa();

  constructor(private empresaService: EmpresaService, private modalService: NgbModal) { }

  ngOnInit() {
    this.empresaService.consultar().subscribe(
      res=>this.empresas=res.resultado as Empresa[]
    );
  }

  open(content: any, empresa: Empresa) {
    this.p_empresa=empresa;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result=="actualizar") {
        this.actualizar(this.p_empresa);
      }
      if (result=="eliminar") {
        this.eliminar(this.p_empresa);
      }
    }, (reason) => {
      
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  crear() {
    this.empresaService.crear(this.empresa).subscribe(
      res => {
        console.log(res);
        Swal.fire('Exito', res.mensaje, 'success');
        this.empresa=res.resultado as Empresa;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  actualizar(empresa: Empresa) {
    this.empresaService.actualizar(empresa).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.empresa=res.resultado as Empresa;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  eliminar(empresa: Empresa) {
    this.empresaService.eliminar(empresa).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.empresa=res.resultado as Empresa;
        this.ngOnInit();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  seleccion(empresa: Empresa) {
    
  }

}
