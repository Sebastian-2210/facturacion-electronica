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

const obtenerClientePorId = async (req, res) => {
    try {

        const { id } = req.params;

        const cliente = await prisma.clientes.findUnique({
            where: { id }
        });

        if (!cliente) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json(cliente);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener cliente'
        });
    }
};

const actualizarCliente = async (req, res) => {
    try {

        const { id } = req.params;

        const cliente = await prisma.clientes.update({
            where: { id },
            data: req.body
        });

        res.json(cliente);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar cliente'
        });
    }
};

const eliminarCliente = async (req, res) => {
    try {

        const { id } = req.params;

        await prisma.clientes.delete({
            where: { id }
        });

        res.json({
            mensaje: 'Cliente eliminado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar cliente'
        });
    }
};

module.exports = {
    obtenerClientes,
    crearCliente,
    obtenerClientePorId,
    actualizarCliente,
    eliminarCliente
};