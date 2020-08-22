import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';

import { CoreService } from '../tabla-editable/services/core.service';
import { GrupoProducto } from '../modelos/grupo-producto';
import { GrupoProductoService } from '../servicios/grupo-producto.service';
import { SubGrupoProducto } from '../modelos/sub-grupo-producto';
import { CategoriaProducto } from '../modelos/categoria-producto';
import { LineaProducto } from '../modelos/linea-producto';
import { SubLineaProducto } from '../modelos/sub-linea-producto';
import { PresentacionProducto } from '../modelos/presentacion-producto';
import { Producto } from '../modelos/producto';
import { TipoGasto } from '../modelos/tipo-gasto';
import { TipoGastoService } from '../servicios/tipo-gasto.service';
import { Impuesto } from '../modelos/impuesto';
import { ImpuestoService } from '../servicios/impuesto.service';
import { Medida } from '../modelos/medida';
import { MedidaService } from '../servicios/medida.service';
import { Precio } from '../modelos/precio';
import { BehaviorSubject } from 'rxjs';
import { SegmentoService } from '../servicios/segmento.service';
import { Segmento } from '../modelos/segmento';
import { ProductoService } from '../servicios/producto.service';
import { TipoProductoService } from '../servicios/tipo-producto.service';
import { TipoProducto } from '../modelos/tipo-producto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  panelOpenState=false;
  displayedColumnsSugerido: string[] = ['medida', 'segmento', 'costo', 'margen_ganancia', 'precio_venta_publico', 'precio_venta_publico_iva'];
  displayedColumnsVenta: string[] = ['precio_venta_publico_manual', 'utilidad', 'utilidad_porcentaje'];
  precios: Precio[] = [];
  precios_tabla: BehaviorSubject<Precio[]> = new BehaviorSubject(this.precios);
  datos = this.precios_tabla;
  controls: FormArray;
  grupos_productos: GrupoProducto[]=[];
  sub_grupos_productos: SubGrupoProducto[]=[];
  categorias_productos: CategoriaProducto[]=[];
  lineas_productos: LineaProducto[]=[];
  sub_lineas_productos: SubLineaProducto[]=[];
  presentaciones_productos: PresentacionProducto[]=[];
  grupo_producto: GrupoProducto=new GrupoProducto();
  sub_grupo_producto: SubGrupoProducto=new SubGrupoProducto();
  categoria_producto: CategoriaProducto=new CategoriaProducto();
  linea_producto: LineaProducto=new LineaProducto();
  sub_linea_producto: SubLineaProducto=new SubLineaProducto();
  presentacion_producto: PresentacionProducto=new PresentacionProducto();
  producto: Producto=new Producto();

  tipos_gastos: TipoGasto[]=[];
  segmentos: Segmento[]=[];
  impuestos: Impuesto[]=[];
  unidades_kardex: Medida[]=[];
  medidas: Medida[]=[];
  tipos_productos: TipoProducto[]=[];
  habilitar_otras_medidas: boolean=true;
  precio: Precio=new Precio();
  unidad_kardex: Medida=new Medida();
  medida: Medida=new Medida();
  impuesto: Impuesto=new Impuesto();
  tipo_gasto: TipoGasto=new TipoGasto();

  constructor(private productoService: ProductoService, private grupoProductoService: GrupoProductoService, 
    private tipoGastoService: TipoGastoService, private impuestoService: ImpuestoService, private router: Router,
    private segmentoService: SegmentoService, private tipoProductoService: TipoProductoService, private medidaService: MedidaService) { }

  ngOnInit() {
    this.consulta_grupos_productos();
    this.consulta_tipos_gastos();
    this.consulta_tipos_productos();
    this.consulta_impuestos();
    this.consulta_medidas();
    this.consulta_unidades_kardex();
    this.consulta_segmentos();
  }

  nuevo(event){

  }
  
  crear(event){
    if (event!=null)
      event.preventDefault();
    if (this.grupo_producto.id==0){
      Swal.fire('Error', constantes.error_grupo_producto, 'error');
      return;
    }
    if (this.sub_grupo_producto.id==0){
      Swal.fire('Error', constantes.error_sub_grupo_producto, 'error');
      return;
    }
    if (this.categoria_producto.id==0){
      Swal.fire('Error', constantes.error_categoria_producto, 'error');
      return;
    }
    if (this.linea_producto.id==0){
      Swal.fire('Error', constantes.error_linea_producto, 'error');
      return;
    }
    if (this.sub_linea_producto.id==0){
      Swal.fire('Error', constantes.error_sub_linea_producto, 'error');
      return;
    }
    if(this.presentacion_producto.id==0){
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
    if(this.unidad_kardex.id==0){
      Swal.fire('Error', constantes.error_unidad_kardex, 'error');
      return;
    }
    console.log(this.producto);
    this.producto.precios=this.precios;
    this.productoService.crear(this.producto).subscribe(
      res => {
        this.producto = res.resultado as Producto;
        Swal.fire('Exito', res.mensaje, 'success');
        this.router.navigate(['/main']);
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  } 

  actualizar(event){

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
  consulta_unidades_kardex(){
    this.medidaService.consultar().subscribe(
      res => {
        this.unidades_kardex = res.resultado as Medida[];
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

  validar_grupo_producto(){
    this.sub_grupos_productos=this.grupo_producto.sub_grupos_productos;
  }
  validar_sub_grupo_producto(){
    this.categorias_productos=this.sub_grupo_producto.categorias_productos;
  }
  validar_categoria_producto(){
    this.lineas_productos=this.categoria_producto.lineas_productos;
  }
  validar_linea_producto(){
    this.sub_lineas_productos=this.linea_producto.sub_lineas_productos;
  }
  validar_sub_linea_producto(){
    this.presentaciones_productos=this.sub_linea_producto.presentaciones_productos;
  }
  validar_presentacion_producto(){
    this.producto.nombre=this.categoria_producto.nombre+" "+this.linea_producto.nombre+" "+this.sub_linea_producto.nombre+" "+this.presentacion_producto.nombre;
    this.producto.presentacion_producto=this.presentacion_producto;
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
    if (this.habilitar_otras_medidas){
      if (this.unidad_kardex.id==0){
        Swal.fire('Error', constantes.error_unidad_kardex, 'error');
        return;
      }
      this.habilitar_otras_medidas=false;
      for(let i=0; i<this.segmentos.length; i++){
        let precio=new Precio();
        precio.medida=this.unidad_kardex;
        precio.costo=this.precio.costo;
        precio.segmento=this.segmentos[i];
        this.precios.push(precio);
        this.precios_tabla= new BehaviorSubject(this.precios);
        this.datos = this.precios_tabla;
        this.activar_controles();
      }
      this.eliminar_medida_kardex();
    } else {
      if (this.medida.id==0 || this.validar_precios()){
        Swal.fire('Error', constantes.error_medida, 'error');
        return;
      }
      for(let i=0; i<this.segmentos.length; i++){
        let precio=new Precio();
        precio.medida=this.medida;
        precio.costo=this.precio.costo;
        precio.segmento=this.segmentos[i];
        this.precios.push(precio);
        this.precios_tabla= new BehaviorSubject(this.precios);
        this.datos = this.precios_tabla;
        this.activar_controles();
      }
      this.eliminar_medida();
    }
    
  }

  eliminar_medida_kardex(){
    for (let i=0; i<this.medidas.length; i++){
      if (this.medidas[i].codigo_norma==this.unidad_kardex.codigo_norma){
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

  validar_precios(){
    for (let i=0; i<this.precios.length; i++){
      if (this.precios[i].medida.codigo_norma==this.medida.codigo_norma){
        return true;
      }
    }
    return false;
  }

  actualizar_precios(){
    for(let i=0; i<this.precios.length; i++){
      this.precios[i].precio_venta_publico=(this.precios[i].costo/(1-(this.precios[i].margen_ganancia/100)));
      this.precios[i].precio_venta_publico=Number(this.precios[i].precio_venta_publico.toFixed(2));
      this.precios[i].precio_venta_publico_iva=this.precios[i].precio_venta_publico+(this.precios[i].precio_venta_publico*(this.impuesto.porcentaje/100));
      this.precios[i].precio_venta_publico_iva=Number(this.precios[i].precio_venta_publico_iva.toFixed(2));
      this.precios[i].utilidad=this.precios[i].precio_venta_publico_manual/((100+(this.impuesto.porcentaje))/100)-this.precios[i].costo;
      this.precios[i].utilidad=Number(this.precios[i].utilidad.toFixed(2));
      this.precios[i].utilidad_porcentaje=(this.precios[i].utilidad/this.precios[i].precio_venta_publico)*100;
      this.precios[i].utilidad_porcentaje=Number(this.precios[i].utilidad_porcentaje.toFixed(2));
    }
  }

  activar_controles(){
    const toGroups = this.precios_tabla.value.map(entity => {
      return new FormGroup({
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
    this.precios = this.precios.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    this.precios_tabla.next(this.precios);
  }

  getControl(index, fieldName) {
    const a  = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  
}

