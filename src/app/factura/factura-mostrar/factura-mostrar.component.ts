import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Factura} from '../../modelos/factura';
import { FacturaService } from '../../servicios/factura.service';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TabService } from "../../services/tab.service";
import { FacturaComponent } from '../factura.component';


@Component({
  selector: 'app-factura-mostrar',
  templateUrl: './factura-mostrar.component.html',
  styleUrls: ['./factura-mostrar.component.css']
})
export class FacturaMostrarComponent implements OnInit {

  collapsed = true;
  ComponenteFactura: Type<any> = FacturaComponent;

  sesion: Sesion;

  constructor(private facturaService: FacturaService, private tabService: TabService, 
    private sesionService: SesionService,private router: Router, private modalService: NgbModal) { }

  facturas: Factura[];
  factura: Factura;
  factura_buscar: Factura=new Factura();


  ngOnInit() {
    this.consultar();
    this.sesion= this.sesionService.getSesion();
  }

  cambiar_buscar_cliente_razon_social(){
    this.factura_buscar.numero="";
  }
  cambiar_buscar_numero(){
    this.factura_buscar.cliente.razon_social="";
  }

  consultar() {
    this.facturaService.consultar().subscribe(
      res => {
        this.facturas = res.resultado as Factura[]
      }
    );
  }

  buscar(event) {
    if (event!=null)
      event.preventDefault();
    if (this.factura_buscar.numero!="" && this.factura_buscar.cliente.razon_social=="") {
      this.facturaService.buscarNumero(this.factura_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.facturas = res.resultado as Factura[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
      );
    }
    else if (this.factura_buscar.cliente.razon_social!="" && this.factura_buscar.numero=="") {
      this.facturaService.buscarClienteRazonSocial(this.factura_buscar).subscribe(
        res => {
          if (res.resultado!=null) {
            this.facturas = res.resultado as Factura[]
          } else {
            Swal.fire('Error', res.mensaje, 'error');
          }
        }
      );
    } else{
      this.consultar();
    }
  }

  seleccion(factura: Factura) {
    this.factura=factura;
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.factura!= null){
      this.facturaService.enviar(this.factura.id);
      this.tabService.addNewTab(this.ComponenteFactura,'Actualizar Factura');
    } else {
      Swal.fire('Error', "Selecciona una Factura", 'error');
    }
  }

  eliminar(event) {
    if (event!=null)
      event.preventDefault();
    this.facturaService.eliminar(this.factura.id).subscribe(
      res => {
        if (res.resultado!=null){
          Swal.fire('Exito', res.mensaje, 'success');
          this.factura = res.resultado as Factura
          this.ngOnInit();
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }        
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

}
