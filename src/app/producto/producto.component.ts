import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  panelOpenState=false;
  displayedColumnsSugerido: string[] = ['position', 'medida', 'segmento', 'costo', 'ganancia', 'precio', 'pvp'];
  displayedColumnsVenta: string[] = ['position', 'pvpf', 'rendimiento', 'utilidad'];
  dataSource = this.core.list$;
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
  impuestos: Impuesto[]=[];
  unidades_kardex: Medida[]=[];
  medidas: Medida[]=[];
  habilitar_otras_medidas: boolean=true;
  precio: Precio=new Precio();
  unidad_kardex: Medida=new Medida();
  medida: Medida=new Medida();

  constructor(private core: CoreService, private grupoProductoService: GrupoProductoService, 
    private tipoGastoService: TipoGastoService, private impuestoService: ImpuestoService, private medidaService: MedidaService) { }

  ngOnInit() {
    const toGroups = this.core.list$.value.map(entity => {
      return new FormGroup({
        position:  new FormControl(entity.position, Validators.required),
        medida: new FormControl(entity.medida, Validators.required), 
        segmento: new FormControl(entity.segmento, Validators.required), 
        costo: new FormControl(entity.costo, Validators.required),
        ganancia: new FormControl(entity.ganancia, Validators.required), 
        precio: new FormControl(entity.precio, Validators.required),
        pvp: new FormControl(entity.pvp, Validators.required),
        pvpf: new FormControl(entity.pvpf, Validators.required),
        rendimiento: new FormControl(entity.rendimiento, Validators.required), 
        utilidad: new FormControl(entity.utilidad, Validators.required)
      },{updateOn: "blur"});
    });

    this.controls = new FormArray(toGroups);

    this.consulta_grupos_productos();
    this.consulta_tipos_gastos();
    this.consulta_impuestos();
    this.consulta_medidas();
    
  }

  updateField(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.core.update(index,field,control.value);
    }

   }

  getControl(index, fieldName) {
    const a  = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  nuevo(event){

  }
  
  crear(event){

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
        this.unidades_kardex=res.resultado as Medida[];
        this.medidas = res.resultado as Medida[];
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
  }

  crear_precio(){
    this.habilitar_otras_medidas=false;
    this.precio.medida=this.medida;
    this.producto.precios.push(new Precio());
  }
}

