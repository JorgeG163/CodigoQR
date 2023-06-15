const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

indexCtrl.renderHome = (req, res) => {
  res.render('home');
};

indexCtrl.renderInfo = (req, res) => {
  res.render('info');
};

indexCtrl.renderMapa = (req, res) => {
  res.render('mapa');
};

indexCtrl.renderFotos = (req, res) => {
  res.render('fotos');
};

indexCtrl.renderFormulario= (req, res) => {
  res.render('formulario');
};






module.exports = indexCtrl;