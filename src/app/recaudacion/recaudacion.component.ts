import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Recaudacion } from '../modelos/recaudacion';
import { Cheque } from '../modelos/cheque';
import { Deposito } from '../modelos/deposito';
import { TarjetaCredito } from '../modelos/tarjeta-credito';
import { TarjetaDebito } from '../modelos/tarjeta-debito';
import { Compensacion } from '../modelos/compensacion';
import { FacturaService } from '../servicios/factura.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Factura } from '../modelos/factura';
import { Banco } from '../modelos/banco';
import { Observable, Subscription } from 'rxjs';
import { Cliente } from '../modelos/cliente';
import { startWith, map } from 'rxjs/operators';
import { ClienteService } from '../servicios/cliente.service';
import Swal from 'sweetalert2';
import { BancoService } from '../servicios/banco.service';
import { FormaPagoService } from '../servicios/forma-pago.service';
import { FormaPago } from '../modelos/forma-pago';
import { PlazoCreditoService } from '../servicios/plazo-credito.service';
import { PlazoCredito } from '../modelos/plazo-credito';
import { CuentaPropia } from '../modelos/cuenta-propia';
import { CuentaPropiaService } from '../servicios/cuenta-propia.service';
import { Transferencia } from '../modelos/transferencia';
import { FranquiciaTarjeta } from '../modelos/franquicia-tarjeta';
import { FranquiciaTarjetaService } from '../servicios/franquicia-tarjeta.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../modelos/format-date-picker';
import { OperadorTarjeta } from '../modelos/operador-tarjeta';
import { Comprobante } from '../modelos/comprobante';

@Component({
  selector: 'app-recaudacion',
  templateUrl: './recaudacion.component.html',
  styleUrls: ['./recaudacion.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})

export class RecaudacionComponent implements OnInit {

  constructor(private facturaService: FacturaService, private clienteService: ClienteService, private bancoService: BancoService,
    private plazoCreditoService: PlazoCreditoService, private cuentaPropiaService: CuentaPropiaService, 
    private franquiciaTarjetaService: FranquiciaTarjetaService, private formaPagoService: FormaPagoService, private modalService: NgbModal) { }

  @Input() factura: Factura;
  recaudacion: Recaudacion = new Recaudacion();
  cheque: Cheque=new Cheque();
  deposito: Deposito=new Deposito();
  transferencia: Transferencia=new Transferencia();
  tarjeta_debito: TarjetaDebito=new TarjetaDebito();
  tarjeta_credito: TarjetaCredito=new TarjetaCredito();
  compensacion: Compensacion=new Compensacion();
  compensaciones: Compensacion[]=[];
  plazos_creditos: PlazoCredito[];
  formas_pagos: FormaPago[]=[];
  comprobantes: Comprobante[]=[];
  clientes: Cliente[]=[];
  cuentas_propias: CuentaPropia[]=[];
  franquicias_tarjetas: FranquiciaTarjeta[];
  operadores_tarjetas: OperadorTarjeta[]=[];


  seleccion_razon_social_cliente = new FormControl();
  filtro_razon_social_clientes: Observable<Cliente[]> = new Observable<Cliente[]>();
  bancos_cheques: Banco[]=[];
  seleccion_banco_cheque = new FormControl();
  filtro_bancos_cheques: Observable<Banco[]> = new Observable<Banco[]>();
  bancos_depositos: Banco[];
  seleccion_banco_deposito = new FormControl();
  filtro_bancos_depositos: Observable<Banco[]> = new Observable<Banco[]>();
  bancos_transferencias: Banco[];
  seleccion_banco_transferencia = new FormControl();
  filtro_bancos_transferencias: Observable<Banco[]> = new Observable<Banco[]>();
  bancos_tarjetas_creditos: Banco[];
  seleccion_banco_tarjeta_credito = new FormControl();
  filtro_bancos_tarjetas_creditos: Observable<Banco[]> = new Observable<Banco[]>();
  bancos_tarjetas_debitos: Banco[];
  seleccion_banco_tarjeta_debito = new FormControl();
  filtro_bancos_tarjetas_debitos: Observable<Banco[]> = new Observable<Banco[]>();
  formasPago = new FormControl();
  formasPagoLista: string[] = ['CHEQUES', 'DEPOSITOS', 'TRANSFERENCIAS', 'TARJETA DE CREDITO', 'TARJETA DE DEBITO', 'COMPENSACIONES'];
  formasPagoSelecionadas;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  habilitar_cheques: boolean = false;
  columnasCheques: string[] = ['id', 'fecha', 'tipo', 'numero', 'banco', 'valor', 'acciones'];
  data_cheques = new MatTableDataSource<Cheque>(this.recaudacion.cheques);

  habilitar_depositos: boolean = false;
  columnasDepositos: string[] = ['id', 'fecha', 'cuenta', 'banco', 'comprobante', 'valor', 'acciones'];
  data_depositos = new MatTableDataSource<Deposito>(this.recaudacion.depositos);

  // Variables para transferencias
  habilitar_transferencias: boolean = false;
  columnasTransferencias: string[] = ['id', 'fecha', 'cuenta', 'banco', 'comprobante', 'valor', 'acciones'];
  data_transferencias = new MatTableDataSource<Transferencia>(this.recaudacion.transferencias);

  // Variables para Tarjetas de crédito
  habilitar_tarjetas_creditos: boolean = false;
  columnasTarjetasCredito: string[] = ['id', 'franquicia', 'banco', 'identificacion', 'nombre', 'titular', 'diferido', 'operador', 'lote', 'valor', 'acciones'];
  data_tarjetas_creditos = new MatTableDataSource<TarjetaCredito>(this.recaudacion.tarjetas_creditos);

  // Variables para Tarjetas de débito
  habilitar_tarjetas_debitos: boolean = false;
  columnasTarjetasDebito: string[] = ['id', 'franquicia', 'banco', 'identificacion', 'nombre', 'operador', 'lote', 'valor', 'acciones'];
  data_tarjetas_debitos= new MatTableDataSource<TarjetaDebito>(this.recaudacion.tarjetas_debitos);

  // Variables para Compensaciones
  habilitar_compensaciones: boolean = false;
  columnasCompensaciones: string[] = ['id', 'tipo', 'comprobante', 'fecha', 'origen', 'motivo', 'fechaVencimiento', 'valorInicial', 'valorCompensado', 'acciones'];
  data_compensaciones = new MatTableDataSource<Compensacion>(this.recaudacion.compensaciones);

  ngOnInit() {
    this.defecto_recaudacion();
    this.consultar_cuentas_propias();
    this.consultar_franquicias_tarjetas();
    this.consultar_plazos_creditos();
    this.consultar_bancos_cheques();
    this.consultar_bancos_depositos();
    this.consultar_bancos_transferencias();
    this.consultar_bancos_tarjetas_creditos();
    this.consultar_bancos_tarjetas_debitos();
    
    this.filtro_razon_social_clientes = this.seleccion_razon_social_cliente.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(razon_social => typeof razon_social === 'string' ? this.filtro_razon_social_cliente(razon_social) : this.clientes.slice())
      );
    this.filtro_bancos_cheques = this.seleccion_banco_cheque.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(banco => typeof banco === 'string' ? this.filtro_banco_cheque(banco) : this.bancos_cheques.slice())
      );
    this.filtro_bancos_depositos = this.seleccion_banco_deposito.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(banco_deposito => typeof banco_deposito === 'string' ? this.filtro_banco_deposito(banco_deposito) : this.bancos_depositos.slice())
      );
    this.filtro_bancos_transferencias = this.seleccion_banco_transferencia.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(banco_transferencia => typeof banco_transferencia === 'string' ? this.filtro_banco_transferencia(banco_transferencia) : this.bancos_transferencias.slice())
      );
    this.filtro_bancos_tarjetas_creditos = this.seleccion_banco_tarjeta_credito.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(banco_tarjeta_credito => typeof banco_tarjeta_credito === 'string' ? this.filtro_banco_tarjeta_credito(banco_tarjeta_credito) : this.bancos_tarjetas_creditos.slice())
      );
    this.filtro_bancos_tarjetas_debitos = this.seleccion_banco_tarjeta_debito.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(banco_tarjeta_debito => typeof banco_tarjeta_debito === 'string' ? this.filtro_banco_tarjeta_debito(banco_tarjeta_debito) : this.bancos_tarjetas_debitos.slice())
      );
  }

  defecto_recaudacion(){
    this.recaudacion.efectivo=this.factura.total_con_descuento;
  }
  consultar_cuentas_propias(){
    this.cuentaPropiaService.consultar().subscribe(
      res => {
        this.cuentas_propias = res.resultado as CuentaPropia[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }
  consultar_franquicias_tarjetas(){
    this.franquiciaTarjetaService.consultar().subscribe(
      res => {
        this.franquicias_tarjetas = res.resultado as FranquiciaTarjeta[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }
  consultar_plazos_creditos(){
    this.plazoCreditoService.consultar().subscribe(
      res => {
        this.plazos_creditos = res.resultado as PlazoCredito[]
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }
  consultar_clientes() {
    this.clienteService.consultar().subscribe(
     res => {
       this.clientes = res.resultado as Cliente[]
     },
     err => Swal.fire('Error', err.error.mensaje, 'error')
   );
  }
  consultar_bancos_cheques() {
    this.bancoService.consultar().subscribe(
    res => {
      this.bancos_cheques = res.resultado as Banco[]
    },
    err => Swal.fire('Error', err.error.mensaje, 'error'));
  }
  consultar_bancos_depositos() {
    this.bancoService.consultar().subscribe(
    res => {
      this.bancos_depositos = res.resultado as Banco[]
    },
    err => Swal.fire('Error', err.error.mensaje, 'error'));
  }  
  consultar_bancos_transferencias() {
    this.bancoService.consultar().subscribe(
    res => {
      this.bancos_transferencias = res.resultado as Banco[]
    },
    err => Swal.fire('Error', err.error.mensaje, 'error'));
  } 
  consultar_bancos_tarjetas_creditos() {
    this.bancoService.consultar().subscribe(
    res => {
      this.bancos_tarjetas_creditos = res.resultado as Banco[]
    },
    err => Swal.fire('Error', err.error.mensaje, 'error'));
  }
  consultar_bancos_tarjetas_debitos() {
    this.bancoService.consultar().subscribe(
    res => {
      this.bancos_tarjetas_debitos = res.resultado as Banco[]
    },
    err => Swal.fire('Error', err.error.mensaje, 'error'));
  }
  consultar_formas_pagos() {
    this.formaPagoService.consultar().subscribe(
    res => {
      this.formas_pagos = res.resultado as FormaPago[]
    },
    err => Swal.fire('Error', err.error.mensaje, 'error'));
  }  

  private filtro_razon_social_cliente(value: string): Cliente[] {
    if(this.clientes.length>0) {
      const filterValue = value.toLowerCase();
      return this.clientes.filter(cliente => cliente.razon_social.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_razon_social_cliente(cliente: Cliente): string {
    return cliente && cliente.razon_social ? cliente.razon_social : '';
  }
  private filtro_banco_cheque(value: string): Banco[] {
    if(this.bancos_cheques.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_cheques.filter(banco => banco.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_cheque(banco: Banco): string {
    return banco && banco.nombre ? banco.nombre : '';
  }

  private filtro_banco_deposito(value: string): Banco[] {
    if(this.bancos_depositos.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_depositos.filter(banco_deposito => banco_deposito.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_deposito(banco_deposito: Banco): string {
    return banco_deposito && banco_deposito.nombre ? banco_deposito.nombre : '';
  }
  private filtro_banco_transferencia(value: string): Banco[] {
    if(this.bancos_transferencias.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_transferencias.filter(banco_transferencia => banco_transferencia.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_transferencia(banco_transferencia: Banco): string {
    return banco_transferencia && banco_transferencia.nombre ? banco_transferencia.nombre : '';
  }

  private filtro_banco_tarjeta_credito(value: string): Banco[] {
    if(this.bancos_tarjetas_creditos.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_tarjetas_creditos.filter(banco_tarjeta_credito => banco_tarjeta_credito.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_tarjeta_credito(banco_transferencia: Banco): string {
    return banco_transferencia && banco_transferencia.nombre ? banco_transferencia.nombre : '';
  }

  private filtro_banco_tarjeta_debito(value: string): Banco[] {
    if(this.bancos_tarjetas_debitos.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_tarjetas_debitos.filter(banco_tarjeta_debito => banco_tarjeta_debito.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_tarjeta_debito(banco_tarjeta_debito: Banco): string {
    return banco_tarjeta_debito && banco_tarjeta_debito.nombre ? banco_tarjeta_debito.nombre : '';
  }
  seleccionar_cliente(){

  }
  seleccionar_banco_cheque(){

  }
  seleccionar_banco_deposito(){

  }
  seleccionar_banco_transferencia(){

  }
  seleccionar_banco_tarjeta_credito(){

  }
  seleccionar_banco_tarjeta_debito(){

  }

  habilitar_seccion_pago(formaPago: string){
    if (formaPago == 'CHEQUES'){
      this.habilitar_cheques = !this.habilitar_cheques;
    }
    if (formaPago == 'DEPOSITOS'){
      this.habilitar_depositos = !this.habilitar_depositos;
    }
    if (formaPago == 'TRANSFERENCIAS'){
      this.habilitar_transferencias = !this.habilitar_transferencias;
    }
    if (formaPago == 'TARJETA DE CREDITO'){
      this.habilitar_tarjetas_creditos = !this.habilitar_tarjetas_creditos;
    }
    if (formaPago == 'TARJETA DE DEBITO'){
      this.habilitar_tarjetas_debitos = !this.habilitar_tarjetas_debitos;
    }
    if (formaPago == 'COMPENSACIONES'){
      this.habilitar_compensaciones = !this.habilitar_compensaciones;
    }
  }

  borrar_cheque(cod: number) {
    if (confirm("Realmente quiere eliminar el cheque?")) {
      this.recaudacion.cheques.splice(cod, 1);
      this.data_cheques = new MatTableDataSource<Cheque>(this.recaudacion.cheques);
      this.data_cheques.sort = this.sort;
      this.data_cheques.paginator = this.paginator;
    }
  }

  agregar_cheque() {
    this.cheque.banco=this.seleccion_banco_cheque.value;
    this.recaudacion.cheques.push(this.cheque);
    this.cheque=new Cheque();
    this.seleccion_banco_cheque.patchValue("");
    this.data_cheques = new MatTableDataSource<Cheque>(this.recaudacion.cheques);
    this.data_cheques.sort = this.sort;
    this.data_cheques.paginator = this.paginator;
  }

  total_cheques() {
    return this.recaudacion.cheques.map(t => Number(t.valor)).reduce((acc, value) => acc + value, 0);
  }

  borrar_deposito(i: number) {
    if (confirm("Realmente quiere eliminar el deposito?")) {
      this.recaudacion.depositos.splice(i, 1);
      this.data_depositos = new MatTableDataSource<Deposito>(this.recaudacion.depositos);
      this.data_depositos.sort = this.sort;
      this.data_depositos.paginator = this.paginator;
    }
  }

  agregar_deposito() {
    this.deposito.banco=this.seleccion_banco_deposito.value;
    this.recaudacion.depositos.push(this.deposito);
    this.deposito=new Deposito();
    this.seleccion_banco_deposito.patchValue("");
    this.data_depositos = new MatTableDataSource<Deposito>(this.recaudacion.depositos);
    this.data_depositos.sort = this.sort;
    this.data_depositos.paginator = this.paginator;
  }

  total_depositos() {
    return this.recaudacion.depositos.map(t => Number(t.valor)).reduce((acc, value) => acc + value, 0);
  }

  borrar_transferencia(cod: number) {
    if (confirm("Realmente quiere eliminar la transferencia?")) {
      this.recaudacion.transferencias.splice(cod, 1);
      this.data_transferencias = new MatTableDataSource<Transferencia>(this.recaudacion.transferencias);
      this.data_transferencias.sort = this.sort;
      this.data_transferencias.paginator = this.paginator;
    }
  }

  agregar_transferencia() {
    this.transferencia.banco=this.seleccion_banco_transferencia.value;
    this.recaudacion.transferencias.push(this.transferencia);
    this.transferencia=new Transferencia();
    this.seleccion_banco_transferencia.patchValue("");
    this.data_transferencias = new MatTableDataSource<Transferencia>(this.recaudacion.transferencias);
    this.data_transferencias.sort = this.sort;
    this.data_transferencias.paginator = this.paginator;
  }

  total_transferencias() {
    return this.recaudacion.transferencias.map(t => Number(t.valor)).reduce((acc, value) => acc + value, 0);
  }

  borrar_tarjeta_credito(cod: number) {
    if (confirm("Realmente quiere eliminar la tarjeta de crédito?")) {
      this.recaudacion.tarjetas_creditos.splice(cod, 1);
      this.data_tarjetas_creditos = new MatTableDataSource<TarjetaCredito>(this.recaudacion.tarjetas_creditos);
      this.data_tarjetas_creditos.sort = this.sort;
      this.data_tarjetas_creditos.paginator = this.paginator;
    }
  }

  agregar_tarjeta_credito() {
    this.recaudacion.tarjetas_creditos.push(this.tarjeta_credito);
    this.tarjeta_credito=new TarjetaCredito();
    this.seleccion_banco_tarjeta_credito.patchValue("");
    this.data_tarjetas_creditos = new MatTableDataSource<TarjetaCredito>(this.recaudacion.tarjetas_creditos);
    this.data_tarjetas_creditos.sort = this.sort;
    this.data_tarjetas_creditos.paginator = this.paginator;
  }

  total_tarjetas_creditos() {
    return this.recaudacion.tarjetas_creditos.map(t => Number(t.valor)).reduce((acc, value) => acc + value, 0);
  }

  borrar_tarjeta_debito(cod: number) {
    if (confirm("Realmente quiere eliminar la tarjeta de débito?")) {
      this.recaudacion.tarjetas_debitos.splice(cod, 1);
      this.data_tarjetas_debitos = new MatTableDataSource<TarjetaDebito>(this.recaudacion.tarjetas_debitos);
      this.data_tarjetas_debitos.sort = this.sort;
      this.data_tarjetas_debitos.paginator = this.paginator;
    }
  }

  agregar_tarjeta_debito() {
    this.recaudacion.tarjetas_debitos.push(this.tarjeta_debito);
    this.tarjeta_debito=new TarjetaDebito();
    this.seleccion_banco_tarjeta_debito.patchValue("");
    this.data_tarjetas_debitos = new MatTableDataSource<TarjetaDebito>(this.recaudacion.tarjetas_debitos);
    this.data_tarjetas_debitos.sort = this.sort;
    this.data_tarjetas_debitos.paginator = this.paginator;
  }

  total_tarjetas_debitos() {
    return this.recaudacion.tarjetas_debitos.map(t => Number(t.valor)).reduce((acc, value) => acc + value, 0);
  }

  borrar_compensacion(cod: number) {
    if (confirm("Realmente quiere eliminar la compensacion?")) {
      this.recaudacion.compensaciones.splice(cod, 1);
      this.data_compensaciones = new MatTableDataSource<Compensacion>(this.recaudacion.compensaciones);
      this.data_compensaciones.sort = this.sort;
      this.data_compensaciones.paginator = this.paginator;
    }
  }

  agregar_compensacion() {
    this.recaudacion.compensaciones.push(this.compensacion);
    this.data_compensaciones = new MatTableDataSource<Compensacion>(this.recaudacion.compensaciones);
    this.data_compensaciones.sort = this.sort;
    this.data_compensaciones.paginator = this.paginator;
  }

  total_compensaciones() {
    return this.recaudacion.compensaciones.map(t => Number(t.valor_compensado)).reduce((acc, value) => acc + value, 0);
  }

  total_creditos() {
    return 0;
  }

  seleccionar_efectivo(){
    if (this.recaudacion.efectivo>this.factura.total_con_descuento){
      this.recaudacion.cambio=this.recaudacion.efectivo-this.recaudacion.total
    }
  }
  seleccionar_valor_pago(){
    this.recaudacion.total=this.recaudacion.efectivo+this.recaudacion.total_cheques+
    this.recaudacion.total_depositos+this.recaudacion.total_transferencias+
    this.recaudacion.total_creditos+this.recaudacion.total_debitos+this.recaudacion.total_compensaciones;
  }

  crear(event) {

  }

  crear_deposito() {

  }

  crear_retencion() {

  }

  crear_tabla() {

  }

  editar_tarjeta_credito(i: number){
    
  }
  rellenar_cheque_numero(){
    this.cheque.numero=this.pad(this.cheque.numero, 13);
  }
  pad(numero:string, size:number): string {
    while (numero.length < size) numero = "0" + numero;
    return numero;
  }
}
