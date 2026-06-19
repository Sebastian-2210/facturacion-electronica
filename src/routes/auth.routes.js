const express = require('express');

const router = express.Router();

const {
    register,
    login,
    obtenerPerfil
} = require('../controllers/auth.controller');

const {
    verificarToken
} = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', verificarToken, obtenerPerfil);

module.exports = router;