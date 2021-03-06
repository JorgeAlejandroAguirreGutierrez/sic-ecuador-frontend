import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Factura } from '../../modelos/factura';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';
import { Sesion } from '../../modelos/sesion';
import { SesionService } from '../../servicios/sesion.service';
import { FacturaDetalle } from '../../modelos/factura-detalle';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../modelos/producto';
import { ImpuestoService } from '../../servicios/impuesto.service';
import { Impuesto } from '../../modelos/impuesto';
import { FacturaService } from '../../servicios/factura.service';
import { AuxiliarService } from '../../servicios/auxiliar.service';
import { Auxiliar } from '../../modelos/auxiliar';
import { Caracteristica } from '../../modelos/caracteristica';
import { Bodega } from '../../modelos/bodega';
import { BodegaService } from '../../servicios/bodega.service';
import { CaracteristicaService } from '../../servicios/caracteristica.service';
import { Precio } from '../../modelos/precio';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  collapsed = true;
  isLinear = false;
  isEditable=false;
  completed=false;
  tipo_producto="B";
  estado="EMITIDA";
  indice_detalle=0;
  detalle_entregado="";
  buscar_serie:string="";

  seleccion_auxiliar: boolean =false;
  seleccion_facturar: boolean =false;

  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  seleccion_producto = new FormControl();
  seleccion_identificacion_cliente = new FormControl();
  seleccion_razon_social_cliente = new FormControl();
  seleccion_identificacion_cliente_factura = new FormControl();
  seleccion_razon_social_cliente_factura = new FormControl();

  filtro_productos: Observable<Producto[]> = new Observable<Producto[]>();
  filtro_identificacion_clientes: Observable<Cliente[]> = new Observable<Cliente[]>();
  filtro_razon_social_clientes: Observable<Cliente[]> = new Observable<Cliente[]>();
  filtro_identificacion_clientes_factura: Observable<Cliente[]> = new Observable<Cliente[]>();
  filtro_razon_social_clientes_factura: Observable<Cliente[]> = new Observable<Cliente[]>();

  constructor(private clienteService: ClienteService, private auxiliarService: AuxiliarService, private sesionService: SesionService, 
    private impuestoService: ImpuestoService, private router: Router, private cdref: ChangeDetectorRef,
    private facturaService: FacturaService, private productoService: ProductoService, private bodegaService: BodegaService,
    private modalService: NgbModal, private _formBuilder: FormBuilder) { }


    ngAfterContentChecked() {
      this.cdref.detectChanges();    
    }

  factura_crear: Factura=new Factura();
  factura: Factura = new Factura();
  auxiliar_buscar: Auxiliar=new Auxiliar();

  columnasDetalleFactura: string[] = ['nombre', 'entregado', 'Medida', 'cantidad', 'valor', 'descuento'
    , 'desc_por', 'desc_sub', 'desc_por_sub', 'desc_tot', 'desc_por_tot', 'impuesto', 'total', 'serie','acciones'];
  data_detalle_factura = new MatTableDataSource<FacturaDetalle>(this.factura.factura_detalles);

  clientes: Cliente[]=[];
  auxiliares: Auxiliar[]= [];
  productos: Producto[] = [];
  bodegas: Bodega[]=[];

  precios_seleccionados: Precio[]=[];
  sesion: Sesion;
  habilitar: boolean = true;
  habilitar_cliente_tce: boolean =true;
  habilitar_cliente_factura_tce: boolean =true;
  impuestos: Impuesto[];

  //VARIABLES MUESTRA
  primer_telefono_cliente: string = "";
  primer_celular_cliente: string = "";
  primer_correo_cliente: string = "";

  primer_telefono_auxiliar: string = "";
  primer_celular_auxiliar: string = "";
  primer_correo_auxiliar: string = "";

  primer_telefono_cliente_factura: string = "";
  primer_celular_cliente_factura: string = "";
  primer_correo_cliente_factura: string = "";

  caracteristica: string="";

  habilitar_seleccion_auxiliar=true;
  habilitar_facturar=false;

  indice_auxiliar=-1;
  auxiliar: Auxiliar= null;

  saldo_total=0;
  saldo=0;

  costo_unitario=0;
  costo_promedio=0;
  indice_producto=0;
  cantidad_transferencia=0;
  detalle: FacturaDetalle=new FacturaDetalle();
  panelOpenState=false;

  async ngOnInit() {
    this.validar_sesion();
    this.consultar_clientes();
    this.construir_factura();
    this.cambiar_productos(this.tipo_producto);
    this.consultar_impuestos();
    this.consultar_bodegas();

    this.data_detalle_factura.paginator = this.paginator;

    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl()
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl()
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = new FormGroup({
      thirdCtrl: new FormControl()
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    this.factura.vendedor = this.sesion.usuario;
    this.filtro_productos = this.seleccion_producto.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(nombre => typeof nombre === 'string' ? this.filtro_producto(nombre) : this.productos.slice())
      );
    this.filtro_identificacion_clientes = this.seleccion_identificacion_cliente.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(identificacion => typeof identificacion === 'string' ? this.filtro_identificacion_cliente(identificacion) : this.clientes.slice())
      );
    this.filtro_razon_social_clientes = this.seleccion_razon_social_cliente.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(razon_social => typeof razon_social === 'string' ? this.filtro_razon_social_cliente(razon_social) : this.clientes.slice())
      );
    this.filtro_identificacion_clientes_factura = this.seleccion_identificacion_cliente_factura.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(identificacion => typeof identificacion === 'string' ? this.filtro_identificacion_cliente_factura(identificacion) : this.clientes.slice())
      );
    this.filtro_razon_social_clientes_factura = this.seleccion_razon_social_cliente_factura.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(razon_social => typeof razon_social === 'string' ? this.filtro_razon_social_cliente_factura(razon_social) : this.clientes.slice())
      );
      this.seleccion_identificacion_cliente_factura.disable();
      this.seleccion_razon_social_cliente_factura.disable();
  }

  private filtro_producto(value: string): Producto[] {
    if(this.productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.productos.filter(producto => producto.nombre.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_producto(producto: Producto): string {
    return producto && producto.nombre ? producto.nombre : '';
  }

  private filtro_identificacion_cliente(value: string): Cliente[] {
    if(this.clientes.length>0) {
      const filterValue = value.toLowerCase();
      return this.clientes.filter(cliente => cliente.identificacion.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_identificacion_cliente(cliente: Cliente): string {
    return cliente && cliente.identificacion ? cliente.identificacion : '';
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

  private filtro_identificacion_cliente_factura(value: string): Cliente[] {
    if(this.clientes.length>0) {
      const filterValue = value.toLowerCase();
      return this.clientes.filter(cliente => cliente.identificacion.toLowerCase().includes(filterValue));
    }
    return [];
  }

  ver_identificacion_cliente_factura(cliente: Cliente): string {
    return cliente && cliente.identificacion ? cliente.identificacion : '';
  }
  private filtro_razon_social_cliente_factura(value: string): Cliente[] {
    if(this.clientes.length>0) {
      const filterValue = value.toLowerCase();
      return this.clientes.filter(cliente => cliente.razon_social.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_razon_social_cliente_factura(cliente: Cliente): string {
    return cliente && cliente.razon_social ? cliente.razon_social : '';
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
    this.factura=new Factura();
  }

  validar_sesion(){
    this.sesion = this.sesionService.getSesion();
    if (this.sesion == undefined)
      this.router.navigate(['/iniciosesion']);
  }
  construir_factura() {
    let factura_id=0;
    this.facturaService.currentMessage.subscribe(message => factura_id = message);
    if (factura_id!= 0) {
      this.facturaService.obtener(factura_id).subscribe(
        res => {
          Object.assign(this.factura, res.resultado as Factura);
          this.factura.construir();
          this.estado = this.factura.estado? "EMITIDA": "ANULADA";
          this.seleccion_identificacion_cliente.patchValue(this.factura.cliente);
          this.seleccion_razon_social_cliente.patchValue(this.factura.cliente);
          this.primer_telefono_cliente= this.factura.cliente.telefonos.length>0? this.factura.cliente.telefonos[0].numero: "";
          this.primer_celular_cliente= this.factura.cliente.celulares.length>0? this.factura.cliente.celulares[0].numero: "";
          this.primer_correo_cliente= this.factura.cliente.correos.length>0? this.factura.cliente.correos[0].email: "";
          this.habilitar_cliente_tce=false;
          if (this.factura.cliente_factura.id!=0){
            this.seleccion_identificacion_cliente_factura.patchValue(this.factura.cliente_factura);
            this.seleccion_razon_social_cliente_factura.patchValue(this.factura.cliente_factura);
            this.seleccion_facturar= true;
            this.habilitar_facturar= false;
            this.asignar_facturar();
            this.habilitar_cliente_factura_tce=false;
            this.primer_telefono_cliente_factura= this.factura.cliente_factura.telefonos.length>0? this.factura.cliente_factura.telefonos[0].numero: "";
            this.primer_celular_cliente_factura= this.factura.cliente_factura.celulares.length>0? this.factura.cliente_factura.celulares[0].numero: "";
            this.primer_correo_cliente_factura= this.factura.cliente_factura.correos.length>0? this.factura.cliente_factura.correos[0].email: "";
          } else{
            this.seleccion_facturar=false;
            this.habilitar_facturar=true;
          }
          this.data_detalle_factura = new MatTableDataSource<FacturaDetalle>(this.factura.factura_detalles);
          this.factura_crear=this.factura;
          this.facturaService.enviar(0);
        },
        err => {
          Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
        }
      )
    }
  }

  consultar_clientes() {
     this.clienteService.consultarAsync().then(
      res => {
        this.clientes = res.resultado as Cliente[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  consultar_impuestos() {
    this.impuestoService.consultar().subscribe(
      res => {
        this.impuestos = res.resultado as Impuesto[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }
  consultar_bodegas(){
    this.bodegaService.consultar().subscribe(
      res => {
        this.bodegas = res.resultado as Bodega[]
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  consultar_bienes(event) {
    if (event!=null)
      event.preventDefault();
    this.productoService.consultarBien().subscribe(
      res => {
        this.productos = res.resultado as Producto[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  consultar_servicios(event) {
    if (event!=null)
      event.preventDefault();
    this.productoService.consultarServicio().subscribe(
      res => {
        this.productos = res.resultado as Producto[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  consultar_activos_fijos(event) {
    if (event!=null)
      event.preventDefault();
    this.productoService.consultarActivoFijo().subscribe(
      res => {
        this.productos = res.resultado as Producto[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccionar_razon_social_cliente() {
    let cliente_id=undefined;
    cliente_id=this.seleccion_razon_social_cliente.value.id;
    this.auxiliar_buscar.cliente.id=cliente_id;
    this.clienteService.obtenerAsync(cliente_id).then(
      res => {
        this.factura.cliente = Object.assign(new Cliente(),res.resultado);
        this.factura.cliente.construir();
        this.seleccion_identificacion_cliente.patchValue(this.factura.cliente);
        this.seleccion_razon_social_cliente.patchValue(this.factura.cliente);
        if (this.factura.cliente.telefonos.length>0)
          this.primer_telefono_cliente = this.factura.cliente.telefonos[0].numero;
        if (this.factura.cliente.celulares.length>0)
          this.primer_celular_cliente = this.factura.cliente.celulares[0].numero;
        if (this.factura.cliente.correos.length>0)
          this.primer_correo_cliente = this.factura.cliente.correos[0].email;
        if (this.factura.cliente.identificacion!="9999999999999")
        {
          this.habilitar_seleccion_auxiliar=false;
          this.habilitar_facturar=false;
          this.seleccion_facturar=false;
        } else {
          this.habilitar_facturar=true;
          this.seleccion_facturar=false;
          this.seleccion_identificacion_cliente_factura.enable();
          this.seleccion_razon_social_cliente_factura.enable();
        }
        this.habilitar_cliente_tce=false;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
    this.auxiliarService.consultarClienteID(this.auxiliar_buscar).subscribe(
      res => {
        this.auxiliares = res.resultado as Auxiliar[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccionar_identificacion_cliente() {
    let cliente_id=undefined;
    cliente_id=this.seleccion_identificacion_cliente.value.id;
    this.auxiliar_buscar.cliente.id=cliente_id;
    this.clienteService.obtenerAsync(cliente_id).then(
      res => {
        this.factura.cliente =Object.assign(new Cliente(),res.resultado);
        this.factura.cliente.construir();
          this.seleccion_identificacion_cliente.patchValue(this.factura.cliente);
          this.seleccion_razon_social_cliente.patchValue(this.factura.cliente);     
        if (this.factura.cliente.telefonos.length>0)
          this.primer_telefono_cliente = this.factura.cliente.telefonos[0].numero;
        if (this.factura.cliente.celulares.length>0)
          this.primer_celular_cliente = this.factura.cliente.celulares[0].numero;
        if (this.factura.cliente.correos.length>0)
          this.primer_correo_cliente = this.factura.cliente.correos[0].email;
        if (this.factura.cliente.identificacion!="9999999999999")
        {
          this.habilitar_seleccion_auxiliar=false;
          this.habilitar_facturar=false;
          this.seleccion_facturar=false;
        } else {
          this.habilitar_facturar=true;
          this.seleccion_facturar=false;
          this.seleccion_identificacion_cliente_factura.enable();
          this.seleccion_razon_social_cliente_factura.enable();
        }
        this.habilitar_cliente_tce=false;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
    this.auxiliarService.consultarClienteID(this.auxiliar_buscar).subscribe(
      res => {
        this.auxiliares = res.resultado as Auxiliar[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccionar_identificacion_cliente_factura() {
    let cliente_id=this.seleccion_identificacion_cliente_factura.value.id;
    this.clienteService.obtener(cliente_id).subscribe(
      res => {
        this.factura.cliente_factura =Object.assign(new Cliente(),res.resultado);
        this.factura.cliente_factura.construir();
        this.seleccion_identificacion_cliente_factura.patchValue(this.factura.cliente_factura);
        this.seleccion_razon_social_cliente_factura.patchValue(this.factura.cliente_factura);
        if (this.factura.cliente_factura.telefonos.length>0)
          this.primer_telefono_cliente_factura = this.factura.cliente_factura.telefonos[0].numero;
        if (this.factura.cliente_factura.celulares.length>0)
          this.primer_celular_cliente_factura = this.factura.cliente_factura.celulares[0].numero;
        if (this.factura.cliente_factura.correos.length>0)
          this.primer_correo_cliente_factura= this.factura.cliente_factura.correos[0].email;
        this.habilitar_cliente_factura_tce=false;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  seleccionar_razon_social_cliente_factura() {
    let cliente_id=this.seleccion_razon_social_cliente_factura.value.id;
    this.clienteService.obtener(cliente_id).subscribe(
      res => {
        this.factura.cliente_factura =Object.assign(new Cliente(),res.resultado);
        this.factura.cliente_factura.construir();
        this.seleccion_identificacion_cliente_factura.patchValue(this.factura.cliente_factura);
        this.seleccion_razon_social_cliente_factura.patchValue(this.factura.cliente_factura);   
        if (this.factura.cliente_factura.telefonos.length>0)
          this.primer_telefono_cliente_factura = this.factura.cliente_factura.telefonos[0].numero;
        if (this.factura.cliente_factura.celulares.length>0)
          this.primer_celular_cliente_factura = this.factura.cliente_factura.celulares[0].numero;
        if (this.factura.cliente_factura.correos.length>0)
          this.primer_correo_cliente_factura= this.factura.cliente_factura.correos[0].email;
        this.habilitar_cliente_factura_tce=false;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  asignar_auxiliar(content: any){
    if (this.seleccion_auxiliar && this.factura.cliente.id!=undefined){
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        if (result == "confirmar") {
            this.factura.auxiliar=this.auxiliares[this.indice_auxiliar];
            if (this.factura.auxiliar.telefonos.length>0)
              this.primer_telefono_auxiliar = this.factura.auxiliar.telefonos[0].numero;
            if (this.factura.auxiliar.celulares.length>0)
              this.primer_celular_auxiliar = this.factura.auxiliar.celulares[0].numero;
            if (this.factura.auxiliar.correos.length>0)
              this.primer_correo_auxiliar = this.factura.auxiliar.correos[0].email;
        } else {
          this.seleccion_auxiliar=false;
        }
      }, (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      });
    } else {
      this.factura.auxiliar=null;
    }
  }
  asignar_facturar(){
    if (this.seleccion_facturar){
      this.seleccion_identificacion_cliente_factura.enable();
      this.seleccion_razon_social_cliente_factura.enable();
    } else {
      this.seleccion_identificacion_cliente_factura.patchValue("");
      this.seleccion_razon_social_cliente_factura.patchValue("");
      this.seleccion_identificacion_cliente_factura.disable();
      this.seleccion_razon_social_cliente_factura.disable();
    }
    
  }
  
  seleccionar_auxiliar(i: number){
    this.indice_auxiliar=i;
  }

  seleccionar_habilitar() {
    if (this.habilitar) {
      this.habilitar = false;
    } else {
      this.habilitar = true;
    }
  }

  limpiar_producto(){
    this.detalle.producto=new Producto();
    this.detalle.cantidad=0;
    this.detalle.valor_descuento_individual=0;
    this.detalle.porcentaje_descuento_individual=0;
    this.detalle.calcular();
    this.seleccion_producto.patchValue("");
    this.costo_promedio=0;
    this.costo_unitario=0;
    this.saldo=0;
    this.saldo_total=0;
  }

  seleccionar_producto() {
    this.detalle.producto=this.seleccion_producto.value;
    if(this.detalle.producto.kardexs.length==0){
      this.detalle.producto=new Producto();
      Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: constantes.error_kardex_VACIO, footer: constantes.error_kardex_VACIO_MENSAJE });
      return;
    }
    this.costo_unitario=this.detalle.producto.kardexs[this.detalle.producto.kardexs.length-1].costo_unitario;
    this.costo_promedio=this.detalle.producto.kardexs[this.detalle.producto.kardexs.length-1].costo_promedio;
    this.saldo=this.detalle.producto.kardexs[this.detalle.producto.kardexs.length-1].cantidad;
    this.saldo_total=this.detalle.producto.kardexs[this.detalle.producto.kardexs.length-1].cantidad;
  }
  seleccionar_medida(){
    for (let i=0; i<this.detalle.producto.medidas_precios.length; i++) {
      if(this.detalle.producto.medidas_precios[i].medida.id==this.detalle.medida.id){
        this.precios_seleccionados=this.detalle.producto.medidas_precios[i].precios;
      }
    }
  }

  seleccionar_precio() {
    this.detalle.calcular();
  }
  seleccionar_cantidad() {
    this.detalle.calcular();
  }

  seleccionar_valor_descuento_individual() {
    this.detalle.calcular();
  }

  seleccionar_porcentaje_descuento_individual() {
    this.detalle.calcular();
  }

  seleccionar_impuesto(){
    this.detalle.calcular();
  }

  agregar_detalle(){
    if (this.detalle.bodega.id==0){
      return;
    }
    if (this.detalle.cantidad==0){
      return;
    }
    if (this.detalle.medida.id==0){
      return;
    }
    if (this.detalle.precio.id==0){
      return;
    }
    if (this.detalle.impuesto.id==0){
      return;
    }
    if(this.detalle.producto.kardexs[this.detalle.producto.kardexs.length-1].cantidad<this.detalle.cantidad){
      Swal.fire(constantes.error, constantes.error_cantidad, constantes.error_swal);
      return;
    }
    this.detalle.calcular();
    this.factura.factura_detalles.push(this.detalle);
    this.factura.calcular();
    this.detalle=new FacturaDetalle();
    this.limpiar_producto();
    this.data_detalle_factura = new MatTableDataSource<FacturaDetalle>(this.factura.factura_detalles);
    Swal.fire(constantes.exito, constantes.exito_agregar_detalle_factura, constantes.exito_swal);
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.factura.sesion=this.sesion;
    this.factura.estado= this.estado=="EMITIDA"? true: false;
    console.log(this.factura);
    this.facturaService.crear(this.factura).subscribe(
      res => {
        this.factura_crear = res.resultado as Factura
        this.stepper.next();
        Swal.fire(constantes.exito, constantes.exito_crear_factura, constantes.exito_swal);
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    console.log(this.factura);
    this.facturaService.actualizar(this.factura).subscribe(
      res => {
        this.factura_crear = res.resultado as Factura;
        Swal.fire(constantes.exito, constantes.exito_actualizar_factura, constantes.exito_swal);
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  cambiar_productos(tipo_producto: string){
    if (tipo_producto== "B"){
      this.consultar_bienes(null);
    }
    if (tipo_producto=="S"){
      this.consultar_servicios(null);
    }
    if (tipo_producto== "AF"){
      this.consultar_activos_fijos(null);
    }
  }

  asignar_series(content: any, i: number){
    this.indice_detalle=i;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      if (result == "confirmar") {
        this.buscar_serie="";
        let seleccionados=0;
        if (!this.factura.factura_detalles[this.indice_detalle].producto.serie_autogenerado) {
          this.factura.factura_detalles[this.indice_detalle].producto.caracteristicas.forEach((caracteristica, index)=> {
            if(caracteristica.seleccionado && (caracteristica.factura_detalle==null || caracteristica.factura_detalle.posicion==-1)){
              caracteristica.factura_detalle=new FacturaDetalle();
              caracteristica.factura_detalle.posicion=this.indice_detalle;
              seleccionados++;
            }
          });
          if (seleccionados>this.factura.factura_detalles[this.indice_detalle].cantidad || seleccionados<this.factura.factura_detalles[this.indice_detalle].cantidad){
            this.factura.factura_detalles[this.indice_detalle].caracteristicas=[];
            this.factura.factura_detalles[this.indice_detalle].producto.caracteristicas.forEach((caracteristica, index)=> {
              caracteristica.seleccionado=false;
              caracteristica.factura_detalle=new FacturaDetalle();
              caracteristica.factura_detalle.posicion=-1;
            });
            Swal.fire('Error', "Series seleccionadas no coinciden con la cantidad", 'error');
          }
        }
      }
      if (result == "close"){
        this.buscar_serie="";
        if(!this.factura.factura_detalles[this.indice_detalle].producto.serie_autogenerado){
          this.factura.factura_detalles[this.indice_detalle].producto.caracteristicas.forEach((caracteristica, index)=> {
            caracteristica.seleccionado=false;
            caracteristica.factura_detalle=new FacturaDetalle();
            caracteristica.factura_detalle.posicion=-1;
          });
        }
      }
    }, (reason) => {
      this.buscar_serie="";
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }
  
  modal_transferencias(content: any, i: number){
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
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

  buscar_auxiliar(){
    this.auxiliarService.consultarRazonSocial(this.auxiliar_buscar).subscribe(
      res => {
        this.auxiliares = res.resultado as Auxiliar[]
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  limpiar_identificacion_cliente(){
    if (this.seleccion_identificacion_cliente.value.id==null ||this.seleccion_identificacion_cliente.value.id==undefined){
      this.limpiar_cliente();
    }
  }
  limpiar_razon_social_cliente(){
    if (this.seleccion_razon_social_cliente.value.id==null ||this.seleccion_razon_social_cliente.value.id==undefined){
      this.limpiar_cliente();
    }
  }
  limpiar_cliente(){
    this.factura.cliente.direccion.direccion="";
    this.primer_telefono_cliente="";
    this.primer_celular_cliente="";
    this.primer_correo_cliente="";
    this.factura.cliente.financiamiento.forma_pago.abreviatura="";
    this.factura.cliente.financiamiento.tipo_pago.abreviatura="";
    this.factura.cliente.financiamiento.monto=0;
  }
  limpiar_identificacion_cliente_factura(){
    if (this.seleccion_identificacion_cliente_factura.value.id==undefined){
      this.limpiar_cliente_factura();
    }
  }
  limpiar_razon_social_cliente_factura(){
    if (this.seleccion_razon_social_cliente_factura.value.id==undefined){
      this.limpiar_cliente_factura();
    }
  }
  limpiar_cliente_factura(){
    this.factura.cliente_factura.direccion.direccion="";
    this.primer_telefono_cliente_factura="";
    this.primer_celular_cliente_factura="";
    this.primer_correo_cliente_factura="";
    this.factura.cliente_factura.financiamiento.forma_pago.abreviatura="";
    this.factura.cliente_factura.financiamiento.tipo_pago.abreviatura="";
    this.factura.cliente_factura.financiamiento.monto=0;
  }
  eliminar_detalle(i: number){
    for (let j=0; j<this.factura.factura_detalles[i].caracteristicas.length; j++){
      this.factura.factura_detalles[i].caracteristicas[j].seleccionado=false;
    }
    this.factura.factura_detalles.splice(i, 1);
    this.factura.calcular();
  }

  transferir(caracteristica: Caracteristica){

  }

  seleccionar_valor_descuento_subtotal(){
    this.factura.calcular();
    this.factura.factura_detalles.forEach((detalle, index)=> {
      detalle.calcular();
      detalle.calcular_descuentos_subtotales(this.factura);
      detalle.calcular();
    });
    this.factura.calcular();
    
  }
  seleccionar_porcentaje_descuento_subtotal(){
    this.factura.calcular();
    this.factura.factura_detalles.forEach((detalle, index)=> {
      detalle.calcular();
      detalle.calcular_descuentos_subtotales(this.factura);
      detalle.calcular();
    });
    this.factura.calcular();
    
  }
  seleccionar_valor_descuento_total(){
    this.factura.calcular();
    this.factura.factura_detalles.forEach((detalle, index)=> {
      detalle.calcular();
      detalle.calcular_descuentos_totales(this.factura);
      detalle.calcular();
    });
    this.factura.calcular();  
  }
  seleccionar_porcentaje_descuento_total(){
    this.factura.calcular();
    this.factura.factura_detalles.forEach((detalle, index)=> {
      detalle.calcular();
      detalle.calcular_descuentos_totales(this.factura);
      detalle.calcular();
    });
    this.factura.calcular();    
  }

  procesaPropagar(mensaje: boolean){
    if (mensaje){
      this.stepper.next();
    }
  }
}
