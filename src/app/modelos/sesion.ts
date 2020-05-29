import { Usuario } from '../modelos/usuario';

export class Sesion {

    codigo: string;
    estado:boolean;
    sesion_ip:string;
    fecha_ape: Date;
    fecha_cie: Date;
    usuario: Usuario;

    constructor() { 
        this.usuario=new Usuario();  
    }
}
