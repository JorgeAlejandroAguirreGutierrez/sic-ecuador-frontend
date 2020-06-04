import { Cliente } from './cliente';
import { Direccion } from './direccion';
import { TelefonoAuxiliar } from './telefono-auxiliar';
import { CelularAuxiliar } from './celular-auxiliar';
import { CorreoAuxiliar } from './correo-auxiliar';

export class OperadorTarjeta {
    id: number;
    codigo: string;
    tipo: string;
    nombre: string;
    abreviatura: string;

    constructor(){
        this.codigo="";
        this.tipo="";
        this.nombre="";
        this.abreviatura="";
    }
}
