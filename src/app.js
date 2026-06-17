const express = require('express');
const cors = require('cors');

const clientesRoutes = require('./routes/clientes.routes');
const productosRoutes = require('./routes/productos.routes');
const facturasRoutes = require('./routes/facturas.routes');
const usuariosRoutes = require('./routes/usuarios.routes');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('TEST OK');
});

app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/facturas', facturasRoutes);
app.use('/api/usuarios', usuariosRoutes);

module.exports = app;