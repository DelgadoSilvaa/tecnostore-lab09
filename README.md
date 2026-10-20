# Laboratorio 09 – Proyecto inicial (código base ES5)

Sistema de gestión de una tienda de tecnología (**TecnoStore**) escrito
intencionalmente con sintaxis **ES5**, para ser refactorizado a **ES6+**
y modularizado con `import` / `export`.

## Estructura inicial

```
lab09-proyecto-inicial/
├── index.html            # Página que carga script.js
├── script.js             # Código base ES5 (a refactorizar)
├── salida-esperada.txt   # Salida original de la consola, para comparar
└── README.md
```

## Cómo ejecutarlo

Abre `index.html` en el navegador y revisa la consola (F12 → Console).
También puedes ejecutarlo con Node: `node script.js`.

## Qué contiene el código base (y qué debe refactorizarse)

| Paso del lab | Qué encontrarás en `script.js` |
|---|---|
| Paso 2 – `var` → `let`/`const` | Todas las variables usan `var`, incluidas las de los bucles `for`. |
| Paso 2 – Arrow functions | Todas las funciones y callbacks (`filter`, `map`, `sort`) usan `function`. |
| Paso 2 – Parámetros por defecto | `formatearPrecio`, `calcularDescuento`, `calcularPrecioConIGV` y `calcularPedido` usan el patrón `x = x \|\| valor`. |
| Paso 3 – Desestructuración de objetos | `describirProducto` y `resumenCliente` (incluye objeto anidado `direccion`). |
| Paso 3 – Desestructuración de arreglos | `obtenerExtremos` (resultado en `masCaro` / `masBarato`) y `ubicacionAlmacen` (`latitud` / `longitud`). |
| Paso 3 – Spread | `obtenerCatalogo` usa `concat()`; `obtenerConfiguracion` y `actualizarProducto` usan `Object.assign()`; `obtenerExtremos` usa `slice()`; `calcularPedido` usa `apply()`. |
| Paso 3 – Rest | `sumarMontos` y `registrarEvento` usan el objeto `arguments`. |
| Paso 4 – Modularización | Bloque **DATOS** → `datos.js`; bloque **FUNCIONES** → `utilidades.js`. |
| Paso 5 – Integración | Bloque **PROGRAMA PRINCIPAL** → `app.js`. |

## Estructura esperada al finalizar

```
├── index.html      # <script type="module" src="app.js"></script>
├── datos.js        # export de tienda, configuraciones, productos, clientes, pedido, ubicación
├── utilidades.js   # export de las funciones
└── app.js          # import de datos y utilidades + programa principal
```

> **Importante:** los módulos ES (`type="module"`) **no funcionan** abriendo el
> HTML con doble clic (`file://`) porque el navegador bloquea la carga por
> CORS. Usa la extensión **Live Server** de VS Code (clic derecho en
> `index.html` → *Open with Live Server*).

## Verificación

La salida de la consola del proyecto refactorizado debe ser **idéntica** a
`salida-esperada.txt`.

> Nota: `utilidades.js` necesitará datos como `configuracionPorDefecto` o las
> listas de productos (por ejemplo en `obtenerCatalogo` y `obtenerConfiguracion`).
> Puedes importarlos desde `datos.js` dentro de `utilidades.js`, o bien
> recibirlos como parámetros (mejor práctica).
