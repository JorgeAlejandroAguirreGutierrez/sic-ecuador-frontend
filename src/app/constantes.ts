'use strict';

import { TabService } from './componentes/services/tab.service';

export const tabla_amortizacion_francesa: string='FRANCESA';
export const tabla_amortizacion_alemana: string='ALEMANA';
export const modelo_amortizacion: string='MODELO_AMORTIZACION';
export const periodicidad: string='PERIODICIDAD';
export const periodo: string='PERIODO';
export const error_unidad_kardex: string='ERROR EN UNIDAD KARDEX';
export const error_impuesto: string='ERROR EN IMPUESTO';
export const error_costo: string='ERROR EN COSTO';
export const error_medida: string='ERROR EN MEDIDA';
export const error_grupo_producto: string='ERROR EN GRUPO DE PRODUCTO';
export const error_sub_grupo_producto: string='ERROR EN SUB GRUPO DE PRODUCTO';
export const error_categoria_producto: string='ERROR EN CATEGORIA DE PRODUCTO';
export const error_linea_producto: string='ERROR EN LINEA DE PRODUCTO';
export const error_sub_linea_producto: string='ERROR EN SUB LINEA DE PRODUCTO';
export const error_presentacion_producto: string='ERROR EN PRESENTACION DE PRODUCTO';
export const error_tipo_gasto: string='ERROR EN TIPO DE GASTO';
export const error_tipo_producto: string='ERROR EN TIPO DE PRODUCTO';
export const error_cantidad: string='ERROR EN CANTIDAD';
export const error_costo_unitario: string='ERROR EN COSTO UNITARIO';
export const error_costo_total: string='ERROR EN COSTO TOTAL';
export const error_producto: string='ERROR EN EL PRODUCTO';
export const error_kardex: string='ERROR KARDEX EXISTENTE';
export const error_swal='error';
export const error='Error';
export const exito_swal='success';
export const exito='Exito';

//NOMBRES DE TABS
export const tab_crear_auxiliar='Crear Auxiliar';
export const tab_crear_categoria_cliente='Crear Categoria Cliente';
export const tab_crear_celular='Crear Celular';
export const tab_crear_cliente='Crear Cliente';
export const tab_crear_correo='Crear Correo';
export const tab_crear_direccion='Crear Direccion';
export const tab_crear_estado_civil='Crear estado_civil';
export const tab_crear_forma_pago='Crear Forma de Pago';
export const tab_crear_genero='Crear Genero';
export const tab_crear_grupo_cliente='Crear Grupo de Cliente';
export const tab_crear_impuesto='Crear Impuesto';
export const tab_crear_origen_ingreso='Crear Origen de Ingreso';
export const tab_crear_plazo_credito='Crear Plazo de Credito';
export const tab_crear_retencion_cliente='Crear Retencion Cliente';
export const tab_crear_telefono='Crear Telefono';
export const tab_crear_tipo_contribuyente='Crear Tipo de Contribuyente';
export const tab_crear_tipo_pago='Crear Tipo de Pago';
export const tab_crear_tipo_retencion='Crear Tipo de Retencion';
export const tab_crear_factura_compra='Crear Factura de Compra';
export const tab_crear_pago_compra='Crear Pago de Compra';
export const tab_crear_proveedor='Crear Proveedor';
export const tab_crear_egreso='Crear Egreso';
export const tab_crear_factura='Crear Factura';
export const tab_crear_pedido='Crear Pedido';
export const tab_crear_proforma='Crear Proforma';
export const tab_crear_dato_adicional='Crear Dato Adicional';
export const tab_crear_empresa='Crear Empresa';
export const tab_crear_exportacion='Crear Exportacion';
export const tab_crear_importacion='Crear Importacion';
export const tab_crear_ubicacion='Crear Ubicacion';
export const tab_crear_contabilizacion='Crear Contabilizacion';
export const tab_crear_cuenta='Crear Cuenta';
export const tab_crear_entrega='Crear Entrega';
export const tab_crear_transportista='Crear Transportista';
export const tab_crear_vehiculo_transporte='Crear Vehiculo de Transporte';
export const tab_crear_activo_fijo='Crear Activo Fijo';
export const tab_crear_bodega='Crear Bodega';
export const tab_crear_kardex='Crear Kardex';
export const tab_crear_medida='Crear Medida';
export const tab_crear_producto='Crear Producto';
export const tab_crear_promocion='Crear Promocion';
export const tab_crear_saldo_inicial_inventario='Crear SII';
export const tab_crear_tabla_equivalencia_medida='Crear TEM';
export const tab_crear_usuario='Crear Usuario';
export const tab_crear_establecimiento='Crear Establecimiento';
export const tab_crear_punto_venta='Crear Punto de Venta';

export const tab_buscar_auxiliar='Buscar Auxiliar';
export const tab_buscar_categoria_cliente='Buscar Categoria Cliente';
export const tab_buscar_celular='Buscar Celular';
export const tab_buscar_cliente='Buscar Cliente';
export const tab_buscar_correo='Buscar Correo';
export const tab_buscar_direccion='Buscar Direccion';
export const tab_buscar_estado_civil='Buscar estado_civil';
export const tab_buscar_forma_pago='Buscar Forma de Pago';
export const tab_buscar_genero='Buscar Genero';
export const tab_buscar_grupo_cliente='Buscar Grupo de Cliente';
export const tab_buscar_impuesto='Buscar Impuesto';
export const tab_buscar_origen_ingreso='Buscar Origen de Ingreso';
export const tab_buscar_plazo_credito='Buscar Plazo de Credito';
export const tab_buscar_retencion_cliente='Buscar Retencion Cliente';
export const tab_buscar_telefono='Buscar Telefono';
export const tab_buscar_tipo_contribuyente='Buscar Tipo de Contribuyente';
export const tab_buscar_tipo_pago='Buscar Tipo de Pago';
export const tab_buscar_tipo_retencion='Buscar Tipo de Retencion';
export const tab_buscar_factura_compra='Buscar Factura de Compra';
export const tab_buscar_pago_compra='Buscar Pago de Compra';
export const tab_buscar_proveedor='Buscar Proveedor';
export const tab_buscar_egreso='Buscar Egreso';
export const tab_buscar_factura='Buscar Factura';
export const tab_buscar_pedido='Buscar Pedido';
export const tab_buscar_proforma='Buscar Proforma';
export const tab_buscar_dato_adicional='Buscar Dato Adicional';
export const tab_buscar_empresa='Buscar Empresa';
export const tab_buscar_exportar='Buscar Exportacion';
export const tab_buscar_importar='Buscar Importacion';
export const tab_buscar_ubicacion='Buscar Ubicacion';
export const tab_buscar_contabilizacion='Buscar Contabilizacion';
export const tab_buscar_cuenta='Buscar Cuenta';
export const tab_buscar_entrega='Buscar Entrega';
export const tab_buscar_transportista='Buscar Transportista';
export const tab_buscar_vehiculo_transporte='Buscar Vehiculo de Transporte';
export const tab_buscar_activo_fijo='Buscar Activo Fijo';
export const tab_buscar_bodega='Buscar Bodega';
export const tab_buscar_kardex='Buscar Kardex';
export const tab_buscar_medida='Buscar Medida';
export const tab_buscar_producto='Buscar Producto';
export const tab_buscar_promocion='Buscar Promocion';
export const tab_buscar_saldo_inicial_inventario='Buscar SII';
export const tab_buscar_tabla_equivalencia_medida='Buscar TEM';
export const tab_buscar_usuario='Buscar Usuario';
export const tab_buscar_establecimiento='Buscar Establecimiento';
export const tab_buscar_punto_venta='Buscar Punto de Venta';

//ACTUALIZAR
export const tab_actualizar_auxiliar='Actualizar Auxiliar';
export const tab_actualizar_categoria_cliente='Actualizar Categoria Cliente';
export const tab_actualizar_celular='Actualizar Celular';
export const tab_actualizar_cliente='Actualizar Cliente';
export const tab_actualizar_correo='Actualizar Correo';
export const tab_actualizar_direccion='Actualizar Direccion';
export const tab_actualizar_estado_civil='Actualizar estado_civil';
export const tab_actualizar_forma_pago='Actualizar Forma de Pago';
export const tab_actualizar_genero='Actualizar Genero';
export const tab_actualizar_grupo_cliente='Actualizar Grupo de Cliente';
export const tab_actualizar_impuesto='Actualizar Impuesto';
export const tab_actualizar_origen_ingreso='Actualizar Origen de Ingreso';
export const tab_actualizar_plazo_credito='Actualizar Plazo de Credito';
export const tab_actualizar_retencion_cliente='Actualizar Retencion Cliente';
export const tab_actualizar_telefono='Actualizar Telefono';
export const tab_actualizar_tipo_contribuyente='Actualizar Tipo de Contribuyente';
export const tab_actualizar_tipo_pago='Actualizar Tipo de Pago';
export const tab_actualizar_tipo_retencion='Actualizar Tipo de Retencion';
export const tab_actualizar_factura_compra='Actualizar Factura de Compra';
export const tab_actualizar_pago_compra='Actualizar Pago de Compra';
export const tab_actualizar_proveedor='Actualizar Proveedor';
export const tab_actualizar_egreso='Actualizar Egreso';
export const tab_actualizar_factura='Actualizar Factura';
export const tab_actualizar_pedido='Actualizar Pedido';
export const tab_actualizar_proforma='Actualizar Proforma';
export const tab_actualizar_dato_adicional='Actualizar Dato Adicional';
export const tab_actualizar_empresa='Actualizar Empresa';
export const tab_actualizar_exportacion='Actualizar Exportacion';
export const tab_actualizar_importacion='Actualizar Importacion';
export const tab_actualizar_ubicacion='Actualizar Ubicacion';
export const tab_actualizar_contabilizacion='Actualizar Contabilizacion';
export const tab_actualizar_cuenta='Actualizar Cuenta';
export const tab_actualizar_entrega='Actualizar Entrega';
export const tab_actualizar_transportista='Actualizar Transportista';
export const tab_actualizar_vehiculo_transporte='Actualizar Vehiculo de Transporte';
export const tab_actualizar_activo_fijo='Actualizar Activo Fijo';
export const tab_actualizar_bodega='Actualizar Bodega';
export const tab_actualizar_kardex='Actualizar Kardex';
export const tab_actualizar_medida='Actualizar Medida';
export const tab_actualizar_producto='Actualizar Producto';
export const tab_actualizar_promocion='Actualizar Promocion';
export const tab_actualizar_saldo_inicial_inventario='Actualizar SII';
export const tab_actualizar_tabla_equivalencia_medida='Actualizar TEM';
export const tab_actualizar_usuario='Actualizar Usuario';
export const tab_actualizar_establecimiento='Actualizar Establecimiento';
export const tab_actualizar_punto_venta='Actualizar Punto de Venta';


//MODULOS
export const modulo_clientes='CLIENTES';
export const modulo_compras='COMPRAS';
export const modulo_ventas='VENTAS';
export const modulo_inventarios='INVENTARIOS';
export const modulo_contabilidad='CONTABILIDAD';
export const modulo_financiero='FINANCIERO';
export const modulo_activos_fijos='ACTIVOS FIJOS';
export const modulo_talento_humano='TALENTO HUMANO';
export const modulo_produccion='PRODUCCION';
export const modulo_importacion='IMPORTACION';
export const modulo_configuracion='CONFIGURACION';
export const modulo_estadisticas='ESTADISTICAS';
export const modulo_control='CONTROL';
export const modulo_auditoria='AUDITORIA';
export const modulo_usuarios='USUARIOS';

export function tab_activo(tabService: TabService){
    for(let i=0; i<tabService.tabs.length; i++){
        if(tabService.tabs[i].active){
        return i;
        }
    }
}
//let indice_tab_activo= constantes.tab_activo(this.tabService);
//this.tabService.removeTab(indice_tab_activo);
//this.tabService.addNewTab(ClienteComponent, constantes.tab_crear_cliente);








