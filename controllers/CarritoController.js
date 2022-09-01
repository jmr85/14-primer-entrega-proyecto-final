const ContenedorCarrito = require('./../service/ContenedorCarrito');
let contenedorCarrito = new ContenedorCarrito('./data/carrito.json');

// TODO: Add
// Get product by id OR Get all products
const getCarritoByIdOrAll = async (req, res) => {
    const id = req.params.id;
    if (id) {
        console.log(id);
        const numId = parseInt(id);
        try {
            const producto = await contenedorCarrito.getById(numId);
            console.log(producto);
            if (producto !== null) {
                return res.status(200).json(producto);
            } else {
                return res.status(404).json({
                    message: 'Producto no encontrado'
                });
            }

        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los productos',
                error
            });
        }
    } else {
        let productos;
        try {
            productos = await contenedorCarrito.getAll();
            console.log(productos);
            return res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los productos',
                error
            });
        }
    }
};

// POST create carrito 
// to-do -> crear carrito con un producto

//  POST {URL}/api/carrito OK
const createCarrito = async (req, res) => {
    try {
        await contenedorCarrito.save();//almaceno en el file carrito.json

        const allCarrito = await contenedorCarrito.getAll();
        const carritoAdded = allCarrito.length;//Para sacar el ultimo index
        const carrito = await contenedorCarrito.getById(carritoAdded);//Obtengo el ultimo carrito agregado

        return res.status(201).json(carrito);//Muestra el ultimo carrito agregado
    } catch (err) {
        return res.status(500).json({
            message: 'Error al guardar el carrito',
            err
        });
    }

}
// TODO: Add
// agregar producto al carrito, a un id especifico de carrito
// {URL}/:id/productos/:id_prod
const addProductCarrito = async (req, res) => {
    const {id, id_prod} = req.params;
    const id_carrito = parseInt(id);
    const id_producto = parseInt(id_prod);
    console.log("PARAMS -> " + id_carrito, id_producto);
    await contenedorCarrito.addProductCarrito(id_carrito, id_prod);
    return res.status(200).json({
        message: 'producto agregado al carrito'
    });
}

// delete product by id
const deleteCarritoById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const numId = parseInt(id);
    try {
        const foundId = await contenedorCarrito.getById(numId);
        if (foundId !== null && foundId !== undefined) {
            await contenedorCarrito.deleteById(foundId.id);
            return res.status(200).json({
                message: 'Producto eliminado'
            });
        } else {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el producto',
            error
        });
    }
}

// vaciar / empty carrito 
// DELETE {URL}/api/carrito
const deleteAllCarrito = async (req, res) => {
    try{
        await contenedorCarrito.deleteAll();
        return res.status(200).json({
            message: 'Carrito eliminado'
        });
    }catch(error){
        return res.status(500).json({
            message: 'Error al eliminar carrito',
            error
        });
    }
}

module.exports = {
    getCarritoByIdOrAll,
    createCarrito,
    addProductCarrito,
    deleteCarritoById,
    deleteAllCarrito
};