import { GrupoCliente } from '../modelos/grupo-cliente';
import { TipoContribuyente } from '../modelos/tipo-contribuyente';
import { Direccion } from '../modelos/direccion';
import { Financiamiento } from '../modelos/financiamiento';
import { Genero } from '../modelos/genero';
import { EstadoCivil } from '../modelos/estado-civil';
import { CategoriaCliente } from '../modelos/categoria-cliente';
import { OrigenIngreso } from '../modelos/origen-ingreso';
import { PuntoVenta } from '../modelos/punto-venta';
import { Telefono } from '../modelos/telefono';
import { Celular } from '../modelos/celular';
import { Correo } from '../modelos/correo';
import { Auxiliar } from './auxiliar';
import { RetencionCliente } from './retencion-cliente';
import { TipoPago } from './tipo-pago';
import { FormaPago } from './forma-pago';
import { PlazoCredito } from './plazo-credito';
import { Ubicacion } from './ubicacion';
import { TipoRetencion } from './tipo-retencion';

export class Cliente {
    id:number;
    codigo:string;
    identificacion:string;
    tipo_identificacion: string;
    razon_social:string;
    especial: boolean;
    estado:boolean;
    eliminado:boolean;

    punto_venta: PuntoVenta;
    grupo_cliente: GrupoCliente;
    tipo_contribuyente: TipoContribuyente;
    direccion: Direccion;
    financiamiento: Financiamiento;
    genero: Genero;
    estado_civil: EstadoCivil;
    categoria_cliente: CategoriaCliente;
    origen_ingreso: OrigenIngreso;
    obligado_contabilidad=false;

    auxiliares: Auxiliar[];
    telefonos: Telefono[];
    celulares: Celular[];
    correos: Correo[];
    retenciones_cliente: RetencionCliente[];

    constructor() {
        this.id=0;
        this.estado=true;
        this.especial=false;
        this.punto_venta=new PuntoVenta();
        this.grupo_cliente=new GrupoCliente();
        this.tipo_contribuyente=new TipoContribuyente();
        this.direccion=new Direccion();
        this.financiamiento=new Financiamiento();
        this.genero=new Genero();
        this.estado_civil=new EstadoCivil();
        this.categoria_cliente= new CategoriaCliente();
        this.origen_ingreso=new OrigenIngreso();
        this.telefonos=[];
        this.celulares=[];
        this.correos=[];
        this.auxiliares=[];
        this.retenciones_cliente=[];
        this.retenciones_cliente.push(new RetencionCliente());
        this.retenciones_cliente.push(new RetencionCliente());
        this.retenciones_cliente.push(new RetencionCliente());
        this.retenciones_cliente.push(new RetencionCliente());
     }

     construir(){
        if (this.tipo_contribuyente==null) this.tipo_contribuyente=new TipoContribuyente();
        if (this.grupo_cliente==null) this.grupo_cliente=new GrupoCliente();
        if (this.categoria_cliente==null) this.categoria_cliente=new CategoriaCliente();
        if (this.origen_ingreso==null) this.origen_ingreso=new OrigenIngreso();
        if (this.financiamiento==null) this.financiamiento=new Financiamiento();
        if (this.financiamiento.tipo_pago==null) this.financiamiento.tipo_pago=new TipoPago();
        if (this.financiamiento.forma_pago==null) this.financiamiento.forma_pago=new FormaPago();
        if (this.financiamiento.plazo_credito==null) this.financiamiento.plazo_credito=new PlazoCredito();
        if (this.direccion==null) this.direccion=new Direccion();
        if (this.direccion.ubicacion==null) this.direccion.ubicacion=new Ubicacion();
        if (this.genero==null) this.genero=new Genero();
        if (this.estado_civil==null) this.estado_civil=new EstadoCivil();
        if (this.retenciones_cliente[0].tipo_retencion==null) this.retenciones_cliente[0].tipo_retencion= new TipoRetencion();
        if (this.retenciones_cliente[1].tipo_retencion==null) this.retenciones_cliente[1].tipo_retencion= new TipoRetencion();
        if (this.retenciones_cliente[2].tipo_retencion==null) this.retenciones_cliente[2].tipo_retencion= new TipoRetencion();
        if (this.retenciones_cliente[3].tipo_retencion==null) this.retenciones_cliente[3].tipo_retencion= new TipoRetencion();
     }
}
