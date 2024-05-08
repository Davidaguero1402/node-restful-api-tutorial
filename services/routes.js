// services/routes.js
const express = require('express');
const router = express.Router();

// Importa el controlador o lógica de manejo de solicitudes
const { receiveData } = require('./appService');

// Definir la ruta para recibir datos
router.post('/receive-data', receiveData);

module.exports = router;
