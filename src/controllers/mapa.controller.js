const Mapa = require('../models/mapa');

exports.crearMarcador = async (req, res) => {
  const { lat, lng } = req.body;

  try {
    const nuevoMarcador = new Mapa({ latitud: lat, longitud: lng });

    await nuevoMarcador.save();

    res.status(201).json({ mensaje: 'Marcador guardado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el marcador' });
  }
};