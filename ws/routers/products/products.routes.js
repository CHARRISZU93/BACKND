const express = require('express');
const products = require('../../../manejo_de_archivos/productos.json');

const router = express.Router();

router.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

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
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, error: 'Please provide name and price' });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    price: +price
  }
  products.push(newProduct);
  return res.status(201).json({ success: true, result: newProduct });
})

router.put('/:productId', (req, res) => {
  const { params: { productId }, body: { name, price } } = req;
  if (!name || !price) {
    return res.status(400).json({ success: false, error: 'Wrong body format' });
  };
  const productIndex = products.findIndex((product) => product.id === +productId);
  if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!` });
  const newProduct = {
    ...products[productIndex],
    name,
    price,
  };
  products[productIndex] = newProduct;
  return res.json({ success: true, result: newProduct });
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  const productIndex = products.findIndex(product => product.id === +productId);
  if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id ${productId} does not exist!` });
  products.splice(productIndex, 1);
  return res.json({ success: true, result: 'product correctly eliminated' });
});


module.exports = router;