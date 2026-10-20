/*
 * ============================================================
 *  LABORATORIO 09 - Código base (ES5)
 *  Sistema de gestión de una tienda de tecnología
 * ------------------------------------------------------------
 *  Este archivo está escrito INTENCIONALMENTE con sintaxis ES5:
 *    - Variables declaradas con var
 *    - Funciones tradicionales con function
 *    - Objetos planos
 *    - Valores por defecto "manuales" con ||
 *    - Acceso a propiedades con punto / índice
 *    - concat() y Object.assign() para combinar datos
 *    - Uso del objeto "arguments" para argumentos variables
 *
 *  Tu tarea: refactorizarlo a ES6+ y modularizarlo
 *  (datos.js, utilidades.js y app.js).
 * ============================================================
 */

// ============================================================
//  DATOS (base de datos simulada)
// ============================================================

var tienda = {
  nombre: 'TecnoStore',
  ruc: '20123456789',
  direccion: {
    calle: 'Av. Arequipa 1250',
    distrito: 'Lince',
    ciudad: 'Lima'
  }
};

var configuracionPorDefecto = {
  moneda: 'S/',
  igv: 0.18,
  descuentoMaximo: 30,
  mostrarStock: true
};

var configuracionUsuario = {
  moneda: 'S/',
  descuentoMaximo: 25
};

var productosLaptops = [
  { id: 1, nombre: 'Laptop Lenovo IdeaPad 3', categoria: 'Laptops', precio: 2499.90, stock: 8 },
  { id: 2, nombre: 'Laptop HP Pavilion 15', categoria: 'Laptops', precio: 3199.00, stock: 5 },
  { id: 3, nombre: 'MacBook Air M2', categoria: 'Laptops', precio: 4899.00, stock: 2 }
];

var productosAccesorios = [
  { id: 4, nombre: 'Mouse Logitech M170', categoria: 'Accesorios', precio: 39.90, stock: 50 },
  { id: 5, nombre: 'Teclado Redragon Kumara', categoria: 'Accesorios', precio: 149.00, stock: 0 },
  { id: 6, nombre: 'Audífonos Sony WH-CH520', categoria: 'Accesorios', precio: 199.00, stock: 15 }
];

var productosMonitores = [
  { id: 7, nombre: 'Monitor LG 24" IPS', categoria: 'Monitores', precio: 549.00, stock: 10 },
  { id: 8, nombre: 'Monitor Samsung 27" Curvo', categoria: 'Monitores', precio: 899.00, stock: 3 }
];

var clientes = [
  {
    id: 101,
    nombres: 'Ana',
    apellidos: 'Torres Quispe',
    email: 'ana.torres@correo.com',
    direccion: { distrito: 'Miraflores', ciudad: 'Lima' },
    tipo: 'frecuente'
  },
  {
    id: 102,
    nombres: 'Luis',
    apellidos: 'Ramírez Huamán',
    email: 'luis.ramirez@correo.com',
    direccion: { distrito: 'Cercado', ciudad: 'Arequipa' },
    tipo: 'nuevo'
  },
  {
    id: 103,
    nombres: 'María',
    apellidos: 'Flores Chávez',
    email: 'maria.flores@correo.com',
    direccion: { distrito: 'Víctor Larco', ciudad: 'Trujillo' },
    tipo: 'frecuente'
  }
];

var pedido = {
  codigo: 'PED-0001',
  clienteId: 101,
  items: [
    { productoId: 1, cantidad: 1 },
    { productoId: 4, cantidad: 2 },
    { productoId: 7, cantidad: 1 }
  ]
};

// Coordenadas del almacén [latitud, longitud]
var ubicacionAlmacen = [-12.0853, -77.0346];

// ============================================================
//  FUNCIONES (lógica de negocio)
// ============================================================

// Une todas las listas de productos en un solo catálogo
function obtenerCatalogo() {
  var catalogo = productosLaptops.concat(productosAccesorios).concat(productosMonitores);
  return catalogo;
}

// Combina la configuración por defecto con la del usuario
function obtenerConfiguracion() {
  var config = Object.assign({}, configuracionPorDefecto, configuracionUsuario);
  return config;
}

// Da formato a un monto. Si no se envía moneda o decimales, usa valores por defecto
function formatearPrecio(monto, moneda, decimales) {
  moneda = moneda || 'S/';
  decimales = decimales || 2;
  return moneda + ' ' + monto.toFixed(decimales);
}

// Calcula el precio con descuento. Si no se envía porcentaje, no aplica descuento
function calcularDescuento(precio, porcentaje) {
  porcentaje = porcentaje || 0;
  var descuento = precio * (porcentaje / 100);
  return precio - descuento;
}

// Calcula el precio final con IGV
function calcularPrecioConIGV(precio, igv) {
  igv = igv || 0.18;
  return precio + (precio * igv);
}

// Devuelve un texto con la información de un producto
function describirProducto(producto) {
  var nombre = producto.nombre;
  var precio = producto.precio;
  var stock = producto.stock;
  var categoria = producto.categoria;

  var estado = stock > 0 ? 'Disponible (' + stock + ' und.)' : 'AGOTADO';
  return '[' + categoria + '] ' + nombre + ' - ' + formatearPrecio(precio) + ' - ' + estado;
}

// Devuelve el nombre completo y la ciudad de un cliente
function resumenCliente(cliente) {
  var nombres = cliente.nombres;
  var apellidos = cliente.apellidos;
  var email = cliente.email;
  var distrito = cliente.direccion.distrito;
  var ciudad = cliente.direccion.ciudad;

  return nombres + ' ' + apellidos + ' <' + email + '> - ' + distrito + ', ' + ciudad;
}

// Busca un producto por su id
function buscarProductoPorId(catalogo, id) {
  for (var i = 0; i < catalogo.length; i++) {
    if (catalogo[i].id === id) {
      return catalogo[i];
    }
  }
  return null;
}

// Busca un cliente por su id
function buscarClientePorId(listaClientes, id) {
  for (var i = 0; i < listaClientes.length; i++) {
    if (listaClientes[i].id === id) {
      return listaClientes[i];
    }
  }
  return null;
}

// Filtra productos por categoría
function filtrarPorCategoria(catalogo, categoria) {
  return catalogo.filter(function (producto) {
    return producto.categoria === categoria;
  });
}

// Devuelve solo los productos con stock disponible
function productosDisponibles(catalogo) {
  return catalogo.filter(function (producto) {
    return producto.stock > 0;
  });
}

// Devuelve una lista con los nombres de los productos
function listarNombres(catalogo) {
  return catalogo.map(function (producto) {
    return producto.nombre;
  });
}

// Suma una cantidad indefinida de números (usa "arguments")
function sumarMontos() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

// Registra un mensaje con varias etiquetas (usa "arguments")
function registrarEvento(tipo) {
  var etiquetas = Array.prototype.slice.call(arguments, 1);
  console.log('[' + tipo.toUpperCase() + '] ' + etiquetas.join(' | '));
}

// Actualiza el stock de un producto creando un objeto nuevo
function actualizarProducto(producto, cambios) {
  return Object.assign({}, producto, cambios);
}

// Calcula el detalle y total de un pedido
function calcularPedido(pedidoActual, catalogo, porcentajeDescuento) {
  porcentajeDescuento = porcentajeDescuento || 0;
  var config = obtenerConfiguracion();
  var detalle = [];
  var subtotales = [];

  for (var i = 0; i < pedidoActual.items.length; i++) {
    var item = pedidoActual.items[i];
    var producto = buscarProductoPorId(catalogo, item.productoId);
    var subtotal = producto.precio * item.cantidad;

    detalle.push(item.cantidad + ' x ' + producto.nombre + ' = ' + formatearPrecio(subtotal, config.moneda));
    subtotales.push(subtotal);
  }

  var subtotalGeneral = sumarMontos.apply(null, subtotales);
  var conDescuento = calcularDescuento(subtotalGeneral, porcentajeDescuento);
  var total = calcularPrecioConIGV(conDescuento, config.igv);

  return {
    codigo: pedidoActual.codigo,
    detalle: detalle,
    subtotal: subtotalGeneral,
    descuento: porcentajeDescuento,
    total: total
  };
}

// Obtiene el producto más caro y el más barato
function obtenerExtremos(catalogo) {
  var ordenados = catalogo.slice().sort(function (a, b) {
    return b.precio - a.precio;
  });
  return [ordenados[0], ordenados[ordenados.length - 1]];
}

// ============================================================
//  PROGRAMA PRINCIPAL
// ============================================================

console.log('==============================================');
console.log('  ' + tienda.nombre + ' - RUC ' + tienda.ruc);
console.log('  ' + tienda.direccion.calle + ', ' + tienda.direccion.distrito + ' - ' + tienda.direccion.ciudad);
console.log('==============================================');

// 1. Configuración
var config = obtenerConfiguracion();
console.log('\n--- 1. Configuración del sistema ---');
console.log(config);

// 2. Catálogo completo
var catalogo = obtenerCatalogo();
console.log('\n--- 2. Catálogo completo (' + catalogo.length + ' productos) ---');
for (var i = 0; i < catalogo.length; i++) {
  console.log(describirProducto(catalogo[i]));
}

// 3. Filtros
console.log('\n--- 3. Filtros ---');
console.log('Monitores:', listarNombres(filtrarPorCategoria(catalogo, 'Monitores')));
console.log('Con stock:', productosDisponibles(catalogo).length + ' de ' + catalogo.length);

// 4. Producto más caro y más barato (acceso por índice)
var extremos = obtenerExtremos(catalogo);
var masCaro = extremos[0];
var masBarato = extremos[1];
console.log('\n--- 4. Extremos de precio ---');
console.log('Más caro  : ' + masCaro.nombre + ' (' + formatearPrecio(masCaro.precio) + ')');
console.log('Más barato: ' + masBarato.nombre + ' (' + formatearPrecio(masBarato.precio) + ')');

// 5. Clientes
console.log('\n--- 5. Clientes registrados ---');
for (var j = 0; j < clientes.length; j++) {
  console.log((j + 1) + '. ' + resumenCliente(clientes[j]));
}

// 6. Descuentos y formatos (prueba de valores por defecto)
console.log('\n--- 6. Descuentos y formatos ---');
console.log('Sin descuento     : ' + formatearPrecio(calcularDescuento(1000)));
console.log('Con 15% descuento : ' + formatearPrecio(calcularDescuento(1000, 15)));
console.log('Formato en dólares: ' + formatearPrecio(250, '$'));
console.log('Con 3 decimales   : ' + formatearPrecio(99.5, 'S/', 3));

// 7. Pedido
console.log('\n--- 7. Pedido ---');
var cliente = buscarClientePorId(clientes, pedido.clienteId);
var descuentoCliente = cliente.tipo === 'frecuente' ? 10 : 0;
var resultado = calcularPedido(pedido, catalogo, descuentoCliente);

console.log('Pedido : ' + resultado.codigo);
console.log('Cliente: ' + cliente.nombres + ' ' + cliente.apellidos + ' (' + cliente.tipo + ')');
for (var k = 0; k < resultado.detalle.length; k++) {
  console.log('  - ' + resultado.detalle[k]);
}
console.log('Subtotal          : ' + formatearPrecio(resultado.subtotal));
console.log('Descuento aplicado: ' + resultado.descuento + '%');
console.log('Total (con IGV)   : ' + formatearPrecio(resultado.total));

// 8. Actualización de stock (objeto nuevo sin modificar el original)
console.log('\n--- 8. Actualización de stock ---');
var teclado = buscarProductoPorId(catalogo, 5);
var tecladoActualizado = actualizarProducto(teclado, { stock: 20 });
console.log('Original   : ' + describirProducto(teclado));
console.log('Actualizado: ' + describirProducto(tecladoActualizado));

// 9. Suma con cantidad variable de argumentos
console.log('\n--- 9. Suma de montos variables ---');
console.log('Ventas del día: ' + formatearPrecio(sumarMontos(1200, 350.5, 89.9, 2499.9)));

// 10. Ubicación del almacén (acceso por índice a un arreglo)
var latitud = ubicacionAlmacen[0];
var longitud = ubicacionAlmacen[1];
console.log('\n--- 10. Ubicación del almacén ---');
console.log('Latitud: ' + latitud + ' | Longitud: ' + longitud);

// 11. Registro de eventos
console.log('\n--- 11. Eventos ---');
registrarEvento('info', 'Sistema iniciado', 'Catálogo cargado', 'Pedido procesado');
registrarEvento('alerta', 'Producto agotado', teclado.nombre);

console.log('\n==============================================');
console.log('  Fin de la ejecución');
console.log('==============================================');
