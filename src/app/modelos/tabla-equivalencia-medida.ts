import { Medida } from './medida';

export class TablaEquivalenciaMedida {
    id: number;
    codigo: string;
    medida1: Medida;
    medida2: Medida;
    equivalencia: number;

    constructor() {
        this.id=0;
        this.codigo="";
        this.medida1= new Medida();
        this.medida2=new Medida();
        this.equivalencia=0;
    }
}