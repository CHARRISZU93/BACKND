const express = require('express');
const products = require('../../manejo_de_archivos/productos.json');

const router = express.Router();

router.get('/', (req, res) => {
  const { maxPrice, search } = req.query;
  let productsResponse = [...products];
  if (Object.keys(req.query).length > 0) {
    if (maxPrice) {
      if (isNaN(+maxPrice)) {
        return res.status(400).json({ success: false, error: 'maxPrice must be a valid number' });
      }
      productsResponse = productsResponse.filter(product => product.price <= +maxPrice);
    }
    if (search) {
      productsResponse = productsResponse.filter(product => product.name.toLowerCase().startsWith(search.toLowerCase()))
    }
    return res.json({ success: true, result: productsResponse });
  }
  return res.json({ success: true, result: productsResponse });
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  const product = products.find(product => product.id === +productId);
  if (!product) {
    return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!` });
  }
  return res.json({ success: true, result: product });
})

router.post('/new', (req, res) => {
  if (!req.headers["isAdmin"]) {
    return res.status(401).json({ success: false, error: 'No autorizado' })
  }
  const { name, descrp, cod, img, price, stock } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, error: 'Please provide name and price' });
  }
  const newProduct = {
    id: products.length + 1,
    timestamp: Date.now(),
    name,
    descrp,
    cod,
    img,
    price: +price,
    stock,
  }
  products.push(newProduct);
  return res.status(201).json({ success: true, result: newProduct });
})

router.put('/:productId', (req, res) => {
  if (!req.headers["isAdmin"]) {
    return res.status(401).json({ success: false, error: 'No autorizado' })
  }
  const { params: { productId }, body: { name, descrp, cod, img, price, stock } } = req;
  if (!name || !descrp || !cod || !img || !price || !stock) {
    return res.status(400).json({ success: false, error: 'Wrong body format' });
  };
  const productIndex = products.findIndex((product) => product.id === +productId);
  if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!` });
  products[productIndex] = newProduct;
  return res.json({ success: true, result: newProduct });
});

router.delete('/:productId', (req, res) => {
  if (!req.headers["isAdmin"]) {
    return res.status(401).json({ success: false, error: 'No autorizado' })
  }
  const { productId } = req.params;
  const productIndex = products.findIndex(product => product.id === +productId);
  if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id ${productId} does not exist!` });
  products.splice(productIndex, 1);
  return res.json({ success: true, result: 'product correctly eliminated' });
});


module.exports = router;