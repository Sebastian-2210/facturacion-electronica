const express = require('express');
const cors = require('cors');

const clientesRoutes = require('./routes/clientes.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('TEST OK');
});

app.use('/api/clientes', clientesRoutes);

module.exports = app;