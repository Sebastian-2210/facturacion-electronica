const express = require('express');

const router = express.Router();

const {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuarios.controller');

const {
    verificarToken
} = require('../middlewares/auth.middleware');

const {
    verificarRol
} = require('../middlewares/roles.middleware');

router.get('/', obtenerUsuarios);

router.get('/:id', obtenerUsuarioPorId);

router.post('/', crearUsuario);

router.put('/:id', actualizarUsuario);

router.delete(
    '/:id',
    verificarToken,
    verificarRol('ADMIN'),
    eliminarUsuario
);

module.exports = router;