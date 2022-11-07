const express = require('express');
const carrito = require('./carritos.json');
const product = require('../../manejo_de_archivos/productos.json')

const router = express.Router();

router.get('/all', (req, res) => {
    let cartResponse = [...carrito];
    return res.json({ success: true, result: cartResponse });
});

router.post('/', (req, res) => {
    const { productosId } = req.body
    const newCart = {
        id: carrito.length + 1,
        timestamp: Date.now(),
        productos: productosId
    }
    carrito.push(newCart);
    return res.status(201).json({ success: true, result: newCart.id });
})

router.delete('/:carritoId', (req, res) => {
    const { carritoId } = req.params;
    const carritoIndex = carrito.findIndex(carrito => carrito.id === +carritoId);
    if (carritoIndex < 0) return res.status(404).json({ success: false, error: `Cart with id ${carritoId} does not exist!` });
    carrito.splice(carritoIndex, 1);
    return res.json({ success: true, result: 'product correctly eliminated' });
});

router.get('/:carritoId/productos', (req, res) => {
    const { carritoId } = req.params;
    const cartSelected = carrito.find(carrito => carrito.id === +carritoId);
    if (!cartSelected) {
      return res.status(404).json({ success: false, error: `Product with id: ${carritoId} does not exist!` });
    }
    return res.status(201).json({ success: true, result: cartSelected.productos});
  })

router.post('/:carritoId/productos', (req, res) => {
    const { carritoId } = req.params;
    const { productosId } = req.body
    const cartIndex = carrito.findIndex(carrito => carrito.id === +carritoId);
    if (cartIndex < 0) {
      return res.status(404).json({ success: false, error: `Product with id: ${carritoId} does not exist!` });
    }
    // validar que los productos existan
    const cartSelected = carrito.at(cartIndex)
    cartSelected.productos.push(...productosId)
    carrito.splice(cartIndex, 1, cartSelected)
    return res.status(201).json(carrito.at(cartIndex));
})

router.delete('/:carritoId/productos/:id_prod', (req, res) => {
    const { carritoId } = req.params;
    const { id_prod } = req.params;
    const carritoIndex = carrito.findIndex(carrito => carrito.id === +carritoId);
    const cartSelected = carrito.at(carritoIndex)
    const productoIndex = cartSelected.productos.findIndex(producto => producto.id === +id_prod)
    if (carritoIndex < 0 & productoIndex <0) return res.status(404).json({ success: false, error: `Cart with id ${carritoId} does not exist!` });
    cartSelected.productos.splice(productoIndex, 1);
    return res.json({ success: true, result: 'product correctly eliminated' });
});

module.exports = router;