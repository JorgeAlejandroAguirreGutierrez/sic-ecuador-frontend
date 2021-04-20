import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { GrupoProducto } from '../../modelos/grupo-producto';
import { GrupoProductoService } from '../../servicios/grupo-producto.service';
import { Producto } from '../../modelos/producto';
import { TipoGasto } from '../../modelos/tipo-gasto';
import { TipoGastoService } from '../../servicios/tipo-gasto.service';
import { Impuesto } from '../../modelos/impuesto';
import { ImpuestoService } from '../../servicios/impuesto.service';
import { Medida } from '../../modelos/medida';
import { MedidaService } from '../../servicios/medida.service';
import { Precio } from '../../modelos/precio';
import { BehaviorSubject, Observable } from 'rxjs';
import { SegmentoService } from '../../servicios/segmento.service';
import { Segmento } from '../../modelos/segmento';
import { ProductoService } from '../../servicios/producto.service';
import { TipoProductoService } from '../../servicios/tipo-producto.service';
import { TipoProducto } from '../../modelos/tipo-producto';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Kardex } from '../../modelos/kardex';
import { startWith, map } from 'rxjs/operators';
import { KardexService } from '../../servicios/kardex.service';
import { TabService } from '../../componentes/services/tab.service';
import { MedidaPrecio } from '../../modelos/medida-precio';
import { TablaEquivalenciaMedidaService } from '../../servicios/tabla-equivalencia-medida.service';
import { TablaEquivalenciaMedida } from '../../modelos/tabla-equivalencia-medida'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})


export class ProductoComponent implements OnInit {
  panelOpenState=false;
  displayedColumnsSugerido: string[] = ['medida', 'segmento', 'costo', 'margen_ganancia', 'precio_venta_publico', 'precio_venta_publico_iva'];
  displayedColumnsVenta: string[] = ['precio_venta_publico_manual', 'utilidad', 'utilidad_porcentaje'];
  producto: Producto=new Producto();
  precios_tabla: BehaviorSubject<Precio[]>=new BehaviorSubject([]);
  datos = [];
  controls: FormArray[]=[];
 
  cantidad_medidas: number = 0;
  total_medidas: number=0;
  array_cantidad_medidas: number[]=[];

  tipos_gastos: TipoGasto[]=[];
  segmentos: Segmento[]=[];
  impuestos: Impuesto[]=[];
  
  tipos_productos: TipoProducto[]=[];
  habilitar_otras_medidas: boolean=true;
  habilitar_saldo_inicial: boolean=false;

  precio: Precio=new Precio();
  medida: Medida=new Medida();
  kardex_inicial: Kardex=new Kardex();
  kardex_final: Kardex=new Kardex();

  grupos_productos: string[]=[];
  seleccion_grupo_producto = new FormControl();
  filtro_grupos_productos: Observable<string[]> = new Observable<string[]>();

  sub_grupos_productos: string[]=[];
  seleccion_sub_grupo_producto = new FormControl();
  filtro_sub_grupos_productos: Observable<string[]> = new Observable<string[]>();

  categorias_productos: string[]=[];
  seleccion_categoria_producto = new FormControl();
  filtro_categorias_productos: Observable<string[]> = new Observable<string[]>();

  lineas_productos: string[]=[];
  seleccion_linea_producto = new FormControl();
  filtro_lineas_productos: Observable<string[]> = new Observable<string[]>();

  sub_lineas_productos: string[]=[];
  seleccion_sub_linea_producto = new FormControl();
  filtro_sub_lineas_productos: Observable<string[]> = new Observable<string[]>();

  presentaciones_productos: string[]=[];
  seleccion_presentacion_producto = new FormControl();
  filtro_presentaciones_productos: Observable<string[]> = new Observable<string[]>();

  medidas: Medida[]=[];

  medidas_inicial: Medida[]=[];

  tabla_equivalencia_medida: TablaEquivalenciaMedida=null;

  activo: boolean=true;

  constructor(private productoService: ProductoService, private grupoProductoService: GrupoProductoService, private kardexService: KardexService,
    private tipoGastoService: TipoGastoService, private impuestoService: ImpuestoService, private router: Router, private modalService: NgbModal,
    private segmentoService: SegmentoService, private tipoProductoService: TipoProductoService,
    private tabService: TabService, private medidaService: MedidaService, private tablaEquivalenciaService: TablaEquivalenciaMedidaService) { }

  ngOnInit() {
    this.construir_producto();
    this.grupoProductoService.consultar_grupos().subscribe(
      res => {
        this.grupos_productos = res.resultado as string[];
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.tipoGastoService.consultar().subscribe(
      res => {
        this.tipos_gastos = res.resultado as TipoGasto[];
        this.producto.tipo_gasto.id=this.tipos_gastos[0].id;
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.tipoProductoService.consultar().subscribe(
      res => {
        this.tipos_productos = res.resultado as TipoProducto[];
        this.producto.tipo_producto.id=this.tipos_productos[0].id;
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.impuestoService.consultar().subscribe(
      res => {
        this.impuestos = res.resultado as Impuesto[];
        this.producto.impuesto=this.impuestos[0];
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.medidaService.consultar().subscribe(
      res => {
        this.medidas = res.resultado as Medida[];
        this.total_medidas=this.medidas.length;
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.medidaService.consultar().subscribe(
      res => {
        this.medidas_inicial = res.resultado as Medida[];
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    this.segmentoService.consultar().subscribe(
      res => {
        this.segmentos=res.resultado as Segmento[];
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
    
    this.filtro_grupos_productos = this.seleccion_grupo_producto.valueChanges
      .pipe(
        startWith(''),
        map(grupo_producto => this.filtro_grupo_producto(grupo_producto))
      );

    this.filtro_sub_grupos_productos = this.seleccion_sub_grupo_producto.valueChanges
      .pipe(
        startWith(''),
        map(sub_grupo_producto => this.filtro_sub_grupo_producto(sub_grupo_producto))
      );
    this.filtro_categorias_productos = this.seleccion_categoria_producto.valueChanges
      .pipe(
        startWith(''),
        map(categoria_producto => this.filtro_categoria_producto(categoria_producto))
      );
    this.filtro_lineas_productos = this.seleccion_linea_producto.valueChanges
      .pipe(
        startWith(''),
        map(linea_producto => this.filtro_linea_producto(linea_producto))
      );
    this.filtro_sub_lineas_productos = this.seleccion_sub_linea_producto.valueChanges
      .pipe(
        startWith(''),
        map(sub_linea_producto =>this.filtro_sub_linea_producto(sub_linea_producto))
      );
    this.filtro_presentaciones_productos = this.seleccion_presentacion_producto.valueChanges
      .pipe(
        startWith(''),
        map(presentacion_producto => this.filtro_presentacion_producto(presentacion_producto))
      );
    this.filtro_cantidad_medida();
  }

  private filtro_cantidad_medida() {
    this.cantidad_medidas = this.producto.medidas_precios.length;
    for(let i=0; i<this.cantidad_medidas; i++){
      this.array_cantidad_medidas.push(i);
    }
  }

  private filtro_grupo_producto(value: string): string[] {
    if(this.grupos_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.grupos_productos.filter(grupo_producto => grupo_producto.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_grupo_producto(grupo_producto: string): string {
    return grupo_producto ? grupo_producto : '';
  }

  private filtro_sub_grupo_producto(value: string): string[] {
    if(this.sub_grupos_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.sub_grupos_productos.filter(sub_grupo_producto => sub_grupo_producto.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_sub_grupo_producto(sub_grupo_producto: string): string {
    return sub_grupo_producto ? sub_grupo_producto : '';
  }

  private filtro_categoria_producto(value: string): string[] {
    if(this.categorias_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.categorias_productos.filter(categoria_producto => categoria_producto.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_categoria_producto(categoria_producto: string): string {
    return categoria_producto  ? categoria_producto : '';
  }

  private filtro_linea_producto(value: string): string[] {
    if(this.lineas_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.lineas_productos.filter(linea_producto => linea_producto.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_linea_producto(linea_producto: string): string {
    return linea_producto ? linea_producto : '';
  }

  private filtro_sub_linea_producto(value: string): string[] {
    if(this.sub_lineas_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.sub_lineas_productos.filter(sub_linea_producto => sub_linea_producto.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_sub_linea_producto(sub_linea_producto: string): string {
    return sub_linea_producto ? sub_linea_producto : '';
  }

  private filtro_presentacion_producto(value: string): string[] {
    if(this.presentaciones_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.presentaciones_productos.filter(presentacion_producto => presentacion_producto.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_presentacion_producto(presentacion_producto: string): string {
    return presentacion_producto ? presentacion_producto : '';
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
      let indice_tab_activo= this.tab_activo();
      this.tabService.removeTab(indice_tab_activo);
      this.tabService.addNewTab(ProductoComponent, constantes.tab_crear_producto);
  }
  
  crear(event){
    if (event!=null)
      event.preventDefault();
    if (this.seleccion_grupo_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_grupo_producto, constantes.error_swal);
      return;
    }
    if (this.seleccion_sub_grupo_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_sub_grupo_producto, constantes.error_swal);
      return;
    }
    if (this.seleccion_categoria_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_categoria_producto, constantes.error_swal);
      return;
    }
    if (this.seleccion_linea_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_linea_producto, constantes.error_swal);
      return;
    }
    if (this.seleccion_sub_linea_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_sub_linea_producto, constantes.error_swal);
      return;
    }
    if(this.seleccion_presentacion_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_presentacion_producto, constantes.error_swal);
      return;
    }
    if(this.producto.impuesto.id==0){
      Swal.fire(constantes.error, constantes.error_impuesto, constantes.error_swal);
      return;
    }
    if(this.producto.tipo_gasto.id==0){
      Swal.fire(constantes.error, constantes.error_tipo_gasto, constantes.error_swal);
      return;
    }
    if(this.producto.tipo_producto.id==0){
      Swal.fire(constantes.error, constantes.error_tipo_producto, constantes.error_swal);
      return;
    }
    console.log(this.producto);
    this.productoService.crear(this.producto).subscribe(
      res => {
        this.producto=res.resultado as Producto;
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
        let indice_tab_activo = constantes.tab_activo(this.tabService);
        this.tabService.removeTab(indice_tab_activo);
        this.tabService.addNewTab(ProductoComponent, constantes.tab_crear_producto);
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  } 

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.seleccion_grupo_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_grupo_producto, constantes.error_swal);
      return;
    }
    if (this.seleccion_sub_grupo_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_sub_grupo_producto, constantes.error_swal);
      return;
    }
    if (this.seleccion_categoria_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_categoria_producto, constantes.error_swal);
      return;
    }
    if (this.seleccion_linea_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_linea_producto, constantes.error_swal);
      return;
    }
    if (this.seleccion_sub_linea_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_sub_linea_producto,constantes.error_swal);
      return;
    }
    if(this.seleccion_presentacion_producto.value.id==0){
      Swal.fire(constantes.error, constantes.error_presentacion_producto, constantes.error_swal);
      return;
    }
    if(this.producto.impuesto.id==0){
      Swal.fire(constantes.error, constantes.error_impuesto,constantes.error_swal);
      return;
    }
    if(this.producto.tipo_gasto.id==0){
      Swal.fire(constantes.error, constantes.error_tipo_gasto, constantes.error_swal);
      return;
    }
    if(this.producto.tipo_producto.id==0){
      Swal.fire(constantes.error, constantes.error_tipo_producto, constantes.error_swal);
      return;
    }
    console.log(this.producto);
    this.productoService.actualizar(this.producto).subscribe(
      res => {
        Swal.fire(constantes.exito, res.mensaje, constantes.exito_swal);
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  seleccionar_grupo_producto(){
    let grupo=this.seleccion_grupo_producto.value;
    this.grupoProductoService.consultar_subgrupos(grupo).subscribe(
      res => {
        this.sub_grupos_productos=res.resultado as string[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  seleccionar_sub_grupo_producto(){
    let grupo=this.seleccion_grupo_producto.value;
    let subgrupo=this.seleccion_sub_grupo_producto.value;
    this.grupoProductoService.consultar_categorias(grupo, subgrupo).subscribe(
      res => {
        this.categorias_productos=res.resultado as string[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  seleccionar_categoria_producto(){
    let grupo=this.seleccion_grupo_producto.value;
    let subgrupo=this.seleccion_sub_grupo_producto.value;
    let categoria=this.seleccion_categoria_producto.value;
    this.grupoProductoService.consultar_lineas(grupo, subgrupo, categoria).subscribe(
      res => {
        this.lineas_productos=res.resultado as string[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  seleccionar_linea_producto(){
    let grupo=this.seleccion_grupo_producto.value;
    let subgrupo=this.seleccion_sub_grupo_producto.value;
    let categoria=this.seleccion_categoria_producto.value;
    let linea=this.seleccion_linea_producto.value;
    this.producto.nombre=linea;
    this.grupoProductoService.consultar_sublineas(grupo, subgrupo, categoria, linea).subscribe(
      res => {
        this.sub_lineas_productos=res.resultado as string[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  seleccionar_sub_linea_producto(){
    let grupo=this.seleccion_grupo_producto.value;
    let subgrupo=this.seleccion_sub_grupo_producto.value;
    let categoria=this.seleccion_categoria_producto.value;
    let linea=this.seleccion_linea_producto.value;
    let sublinea=this.seleccion_sub_linea_producto.value;
    this.producto.nombre=linea+constantes.espacio+sublinea;
    this.grupoProductoService.consultar_presentaciones(grupo, subgrupo, categoria, linea, sublinea).subscribe(
      res => {
        this.presentaciones_productos=res.resultado as string[];
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }
  seleccionar_presentacion_producto(){
    this.producto.nombre=this.obtener_nombre_producto();
    let grupo=this.seleccion_grupo_producto.value;
    let subgrupo=this.seleccion_sub_grupo_producto.value;
    let categoria=this.seleccion_categoria_producto.value;
    let linea=this.seleccion_linea_producto.value;
    let sublinea=this.seleccion_sub_linea_producto.value;
    let presentacion=this.seleccion_presentacion_producto.value;
    this.producto.nombre=linea+constantes.espacio+sublinea+constantes.espacio+presentacion;
    this.grupoProductoService.obtener_grupo_producto(grupo, subgrupo, categoria, linea, sublinea, presentacion).subscribe(
      res => {
        this.producto.grupo_producto=res.resultado as GrupoProducto;
      },
      err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
    );
  }

  crear_precio(){
    if (this.producto.impuesto.id==0){
      Swal.fire(constantes.error, constantes.error_impuesto, constantes.error_swal);
      return;
    }
    if (this.precio.costo==0){
      Swal.fire(constantes.error, constantes.error_costo, constantes.error_swal);
      return;
    }
    let medida_precio=new MedidaPrecio();
    medida_precio.medida=this.medida;
    for(let i=0; i<this.segmentos.length; i++){
      let precio=new Precio();
      precio.costo=this.precio.costo;
      precio.segmento=this.segmentos[i];
      medida_precio.precios.push(precio);    
    }
    this.producto.medidas_precios.push(medida_precio);
    this.precios_tabla= new BehaviorSubject(medida_precio.precios);
    this.datos.push(this.precios_tabla);
    this.activar_controles(this.datos.length-1);
    this.actualizar_precios();
    this.eliminar_medida();
    this.filtro_cantidad_medida();
  }
  eliminar_medida(){
    for (let i=0; i<this.medidas.length; i++){
      if (this.medidas[i].codigo_norma==this.medida.codigo_norma){
        this.medidas.splice(i, 1);
      }
    }
  }
  eliminar_medida_inicial(){
    for (let i=0; i<this.medidas.length; i++){
      if (this.medidas[i].codigo_norma==this.kardex_inicial.medida.codigo_norma){
        this.medidas.splice(i, 1);
      }
    }
  }
  eliminar_medidas_actualizacion(){
    console.log(this.medidas);
    console.log(this.producto.medidas_precios);
    for(let z=0; z<this.producto.medidas_precios.length; z++){
      for (let i=0; i<this.medidas.length; i++){
        if (this.producto.medidas_precios[z].medida.codigo_norma==this.medidas[i].codigo_norma){
          this.medidas.splice(i, 1);
        }
      }
    }
  }

  obtener_tabla_equivalencia_medida(){
    this.tablaEquivalenciaService.obtenerMedida1Medida2(this.kardex_inicial.medida, this.medida).subscribe(
      res => {
        this.tabla_equivalencia_medida = res.resultado as TablaEquivalenciaMedida;
        this.precio.costo=this.kardex_inicial.costo_unitario*this.tabla_equivalencia_medida.equivalencia;
        this.precio.costo=Number(this.precio.costo.toFixed(2));
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  validar_precios(){
    for (let i=0; i<this.producto.medidas_precios.length; i++){
      if (this.producto.medidas_precios[i].medida.codigo_norma==this.medida.codigo_norma){
        return true;
      }
    }
    return false;
  }

  actualizar_precios(){
    for(let i=0; i<this.producto.medidas_precios.length; i++){
      for(let j=0; j<this.producto.medidas_precios[i].precios.length; j++){
        this.producto.medidas_precios[i].precios[j].precio_venta_publico=(this.producto.medidas_precios[i].precios[j].costo/(1-(this.producto.medidas_precios[i].precios[j].margen_ganancia/100)));
        this.producto.medidas_precios[i].precios[j].precio_venta_publico=Number(this.producto.medidas_precios[i].precios[j].precio_venta_publico.toFixed(2));
        this.producto.medidas_precios[i].precios[j].precio_venta_publico_iva=this.producto.medidas_precios[i].precios[j].precio_venta_publico+(this.producto.medidas_precios[i].precios[j].precio_venta_publico*(this.producto.impuesto.porcentaje/100));
        this.producto.medidas_precios[i].precios[j].precio_venta_publico_iva=Number(this.producto.medidas_precios[i].precios[j].precio_venta_publico_iva.toFixed(2));
        this.producto.medidas_precios[i].precios[j].precio_venta_publico_manual= this.producto.medidas_precios[i].precios[j].precio_venta_publico_iva;
        this.producto.medidas_precios[i].precios[j].utilidad=this.producto.medidas_precios[i].precios[j].precio_venta_publico_manual/((100+(this.producto.impuesto.porcentaje))/100)-this.producto.medidas_precios[i].precios[j].costo;
        this.producto.medidas_precios[i].precios[j].utilidad=Number(this.producto.medidas_precios[i].precios[j].utilidad.toFixed(2));
        this.producto.medidas_precios[i].precios[j].utilidad_porcentaje=(this.producto.medidas_precios[i].precios[j].utilidad/this.producto.medidas_precios[i].precios[j].precio_venta_publico)*100;
        this.producto.medidas_precios[i].precios[j].utilidad_porcentaje=Number(this.producto.medidas_precios[i].precios[j].utilidad_porcentaje.toFixed(2));
      }
    }
  }

  activar_controles(i: number){
    const toGroups = this.datos[i].value.map(entity => {
      return new FormGroup({
        costo: new FormControl(entity.costo, Validators.required), 
        margen_ganancia: new FormControl(entity.margen_ganancia, Validators.required), 
        precio_venta_publico_manual: new FormControl(entity.precio_venta_publico_manual, Validators.required),
      },{updateOn: "blur"});
    });
    this.controls.push(new FormArray(toGroups));
  }

  actualizar_calculos_precios(i, index, field) {
    const control = this.getControl(i, index, field);
    if (control.valid) {
      this.update(i, index,field,control.value);
      this.actualizar_precios();
    }
   }

  update(i, index, field, value) {
    this.producto.medidas_precios[i].precios = this.producto.medidas_precios[i].precios.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    this.datos[i].next(this.producto.medidas_precios[i].precios);
  }

  getControl(i, index, fieldName) {
    const a  = this.controls[i].at(index).get(fieldName) as FormControl;
    return this.controls[i].at(index).get(fieldName) as FormControl;
  }

  cargar_saldo_inicial(){
    if(this.producto.impuesto.id==0){
      Swal.fire(constantes.error, constantes.error_impuesto, constantes.error_swal);
      return;
    }
    if(this.kardex_inicial.medida.id==0){
      Swal.fire(constantes.error, constantes.error_medida, constantes.error_swal);
      return;
    }
    if(this.kardex_inicial.cantidad==0){
      Swal.fire(constantes.error, constantes.error_cantidad, constantes.error_swal);
      return;
    }
    if (this.kardex_inicial.costo_unitario==0){
      Swal.fire(constantes.error, constantes.error_costo_unitario, constantes.error_swal);
      return;
    }
    if (this.kardex_inicial.costo_total==0){
      Swal.fire(constantes.error, constantes.error_costo_total, constantes.error_swal);
      return;
    }
    this.kardex_final=this.kardex_inicial;
    this.producto.kardexs.push(this.kardex_inicial);
    this.precio.costo=this.kardex_inicial.costo_unitario;
    let medida_precio=new MedidaPrecio();
    medida_precio.medida=this.kardex_inicial.medida;
    for(let i=0; i<this.segmentos.length; i++){
      let precio=new Precio();
      precio.costo=this.precio.costo;
      precio.segmento=this.segmentos[i];
      medida_precio.precios.push(precio);
    }
    this.producto.medidas_precios.push(medida_precio);
    this.precios_tabla= new BehaviorSubject(medida_precio.precios);
    this.datos.push(this.precios_tabla);
    this.activar_controles(this.datos.length-1);
    this.actualizar_precios();
    if(this.producto.kardexs.length>0){
      this.habilitar_saldo_inicial=true;
      this.habilitar_otras_medidas=false;
    }
    this.eliminar_medida_inicial()
    this.filtro_cantidad_medida();  
  }

  seleccionar_cantidad(){
    this.kardex_inicial.costo_total=Number((this.kardex_inicial.cantidad*this.kardex_inicial.costo_unitario).toFixed(2));
  }
  seleccionar_costo_unitario(){
    this.kardex_inicial.costo_total=Number((this.kardex_inicial.cantidad*this.kardex_inicial.costo_unitario).toFixed(2));
  }

  private obtener_nombre_producto(){
    let categoria_producto=this.seleccion_categoria_producto.value!= null ? this.seleccion_categoria_producto.value.nombre: "";
    let linea_producto=this.seleccion_linea_producto.value!= null ? this.seleccion_linea_producto.value.nombre: "";
    let sub_linea_producto=this.seleccion_sub_linea_producto.value!= null ? this.seleccion_sub_linea_producto.value.nombre: "";
    let presentacion_producto=this.seleccion_presentacion_producto.value!= null ? this.seleccion_presentacion_producto.value.nombre: "";
    return categoria_producto+" "+linea_producto+" "+sub_linea_producto+" "+presentacion_producto;
  }

  obtener_impuesto(){
    this.impuestoService.obtener(this.producto.impuesto.id).subscribe(
      res => {
        this.producto.impuesto = res.resultado as Impuesto;
      },
      err => {
        Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message });
      }
    );
  }

  obtener_medida_saldo_inicial(){
    this.medidaService.obtener(this.kardex_inicial.medida.id).subscribe(
      res => {
        this.kardex_inicial.medida = res.resultado as Medida;
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  async construir_producto() {
    let producto_id=0;
    this.productoService.currentMessage.subscribe(message => producto_id = message);
    if (producto_id!= 0) {
      await this.productoService.obtenerAsync(producto_id).then(
        res => {
          console.log(res);
          this.producto= res.resultado as Producto;
          console.log(this.producto);
          console.log(this.producto.grupo_producto.grupo);
          this.activo=this.producto.estado;
          if(this.producto.kardexs.length>0){
            this.habilitar_saldo_inicial=true;
            this.habilitar_otras_medidas=false;
            this.kardex_final=this.producto.kardexs[this.producto.kardexs.length-1];
            this.kardex_inicial=this.producto.kardexs[0];
          }
          this.eliminar_medidas_actualizacion();
          this.seleccion_grupo_producto.setValue(this.producto.grupo_producto.grupo);
          this.seleccion_sub_grupo_producto.setValue(this.producto.grupo_producto.subgrupo);
          this.seleccion_categoria_producto.setValue(this.producto.grupo_producto.categoria);
          this.seleccion_linea_producto.setValue(this.producto.grupo_producto.linea);
          this.seleccion_sub_linea_producto.setValue(this.producto.grupo_producto.sublinea);
          this.seleccion_presentacion_producto.setValue(this.producto.grupo_producto.presentacion);
          for(let i=0; i<this.producto.medidas_precios.length; i++){
            let precios=[];
            Object.assign(precios, this.producto.medidas_precios[i].precios as Precio[]);
            this.precios_tabla= new BehaviorSubject(precios);
            this.datos.push(this.precios_tabla);
            this.activar_controles(this.datos.length-1);
            this.actualizar_precios();
          }
          if(this.producto.kardexs.length>0){
            this.habilitar_saldo_inicial=true;
            this.habilitar_otras_medidas=false;
          }
          this.eliminar_medida_inicial()
          this.filtro_cantidad_medida();
        },
        err => Swal.fire({ icon: constantes.error_swal, title: constantes.error, text: err.error.codigo, footer: err.error.message })
      );
    }
  }

  recargar() {
    let actual = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([actual]);
      });
  }

  private tab_activo(){
    for(let i=0; i<this.tabService.tabs.length; i++){
      if(this.tabService.tabs[i].active){
        return i;
      }
    }
  }
}

