const prisma = require('../config/prisma');
const { v4: uuidv4 } = require('uuid');

const {
    crearFacturaCompleta
} = require('../services/facturas.service');

const obtenerFacturas = async (req, res) => {
    try {

        const facturas = await prisma.facturas.findMany({
            include: {
                clientes: true,
                detalle_factura: true
            }
        });

        res.json(facturas);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener facturas'
        });
    }
};

const obtenerFacturaPorId = async (req, res) => {
    try {

        const { id } = req.params;

        const factura = await prisma.facturas.findUnique({
            where: { id },
            include: {
                clientes: true,
                detalle_factura: true
            }
        });

        if (!factura) {
            return res.status(404).json({
                mensaje: 'Factura no encontrada'
            });
        }

        res.json(factura);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener factura'
        });
    }
};

const crearFactura = async (req, res) => {

    try {

        const resultado =
            await crearFacturaCompleta(req.body);

        res.status(201).json(resultado);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};

module.exports = {
    obtenerFacturas,
    obtenerFacturaPorId,
    crearFactura
};