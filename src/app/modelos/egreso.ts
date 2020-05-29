import { Cliente } from '../modelos/cliente';
import { Usuario } from '../modelos/usuario';

export class Egreso {
  id: number;
  codigo: string;
  numero_interno: string;
  fecha: Date;
  fecha_entrega: Date;
  estado: string;
  subtotal: number;
  subdescuento: number;
  base_iva: number;
  base_0: number;
  importe_iva: number;
  total: number;
  descuento_porcentjaje: number;
  descuento: number;
  abono: number;
  comentario: string;
  cliente: Cliente;
  vendedor: Usuario;
}
