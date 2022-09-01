const express = require('express');
const ControllerCarrito = require('../controllers/CarritoController')

const router = express.Router();

router.post('/', ControllerCarrito.createCarrito);
router.delete('/', ControllerCarrito.deleteAllCarrito);
router.post('/:id/productos/:id_prod', ControllerCarrito.addProductCarrito);

module.exports = router;