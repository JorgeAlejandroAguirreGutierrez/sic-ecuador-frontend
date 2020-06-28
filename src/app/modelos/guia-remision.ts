import { Telefono } from './telefono';
import { Direccion } from './direccion';
import { Celular } from './celular';
import { Correo } from './correo';
import { Transportista } from './transportista';
import { Factura } from './factura';

export class GuiaRemision {
    id: number;
    codigo: string;
    fecha: Date;
    numero: string;
    direccion: Direccion;
    telefono: string;
    celular: string;
    correo: string;
    referencia: string;
    estado: boolean;
    transportista: Transportista;
    factura: Factura;

    constructor(){
        this.id=0;
        this.codigo="";
        this.fecha=new Date();
        this.numero="";
        this.direccion=new Direccion();
        this.telefono="";
        this.celular="";
        this.correo="";
        this.estado=true;
        this.transportista=new Transportista();
        this.factura=new Factura();
    }
}
