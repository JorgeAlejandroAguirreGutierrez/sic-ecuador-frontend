import { Telefono } from './telefono';
import { Direccion } from './direccion';
import { Celular } from './celular';
import { Correo } from './correo';
import { Transportista } from './transportista';

export class GuiaRemision {
    id: number;
    codigo: string;
    direccion: Direccion;
    telefono: Telefono;
    celular: Celular;
    correo: Correo;
    referencia: string;
    transportista: Transportista;

    constructor(){
        this.id=0;
        this.codigo="";
        this.telefono=new Telefono();
        this.celular=new Celular();
        this.correo=new Correo();
        this.transportista=new Transportista();
    }
}
