import { Establecimiento } from '../modelos/establecimiento';

export class PuntoVenta {
    id: number;
    codigo:string;
    descripcion: string;
    establecimiento: Establecimiento;

    constructor() {
        this.establecimiento=new Establecimiento();
    }
}
