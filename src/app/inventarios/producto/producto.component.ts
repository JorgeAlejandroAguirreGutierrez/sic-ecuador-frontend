import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

import { GrupoProducto } from '../../modelos/grupo-producto';
import { GrupoProductoService } from '../../servicios/grupo-producto.service';
import { SubGrupoProducto } from '../../modelos/sub-grupo-producto';
import { CategoriaProducto } from '../../modelos/categoria-producto';
import { LineaProducto } from '../../modelos/linea-producto';
import { SubLineaProducto } from '../../modelos/sub-linea-producto';
import { PresentacionProducto } from '../../modelos/presentacion-producto';
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
  precios_tabla: BehaviorSubject<Precio[]> = new BehaviorSubject(this.producto.precios);
  datos = this.precios_tabla;
  controls: FormArray;

  // Para probar separar tablas
  displayedColumnsSugeridoPrueba: string[] = ['medida', 'segmento', 'costo', 'margen_ganancia', 'precio_venta_publico', 'precio_venta_publico_iva'];
  displayedColumnsVentaPrueba: string[] = ['precio_venta_publico_manual', 'utilidad', 'utilidad_porcentaje'];
 
  cantidadMedida: number = 0;
  arrayCantidadMedida: number[]=[];
  datosMedida: any[]=[];
  datosPrueba = [
    {posicion: 1, medida: 'Libra', segmento: 'Distrubuidor', costo: 1.20, margen_ganancia: 12, precio_venta_publico: 2.1, precio_venta_publico_iva: 2.2, precio_venta_publico_manual: 2.15, utilidad: 0.2, utilidad_porcentaje: 15},
    {posicion: 1, medida: 'Libra', segmento: 'Cliente', costo: 1.20, margen_ganancia: 12, precio_venta_publico: 2.1, precio_venta_publico_iva: 2.2, precio_venta_publico_manual: 2.15, utilidad: 0.2, utilidad_porcentaje: 15},
    {posicion: 2, medida: 'Kilogramo', segmento: 'Distrubuidor', costo: 1.20, margen_ganancia: 12, precio_venta_publico: 2.1, precio_venta_publico_iva: 2.2, precio_venta_publico_manual: 2.15, utilidad: 0.2, utilidad_porcentaje: 15},
    {posicion: 2, medida: 'Kilogramo', segmento: 'Cliente', costo: 1.20, margen_ganancia: 12, precio_venta_publico: 2.1, precio_venta_publico_iva: 2.2, precio_venta_publico_manual: 2.15, utilidad: 0.2, utilidad_porcentaje: 15},
    {posicion: 3, medida: 'Arroba', segmento: 'Distrubuidor', costo: 1.20, margen_ganancia: 12, precio_venta_publico: 2.1, precio_venta_publico_iva: 2.2, precio_venta_publico_manual: 2.15, utilidad: 0.2, utilidad_porcentaje: 15},
    {posicion: 3, medida: 'Arroba', segmento: 'Cliente', costo: 1.20, margen_ganancia: 12, precio_venta_publico: 2.1, precio_venta_publico_iva: 2.2, precio_venta_publico_manual: 2.15, utilidad: 0.2, utilidad_porcentaje: 15}
  ];

  tipos_gastos: TipoGasto[]=[];
  segmentos: Segmento[]=[];
  impuestos: Impuesto[]=[];
  
  tipos_productos: TipoProducto[]=[];
  habilitar_otras_medidas: boolean=true;
  habilitar_saldo_inicial: boolean=false;

  precio: Precio=new Precio();
  medida: Medida=new Medida();
  impuesto: Impuesto=new Impuesto();
  kardex: Kardex=new Kardex();

  grupos_productos: GrupoProducto[]=[];
  seleccion_grupo_producto = new FormControl();
  filtro_grupos_productos: Observable<GrupoProducto[]> = new Observable<GrupoProducto[]>();

  sub_grupos_productos: SubGrupoProducto[]=[];
  seleccion_sub_grupo_producto = new FormControl();
  filtro_sub_grupos_productos: Observable<SubGrupoProducto[]> = new Observable<SubGrupoProducto[]>();

  categorias_productos: CategoriaProducto[]=[];
  seleccion_categoria_producto = new FormControl();
  filtro_categorias_productos: Observable<CategoriaProducto[]> = new Observable<CategoriaProducto[]>();

  lineas_productos: LineaProducto[]=[];
  seleccion_linea_producto = new FormControl();
  filtro_lineas_productos: Observable<LineaProducto[]> = new Observable<LineaProducto[]>();

  sub_lineas_productos: SubLineaProducto[]=[];
  seleccion_sub_linea_producto = new FormControl();
  filtro_sub_lineas_productos: Observable<SubLineaProducto[]> = new Observable<SubLineaProducto[]>();

  presentaciones_productos: PresentacionProducto[]=[];
  seleccion_presentacion_producto = new FormControl();
  filtro_presentaciones_productos: Observable<PresentacionProducto[]> = new Observable<PresentacionProducto[]>();

  medidas: Medida[]=[];
  seleccion_medida = new FormControl();
  filtro_medidas: Observable<Medida[]> = new Observable<Medida[]>();

  medidas_popup: Medida[]=[];
  seleccion_medida_popup = new FormControl();
  filtro_medidas_popup: Observable<Medida[]> = new Observable<Medida[]>();

  constructor(private productoService: ProductoService, private grupoProductoService: GrupoProductoService, private kardexService: KardexService,
    private tipoGastoService: TipoGastoService, private impuestoService: ImpuestoService, private router: Router, private modalService: NgbModal,
    private segmentoService: SegmentoService, private tipoProductoService: TipoProductoService, 
    private tabService: TabService, private medidaService: MedidaService) { }

  ngOnInit() {
    this.construir_producto();
    this.consulta_grupos_productos();
    this.consulta_tipos_gastos();
    this.consulta_tipos_productos();
    this.consulta_impuestos();
    this.consulta_medidas();
    this.consulta_medidas_popup();
    this.consulta_segmentos();
    
    this.filtro_grupos_productos = this.seleccion_grupo_producto.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(grupo_producto => typeof grupo_producto === 'string' ? this.filtro_grupo_producto(grupo_producto) : this.grupos_productos.slice())
      );

    this.filtro_sub_grupos_productos = this.seleccion_sub_grupo_producto.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(sub_grupo_producto => typeof sub_grupo_producto === 'string' ? this.filtro_sub_grupo_producto(sub_grupo_producto) : this.sub_grupos_productos.slice())
      );
    this.filtro_categorias_productos = this.seleccion_categoria_producto.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(categoria_producto => typeof categoria_producto === 'string' ? this.filtro_categoria_producto(categoria_producto) : this.categorias_productos.slice())
      );
    this.filtro_lineas_productos = this.seleccion_linea_producto.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(linea_producto => typeof linea_producto === 'string' ? this.filtro_linea_producto(linea_producto) : this.lineas_productos.slice())
      );
    this.filtro_sub_lineas_productos = this.seleccion_sub_linea_producto.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(sub_linea_producto => typeof sub_linea_producto === 'string' ? this.filtro_sub_linea_producto(sub_linea_producto) : this.sub_lineas_productos.slice())
      );
    this.filtro_presentaciones_productos = this.seleccion_presentacion_producto.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(presentacion_producto => typeof presentacion_producto === 'string' ? this.filtro_presentacion_producto(presentacion_producto) : this.presentaciones_productos.slice())
      );
    this.filtro_medidas_popup = this.seleccion_medida_popup.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(medida_popup => typeof medida_popup === 'string' ? this.filtro_medida_popup(medida_popup) : this.medidas_popup.slice())
      );
    this.filtro_medidas = this.seleccion_medida.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(medida => typeof medida === 'string' ? this.filtro_medida(medida) : this.medidas.slice())
      );

    this.filtro_cantidad_medida();
  }

  private filtro_cantidad_medida(): any[] {
    this.cantidadMedida = Math.max.apply(Math, this.datosPrueba.map(function(o) { return o.posicion; }));
    this.arrayCantidadMedida = Array(this.cantidadMedida).fill(1).map((x,i)=>i+1);
    return this.arrayCantidadMedida;
  }

  public filtro_medida_tabla(value: number): any[] {
    this.datosMedida = this.datosPrueba.filter(datosFiltro => datosFiltro.posicion === value);
    console.info(this.datosMedida);
    return this.datosMedida;
  }

  private filtro_grupo_producto(value: string): GrupoProducto[] {
    if(this.grupos_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.grupos_productos.filter(grupo_producto => grupo_producto.nombre.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_grupo_producto(grupo_producto: GrupoProducto): string {
    return grupo_producto && grupo_producto.nombre ? grupo_producto.nombre : '';
  }

  private filtro_sub_grupo_producto(value: string): SubGrupoProducto[] {
    if(this.sub_grupos_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.sub_grupos_productos.filter(sub_grupo_producto => sub_grupo_producto.nombre.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_sub_grupo_producto(sub_grupo_producto: SubGrupoProducto): string {
    return sub_grupo_producto && sub_grupo_producto.nombre ? sub_grupo_producto.nombre : '';
  }

  private filtro_categoria_producto(value: string): CategoriaProducto[] {
    if(this.categorias_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.categorias_productos.filter(categoria_producto => categoria_producto.nombre.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_categoria_producto(categoria_producto: CategoriaProducto): string {
    return categoria_producto && categoria_producto.nombre ? categoria_producto.nombre : '';
  }

  private filtro_linea_producto(value: string): LineaProducto[] {
    if(this.lineas_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.lineas_productos.filter(linea_producto => linea_producto.nombre.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_linea_producto(linea_producto: LineaProducto): string {
    return linea_producto && linea_producto.nombre ? linea_producto.nombre : '';
  }

  private filtro_sub_linea_producto(value: string): SubLineaProducto[] {
    if(this.sub_lineas_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.sub_lineas_productos.filter(sub_linea_producto => sub_linea_producto.nombre.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_sub_linea_producto(sub_linea_producto: SubLineaProducto): string {
    return sub_linea_producto && sub_linea_producto.nombre ? sub_linea_producto.nombre : '';
  }

  private filtro_presentacion_producto(value: string): PresentacionProducto[] {
    if(this.presentaciones_productos.length>0) {
      const filterValue = value.toLowerCase();
      return this.presentaciones_productos.filter(presentacion_producto => presentacion_producto.nombre.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_presentacion_producto(presentacion_producto: PresentacionProducto): string {
    return presentacion_producto && presentacion_producto.nombre ? presentacion_producto.nombre : '';
  }

  private filtro_medida(value: string): Medida[] {
    if(this.medidas.length>0) {
      const filterValue = value.toLowerCase();
      return this.medidas.filter(medida => medida.descripcion.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_medida(medida: Medida): string {
    return medida && medida.descripcion ? medida.descripcion : '';
  }


  private filtro_medida_popup(value: string): Medida[] {
    if(this.medidas_popup.length>0) {
      const filterValue = value.toLowerCase();
      return this.medidas_popup.filter(medida_popup => medida_popup.descripcion.toLowerCase().includes(filterValue));
    }
    return [];
  }
  ver_medida_popup(medida_popup: Medida): string {
    return medida_popup && medida_popup.descripcion ? medida_popup.descripcion : '';
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }
  
  crear(event){
    if (event!=null)
      event.preventDefault();
    if (this.seleccion_grupo_producto.value.id==0){
      Swal.fire('Error', constantes.error_grupo_producto, 'error');
      return;
    }
    if (this.seleccion_sub_grupo_producto.value.id==0){
      Swal.fire('Error', constantes.error_sub_grupo_producto, 'error');
      return;
    }
    if (this.seleccion_categoria_producto.value.id==0){
      Swal.fire('Error', constantes.error_categoria_producto, 'error');
      return;
    }
    if (this.seleccion_linea_producto.value.id==0){
      Swal.fire('Error', constantes.error_linea_producto, 'error');
      return;
    }
    if (this.seleccion_sub_linea_producto.value.id==0){
      Swal.fire('Error', constantes.error_sub_linea_producto, 'error');
      return;
    }
    if(this.seleccion_presentacion_producto.value.id==0){
      Swal.fire('Error', constantes.error_presentacion_producto, 'error');
      return;
    }
    if(this.producto.impuesto.id==0){
      Swal.fire('Error', constantes.error_impuesto, 'error');
      return;
    }
    if(this.producto.tipo_gasto.id==0){
      Swal.fire('Error', constantes.error_tipo_gasto, 'error');
      return;
    }
    if(this.producto.tipo_producto.id==0){
      Swal.fire('Error', constantes.error_tipo_producto, 'error');
      return;
    }
    console.log(this.producto);
    this.productoService.crear(this.producto).subscribe(
      res => {
        this.producto= res.resultado as Producto;
        Swal.fire('Exito', res.mensaje, 'success');
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  } 

  actualizar(event){
    if (event!=null)
      event.preventDefault();
    if (this.seleccion_grupo_producto.value.id==0){
      Swal.fire('Error', constantes.error_grupo_producto, 'error');
      return;
    }
    if (this.seleccion_sub_grupo_producto.value.id==0){
      Swal.fire('Error', constantes.error_sub_grupo_producto, 'error');
      return;
    }
    if (this.seleccion_categoria_producto.value.id==0){
      Swal.fire('Error', constantes.error_categoria_producto, 'error');
      return;
    }
    if (this.seleccion_linea_producto.value.id==0){
      Swal.fire('Error', constantes.error_linea_producto, 'error');
      return;
    }
    if (this.seleccion_sub_linea_producto.value.id==0){
      Swal.fire('Error', constantes.error_sub_linea_producto, 'error');
      return;
    }
    if(this.seleccion_presentacion_producto.value.id==0){
      Swal.fire('Error', constantes.error_presentacion_producto, 'error');
      return;
    }
    if(this.producto.impuesto.id==0){
      Swal.fire('Error', constantes.error_impuesto, 'error');
      return;
    }
    if(this.producto.tipo_gasto.id==0){
      Swal.fire('Error', constantes.error_tipo_gasto, 'error');
      return;
    }
    if(this.producto.tipo_producto.id==0){
      Swal.fire('Error', constantes.error_tipo_producto, 'error');
      return;
    }
    console.log(this.producto);
    this.productoService.actualizar(this.producto).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }
  consulta_grupos_productos(){
    this.grupoProductoService.consultar().subscribe(
      res => {
        this.grupos_productos = res.resultado as GrupoProducto[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }
  consulta_tipos_productos(){
    this.tipoProductoService.consultar().subscribe(
      res => {
        this.tipos_productos = res.resultado as TipoProducto[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }
  consulta_tipos_gastos(){
    this.tipoGastoService.consultar().subscribe(
      res => {
        this.tipos_gastos = res.resultado as TipoGasto[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }
  consulta_impuestos(){
    this.impuestoService.consultar().subscribe(
      res => {
        this.impuestos = res.resultado as Impuesto[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }

  consulta_medidas(){
    this.medidaService.consultar().subscribe(
      res => {
        this.medidas = res.resultado as Medida[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }
  consulta_medidas_popup(){
    this.medidaService.consultar().subscribe(
      res => {
        this.medidas_popup = res.resultado as Medida[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }
  consulta_segmentos(){
    this.segmentoService.consultar().subscribe(
      res => {
        this.segmentos=res.resultado as Segmento[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }

  seleccionar_grupo_producto(){
    this.producto.grupo_producto=this.seleccion_grupo_producto.value;
    this.sub_grupos_productos=this.seleccion_grupo_producto.value.sub_grupos_productos;
  }
  seleccionar_sub_grupo_producto(){
    this.producto.sub_grupo_producto=this.seleccion_sub_grupo_producto.value;
    this.categorias_productos=this.seleccion_sub_grupo_producto.value.categorias_productos;
  }
  seleccionar_categoria_producto(){
    this.producto.categoria_producto=this.seleccion_categoria_producto.value;
    this.lineas_productos=this.seleccion_categoria_producto.value.lineas_productos;
  }
  seleccionar_linea_producto(){
    this.producto.linea_producto=this.seleccion_linea_producto.value;
    this.producto.nombre=this.obtener_nombre_producto();
    this.sub_lineas_productos=this.seleccion_linea_producto.value.sub_lineas_productos;
  }
  seleccionar_sub_linea_producto(){
    this.producto.sub_linea_producto=this.seleccion_sub_linea_producto.value;
    this.producto.nombre=this.obtener_nombre_producto();
    this.presentaciones_productos=this.seleccion_sub_linea_producto.value.presentaciones_productos;
  }
  seleccionar_presentacion_producto(){
    this.producto.presentacion_producto=this.seleccion_presentacion_producto.value;
    this.producto.nombre=this.obtener_nombre_producto();
  }

  crear_precio(){
    if (this.producto.impuesto.id==0){
      Swal.fire('Error', constantes.error_impuesto, 'error');
      return;
    }
    if (this.precio.costo==0){
      Swal.fire('Error', constantes.error_costo, 'error');
      return;
    }
    for(let i=0; i<this.segmentos.length; i++){
      let precio=new Precio();
      precio.medida=this.medida;
      precio.costo=this.precio.costo;
      precio.segmento=this.segmentos[i];
      this.producto.precios.push(precio);
      this.precios_tabla= new BehaviorSubject(this.producto.precios);
      this.datos = this.precios_tabla;
      this.activar_controles();
    }
    this.actualizar_precios();
    this.eliminar_medida();
    
  }

  eliminar_medida_popup(){
    for (let i=0; i<this.medidas.length; i++){
      if (this.medidas[i].codigo_norma==this.kardex.medida.codigo_norma){
        this.medidas.splice(i, 1);
      }
    }
  }
  eliminar_medida(){
    for (let i=0; i<this.medidas.length; i++){
      if (this.medidas[i].codigo_norma==this.medida.codigo_norma){
        this.medidas.splice(i, 1);
      }
    }
  }
  eliminar_medidas_actualizacion(){
    for(let z=0; z<this.producto.precios.length; z++){
      for (let i=0; i<this.medidas.length; i++){
        if (this.producto.precios[z].medida.codigo_norma==this.medidas[i].codigo_norma){
          this.medidas.splice(i, 1);
        }
      }
    }
    
  }

  validar_precios(){
    for (let i=0; i<this.producto.precios.length; i++){
      if (this.producto.precios[i].medida.codigo_norma==this.medida.codigo_norma){
        return true;
      }
    }
    return false;
  }

  actualizar_precios(){
    for(let i=0; i<this.producto.precios.length; i++){
      this.producto.precios[i].precio_venta_publico=(this.producto.precios[i].costo/(1-(this.producto.precios[i].margen_ganancia/100)));
      this.producto.precios[i].precio_venta_publico=Number(this.producto.precios[i].precio_venta_publico.toFixed(2));
      this.producto.precios[i].precio_venta_publico_iva=this.producto.precios[i].precio_venta_publico+(this.producto.precios[i].precio_venta_publico*(this.impuesto.porcentaje/100));
      this.producto.precios[i].precio_venta_publico_iva=Number(this.producto.precios[i].precio_venta_publico_iva.toFixed(2));
      this.producto.precios[i].utilidad=this.producto.precios[i].precio_venta_publico_manual/((100+(this.impuesto.porcentaje))/100)-this.producto.precios[i].costo;
      this.producto.precios[i].utilidad=Number(this.producto.precios[i].utilidad.toFixed(2));
      this.producto.precios[i].utilidad_porcentaje=(this.producto.precios[i].utilidad/this.producto.precios[i].precio_venta_publico)*100;
      this.producto.precios[i].utilidad_porcentaje=Number(this.producto.precios[i].utilidad_porcentaje.toFixed(2));
    }
  }

  activar_controles(){
    const toGroups = this.precios_tabla.value.map(entity => {
      return new FormGroup({
        costo: new FormControl(entity.costo, Validators.required), 
        margen_ganancia: new FormControl(entity.margen_ganancia, Validators.required), 
        precio_venta_publico_manual: new FormControl(entity.precio_venta_publico_manual, Validators.required),
      },{updateOn: "blur"});
    });
    this.controls = new FormArray(toGroups);
  }

  actualizar_calculos_precios(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.update(index,field,control.value);
      this.actualizar_precios();
    }
   }

  update(index, field, value) {
    this.producto.precios = this.producto.precios.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    this.precios_tabla.next(this.producto.precios);
  }

  getControl(index, fieldName) {
    const a  = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  cargar_saldo_inicial(){
    if(this.producto.impuesto.id==0){
      Swal.fire('Error', constantes.error_impuesto, 'error');
      return;
    }
    this.kardex.medida=this.seleccion_medida_popup.value;
    if(this.kardex.medida.id==0){
      Swal.fire('Error', constantes.error_medida, 'error');
      return;
    }
    if(this.kardex.cantidad==0){
      Swal.fire('Error', constantes.error_cantidad, 'error');
      return;
    }
    if (this.kardex.costo_unitario==0){
      Swal.fire('Error', constantes.error_costo_unitario, 'error');
      return;
    }
    if (this.kardex.costo_total==0){
      Swal.fire('Error', constantes.error_costo_total, 'error');
      return;
    }
    this.producto.kardexs.push(this.kardex);
    this.precio.costo=this.kardex.costo_unitario;
    for(let i=0; i<this.segmentos.length; i++){
      let precio=new Precio();
      precio.medida=this.kardex.medida;
      precio.costo=this.precio.costo;
      precio.segmento=this.segmentos[i];
      this.producto.precios.push(precio);
      this.precios_tabla= new BehaviorSubject(this.producto.precios);
      this.datos = this.precios_tabla;
      this.activar_controles();
    }
    this.actualizar_precios();
    this.eliminar_medida_popup();
    if(this.producto.kardexs.length>0){
      this.habilitar_saldo_inicial=true;
      this.habilitar_otras_medidas=false;
    }  
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

  seleccionar_cantidad(){
    this.kardex.costo_total=Number((this.kardex.cantidad*this.kardex.costo_unitario).toFixed(2));
  }
  seleccionar_costo_unitario(){
    this.kardex.costo_total=Number((this.kardex.cantidad*this.kardex.costo_unitario).toFixed(2));
  }

  private obtener_nombre_producto(){
    let categoria_producto=this.seleccion_categoria_producto.value!= null ? this.seleccion_categoria_producto.value.nombre: "";
    let linea_producto=this.seleccion_linea_producto.value!= null ? this.seleccion_linea_producto.value.nombre: "";
    let sub_linea_producto=this.seleccion_sub_linea_producto.value!= null ? this.seleccion_sub_linea_producto.value.nombre: "";
    let presentacion_producto=this.seleccion_presentacion_producto.value!= null ? this.seleccion_presentacion_producto.value.nombre: "";
    return categoria_producto+" "+linea_producto+" "+sub_linea_producto+" "+presentacion_producto;
  }

  async construir_producto() {
    let producto_id=0;
    this.productoService.currentMessage.subscribe(message => producto_id = message);
    if (producto_id!= 0) {
      await this.productoService.obtenerAsync(producto_id).then(
        res => {
          Object.assign(this.producto, res.resultado as Producto);
          if(this.producto.kardexs.length>0){
            this.habilitar_saldo_inicial=true;
            this.habilitar_otras_medidas=false;
          }
          this.eliminar_medidas_actualizacion();
          this.seleccion_grupo_producto.setValue(this.producto.grupo_producto);
          this.seleccion_sub_grupo_producto.setValue(this.producto.sub_grupo_producto);
          this.seleccion_categoria_producto.setValue(this.producto.categoria_producto);
          this.seleccion_linea_producto.setValue(this.producto.linea_producto);
          this.seleccion_sub_linea_producto.setValue(this.producto.sub_linea_producto);
          this.seleccion_presentacion_producto.setValue(this.producto.presentacion_producto);
          this.precios_tabla= new BehaviorSubject(this.producto.precios);
          this.datos = this.precios_tabla;
        },
        err => Swal.fire('Error', err.error.mensaje, 'error')
      );
    }
  }

  recargar() {
    let actual = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([actual]);
      });
  }
}

