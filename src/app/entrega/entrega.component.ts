import { Component, OnInit, Input } from '@angular/core';
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
import { Direccion } from '../modelos/direccion';
import { GuiaRemisionService } from '../servicios/guia-remision.service';
import { Sesion } from '../modelos/sesion';
import { Router } from '@angular/router';
import { FacturaService } from '../servicios/factura.service';

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
  guia_remision_crear: GuiaRemision;
  sesion: Sesion;
  provincias: Ubicacion[];
  cantones: Ubicacion[];
  parroquias: Ubicacion[];
  bandera_opcion: boolean=false;

  constructor(private transportistaService: TransportistaService, private sesionService: SesionService, private router: Router,
    private vehiculoTransporteService: VehiculoTransporteService, private facturaService: FacturaService, private modalService: NgbModal,
    private ubicacionService: UbicacionService, private guiaRemisionService: GuiaRemisionService, private empresaService: EmpresaService) { }

  ngOnInit() {
    this.estado= this.guia_remision.estado? "ENTREGADO": "PENDIENTE";
    this.validar_sesion();
    this.consultar_transportistas();
    this.consultar_vehiculos_transportes();
    this.consultar_ubicaciones();
  }

  validar_sesion(){
    this.sesion = this.sesionService.getSesion();
    if (this.sesion == undefined)
      this.router.navigate(['/iniciosesion']);
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
      err => {
        console.log('HTTP Error', err)
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }
  consultar_vehiculos_transportes(){
    this.vehiculoTransporteService.consultar().subscribe(
      res => {
        this.vehiculos_transportes = res.resultado as VehiculoTransporte[]
      },
      err => {
        console.log('HTTP Error', err)
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }

  total_factura() {
    return this.factura.factura_detalles.map(t => t.total_con_descuento).reduce((acc, value) => acc + value, 0);
  }

  crear(event) {
    if (event!=null)
      event.preventDefault();
    this.guia_remision.factura=this.factura;
    this.guia_remision.estado=true;
    this.guia_remision.normalizar();
    console.log(this.guia_remision);
    this.guiaRemisionService.crear(this.guia_remision).subscribe(
      res => {
        this.guia_remision_crear = res.resultado as GuiaRemision;
        this.guia_remision.numero=this.guia_remision_crear.numero;
        this.estado=this.guia_remision_crear.estado? "ENTREGADO": "NO ENTREGADO";
        if (res.mensaje){
          Swal.fire('Exito', 'Se creo la guia de remision', 'success');
        }
      },
      err => {
        console.log('HTTP Error', err)
        Swal.fire('Error', err.error.mensaje, 'error');
        this.guia_remision.des_normalizar();
      }
    );
  }

  actualizar(event) {
    if (event!=null)
      event.preventDefault();
    this.guia_remision.estado=true;
    this.guia_remision.normalizar();
    console.log(this.guia_remision);
    this.guiaRemisionService.actualizar(this.guia_remision).subscribe(
      res => {
        this.guia_remision_crear = res.resultado as GuiaRemision;
        this.estado=this.guia_remision_crear.estado? "ENTREGADO": "NO ENTREGADO";
        if (res.mensaje){
          Swal.fire('Exito', 'Se creo la guia de remision', 'success');
        }
      },
      err => {
        console.log('HTTP Error', err)
        Swal.fire('Error', err.error.mensaje, 'error');
        this.guia_remision.des_normalizar();
      }
    );

  }

  provincia() {
    this.ubicacionService.obtenerCantones(this.guia_remision.direccion.ubicacion.provincia).subscribe(
      res => {
          this.cantones = res.resultado as Ubicacion[];
      },
      err => {
        console.log('HTTP Error', err)
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }

  canton() {
    this.ubicacionService.obtenerParroquias(this.guia_remision.direccion.ubicacion.canton).subscribe(
      res => {
          this.parroquias = res.resultado as Ubicacion[];
      },
      err => {
        console.log('HTTP Error', err)
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }
  parroquia(){
    if (this.guia_remision.direccion.ubicacion.provincia != "" && this.guia_remision.direccion.ubicacion.canton != "" && this.guia_remision.direccion.ubicacion.parroquia != ""){
      this.ubicacionService.obtenerUbicacionIDAsync(this.guia_remision.direccion.ubicacion).subscribe(
        res => {
          this.guia_remision.direccion.ubicacion=res.resultado as Ubicacion;
        },
        err => {
          console.log('HTTP Error', err)
          Swal.fire('Error', err.error.mensaje, 'error');
        }
      );
    }
  }

  validar_telefono() {
    let digito=this.guia_remision.telefono.substr(0,1);
    if (this.guia_remision.telefono.length!=11 || digito!="0") {
      this.guia_remision.telefono="";
      Swal.fire('Error', "Telefono Invalido", 'error');
    }
  }

  validar_celular() {
    let digito=this.guia_remision.celular.substr(0,2);
    if (this.guia_remision.celular.length!=12 || digito!="09") {
      this.guia_remision.celular="";
      Swal.fire('Error', "Celular Invalido", 'error');
    }
  }

  validar_correo() {
    let arroba=this.guia_remision.correo.includes("@");
    if (!arroba) {
      this.guia_remision.correo="";
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
    } else if (event.value=="1") {
      this.bandera_opcion=true;
      this.guia_remision.direccion=new Direccion();
    } else if (event.value=="2"){
      this.guia_remision=new GuiaRemision();
      this.guia_remision.inhabilitar=true;
    }
  }

  nuevo(event){
    this.guia_remision=new GuiaRemision();
  }

  despachar(){

  }

  generar_pdf(event){
    if (event!=null)
      event.preventDefault();
    this.facturaService.generar_pdf(this.factura.id).subscribe(
      res => {
        let file = new Blob([res], { type: 'application/pdf' });            
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      err => {
        console.log('HTTP Error', err)
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }
}
