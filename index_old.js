const express = require('express')
const app = express()

const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productosRoute = require("./routes/productos")
const carritoRoute = require("./routes/carrito")

app.use('/api/productos', productosRoute)
app.use('/api/carrito', carritoRoute)

const server = app.listen(port, () => {
  console.log("server is run on port " + port)
})
server.on('error', (error) => console.log(` Error en servidor ${error}`))