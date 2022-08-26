const express = require("express");
const Contenedor = require("../Contenedor");
const { Router } = express;
const router = new Router();

let carritos = new Contenedor("carritos.json")
let productos = new Contenedor("productos.json")


router.get("/", async (req, res) => {
  try {
    let aux = await carritos.getAll()
    res.status(200).send(aux)
  }
  catch (error) {
    throw Error("error en leer y mostrar carritos")
  }
})

router.get("/:id", async (req, res) => {
  try {
    let index = req.params.id
    let carrito = await carritos.getById(index)
    if (carrito[0]) {
      prod = carrito[0].productos
      res.status(200).send(prod)
    } else {
      res.status(400).send({ error: "No existe el carrito" })
    }
  }
  catch (error) {
    throw Error("Error carrito por ID")
  }
})

router.post("/", async (req, res) => {

  let carrito = {
    id: 0,
    timestamp: Date.now(),
    productos: []
  }

  try {
    await carritos.save(carrito)
    res.send({ id: carrito.id })
  }
  catch (error) {
    throw Error("Error")
  }
})

router.post("/:idCarrito/:idPto", async (req, res) => {
  try {
    let indexCarrito = req.params.idCarrito
    let indexPto = req.params.idPto
    let prodId = await productos.getById(indexPto)
    console.log(prodId)
    if (Object.keys(indexCarrito).length != 0) {

      let carrito = await carritos.getById(indexCarrito)

      if (carrito[0]) {
        let total = await carritos.read()
        total = JSON.parse(total)
        let auxId = parseInt(req.params.id) - 1
        carrito[0].productos.push(prodId[0])
        total.splice(auxId, 1, carrito[0])
        await carritos.write(total, "Producto agregado ")
        res.send({ carrito })
      } else {
        res.status(400)
        res.send({ error: 'carrito no encontrado' })
      }
    } else {
      res.status(400)
      res.send({ error: 'producto no encontrado' })
    }

  }
  catch (error) {
    throw Error("Error agregando prod al carrito")
  }
})


router.delete("/:id", async (req, res) => {
  try {
    let index = req.params.id
    console.log(index)
    let del = await carritos.getById(index)
    console.log(del)
    if (Object.keys(del).length != 0) {
      await carritos.deleteById(index)
      res.send(await carritos.getAll())
    }

    else {
      res.status(400)
      res.send({ error: 'id no existe' })
    }
  } catch (error) {
    throw Error("Error")
  }
});

module.exports = router