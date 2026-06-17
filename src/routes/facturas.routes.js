const express = require('express');

const router = express.Router();

const {
    obtenerFacturas,
    obtenerFacturaPorId,
    crearFactura
} = require('../controllers/facturas.controller');

router.get('/', obtenerFacturas);

router.get('/:id', obtenerFacturaPorId);

router.post('/', crearFactura);

module.exports = router;