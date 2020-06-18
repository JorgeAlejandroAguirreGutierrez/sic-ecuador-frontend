import { Telefono } from './telefono';
import { Direccion } from './direccion';
import { Celular } from './celular';
import { Correo } from './correo';
import { Transportista } from './transportista';
import { Factura } from './factura';

export class GuiaRemision {
    id: number;
    codigo: string;
    numero: string;
    direccion: Direccion;
    telefono: Telefono;
    celular: Celular;
    correo: Correo;
    referencia: string;
    transportista: Transportista;
    factura: Factura;

    constructor(){
        this.id=0;
        this.codigo="";
        this.numero="";
        this.direccion=new Direccion();
        this.telefono=new Telefono();
        this.celular=new Celular();
        this.correo=new Correo();
        this.transportista=new Transportista();
        this.factura=new Factura();
    }
}
