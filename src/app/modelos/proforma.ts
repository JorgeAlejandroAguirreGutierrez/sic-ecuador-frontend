import { Cliente } from '../modelos/cliente';
import { Usuario } from '../modelos/usuario';

export class Proforma {
  id: number;
  codigo: string;
  numero_interno: string;
  fecha: Date;
  fecha_caducidad: Date;
  estado: string;
  subtotal: number;
  subdescuento: number;
  base_iva: number;
  base_0: number;
  importe_iva: number;
  total: number;
  descuento_porcentaje: number;
  descuento: number;
  comentario: string;
  cliente: Cliente;
  vendedor: Usuario;
}
