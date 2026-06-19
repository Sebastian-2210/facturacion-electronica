const verificarRol = (...rolesPermitidos) => {

    return (req, res, next) => {

        if (!rolesPermitidos.includes(req.usuario.rol)) {

            return res.status(403).json({
                mensaje: 'No tienes permisos'
            });
        }

        next();
    };
};

module.exports = {
    verificarRol
};