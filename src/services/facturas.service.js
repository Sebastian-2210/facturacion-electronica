const prisma = require('../config/prisma');
const { v4: uuidv4 } = require('uuid');

const crearFacturaCompleta = async (data) => {

    const { cliente_id, usuario_id, productos } = data;

    let subtotal = 0;
    let ivaTotal = 0;

    const detalles = [];

    for (const item of productos) {

        const producto = await prisma.productos.findUnique({
            where: {
                id: item.producto_id
            }
        });

        if (!producto) {
            throw new Error(
                `Producto ${item.producto_id} no existe`
            );
        }

        const precio = Number(producto.precio);

        const porcentajeIva =
            Number(producto.porcentaje_iva);

        const ivaUnitario =
            precio * (porcentajeIva / 100);

        const subtotalLinea =
            (precio + ivaUnitario)
            * item.cantidad;

        subtotal += precio * item.cantidad;

        ivaTotal += ivaUnitario * item.cantidad;

        detalles.push({
            id: uuidv4(),
            producto_id: producto.id,
            cantidad: item.cantidad,
            precio_unitario: precio,
            iva_unitario: ivaUnitario,
            subtotal: subtotalLinea
        });
    }

    const total = subtotal + ivaTotal;

    const factura = await prisma.$transaction(async (tx) => {

    const nuevaFactura = await tx.facturas.create({
        data: {
            id: uuidv4(),
            numero_factura: `FV-${Date.now()}`,
            cliente_id,
            usuario_id,
            subtotal,
            iva_total: ivaTotal,
            total,
            estado: 'BORRADOR'
        }
    });

    for (const detalle of detalles) {

        await tx.detalle_factura.create({
            data: {
                ...detalle,
                factura_id: nuevaFactura.id
            }
        });
    }

    return nuevaFactura;
});

return {
    factura,
    subtotal,
    ivaTotal,
    total,
    detalles
};

};

module.exports = {
    crearFacturaCompleta
};