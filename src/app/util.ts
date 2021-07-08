'use strict';
import {HttpHeaders} from '@angular/common/http';

export const host='http://localhost:8000/api';
//export const host='http://sicecuador.us-east-2.elasticbeanstalk.com/api'
export const ruta: string='/sicecuador';
export const auxiliar: string='/auxiliar';
export const plazo_credito: string='/plazocredito';
export const datoadicional: string='/datoadicional';
export const impuesto: string='/impuesto';
export const retencion_cliente: string='/retencioncliente';
export const grupo_cliente: string='/grupocliente';
export const tipo_contribuyente: string='/tipocontribuyente';
export const transportista: string='/transportista';
export const ubicacion: string='/ubicacion';
export const vehiculo_transporte: string='/vehiculotransporte';
export const empresa: string='/empresa';
export const parametro: string='/parametro';
export const usuario: string = '/usuario';
export const perfil: string = '/perfil';
export const sesion: string = '/sesion';
export const establecimiento: string = '/establecimiento';
export const punto_venta: string = '/puntoventa';
export const origen_ingreso: string = '/origeningreso';
export const genero: string = '/genero';
export const estado_civil: string = '/estadocivil';
export const categoria_cliente: string = '/categoriacliente';
export const tipo_pago: string = '/tipopago';
export const forma_pago: string = '/formapago';
export const cliente: string = '/cliente';
export const factura: string = '/factura';
export const tipo_retencion: string = '/tiporetencion';
export const servicio: string='/servicio';
export const caracteristica: string='/caracteristica';
export const bien: string = '/bien';
export const activo_fijo: string = '/activofijo';
export const tipo: string = '/tipo';
export const consultar_tipo: string = '/consultartipo';
export const producto: string = '/producto';
export const medida: string = '/medida';
export const buscar: string = '/buscar';
export const identificacion: string = '/identificacion';
export const razon_social: string = '/razonsocial';
export const codigo: string = '/codigo';
export const importar: string = '/importar';
export const impuesto_porcentaje: string = '/porcentaje';
export const secuencia: string = '/secuencia';
export const nombre: string = '/nombre';
export const banco: string= '/banco';
export const cuenta_propia: string= '/cuentapropia';
export const franquicia_tarjeta: string= '/franquiciatarjeta';
export const existencias: string= '/existencias';
export const bodega: string= '/bodega';
export const operador_tarjeta: string= '/operadortarjeta';
export const tipo_comprobante: string= "/tipocomprobante";
export const recaudacion: string= "/recaudacion";
export const credito: string= "/credito";
export const amortizacion: string= "/amortizacion";
export const entrega: string= "/entrega";
export const guia_remision: string= "/guiaremision";
export const grupo_producto: string = "/grupoproducto";
export const proveedor: string = "/proveedor";
export const consultar_grupos: string = "/consultargrupos";
export const consultar_subgrupos: string = "/consultarsubgrupos";
export const consultar_categorias: string = "/consultarcategorias";
export const consultar_lineas: string = "/consultarlineas";
export const consultar_sublineas: string = "/consultarsublineas";
export const consultar_presentaciones: string = "/consultarpresentaciones";
export const presentacion_producto: string = "/presentacionproducto";
export const obtener_grupo_producto: string = "/obtenergrupoproducto";
export const tipo_producto: string = "/tipoproducto";
export const tipo_gasto: string = "/tipogasto";
export const modelo: string= "/modelo";
export const medida_precio: string= "/medidaprecio";
export const precio: string= "/precio";
export const segmento: string= "/segmento";
export const saldo_inicial_inventario: string= "/saldoinicialinventario";
export const kardex: string= "/kardex";
export const tabla_equivalencia_medida: string= "/tablaequivalenciamedida";
export const generar: string= "/generar";
export const pdf: string= "/pdf";

export const credencial_usuario='admin';
export const credencial_password='admin';
export const credencial=credencial_usuario+':'+credencial_password;
export const headers= new HttpHeaders({'Content-Type':'application/json', 'Authorization': 'Basic '+btoa(credencial)});
export const options = {headers: headers};
export const headers_cargar_archivo= new HttpHeaders({'Authorization': 'Basic '+btoa(credencial)});
export const options_cargar_archivo = {headers: headers_cargar_archivo};
export const options_generar_archivo = {headers: headers, responseType: 'blob' as 'json' };
