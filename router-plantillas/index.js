const express = require('express');
const apiRoutes = require('./routers/app.routers');
const Contenedor = require('../manejo_de_archivos/contenedor')


const app = express();

app.set('views', './ejs/views');
app.set('view engine', 'ejs');

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

// Server
const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT}`);
});