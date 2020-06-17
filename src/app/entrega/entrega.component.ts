import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { FacturaService } from '../servicios/factura.service';
import { SesionService } from '../servicios/sesion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Factura } from '../modelos/factura';
import Swal from 'sweetalert2';
import { EmpresaService } from '../servicios/empresa.service';
import { Ubicacion } from '../modelos/ubicacion';
import { UbicacionService } from '../servicios/ubicacion.service';
import { TransportistaService } from '../servicios/transportista.service';
import { Transportista } from '../modelos/transportista';
import { VehiculoTransporte } from '../modelos/vehiculo-transporte';
import { VehiculoTransporteService } from '../servicios/vehiculo-transporte.service';
import { GuiaRemision } from '../modelos/guia-remision';
import { FacturaDetalle } from '../modelos/factura-detalle';
import { Direccion } from '../modelos/direccion';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {

  @Input() factura: Factura;
  estado: string="";
  propio: string="";
  transportistas: Transportista[];
  vehiculos_transportes: VehiculoTransporte[];
  guia_remision: GuiaRemision=new GuiaRemision();
  provincias: Ubicacion[];
  cantones: Ubicacion[];
  parroquias: Ubicacion[];
  bandera_opcion: boolean=false;

  constructor(private facturaService: FacturaService, private transportistaService: TransportistaService,
    private vehiculoTransporteService: VehiculoTransporteService, private modalService: NgbModal,
    private ubicacionService: UbicacionService, private empresaService: EmpresaService) { }

  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // Variables para ingreso de cheques
  columnas_factura_detalles: string[] = ['select', 'id', 'producto', 'cantidad', 'P/U', 'IVA', 'total'];
  data_factura_detalles: MatTableDataSource<FacturaDetalle>;

  selection = new SelectionModel<FacturaDetalle>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numero_seleccionado = this.selection.selected.length;
    const numero_filas = this.data_factura_detalles.data.length;
    return numero_seleccionado === numero_filas;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.data_factura_detalles.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FacturaDetalle): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnInit() {
    this.consultar_transportistas();
    this.consultar_vehiculos_transportes();
    this.consultar_ubicaciones();
    this.data_factura_detalles=new MatTableDataSource<FacturaDetalle>(this.factura.factura_detalles);
  }
  consultar_ubicaciones(){
    this.ubicacionService.obtenerProvincias().subscribe(
      res => {
        this.provincias = res.resultado as Ubicacion[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }

  consultar_transportistas(){
    this.transportistaService.consultar().subscribe(
      res => {
        this.transportistas = res.resultado as Transportista[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }
  consultar_vehiculos_transportes(){
    this.vehiculoTransporteService.consultar().subscribe(
      res => {
        this.vehiculos_transportes = res.resultado as VehiculoTransporte[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  total_factura() {
    return this.factura.factura_detalles.map(t => t.subtotal_con_descuento).reduce((acc, value) => acc + value, 0);
  }

  crear(event) {

  }

  provincia(provincia: string) {
    this.ubicacionService.obtenerCantones(provincia).subscribe(
      res => {
        if (res.resultado!= null) {
          this.cantones = res.resultado as Ubicacion[];
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }
      }
    );
  }

  canton(canton: string) {
    this.ubicacionService.obtenerParroquias(canton).subscribe(
      res => {
        if (res.resultado!= null) {
          this.parroquias = res.resultado as Ubicacion[];
        } else {
          Swal.fire('Error', res.mensaje, 'error');
        }
      }
    );
  }

  validar_telefono() {
    let digito=this.guia_remision.telefono.numero.substr(0,1);
    if (this.guia_remision.telefono.numero.length!=11 || digito!="0") {
      this.guia_remision.telefono.numero="";
      Swal.fire('Error', "Telefono Invalido", 'error');
    }
  }

  validar_celular() {
    let digito=this.guia_remision.celular.numero.substr(0,2);
    if (this.guia_remision.celular.numero.length!=12 || digito!="09") {
      this.guia_remision.celular.numero="";
      Swal.fire('Error', "Celular Invalido", 'error');
    }
  }

  validar_correo() {
    let arroba=this.guia_remision.correo.email.includes("@");
    if (!arroba) {
      this.guia_remision.correo.email="";
      Swal.fire('Error', "Correo Invalido", 'error');
    }
  }

  open(content: any, event) {
    if (event!=null)
      event.preventDefault();
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {

    });
  }

  seleccionar_opcion(event){
    if (event.value=="0"){
      this.bandera_opcion=false;
      this.guia_remision.direccion={... this.factura.cliente.direccion};
    } else {
      this.bandera_opcion=true;
      this.guia_remision.direccion=new Direccion();
    }
  }

  nuevo(event){

  }

  despachar(){

  }
}
