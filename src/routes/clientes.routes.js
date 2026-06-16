const express = require('express');

const router = express.Router();

const {
    obtenerClientes,
    crearCliente,
    obtenerClientePorId,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/clientes.controller');

router.get('/', obtenerClientes);

router.post('/', crearCliente);

router.get('/:id', obtenerClientePorId);

router.put('/:id', actualizarCliente);

router.delete('/:id', eliminarCliente);

module.exports = router;