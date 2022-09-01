const express = require('express');
const ControllerProducto = require('../controllers/ProductoController')

const router = express.Router();

const middleAuth = (req, res, next) => {
    if (req.query.token === "123") {
        next()
    } else {
        res.send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizado` })
    }
}

router.get('/:id?', ControllerProducto.getProductByIdOrAll);
// {url}/api/productos?token=123
router.post('/', middleAuth, ControllerProducto.saveProduct)
// {url}/api/productos/{id_producto}?token=123
router.delete('/:id', middleAuth, ControllerProducto.deleteProductById)
// {url}/api/productos/{id_producto}?token=123
router.put('/:id', middleAuth, ControllerProducto.updateProductById);

module.exports = router;