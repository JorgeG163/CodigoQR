const express = require('express');
const router = express.Router();

// Ruta para renderizar la página con el mapa
router.get('/mapa', (req, res) => {
  res.render('mapa'); // Reemplaza 'mapa' con el nombre de tu plantilla de Handlebars para el mapa
});

module.exports = router;