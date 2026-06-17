const prisma = require('../config/prisma');
const { v4: uuidv4 } = require('uuid');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.usuarios.findMany();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const usuario = await prisma.usuarios.create({
            data: {
                id: uuidv4(),
                ...req.body
            }
        });

        res.status(201).json(usuario);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {

        const usuario = await prisma.usuarios.findUnique({
            where: {
                id: req.params.id
            }
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json(usuario);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener usuario'
        });
    }
};

const actualizarUsuario = async (req, res) => {
    try {

        const usuario = await prisma.usuarios.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });

        res.json(usuario);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar usuario'
        });
    }
};

const eliminarUsuario = async (req, res) => {
    try {

        await prisma.usuarios.delete({
            where: {
                id: req.params.id
            }
        });

        res.json({
            mensaje: 'Usuario eliminado'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar usuario'
        });
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};