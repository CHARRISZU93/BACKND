const express = require('express');
const productsRoutes = require('../products/products.routes');
const cartRoutes = require('../carrito/cart.routes')

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carrito', cartRoutes)

module.exports = router;