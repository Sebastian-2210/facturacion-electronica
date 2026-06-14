const prisma = require('../config/prisma');
const { v4: uuidv4 } = require('uuid');

const obtenerClientes = async (req, res) => {
    try {
        const clientes = await prisma.clientes.findMany();
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener clientes'
        });
    }
};

const crearCliente = async (req, res) => {
    try {

        const cliente = await prisma.clientes.create({
            data: {
                id: uuidv4(),
                ...req.body
            }
        });

        res.status(201).json(cliente);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear cliente'
        });
    }
};

module.exports = {
    obtenerClientes,
    crearCliente
};