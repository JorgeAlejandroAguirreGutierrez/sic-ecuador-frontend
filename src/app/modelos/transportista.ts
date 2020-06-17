import { VehiculoTransporte } from './vehiculo-transporte';

export class Transportista {
    id:number;
    codigo:string;
    nombre:string;
    identificacion:string;
    vehiculo_propio:boolean;
    vehiculo_transporte: VehiculoTransporte;


    constructor(){
        this.codigo="";
        this.nombre="";
        this.identificacion="";
        this.vehiculo_propio=false;
        this.vehiculo_transporte=new VehiculoTransporte();
    }
}
