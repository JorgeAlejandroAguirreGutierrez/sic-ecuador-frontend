import { Cliente } from '../modelos/cliente';
import { TipoRetencion } from '../modelos/tipo-retencion';
export class RetencionCliente {
    id:number;
    codigo: string;
    cliente: Cliente;
    tipo_retencion: TipoRetencion;

    constructor() {
        this.id=0;
        this.codigo="";
        this.tipo_retencion=new TipoRetencion();
    }
}
