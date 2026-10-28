const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- INVENTARIO DE LA TIENDA (Fijo en el código) ---
const PRODUCTOS = {
    "1": { nombre: "Audífonos Bluetooth", precio: 120.00 },
    "2": { nombre: "Teclado Mecánico", precio: 250.00 },
    "3": { nombre: "Mouse Gamer", precio: 85.00 },
    "4": { nombre: "Monitor 24", precio: 650.00 }
};

// Variables de estado de la compra
let carrito = [];
let totalAcumulado = 0.0;

// --- FUNCIONES Y PROCEDIMIENTOS ---

// FUNCIÓN: Calcula subtotal e IGV a partir del total. Retorna un objeto.
function calcularDesgloseFactura(total) {
    const subtotal = total / 1.18;
    const igv = total - subtotal;
    return {
        subtotal: subtotal.toFixed(2),
        igv: igv.toFixed(2),
        total: total.toFixed(2)
    };
}

// PROCEDIMIENTO: Imprime el formato de Boleta.
function imprimirBoleta(cliente, carrito, total) {
    console.log("\n=======================================");
    console.log("      BOLETA DE VENTA ELECTRÓNICA      ");
    console.log("=======================================");
    console.log(`Cliente: ${cliente}`);
    console.log("---------------------------------------");
    carrito.forEach(prod => {
        console.log(`${prod.nombre.padEnd(25)} S/. ${prod.precio.toFixed(2)}`);
    });
    console.log("---------------------------------------");
    console.log(`TOTAL A PAGAR:            S/. ${total.toFixed(2)}`);
    console.log("=======================================\n");
}

// PROCEDIMIENTO: Imprime el formato de Factura desglosada.
function imprimirFactura(razonSocial, ruc, carrito, total) {
    const valores = calcularDesgloseFactura(total);
    console.log("\n=======================================");
    console.log("          FACTURA ELECTRÓNICA          ");
    console.log("=======================================");
    console.log(`Razon Social: ${razonSocial}`);
    console.log(`RUC:          ${ruc}`);
    console.log("---------------------------------------");
    carrito.forEach(prod => {
        console.log(`${prod.nombre.padEnd(25)} S/. ${prod.precio.toFixed(2)}`);
    });
    console.log("---------------------------------------");
    console.log(`SUBTOTAL:                 S/. ${valores.subtotal}`);
    console.log(`IGV (18%):                S/. ${valores.igv}`);
    console.log(`TOTAL A PAGAR:            S/. ${valores.total}`);
    console.log("=======================================\n");
}

// --- FLUJO ASÍNCRONO DE LA TIENDA ---
const preguntar = (texto) => new Promise((resolve) => rl.question(texto, resolve));

async function iniciarTienda() {
    console.log("--- BIENVENIDO A ELECTRONICS PERÚ ---");

    // Bucle para añadir productos al carrito
    while (true) {
        console.log("\nCatálogo de productos:");
        for (const [codigo, info] of Object.entries(PRODUCTOS)) {
            console.log(`[${codigo}] ${info.nombre} - S/. ${info.precio.toFixed(2)}`);
        }

        const opcion = await preguntar("\nSeleccione el código del producto (o '0' para finalizar): ");

        if (opcion === "0") {
            if (carrito.length === 0) {
                console.log("El carrito está vacío. Cerrando sistema.");
                rl.close();
                return;
            }
            break;
        } else if (PRODUCTOS[opcion]) {
            const item = PRODUCTOS[opcion];
            carrito.push(item);
            totalAcumulado += item.precio;
            console.log(`¡${item.nombre} añadido al carrito!`);
        } else {
            console.log("Código no válido. Intente de nuevo.");
        }
    }

    // Selección del comprobante de pago
    console.log(`\nEl monto total de la compra es: S/. ${totalAcumulado.toFixed(2)}`);
    const tipoComprobante = (await preguntar("¿Desea Boleta (B) o Factura (F)?: ")).trim().toUpperCase();

    if (tipoComprobante === "F") {
        const razonSocial = await preguntar("Ingrese Razón Social de la empresa: ");
        const ruc = await preguntar("Ingrese número de RUC (11 dígitos): ");
        imprimirFactura(razonSocial, ruc, carrito, totalAcumulado);
    } else {
        let cliente = await preguntar("Ingrese nombre del cliente (Opcional, presione Enter para Varios): ");
        if (!cliente) cliente = "Clientes Varios";
        imprimirBoleta(cliente, carrito, totalAcumulado);
    }

    rl.close();
}

// Ejecutar el programa
iniciarTienda();
