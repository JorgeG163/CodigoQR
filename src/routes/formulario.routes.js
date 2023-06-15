const router = require("express").Router();
const {
  renderFormulario,
  formulario,
} = require("../controllers/formulario.controller");

// Routes
router.get("/formulario", renderFormulario);
router.post("/formulario", formulario);

module.exports = router;
