const formularioCtrl = {};
const formulario = require('../models/formulario');

const Paths=require("path")
const fs=require('fs-extra');



//volver a pintar el formulario
formularioCtrl.renderFormulario = (req, res) => {
  res.render('formulario');
};
// fin de controlador para renderizar o volver a pintar el formulario



formularioCtrl.SaveForm = async (req, res) => {
  try {

    const imageTempPath = req.file.path; //direccion donde esta el archivo
    const ext = Paths.extname(req.file.originalname).toLowerCase(); //obtengo la extencion del archivo
    
    //const archivocompleto=imageTempPath.concat('', ext)
    const archivocompleto=req.file.filename+""+ext;

    const targetPath=Paths.resolve('src/public/upload/'+archivocompleto);

    await fs.rename(imageTempPath,targetPath);


    let errors = [];
    const { nombre, apellido, programa, latitud, longitud, tipoArbol, file } = req.body;

    if (nombre.length < 3) {
      errors.push({ text: "Ingrese un nombre válido" });
    }
    if (apellido.length < 3) {
      errors.push({ text: "Ingrese un apellido válido" });
    }

    if (errors.length > 0) {
      // Renderiza nuevamente el formulario con los errores
      return res.render('formulario', {
        errors,
        nombre,
        apellido,
        programa,
        latitud,
        longitud,
        tipoArbol
      });
    } else {
      // Crea un nuevo documento utilizando el modelo Formulario
      const nuevoFormulario = new formulario({
        nombre,
        apellido,
        programa,
        tipoArbol,
        latitud,
        longitud,
        archivocompleto
      });

      // Guarda el formulario en la base de datos
      await nuevoFormulario.save();

      // Redirige a la página info.hbs
      res.redirect('/mapa');
    }
  } catch (error) {
    // Maneja el error de guardar el formulario
    console.error(error);
    // Redirige a una página de error o muestra un mensaje de error
    req.flash("error_msg", "Error al almacenar los datos");
    res.redirect('/formulario');
  }
};

formularioCtrl.formulario = async (req, res) => {
  try {
    let errors = [];
    const { nombre, apellido, programa, latitud, longitud, tipoArbol } = req.body;

    if (nombre.length < 3) {
      errors.push({ text: "Ingrese un nombre válido" });
    }
    if (apellido.length < 3) {
      errors.push({ text: "Ingrese un apellido válido" });
    }

    if (errors.length > 0) {
      // Renderiza nuevamente el formulario con los errores
      return res.render('formulario', {
        errors,
        nombre,
        apellido,
        programa,
        latitud,
        longitud,
        tipoArbol
      });
    } else {
      // Crea un nuevo documento utilizando el modelo Formulario
      const nuevoFormulario = new formulario({
        nombre,
        apellido,
        programa,
        latitud,
        longitud,
        tipoArbol
      });

      // Guarda el formulario en la base de datos
      await nuevoFormulario.save();

      // Redirige a la página info.hbs
      res.redirect('/mapa');
    }
  } catch (error) {
    // Maneja el error de guardar el formulario
    console.error(error);
    // Redirige a una página de error o muestra un mensaje de error
    req.flash("error_msg", "Error al almacenar los datos");
    res.redirect('/formulario');
  }
};


formularioCtrl.getInfo = async (req, res) => {
  try {
    const arboles = await formulario.distinct('tipoArbol');
    res.render('info', { arboles });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error al obtener la información");
    res.redirect('/formulario');
  }
};

module.exports = formularioCtrl;