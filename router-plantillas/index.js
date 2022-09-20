const express = require('express');
const apiRoutes = require('./routers/app.routers');
const Contenedor = require('../manejo_de_archivos/contenedor')
const { engine } = require("express-handlebars")

const app = express();

// hbs
/* app.engine('handlebars', engine({
  extname: ".handlebars",
  defaultLayout: "main.handlebars",
  layoutsDir: __dirname + "/hbs/views/layouts",
  partialsDir: __dirname + "/hbs/views/partials",
}));

app.set('views', './hbs/views');
app.set('view engine', 'handlebars'); */

// ejs
/* app.set('views', './ejs/views');
app.set('view engine', 'ejs'); */

// pug
/* app.set('views', './pug/views');
app.set('view engine', 'pug'); */

const PORT = process.env.PORT || 8080;

const contenedor = new Contenedor('../manejo_de_archivos/productos.json');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);

// hbs
/* app.get('/productoshbs', (req, res) => {
  contenedor.getAll().then((p) => {
    res.render('indexhbs', { productos: p });
  })
});

app.post('/productoshbs', (req, res) => {
  contenedor.addProduct(req.body).then(() => {
    res.redirect('/productoshbs');
  })
}); */

// ejs
/* app.get('/productosejs', (req, res) => {
  contenedor.getAll().then((p) => {
    res.render('indexejs', { productos: p });
  })
});

app.post('/productosejs', (req, res) => {
  contenedor.addProduct(req.body).then(() => {
    res.redirect('/productosejs');
  })
}); */


// pug
/* app.get('/productospug', (req, res) => {
  contenedor.getAll().then((p) => {
  res.render('indexpug', { productos: p});
  } )
});

app.post('/productospug', (req, res) => {
  contenedor.addProduct(req.body).then(() => {  
    res.redirect('/productospug');
})
}); */

// Server
const connectedServer = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', error => console.log(`Server error: ${error}`));
