import { Establecimiento } from '../modelos/establecimiento';

export class PuntoVenta {
    id: number;
    codigo:string;
    establecimiento: Establecimiento;

    constructor() {
        this.establecimiento=new Establecimiento();
    }
}
