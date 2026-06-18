const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const registrarUsuario = async (data) => {

    const passwordHash =
        await bcrypt.hash(data.password, 10);

    return prisma.usuarios.create({
        data: {
            id: uuidv4(),
            nombre: data.nombre,
            email: data.email,
            password_hash: passwordHash,
            rol: data.rol
        }
    });
};

const loginUsuario = async (email, password) => {

    const usuario = await prisma.usuarios.findUnique({
        where: { email }
    });

    if (!usuario) {
        throw new Error('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare(
        password,
        usuario.password_hash
    );

    if (!passwordValida) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '8h'
        }
    );

    return {
        token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        }
    };
};

module.exports = {
    registrarUsuario,
    loginUsuario
};