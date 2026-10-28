# Sistema de Ventas para Tienda de Electrónica (Terminal CLI)

Un sistema interactivo de facturación para la terminal desarrollado en **JavaScript (Node.js)**. Permite gestionar un catálogo fijo de productos electrónicos, acumular compras en un carrito y emitir comprobantes electrónicos (**Boleta de Venta** o **Factura**) bajo la normativa fiscal de Perú (SUNAT).

Este proyecto sirve como un ejemplo práctico para entender la diferencia técnica entre una **función** (procesamiento y retorno de datos) y un **procedimiento** (ejecución de acciones o efectos secundarios).

---

## Características

- **Catálogo de Productos Fijo:** Evita errores humanos de digitación de precios.
- **Carrito de Compras Dinámico:** Permite agregar múltiples productos de manera consecutiva mediante bucles interactivos.
- **Doble Flujo de Comprobantes (Formato SUNAT):**
  - **Boleta de Venta:** Muestra únicamente el importe total acumulado (impuesto oculto).
  - **Factura Electrónica:** Requiere Razón Social y RUC. Desglosa de forma exacta el **Subtotal**, el **IGV (18%)** y el **Total**.
- **Consola Alineada:** Uso de formateo de texto (`padEnd` y `toFixed`) para simular la impresión limpia de un ticket real.

---

## Conceptos de Programación Aplicados

El código está estructurado para demostrar dos pilares del desarrollo de software:

1. **Función (`calcularDesgloseFactura`):** Recibe el total pagado, realiza la operación matemática de detracción del impuesto y **retorna** un objeto con los valores desglosados (`subtotal`, `igv`, `total`). No altera la pantalla ni interactúa con el usuario.
2. **Procedimientos (`imprimirBoleta` y `imprimirFactura`):** No retornan ningún valor (`void`). Su único objetivo es interactuar con el flujo de salida (`console.log`) para renderizar el ticket visual en la terminal.

---

## Requisitos

- [Node.js](https://nodejs.org) instalado en tu equipo (versión 14 o superior recomendada).

---

## 💻 Instalación y Ejecución

1. Clona este repositorio o descarga el archivo del código fuente (`index.js`).
2. Abre tu terminal o consola de comandos en la carpeta del proyecto.
3. Ejecuta el programa con el siguiente comando:

```bash
node index.js
```

---

## Ejemplo de Uso en la Terminal

### Flujo de Venta y Selección de Ítems
```text
--- BIENVENIDO A ELECTRONICS PERÚ ---

Catálogo de productos:
[1] Audífonos Bluetooth - S/. 120.00
[2] Teclado Mecánico - S/. 250.00
[3] Mouse Gamer - S/. 85.00
[4] Monitor 24' FHD - S/. 650.00

Seleccione el código del producto (o '0' para finalizar): 1
¡Audífonos Bluetooth añadido al carrito!

Seleccione el código del producto (o '0' para finalizar): 3
¡Mouse Gamer añadido al carrito!

Seleccione el código del producto (o '0' para finalizar): 0
```

### Caso 1: Emisión de Factura (Desglosada)
```text
El monto total de la compra es: S/. 205.00
¿Desea Boleta (B) o Factura (F)?: F
Ingrese Razón Social de la empresa: Inversiones Alva S.A.C.
Ingrese número de RUC (11 dígitos): 20123456789

=======================================
          FACTURA ELECTRÓNICA          
=======================================
Razon Social: Inversiones Alva S.A.C.
RUC:          20123456789
---------------------------------------
Audífonos Bluetooth       S/. 120.00
Mouse Gamer               S/. 85.00
---------------------------------------
SUBTOTAL:                 S/. 173.73
IGV (18%):                S/. 31.27
TOTAL A PAGAR:            S/. 205.00
=======================================
```

---

## Licencia

Este proyecto es de uso educativo y libre de modificación. 
