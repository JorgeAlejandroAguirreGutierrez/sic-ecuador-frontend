export class Amortizacion {
    id: number;
    codigo: string;
    numero_cuota: number;
    fecha_pago: Date;
    numero_dias: number;
    capital_inicio_periodo:number;
    capital: number;
    intereses_periodo: number;
    valor_cuota: number;
    saldo_capital: number;

    constructor(){
        this.id=0;
        this.codigo="";
        this.numero_cuota= 0;
        this.fecha_pago=new Date();
        this.numero_dias= 0;
        this.capital_inicio_periodo=0;
        this.capital= 0;
        this.intereses_periodo=0;
        this.valor_cuota=0;
        this.saldo_capital=0;
    }
}
