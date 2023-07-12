//requerimientos a instalar con NPM
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const multer=require('multer');
const qr = require('qrcode');
const fs = require('fs');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// Initializations
const app = express();
require('./config/passport');

const mapaRoutes = require('./routes/mapa.routes');

app.use(mapaRoutes);

// Models
const Formulario = require('./models/formulario');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(multer({ dest: path.join(__dirname,'/public/upload/tempx')}).single("image"));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.json());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.get('/summerImgAll', async (req, res) => {
  try {

    const  datos = await Formulario.find({'tipoArbol':"Guanabana"});
     
     // Formatea los datos en el formato requerido por la gráfica
   res.json(datos.toString());
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});


app.get('/datos', async (req, res) => {
  try {
    // Consulta la base de datos para obtener los datos de los árboles clasificados por especie
    const datos = await Formulario.aggregate([
      {
        $group: {
          _id: "$tipoArbol",
          cantidad: { $sum: 1 }
        }
      }
    ]);

    // Formatea los datos en el formato requerido por la gráfica
    const datosFormateados = datos.map(dato => [dato._id, dato.cantidad.toString()]);

    // Envía los datos formateados como respuesta
    res.json(datosFormateados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/formulario.routes'));
app.use(require('./routes/mapa.routes'))


// static files
app.use('/public', express.static(path.join(__dirname, '/public')));

module.exports = app;



// servidor principal