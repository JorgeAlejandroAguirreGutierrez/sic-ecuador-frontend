'use strict';

import { TabService } from './componentes/services/tab.service';

export const tabla_amortizacion_francesa: string='FRANCESA';
export const tabla_amortizacion_alemana: string='ALEMANA';
export const modelo_amortizacion: string='MODELO_AMORTIZACION';
export const periodicidad: string='PERIODICIDAD';
export const periodo: string='PERIODO';

export const exito_agregar_detalle_factura='SE AGREGO EL DETALLE';
export const exito_crear_factura='SE CREO LA FACTURA';
export const exito_actualizar_factura='SE ACTUALIZO LA FACTURA';
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
export const error_kardex_inicial: string='ERROR EN KARDEX INICIAL';
export const error_cantidad: string='ERROR EN CANTIDAD';
export const error_costo_unitario: string='ERROR EN COSTO UNITARIO';
export const error_costo_total: string='ERROR EN COSTO TOTAL';
export const error_producto: string='ERROR EN EL PRODUCTO';
export const error_kardex: string='ERROR KARDEX EXISTENTE';
export const error_kardex_VACIO: string='ERROR KARDEX VACIO';
export const error_kardex_VACIO_MENSAJE: string='INGRESA UN KARDEX';
export const error_bodega: string='ERROR EN BODEGA';
export const error_swal='error';
export const error='Error';
export const exito_swal='success';
export const exito='Exito';
export const SI="SI";
export const NO="NO";
export const vacio="";
export const espacio=" ";

//CAMPOS PARA CONSULTAS DINAMICAS
export const codigo="codigo";
export const descripcion="descripcion";
export const abreviatura="abreviatura";

/**********************************
 * CONSTANTES PARA NOMBRAR LOS TITULOS DE LOS TABS
 **********************************/
//PARA CREAR TABS
export const tab_crear_auxiliar='Crear Auxiliar';
export const tab_crear_categoria_cliente='Calificaciones';
export const tab_crear_celular='Crear Celular';
export const tab_crear_cliente='Crear Cliente';
export const tab_crear_correo='Crear Correo';
export const tab_crear_direccion='Crear Direccion';
export const tab_crear_estado_civil='Crear Estado Civil';
export const tab_crear_forma_pago='Crear Forma de Pago';
export const tab_crear_genero='Crear Genero';
export const tab_crear_grupo_cliente='Grupo Clientes';
export const tab_crear_impuesto='Crear Impuesto';
export const tab_crear_origen_ingreso='Origen de Ingreso';
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
export const tab_crear_servicio='Crear Servicio-AF';
export const tab_crear_promocion='Crear Promocion';
export const tab_crear_saldo_inicial_inventario='Saldo inicial';
export const tab_crear_tabla_equivalencia_medida='Equivalencias';
export const tab_crear_usuario='Crear Usuario';
export const tab_crear_establecimiento='Crear Establecimiento';
export const tab_crear_punto_venta='Crear Punto de Venta';
export const tab_crear_grupo_producto='Crear Grupo de Producto';

//TABS DE BUSCAR
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
export const tab_buscar_tabla_equivalencia_medida='Editar Equivalencia';
export const tab_buscar_usuario='Buscar Usuario';
export const tab_buscar_establecimiento='Buscar Establecimiento';
export const tab_buscar_punto_venta='Buscar Punto de Venta';
export const tab_buscar_grupo_producto='Buscar Grupo de Producto';
export const tab_buscar_presentacion_producto='Buscar Presentacion Prod';

//TABS PARA ACTUALIZAR
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
export const tab_actualizar_presentacion_producto='Actualizar Presentacion Producto';


/**********************************
 * CONSTANTES PARA NOMBRAR LOS ITEMS DEL SIDEBAR
 **********************************/
//PARA CREAR TABS
export const item_crear_auxiliar='Crear Auxiliar';
export const item_crear_categoria_cliente='Calificaciones';
export const item_crear_celular='Crear Celular';
export const item_crear_cliente='Nuevo Cliente';
export const item_crear_correo='Crear Correo';
export const item_crear_direccion='Crear Direccion';
export const item_crear_estado_civil='Estados Civiles';
export const item_crear_forma_pago='Formas de Pago';
export const item_crear_genero='Generos';
export const item_crear_grupo_cliente='Grupos';
export const item_crear_impuesto='Crear Impuesto';
export const item_crear_origen_ingreso='Origen de los Ingresos';
export const item_crear_plazo_credito='Plazos de Crédito';
export const item_crear_retencion_cliente='Crear Retencion Cliente';
export const item_crear_telefono='Crear Telefono';
export const item_crear_tipo_contribuyente='Crear Tipo de Contribuyente';
export const item_crear_tipo_pago='Tipos de Pago';
export const item_crear_tipo_retencion='Crear Tipo de Retencion';
export const item_crear_factura_compra='Crear Factura de Compra';
export const item_crear_pago_compra='Crear Pago de Compra';
export const item_crear_proveedor='Crear Proveedor';
export const item_crear_egreso='Crear Egreso';
export const item_crear_factura='Crear Factura';
export const item_crear_pedido='Crear Pedido';
export const item_crear_proforma='Crear Proforma';
export const item_crear_dato_adicional='Crear Dato Adicional';
export const item_crear_empresa='Crear Empresa';
export const item_crear_exportacion='Crear Exportacion';
export const item_crear_importacion='Crear Importacion';
export const item_crear_ubicacion='Crear Ubicacion';
export const item_crear_contabilizacion='Crear Contabilizacion';
export const item_crear_cuenta='Crear Cuenta';
export const item_crear_entrega='Crear Entrega';
export const item_crear_transportista='Crear Transportista';
export const item_crear_vehiculo_transporte='Crear Vehiculo de Transporte';
export const item_crear_activo_fijo='Crear Activo Fijo';
export const item_crear_bodega='Crear Bodega';
export const item_crear_kardex='Crear Kardex';
export const item_crear_medida='Medidas';
export const item_crear_producto='Nuevo Producto';
export const item_crear_servicio='Nuevo Servicio y AF';
export const item_crear_promocion='Crear Promocion';
export const item_crear_saldo_inicial_inventario='Saldo Inicial Producto';
export const item_crear_tabla_equivalencia_medida='Equivalencia Medidas';
export const item_crear_usuario='Crear Usuario';
export const item_crear_establecimiento='Crear Establecimiento';
export const item_crear_punto_venta='Crear Punto de Venta';
export const item_crear_grupo_producto='Crear Grupo de Producto';

//TABS DE BUSCAR
export const item_buscar_auxiliar='Buscar Auxiliar';
export const item_buscar_categoria_cliente='Buscar Categoria Cliente';
export const item_buscar_celular='Buscar Celular';
export const item_buscar_cliente='Gestionar Clientes';
export const item_buscar_correo='Buscar Correo';
export const item_buscar_direccion='Buscar Direccion';
export const item_buscar_estado_civil='Buscar estado_civil';
export const item_buscar_forma_pago='Buscar Forma de Pago';
export const item_buscar_genero='Buscar Genero';
export const item_buscar_grupo_cliente='Buscar Grupo de Cliente';
export const item_buscar_impuesto='Buscar Impuesto';
export const item_buscar_origen_ingreso='Buscar Origen de Ingreso';
export const item_buscar_plazo_credito='Buscar Plazo de Credito';
export const item_buscar_retencion_cliente='Buscar Retencion Cliente';
export const item_buscar_telefono='Buscar Telefono';
export const item_buscar_tipo_contribuyente='Buscar Tipo de Contribuyente';
export const item_buscar_tipo_pago='Buscar Tipo de Pago';
export const item_buscar_tipo_retencion='Buscar Tipo de Retencion';
export const item_buscar_factura_compra='Buscar Factura de Compra';
export const item_buscar_pago_compra='Buscar Pago de Compra';
export const item_buscar_proveedor='Buscar Proveedor';
export const item_buscar_egreso='Buscar Egreso';
export const item_buscar_factura='Buscar Factura';
export const item_buscar_pedido='Buscar Pedido';
export const item_buscar_proforma='Buscar Proforma';
export const item_buscar_dato_adicional='Buscar Dato Adicional';
export const item_buscar_empresa='Buscar Empresa';
export const item_buscar_exportar='Buscar Exportacion';
export const item_buscar_importar='Buscar Importacion';
export const item_buscar_ubicacion='Buscar Ubicacion';
export const item_buscar_contabilizacion='Buscar Contabilizacion';
export const item_buscar_cuenta='Buscar Cuenta';
export const item_buscar_entrega='Buscar Entrega';
export const item_buscar_transportista='Buscar Transportista';
export const item_buscar_vehiculo_transporte='Buscar Vehiculo de Transporte';
export const item_buscar_activo_fijo='Buscar Activo Fijo';
export const item_buscar_bodega='Buscar Bodega';
export const item_buscar_kardex='Buscar Kardex';
export const item_buscar_medida='Buscar Medida';
export const item_buscar_producto='Gestionar Productos';
export const item_buscar_promocion='Buscar Promocion';
export const item_buscar_saldo_inicial_inventario='Buscar SII';
export const item_buscar_tabla_equivalencia_medida='Admin Equivalencias';
export const item_buscar_usuario='Buscar Usuario';
export const item_buscar_establecimiento='Buscar Establecimiento';
export const item_buscar_punto_venta='Buscar Punto de Venta';
export const item_buscar_grupo_producto='Buscar Grupo de Producto';
export const item_buscar_presentacion_producto='Buscar Presentacion Prod';

//TABS PARA ACTUALIZAR
export const item_actualizar_auxiliar='Actualizar Auxiliar';
export const item_actualizar_categoria_cliente='Actualizar Categoria Cliente';
export const item_actualizar_celular='Actualizar Celular';
export const item_actualizar_cliente='Actualizar Cliente';
export const item_actualizar_correo='Actualizar Correo';
export const item_actualizar_direccion='Actualizar Direccion';
export const item_actualizar_estado_civil='Actualizar estado_civil';
export const item_actualizar_forma_pago='Actualizar Forma de Pago';
export const item_actualizar_genero='Actualizar Genero';
export const item_actualizar_grupo_cliente='Actualizar Grupo de Cliente';
export const item_actualizar_impuesto='Actualizar Impuesto';
export const item_actualizar_origen_ingreso='Actualizar Origen de Ingreso';
export const item_actualizar_plazo_credito='Actualizar Plazo de Credito';
export const item_actualizar_retencion_cliente='Actualizar Retencion Cliente';
export const item_actualizar_telefono='Actualizar Telefono';
export const item_actualizar_tipo_contribuyente='Actualizar Tipo de Contribuyente';
export const item_actualizar_tipo_pago='Actualizar Tipo de Pago';
export const item_actualizar_tipo_retencion='Actualizar Tipo de Retencion';
export const item_actualizar_factura_compra='Actualizar Factura de Compra';
export const item_actualizar_pago_compra='Actualizar Pago de Compra';
export const item_actualizar_proveedor='Actualizar Proveedor';
export const item_actualizar_egreso='Actualizar Egreso';
export const item_actualizar_factura='Actualizar Factura';
export const item_actualizar_pedido='Actualizar Pedido';
export const item_actualizar_proforma='Actualizar Proforma';
export const item_actualizar_dato_adicional='Actualizar Dato Adicional';
export const item_actualizar_empresa='Actualizar Empresa';
export const item_actualizar_exportacion='Actualizar Exportacion';
export const item_actualizar_importacion='Actualizar Importacion';
export const item_actualizar_ubicacion='Actualizar Ubicacion';
export const item_actualizar_contabilizacion='Actualizar Contabilizacion';
export const item_actualizar_cuenta='Actualizar Cuenta';
export const item_actualizar_entrega='Actualizar Entrega';
export const item_actualizar_transportista='Actualizar Transportista';
export const item_actualizar_vehiculo_transporte='Actualizar Vehiculo de Transporte';
export const item_actualizar_activo_fijo='Actualizar Activo Fijo';
export const item_actualizar_bodega='Actualizar Bodega';
export const item_actualizar_kardex='Actualizar Kardex';
export const item_actualizar_medida='Actualizar Medida';
export const item_actualizar_producto='Actualizar Producto';
export const item_actualizar_promocion='Actualizar Promocion';
export const item_actualizar_saldo_inicial_inventario='Actualizar SII';
export const item_actualizar_tabla_equivalencia_medida='Actualizar TEM';
export const item_actualizar_usuario='Actualizar Usuario';
export const item_actualizar_establecimiento='Actualizar Establecimiento';
export const item_actualizar_punto_venta='Actualizar Punto de Venta';
export const item_actualizar_presentacion_producto='Actualizar Presentacion Producto';

/**********************************
 * CONSTANTES CON NOMBRES DE LOS ICONOS DEL SIDEBAR
 **********************************/
//PARA CREAR TABS
export const ico_crear_auxiliar=        'fa fa-file-text-o';
export const ico_crear_categoria_cliente='fa fa-address-book';
export const ico_crear_celular=         'fa fa-file-text-o';
export const ico_crear_cliente=         'fa fa-user-plus';
export const ico_crear_correo=          'fa fa-file-text-o';
export const ico_crear_direccion=       'fa fa-address-card';
export const ico_crear_estado_civil=    'fa fa-venus-mars';
export const ico_crear_forma_pago=      'fa fa-cc-mastercard';
export const ico_crear_genero=          'fa fa-mars-stroke';
export const ico_crear_grupo_cliente=   'fa fa-users';
export const ico_crear_impuesto=        'fa fa-file-text-o';
export const ico_crear_origen_ingreso=  'fa fa-money';
export const ico_crear_plazo_credito=   'fa fa-credit-card';
export const ico_crear_retencion_cliente='fa fa-file-text-o';
export const ico_crear_telefono=        'fa fa-file-text-o';
export const ico_crear_tipo_contribuyente='fa fa-file-text-o';
export const ico_crear_tipo_pago=       'fa fa-ticket';
export const ico_crear_tipo_retencion=  'fa fa-file-text-o';
export const ico_crear_factura_compra=  'fa fa-file-text-o';
export const ico_crear_pago_compra=     'fa fa-file-text-o';
export const ico_crear_proveedor=       'fa fa-file-text-o';
export const ico_crear_egreso=          'fa fa-file-text-o';
export const ico_crear_factura=         'fa fa-file-text-o';
export const ico_crear_pedido=          'fa fa-file-text-o';
export const ico_crear_proforma=        'fa fa-file-text-o';
export const ico_crear_dato_adicional=  'fa fa-file-text-o';
export const ico_crear_empresa=         'fa fa-file-text-o';
export const ico_crear_exportacion=     'fa fa-file-text-o';
export const ico_crear_importacion=     'fa fa-file-text-o';
export const ico_crear_ubicacion=       'fa fa-file-text-o';
export const ico_crear_contabilizacion= 'fa fa-file-text-o';
export const ico_crear_cuenta=          'fa fa-file-text-o';
export const ico_crear_entrega=         'fa fa-file-text-o';
export const ico_crear_transportista=   'fa fa-file-text-o';
export const ico_crear_vehiculo_transporte='fa fa-file-text-o';
export const ico_crear_activo_fijo=     'fa fa-file-text-o';
export const ico_crear_bodega=          'fa fa-file-text-o';
export const ico_crear_kardex=          'fa fa-file-text-o';
export const ico_crear_medida=          'fa fa-medium';
export const ico_crear_producto=        'fa fa-shopping-basket';
export const ico_crear_servicio=        'fa fa-child';
export const ico_crear_promocion=       'fa fa-product-hunt';
export const ico_crear_saldo_inicial_inventario='fa fa-info';
export const ico_crear_tabla_equivalencia_medida='fa fa-exchange';
export const ico_crear_usuario=         'fa fa-file-text-o';
export const ico_crear_establecimiento= 'fa fa-file-text-o';
export const ico_crear_punto_venta=     'fa fa-file-text-o';
export const ico_crear_grupo_producto=  'fa fa-object-group';

//TABS DE BUSCAR
export const ico_buscar_auxiliar=       'fa fa-file-text-o';
export const ico_buscar_categoria_cliente='fa fa-file-text-o';
export const ico_buscar_celular=        'fa fa-file-text-o';
export const ico_buscar_cliente=        'fa fa-user-secret';
export const ico_buscar_correo=         'fa fa-file-text-o';
export const ico_buscar_direccion=      'fa fa-file-text-o';
export const ico_buscar_estado_civil=   'fa fa-file-text-o';
export const ico_buscar_forma_pago=     'fa fa-file-text-o';
export const ico_buscar_genero=         'fa fa-file-text-o';
export const ico_buscar_grupo_cliente=  'fa fa-file-text-o';
export const ico_buscar_impuesto=       'fa fa-file-text-o';
export const ico_buscar_origen_ingreso= 'fa fa-file-text-o';
export const ico_buscar_plazo_credito=  'fa fa-file-text-o';
export const ico_buscar_retencion_cliente='fa fa-file-text-o';
export const ico_buscar_telefono=       'fa fa-file-text-o';
export const ico_buscar_tipo_contribuyente='fa fa-file-text-o';
export const ico_buscar_tipo_pago=      'fa fa-file-text-o';
export const ico_buscar_tipo_retencion= 'fa fa-file-text-o';
export const ico_buscar_factura_compra= 'fa fa-file-text-o';
export const ico_buscar_pago_compra=    'fa fa-file-text-o';
export const ico_buscar_proveedor=      'fa fa-file-text-o';
export const ico_buscar_egreso=         'fa fa-file-text-o';
export const ico_buscar_factura=        'fa fa-file-text-o';
export const ico_buscar_pedido=         'fa fa-file-text-o';
export const ico_buscar_proforma=       'fa fa-file-text-o';
export const ico_buscar_dato_adicional= 'fa fa-file-text-o';
export const ico_buscar_empresa=        'fa fa-file-text-o';
export const ico_buscar_exportar=       'fa fa-file-text-o';
export const ico_buscar_importar=       'fa fa-file-text-o';
export const ico_buscar_ubicacion=      'fa fa-file-text-o';
export const ico_buscar_contabilizacion='fa fa-file-text-o';
export const ico_buscar_cuenta=         'fa fa-file-text-o';
export const ico_buscar_entrega=        'fa fa-file-text-o';
export const ico_buscar_transportista=  'fa fa-file-text-o';
export const ico_buscar_vehiculo_transporte='fa fa-file-text-o';
export const ico_buscar_activo_fijo=    'fa fa-file-text-o';;
export const ico_buscar_bodega=         'fa fa-file-text-o';
export const ico_buscar_kardex=         'fa fa-file-text-o';
export const ico_buscar_medida=         'fa fa-file-text-o';
export const ico_buscar_producto=       'fa fa-shopping-bag';   
export const ico_buscar_promocion=      'fa fa-file-text-o';
export const ico_buscar_saldo_inicial_inventario='fa fa-file-text-o';
export const ico_buscar_tabla_equivalencia_medida='fa fa-file-text-o';
export const ico_buscar_usuario=        'fa fa-file-text-o';
export const ico_buscar_establecimiento='fa fa-file-text-o';
export const ico_buscar_punto_venta=    'fa fa-file-text-o';
export const ico_buscar_grupo_producto= 'fa fa-file-text-o';
export const ico_buscar_presentacion_producto='fa fa-file-text-o';

//TABS PARA ACTUALIZAR
export const ico_actualizar_auxiliar=   'fa fa-file-text-o';
export const ico_actualizar_categoria_cliente='fa fa-file-text-o';
export const ico_actualizar_celular=    'fa fa-file-text-o';
export const ico_actualizar_cliente=    'fa fa-file-text-o';
export const ico_actualizar_correo=     'fa fa-file-text-o';
export const ico_actualizar_direccion=  'fa fa-file-text-o';
export const ico_actualizar_estado_civil='fa fa-file-text-o';
export const ico_actualizar_forma_pago= 'fa fa-file-text-o';
export const ico_actualizar_genero=     'fa fa-file-text-o';
export const ico_actualizar_grupo_cliente='fa fa-file-text-o';
export const ico_actualizar_impuesto=   'fa fa-file-text-o';
export const ico_actualizar_origen_ingreso='fa fa-file-text-o';
export const ico_actualizar_plazo_credito='fa fa-file-text-o';
export const ico_actualizar_retencion_cliente='fa fa-file-text-o';
export const ico_actualizar_telefono=   'fa fa-file-text-o';
export const ico_actualizar_tipo_contribuyente='fa fa-file-text-o';
export const ico_actualizar_tipo_pago=  'fa fa-file-text-o';
export const ico_actualizar_tipo_retencion='fa fa-file-text-o';
export const ico_actualizar_factura_compra='fa fa-file-text-o';
export const ico_actualizar_pago_compra='fa fa-file-text-o';
export const ico_actualizar_proveedor=  'fa fa-file-text-o';
export const ico_actualizar_egreso=     'fa fa-file-text-o';
export const ico_actualizar_factura=    'fa fa-file-text-o';
export const ico_actualizar_pedido=     'fa fa-file-text-o';
export const ico_actualizar_proforma=   'fa fa-file-text-o';
export const ico_actualizar_dato_adicional='fa fa-file-text-o';
export const ico_actualizar_empresa=    'fa fa-file-text-o';
export const ico_actualizar_exportacion='fa fa-file-text-o';
export const ico_actualizar_importacion='fa fa-file-text-o';
export const ico_actualizar_ubicacion=  'fa fa-file-text-o';
export const ico_actualizar_contabilizacion='fa fa-file-text-o';
export const ico_actualizar_cuenta=     'fa fa-file-text-o';
export const ico_actualizar_entrega=    'fa fa-file-text-o';
export const ico_actualizar_transportista='fa fa-file-text-o';
export const ico_actualizar_vehiculo_transporte='fa fa-file-text-o';
export const ico_actualizar_activo_fijo='fa fa-file-text-o';
export const ico_actualizar_bodega=     'fa fa-file-text-o';
export const ico_actualizar_kardex=     'fa fa-file-text-o';
export const ico_actualizar_medida=     'fa fa-file-text-o';
export const ico_actualizar_producto=   'fa fa-file-text-o';
export const ico_actualizar_promocion=  'fa fa-file-text-o';
export const ico_actualizar_saldo_inicial_inventario='fa fa-file-text-o';
export const ico_actualizar_tabla_equivalencia_medida='fa fa-file-text-o';
export const ico_actualizar_usuario=    'fa fa-file-text-o';
export const ico_actualizar_establecimiento='fa fa-file-text-o';
export const ico_actualizar_punto_venta='fa fa-file-text-o';
export const ico_actualizar_presentacion_producto='fa fa-file-text-o';

/*********************************
 * CONSTANTES PARA OTROS COMPONENTES
 *********************************/
export const tab_mapa_cliente = 'Mapa Cliente'
export const item_mapa_cliente = 'Mapa Cliente'
export const ico_mapa_cliente = 'fa fa-map';
export const tab_promociones = 'Promociones'
export const item_promociones = 'Promociones/Combos'
export const ico_promociones = 'fa fa-product-hunt';

//NOMBRES DEL TAB PRICIPAL
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

export const identificacion_consumidor_final="9999999999999";
export const tipo_contribuyente_natural="NATURAL";
export const tipo_contribuyente_juridica="JURIDICA";
export const tipo_contribuyente_publica="PUBLICA";








