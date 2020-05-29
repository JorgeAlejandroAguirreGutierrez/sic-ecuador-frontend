import { Permiso } from '../modelos/permiso';

export class Perfil {
    codigo: string;
    descripcion: string;
    abreviatura: string;
    permisos: Permiso[];

    constructor() {
        this.permisos=[];
    }
}
