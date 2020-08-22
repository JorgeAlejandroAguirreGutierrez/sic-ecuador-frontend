import { Cliente } from './cliente';
import { GuiaRemision } from './guia-remision';
import { Proveedor } from './proveedor';

export class Kardex {
    id: number;
    codigo: string;
    fecha: Date;
    documento: string;
    numero: string;
    operacion: string;
    entrada: number;
    salida: number;
    saldo: number;
    debe: number;
    haber: number;
    costo_promedio: number;
    costo_ultimo: number;
    total: number;
    proveedor: Proveedor;
    cliente: Cliente;
    guia_remision: GuiaRemision;

    constructor() {
        this.id=0;
        this.codigo= "";
        this.fecha= new Date();
        this.documento="";
        this.numero="";
        this.operacion="";
        this.entrada=0;
        this.salida=0;
        this.saldo=0;
        this.debe=0;
        this.haber=0;
        this.costo_promedio=0;
        this.costo_ultimo=0;
        this.total=0;
        this.proveedor=new Proveedor();
        this.cliente= new Cliente();
        this.guia_remision= new GuiaRemision();
    }
    
}
