const prisma = require('../config/prisma');
const { v4: uuidv4 } = require('uuid');

const obtenerProductos = async (req, res) => {
    try {

        const productos = await prisma.productos.findMany();

        res.json(productos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener productos'
        });
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {

        const { id } = req.params;

        const producto = await prisma.productos.findUnique({
            where: { id }
        });

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(producto);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener producto'
        });
    }
};

const crearProducto = async (req, res) => {
    try {

        const producto = await prisma.productos.create({
            data: {
                id: uuidv4(),
                ...req.body
            }
        });

        res.status(201).json(producto);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear producto'
        });
    }
};

const actualizarProducto = async (req, res) => {
    try {

        const { id } = req.params;

        const producto = await prisma.productos.update({
            where: { id },
            data: req.body
        });

        res.json(producto);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar producto'
        });
    }
};

const eliminarProducto = async (req, res) => {
    try {

        const { id } = req.params;

        await prisma.productos.delete({
            where: { id }
        });

        res.json({
            mensaje: 'Producto eliminado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar producto'
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};