const express = require('express');
const productoRouter = require('./routes/ProductoRoute');
const carritoRouter = require('./routes/CarritoRoute');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/api/productos', productoRouter);
app.use('/api/carrito', carritoRouter);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}).on('error', (error) => console.log(` Error en servidor ${error}`))