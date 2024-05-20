// services/routes.js
const express = require('express');
const router = express.Router();

// Importa el controlador o lógica de manejo de solicitudes
const { receiveData , sendDataintoJson } = require('./appService');

// Definir la ruta para recibir datos
router.post('/receive-data', receiveData);

//ruta para mostrar el archivo json
router.get('/view-data', sendDataintoJson)

module.exports = router;
