const express = require('express');
const ControllerCarrito = require('../controllers/CarritoController')

const router = express.Router();

router.post('/', ControllerCarrito.createCarrito);
router.delete('/', ControllerCarrito.deleteAllCarrito);

module.exports = router;