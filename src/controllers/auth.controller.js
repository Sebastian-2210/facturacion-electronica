const {
    registrarUsuario,
    loginUsuario
} = require('../services/auth.service');

const register = async (req, res) => {

    try {

        const usuario =
            await registrarUsuario(req.body);

        res.status(201).json(usuario);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};


const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const resultado =
            await loginUsuario(email, password);

        res.json(resultado);

    } catch (error) {

        res.status(401).json({
            mensaje: error.message
        });
    }
};

module.exports = {
    register,
    login
};