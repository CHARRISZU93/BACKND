const express = require('express');
const apiRoutes = require('./routers/app.routers');
const Contenedor = require('../manejo_de_archivos/contenedor')


const app = express();

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'indexhbs.hbs',
    layoutdir: __dirname + './hbs/views/layouts',
    partialsDir: __dirname + './hbs/views/partials'
}));

app.set('views', './hbs/views');
app.set('view engine', 'hbs');    

app.set('views', './ejs/views');
app.set('view engine', 'ejs');

app.set('views, ./pug/views');
app.set('view engine', 'pug');

const PORT = process.env.PORT || 8080;

const contenedor = new Contenedor('../manejo_de_archivos/productos.json');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);

app.get('/productosejs', (req, res) => {
  res.render('indexejs', { productos: contenedor.getAll() });
});

app.post('/productosejs', (req, res) => {
  contenedor.addProduct(req.body);
  res.redirect('/productosejs');
});

app.get('/productospug', (req, res) => {
  res.render('indexpug', { productos: contenedor.getAll() });
});

app.post('/productospug', (req, res) => {
  contenedor.addProduct(req.body);
  res.redirect('/productospug');
});

// Server
const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT}`);
});