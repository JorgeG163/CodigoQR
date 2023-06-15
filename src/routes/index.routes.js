const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout, renderHome, renderInfo, renderMapa, renderFotos, renderFormulario } = require("../controllers/index.controller");

const { SaveForm }= require("../controllers/formulario.controller"); 

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/home", renderHome);
router.get("/info", renderInfo);
router.get("/mapa", renderMapa);
router.get("/fotos", renderFotos);
router.get("/formulario", renderFormulario);


router.post("/images", SaveForm);

//CREADO POR MI
//router.get("/images/:image_id", renderFotos);
//router.post("/images", Imgcreate);


// Models
const Formulario = require('../models/formulario');

router.get('/getAll', async (req, res) => {
    try{
        const data = await Formulario.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;

