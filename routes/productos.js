const express = require("express")
const Contenedor = require("../Contenedor")
const { Router } = express
const router = new Router()

let productos = new Contenedor("productos.json")

const middleAuth = (req, res, next) => {
    if (req.query.token === "123") {
        next()
    } else {
        res.send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizado` })
    }
}
// http://localhost:8080/api/productos
router.get("/", async (req, res) => {
    try {
        let todos = await productos.getAll()
        res.status(200).send(todos)
    }
    catch (error) {
        throw Error("Error en leer y mostrar productos")
    }
});

// http://localhost:8080/api/productos/{id_producto}?token=123
router.get("/:id", middleAuth, async (req, res) => {
    try {
        let ptoId = await productos.getById(req.params.id)

        if (Object.keys(ptoId).length != 0) {
            res.send(ptoId)
        } else {
            res.status(400);
            res.send({ error: `no esta el producto con el id ${ptoId}` })
        }
    }
    catch (error) {
        throw Error("Error buscando producto por id")
    }
})
// http://localhost:8080/api/productos?token=123
router.post("/", middleAuth, async (req, res) => {
    let { nombre, descripcion, codigo, thumbail, precio, stock } = req.body
    let Obj = {
        nombre,
        timestamp: Date.now(),
        descripcion,
        codigo,
        thumbail,
        precio,
        stock
    }
    try {
        await productos.save(Obj)
        res.status(201).send(Obj)
    } catch (error) {
        throw Error("Error en post productos")
    }
})
// http://localhost:8080/api/productos/{id_producto}?token=123
router.put("/:id", middleAuth, async (req, res) => {
    let { nombre, descripcion, codigo, thumbail, precio, stock } = req.body
    try {
        let prod = await productos.getById(req.params.id)

        if (Object.keys(prod).length != 0) {
            prod = {
                nombre,
                timestamp: Date.now(),
                descripcion,
                codigo,
                thumbail,
                precio,
                stock,
                id: req.params.id
            }
            let todosProds = await productos.read();
            todosProds = (JSON.parse(todosProds, null, 2))
            let auxId = req.params.id - 1
            todosProds.splice(auxId, 1, prod)
            await productos.write(todosProds, "Producto modificado correctamente")
            res.status(201).send(todosProds)
        }
        else {
            res.send({ error: 'producto no encontrado' })
        }
    } catch (error) {
        throw Error("Error en put modificacion productos")
    }

});
// http://localhost:8080/api/productos/{id_producto}?token=123
router.delete("/:id", middleAuth, async (req, res) => {
    try {
        let delet = await productos.getById(req.params.id)
        if (Object.keys(delet).length != 0) {
            await productos.deleteById(req.params.id)
            res.status(200).send(await productos.getAll());
        } else {
            res.status(400)
            res.send({ error: 'producto no encontrado' })
        }
    } catch (error) {
        throw Error("Error en el delete por id")
    }
});


module.exports = router

