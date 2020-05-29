import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Recaudacion } from '../modelos/recaudacion';
import { Cheque } from '../modelos/cheque';
import { Deposito } from '../modelos/deposito';
import { TarjetaCredito } from '../modelos/tarjeta-credito';
import { TarjetaDebito } from '../modelos/tarjeta-debito';
import { Compensacion } from '../modelos/compensacion';
import { FacturaService } from '../servicios/factura.service';
import { SesionService } from '../servicios/sesion.service';
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

@Component({
  selector: 'app-recaudacion',
  templateUrl: './recaudacion.component.html',
  styleUrls: ['./recaudacion.component.css']
})

export class RecaudacionComponent implements OnInit {

  constructor(private facturaService: FacturaService, private clienteService: ClienteService, private bancoService: BancoService,
    private sesionService: SesionService, private plazoCreditoService: PlazoCreditoService,
    private cuentaPropiaService: CuentaPropiaService, private formaPagoService: FormaPagoService, private modalService: NgbModal) { }

  @Input() factura: Factura;
  recaudacion: Recaudacion = new Recaudacion();
  cheque: Cheque=new Cheque();
  deposito: Deposito=new Deposito();
  transferencia: Transferencia=new Transferencia();
  plazos_creditos: PlazoCredito[];
  formas_pagos: FormaPago[]=[];
  clientes: Cliente[]=[];
  cuentas_propias: CuentaPropia[]=[];

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

  columnasCheques: string[] = ['id', 'fecha', 'tipo', 'numero', 'banco', 'valor', 'acciones'];
  data_cheques = new MatTableDataSource<Cheque>(this.recaudacion.cheques);
  tabla1: MatTable<Cheque>;

  habilitar_cheques: boolean = false;
  habilitar_depositos: boolean = false;
  columnasDepositos: string[] = ['id', 'fecha', 'cuenta', 'banco', 'comprobante', 'valor', 'acciones'];
  data_depositos = new MatTableDataSource<Deposito>(this.recaudacion.depositos);

  // Variables para transferencias
  habilitar_transferencias: boolean = false;
  columnasTransferencias: string[] = ['id', 'fecha', 'cuenta', 'banco', 'comprobante', 'valor', 'acciones'];
  data_transferencias = new MatTableDataSource<Transferencia>(this.recaudacion.transferencias);

  // Variables para Tarjetas de crédito
  habilitar_tarjetasCredito: boolean = false;
  tarjetaCredito: TarjetaCredito[] = [];
  franquiciaTarjetaCredito: string = "";
  bancoTarjetaCredito: string = "";
  titularTarjetaCredito: boolean = true;
  identificacionTarjetaCredito: string = "";
  nombreTarjetaCredito: string = "";
  diferidoTarjetaCredito: boolean = false;
  operadorTarjetaCredito: string = "";
  loteTarjetaCredito: string = "";
  valorTarjetaCredito: number = 0;
  columnasTarjetasCredito: string[] = ['id', 'franquicia', 'banco', 'identificacion', 'nombre', 'titular', 'diferido', 'operador', 'lote', 'valor', 'acciones'];
  dataSourceTarjetasCredito = new MatTableDataSource<TarjetaCredito>(this.tarjetaCredito);

  // Variables para Tarjetas de débito
  habilitar_tarjetasDebito: boolean = false;
  tarjetaDebito: TarjetaDebito[] = [];
  franquiciaTarjetaDebito: string = "";
  bancoTarjetaDebito: string = "";
  identificacionTarjetaDebito: string = "";
  nombreTarjetaDebito: string = "";
  operadorTarjetaDebito: string = "";
  loteTarjetaDebito: string = "";
  valorTarjetaDebito: number = 0;
  columnasTarjetasDebito: string[] = ['id', 'franquicia', 'banco', 'identificacion', 'nombre', 'operador', 'lote', 'valor', 'acciones'];
  dataSourceTarjetasDebito = new MatTableDataSource<TarjetaDebito>(this.tarjetaDebito);

  // Variables para Compensaciones
  habilitar_compensaciones: boolean = false;
  compensacion: Compensacion[] = [];
  tipoComprobanteCompensacion: string = "";
  comprobanteCompensacion: string = "";
  fechaComprobanteCompensacion: Date = new Date();
  origenCompensacion: string = "";
  motivoCompensacion: string = "";
  fechaVencimientoCompensacion: Date = new Date();
  valor_inicialCompensacion: number = 0;
  valor_compensadoCompensacion: number = 0;
  columnasCompensaciones: string[] = ['id', 'tipo', 'comprobante', 'fecha', 'origen', 'motivo', 'fechaVencimiento', 'valorInicial', 'valorCompensado', 'acciones'];
  dataSourceCompensaciones = new MatTableDataSource<Compensacion>(this.compensacion);

  ngOnInit() {
    this.consultar_cuentas_propias();
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

  consultar_cuentas_propias(){
    this.cuentaPropiaService.consultar().subscribe(
      res => {
        this.cuentas_propias = res.resultado as CuentaPropia[]
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
    return banco && banco.abreviatura ? banco.abreviatura : '';
  }

  private filtro_banco_deposito(value: string): Banco[] {
    if(this.bancos_depositos.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_depositos.filter(banco_deposito => banco_deposito.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_deposito(banco_deposito: Banco): string {
    return banco_deposito && banco_deposito.abreviatura ? banco_deposito.abreviatura : '';
  }
  private filtro_banco_transferencia(value: string): Banco[] {
    if(this.bancos_transferencias.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_transferencias.filter(banco_transferencia => banco_transferencia.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_transferencia(banco_transferencia: Banco): string {
    return banco_transferencia && banco_transferencia.abreviatura ? banco_transferencia.abreviatura : '';
  }

  private filtro_banco_tarjeta_credito(value: string): Banco[] {
    if(this.bancos_tarjetas_creditos.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_tarjetas_creditos.filter(banco_tarjeta_credito => banco_tarjeta_credito.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_tarjeta_credito(banco_transferencia: Banco): string {
    return banco_transferencia && banco_transferencia.abreviatura ? banco_transferencia.abreviatura : '';
  }

  private filtro_banco_tarjeta_debito(value: string): Banco[] {
    if(this.bancos_tarjetas_debitos.length>0) {
      const filterValue = value.toLowerCase();
      return this.bancos_tarjetas_debitos.filter(banco_tarjeta_debito => banco_tarjeta_debito.abreviatura.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_banco_tarjeta_debito(banco_tarjeta_debito: Banco): string {
    return banco_tarjeta_debito && banco_tarjeta_debito.abreviatura ? banco_tarjeta_debito.abreviatura : '';
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
      this.habilitar_tarjetasCredito = !this.habilitar_tarjetasCredito;
    }
    if (formaPago == 'TARJETA DE DEBITO'){
      this.habilitar_tarjetasDebito = !this.habilitar_tarjetasDebito;
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
    this.data_cheques = new MatTableDataSource<Cheque>(this.recaudacion.cheques);
    this.data_cheques.sort = this.sort;
    this.data_cheques.paginator = this.paginator;
  }

  total_cheques() {
    return this.recaudacion.cheques.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }

  borrar_deposito(cod: number) {
    if (confirm("Realmente quiere eliminar el deposito?")) {
      this.recaudacion.depositos.splice(cod, 1);
      this.data_depositos = new MatTableDataSource<Deposito>(this.recaudacion.depositos);
      this.data_depositos.sort = this.sort;
      this.data_depositos.paginator = this.paginator;
    }
  }

  agregar_deposito() {
    this.deposito.banco=this.seleccion_banco_deposito.value;
    this.recaudacion.depositos.push(this.deposito);
    this.deposito=new Deposito();
    this.data_depositos = new MatTableDataSource<Deposito>(this.recaudacion.depositos);
    this.data_depositos.sort = this.sort;
    this.data_depositos.paginator = this.paginator;
  }

  total_depositos() {
    return this.recaudacion.depositos.map(t => t.valor).reduce((acc, value) => acc + value, 0);
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
    this.data_transferencias = new MatTableDataSource<Transferencia>(this.recaudacion.transferencias);
    this.data_transferencias.sort = this.sort;
    this.data_transferencias.paginator = this.paginator;
  }

  total_transferencias() {
    return this.recaudacion.transferencias.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }

  borrarTarjetaCredito(cod: number) {
    if (confirm("Realmente quiere eliminar la tarjeta de crédito?")) {
      this.tarjetaCredito.splice(cod, 1);
      this.dataSourceTarjetasCredito = new MatTableDataSource<TarjetaCredito>(this.tarjetaCredito);
      this.dataSourceTarjetasCredito.sort = this.sort;
      this.dataSourceTarjetasCredito.paginator = this.paginator;
    }
  }

  agregarTarjetaCredito() {
    this.tarjetaCredito.push({
      id: this.tarjetaCredito.length + 1, franquicia: this.franquiciaTarjetaCredito, banco: this.bancoTarjetaCredito,
      titular: this.titularTarjetaCredito, identificacion: this.identificacionTarjetaCredito, nombre: this.nombreTarjetaCredito, diferido: this.diferidoTarjetaCredito,
      operador: this.operadorTarjetaCredito, lote: this.loteTarjetaCredito, valor: this.valorTarjetaCredito
    });
    this.dataSourceTarjetasCredito = new MatTableDataSource<TarjetaCredito>(this.tarjetaCredito);
    this.dataSourceTarjetasCredito.sort = this.sort;
    this.dataSourceTarjetasCredito.paginator = this.paginator;
  }

  totalTarjetasCredito() {
    return this.tarjetaCredito.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }

  borrarTarjetaDebito(cod: number) {
    if (confirm("Realmente quiere eliminar la tarjeta de débito?")) {
      this.tarjetaDebito.splice(cod, 1);
      this.dataSourceTarjetasDebito = new MatTableDataSource<TarjetaDebito>(this.tarjetaDebito);
      this.dataSourceTarjetasDebito.sort = this.sort;
      this.dataSourceTarjetasDebito.paginator = this.paginator;
    }
  }

  agregarTarjetaDebito() {
    this.tarjetaDebito.push({
      id: this.tarjetaDebito.length + 1, franquicia: this.franquiciaTarjetaDebito, banco: this.bancoTarjetaDebito,
      identificacion: this.identificacionTarjetaDebito, nombre: this.nombreTarjetaDebito,
      operador: this.operadorTarjetaDebito, lote: this.loteTarjetaDebito, valor: this.valorTarjetaDebito
    });
    this.dataSourceTarjetasDebito = new MatTableDataSource<TarjetaDebito>(this.tarjetaDebito);
    this.dataSourceTarjetasDebito.sort = this.sort;
    this.dataSourceTarjetasDebito.paginator = this.paginator;
  }

  totalTarjetasDebito() {
    return this.tarjetaDebito.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }

  borrarCompensacion(cod: number) {
    if (confirm("Realmente quiere eliminar la compensacion?")) {
      this.compensacion.splice(cod, 1);
      this.dataSourceCompensaciones = new MatTableDataSource<Compensacion>(this.compensacion);
      this.dataSourceCompensaciones.sort = this.sort;
      this.dataSourceCompensaciones.paginator = this.paginator;
    }
  }

  agregarCompensacion() {
    this.compensacion.push({
      id: this.compensacion.length + 1, tipo_comprobante: this.tipoComprobanteCompensacion, comprobante: this.comprobanteCompensacion,
      fecha_comprobante: this.fechaComprobanteCompensacion, origen: this.origenCompensacion, motivo: this.motivoCompensacion, fecha_vencimiento: this.fechaVencimientoCompensacion,
      valor_inicial: this.valor_inicialCompensacion, valor_compensado: this.valor_compensadoCompensacion
    });
    this.dataSourceCompensaciones = new MatTableDataSource<Compensacion>(this.compensacion);
    this.dataSourceCompensaciones.sort = this.sort;
    this.dataSourceCompensaciones.paginator = this.paginator;
  }

  totalCompensaciones() {
    return this.compensacion.map(t => t.valor_compensado).reduce((acc, value) => acc + value, 0);
  }

  totalCredito() {
    // El total de la factura menos todos los totales
    return this.compensacion.map(t => t.valor_compensado).reduce((acc, value) => acc + value, 0);
  }

  crear(event) {

  }

  crear_deposito() {

  }

  crear_retencion() {

  }

  crear_tabla() {

  }
  rellenar_cheque_numero(){
    this.cheque.numero=this.pad(this.cheque.numero, 13);
  }
  pad(numero:string, size:number): string {
    while (numero.length < size) numero = "0" + numero;
    return numero;
  }
}
