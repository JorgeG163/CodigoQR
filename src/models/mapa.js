const { Schema, model } = require("mongoose");

const mapaSchema = new Schema({
    latitud: {
      type: Number,
      required: true
    },
    longitud: {
      type: Number,
      required: true
    }
  });
  
  
  module.exports = model("mapas", mapaSchema);