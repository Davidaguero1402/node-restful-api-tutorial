const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.json());

// Importa y usa las rutas definidas en services/routes.js
const routes = require('./services/routes');
app.use('/api', routes);

// Ruta raíz para mostrar el mensaje "It works!"
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;
