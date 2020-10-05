import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProductoService } from '../../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { Kardex } from '../../modelos/kardex';
import { KardexService } from '../../servicios/kardex.service';
import { MedidaService } from '../../servicios/medida.service';
import { Medida } from '../../modelos/medida';

@Component({
  selector: 'app-saldo-inicial-inventario',
  templateUrl: './saldo-inicial-inventario.component.html',
  styleUrls: ['./saldo-inicial-inventario.component.scss']
})
export class SaldoInicialInventarioComponent implements OnInit {

  productos: Producto[]=[];
  seleccion_producto = new FormControl();
  filtro_productos: Observable<Producto[]> = new Observable<Producto[]>();

  medidas: Medida[]=[];

  kardex: Kardex=new Kardex();

  constructor(private productoService: ProductoService, private kardexService: KardexService,
              private medidaService: MedidaService) { }

  ngOnInit() {
    this.consultar_productos();
    this.consultar_medidas();
    this.filtro_productos = this.seleccion_producto.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' || value==null ? value : value.id),
        map(producto => typeof producto === 'string' ? this.filtro_producto(producto) : this.productos.slice())
      );
  }

  consultar_medidas(){
    this.medidaService.consultar().subscribe(
      res => {
        this.medidas = res.resultado as Medida[];
      },
      err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    );
  }

  consultar_productos() {
    this.productoService.consultar().subscribe(
    res => {
      this.productos = res.resultado as Producto[]
    },
    err => Swal.fire('Error', err.error.mensaje, 'error')
    );
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

  crear(event){
    if (event!=null)
      event.preventDefault();
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
    if (this.kardex.producto.id==0){
      Swal.fire('Error', constantes.error_producto, 'error');
      return;
    }
    this.kardexService.crear(this.kardex).subscribe(
      res => {
        Swal.fire('Exito', res.mensaje, 'success');
        this.seleccion_producto.setValue('');
        this.kardex=new Kardex();
      },
      err => Swal.fire('Error', err.error.mensaje, 'error')
    );
  }

  seleccionar_producto(){
    this.productoService.obtener(this.seleccion_producto.value.id).subscribe(
      res => {
        let producto = res.resultado as Producto;
        if(producto.kardexs.length<1){
          this.kardex.producto=this.seleccion_producto.value;
        } else{
          this.seleccion_producto.setValue('');
          Swal.fire(constantes.error_mayus, constantes.error_kardex, constantes.error_minus)
        }
      },
      err => Swal.fire(constantes.error_mayus, err.error.mensaje, constantes.error_minus)
      );
  }

  seleccionar_cantidad(){
    this.kardex.costo_total=Number((this.kardex.cantidad*this.kardex.costo_unitario).toFixed(2));
  }
  seleccionar_costo_unitario(){
    this.kardex.costo_total=Number((this.kardex.cantidad*this.kardex.costo_unitario).toFixed(2));
  }

  nuevo(event){
    if (event!=null)
      event.preventDefault();
  }

}
