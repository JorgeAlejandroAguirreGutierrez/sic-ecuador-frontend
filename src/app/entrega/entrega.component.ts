import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Cheque } from '../modelos/cheque';
import { FacturaService } from '../servicios/factura.service';
import { SesionService } from '../servicios/sesion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Factura } from '../modelos/factura';
import { Cliente } from '../modelos/cliente';
import { ClienteService } from '../servicios/cliente.service';
import Swal from 'sweetalert2';
import { FormaPago } from '../modelos/forma-pago';
import { EmpresaService } from '../servicios/empresa.service';
import { Ubicacion } from '../modelos/ubicacion';
import { UbicacionService } from '../servicios/ubicacion.service';
import { Telefono } from '../modelos/telefono';
import { Celular } from '../modelos/celular';
import { Correo } from '../modelos/correo';
import { Observable } from 'rxjs';
import { Banco } from '../modelos/banco';
import { TransportistaService } from '../servicios/transportista.service';
import { Transportista } from '../modelos/transportista';
import { VehiculoTransporte } from '../modelos/vehiculo-transporte';
import { VehiculoTransporteService } from '../servicios/vehiculo-transporte.service';
import { GuiaRemision } from '../modelos/guia-remision';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {

  @Input() factura: Factura;
  estado: string="";
  propio: string="";
  transportistas: Transportista[];
  vehiculos_transportes: VehiculoTransporte[];
  guia_remision: GuiaRemision=new GuiaRemision();

  

  constructor(private facturaService: FacturaService, private clienteService: ClienteService, 
    private sesionService: SesionService, private transportistaService: TransportistaService,
    private vehiculoTransporteService: VehiculoTransporteService, private modalService: NgbModal,
    private ubicacionService: UbicacionService, private empresaService: EmpresaService) { }

  cliente: Cliente;
  telefono = new Telefono();
  celular = new Celular();
  correo = new Correo();
  provincias: Ubicacion[];
  cantones: Ubicacion[];
  parroquias: Ubicacion[];
  filtro_identificacion_clientes: Observable<Cliente[]> = new Observable<Cliente[]>();
  filtro_razon_social_clientes: Observable<Cliente[]> = new Observable<Cliente[]>();

  cheque: Cheque = new Cheque();

  formas_pagos: FormaPago[]=[];
  clientes: Cliente[]=[];
  seleccion_razon_social_cliente = new FormControl();
  seleccion_identificacion_cliente = new FormControl();

  habilitar_seleccion_auxiliar=false;
  seleccion_auxiliar=false;


  date = new FormControl(new Date());
  formasPago = new FormControl();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // Variables para ingreso de cheques
  habilitar_cheques: boolean = false;
  cheques: Cheque[] = [
    {id: 1, tipo: '5', fecha: new Date(), fecha_efectivizacion: new Date(), numero:'1.25', banco: new Banco(), valor: 1.79},
    {id: 2, tipo: '10', fecha: new Date(), fecha_efectivizacion: new Date(), numero:'2.34', banco: new Banco(), valor: 3.02},
    {id: 3, tipo: '23', fecha: new Date(), fecha_efectivizacion: new Date(), numero:'7.34', banco: new Banco(), valor: 33.02},
  ];
  tipoCheque: string = "";
  fechaCheque: Date = new Date();
  numeroCheque: string = "";
  bancoCheque: string = "";
  valorCheque: number = 0;
  columnasCheques: string[] = ['select', 'id', 'fecha', 'tipo', 'numero', 'banco', 'valor'];
  dataSourceCheques = new MatTableDataSource<Cheque>(this.cheques);
  tabla1: MatTable<Cheque>;

  selection = new SelectionModel<Cheque>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceCheques.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceCheques.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cheque): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
    this.consultar_transportistas();
    this.consultar_vehiculos_transportes();
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

  contruir_cliente() {
    if (this.cliente.id!= undefined) {
      if (this.cliente.direccion.ubicacion!= null) {
        this.provincia(this.cliente.direccion.ubicacion.provincia);
        this.canton(this.cliente.direccion.ubicacion.canton);
      }
      this.cliente.construir();
    }
  }

  consultar_clientes() {
    this.clienteService.consultar().subscribe(
     res => {
       this.clientes = res.resultado as Cliente[]
     },
     err => Swal.fire('Error', err.error.mensaje, 'error')
   );
  }

  borrarCheque(cod: number) {
    if (confirm("Realmente quiere eliminar el cheque?")) {
      this.cheques.splice(cod, 1);
      this.dataSourceCheques = new MatTableDataSource<Cheque>(this.cheques);
      this.dataSourceCheques.sort = this.sort;
      this.dataSourceCheques.paginator = this.paginator;
    }
  }

  agregarCheque() {
    let cheque=new Cheque();
    this.cheques.push(cheque);
    this.dataSourceCheques = new MatTableDataSource<Cheque>(this.cheques);
    this.dataSourceCheques.sort = this.sort;
    this.dataSourceCheques.paginator = this.paginator;
  }

  totalCheques() {
    return this.cheques.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }

  crear(event) {

  }

  crear_deposito() {

  }

  crear_retencion() {

  }

  crear_tabla() {

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
    let digito=this.telefono.numero.substr(0,1);
    if (this.telefono.numero.length!=11 || digito!="0") {
      this.telefono.numero="";
      Swal.fire('Error', "Telefono Invalido", 'error');
    }
  }

  validar_celular() {
    let digito=this.celular.numero.substr(0,2);
    if (this.celular.numero.length!=12 || digito!="09") {
      this.celular.numero="";
      Swal.fire('Error', "Celular Invalido", 'error');
    }
  }

  validar_correo() {
    let arroba=this.correo.email.includes("@");
    if (!arroba) {
      this.correo.email="";
      Swal.fire('Error', "Correo Invalido", 'error');
    }
  }
  validar_correo_auxiliar() {
    let arroba=this.correo.email.includes("@");
    if (!arroba) {
      this.correo.email="";
      Swal.fire('Error', "Correo Invalido", 'error');
    }
  }
  ver_identificacion_cliente(){}
  ver_razon_social_cliente(){}
  seleccionar_cliente(){}
  asignar_auxiliar(modal: any){}
  open(content: any, event) {
    if (event!=null)
      event.preventDefault();
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {

    });
  }
  crear_telefono() {}
  crear_celular() {}
  crear_correo() {}
  despachar(){}
  eliminar_telefono_auxiliar(i: number, j: number){}
  eliminar_celular(i: number, j: number){}
  eliminar_correo(i: number, j: number){}


}
