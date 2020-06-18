export class TipoComprobante {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    nombre_tabla: string;

    constructor(){
        this.id=0;
        this.codigo="";
        this.nombre="";
        this.descripcion="";
        this.nombre_tabla="";
    }
}
