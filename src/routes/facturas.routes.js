const express = require('express');

const router = express.Router();

const { verificarToken } = require('../middlewares/auth.middleware');

const {

obtenerFacturas,

obtenerFacturaPorId,

crearFactura

} = require('../controllers/facturas.controller');

router.get('/', verificarToken, obtenerFacturas);

router.get('/:id', verificarToken, obtenerFacturaPorId);

router.post('/', verificarToken, crearFactura);

module.exports = router;