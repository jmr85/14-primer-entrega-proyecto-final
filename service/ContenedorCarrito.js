const fs = require('fs');

const Contenedor = require('./Contenedor');
let contenedorProducto = new Contenedor('./data/productos.json');

class ContenedorCarrito {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async save() {
        // to-do: ver eso de spread operator con array
        const timestamp = Date.now();
        const productos = [];
        let obj = { timestamp, productos: productos };
        try {
            let dataArch = await fs.promises.readFile(this.fileName, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.fileName, JSON.stringify([...dataArchParse, { ...obj, id: dataArchParse[dataArchParse.length - 1].id + 1 }], null, 2))
            } else {
                await fs.promises.writeFile(this.fileName, JSON.stringify([{ ...obj, id: 1 }], null, 2))
            }
            console.log(`El archivo tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
        } catch (error) {
            console.log("error -> ", error)
        }
    }
    async addProductCarrito(idCarrito, idProducto) {
        // to-do: ver eso de spread operator con array
       
       
        //    const productos = [];
        //    let obj = { timestamp, productos: productos };
        //    try {
        //        let dataArch = await fs.promises.readFile(this.fileName, 'utf8')
        //        let dataArchParse = JSON.parse(dataArch)
        //        if (dataArchParse.length) {
        //            await fs.promises.writeFile(this.fileName, JSON.stringify([...dataArchParse, { ...obj, producto: dataArchParse[dataArchParse.length - 1]}], null, 2))
        //        } else {
        //            await fs.promises.writeFile(this.fileName, JSON.stringify([{ ...obj, id: 1 }], null, 2))
        //        }
        //        console.log(`El archivo tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
        //    } catch (error) {
        //        console.log("error -> ", error)
        //    }

        try {
            let producto = [{id: 8, nombre: 'probando'}]
            // let producto = await contenedorProducto.getById(idProducto);

            let dataArch = await fs.promises.readFile(this.fileName, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let carrito = dataArchParse.find(carr => carr.id === idCarrito)// solo para validar
            if (carrito !== undefined || carrito !== null) {

                const dataArchParseFiltrado = dataArchParse.map(elementCarrito => {
                    if (elementCarrito.id === idCarrito) {
                        console.log('addProductCarrito method -> PRODUCTO: ', producto);
                        elementCarrito.productos = [...producto];
                        return elementCarrito;
                    } else {
                        return elementCarrito;
                    }
                })
                await fs.promises.writeFile(this.fileName, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')

                console.log('Contenedor log: ', 'Se agrego producto al carrito')
            } else {
                console.log('Contenedor log: ', 'no existe el carrito')
            }
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        let contenido = []
        try {
            contenido = await fs.promises.readFile(this.fileName, 'utf8')
            contenido = JSON.parse(contenido)
        } catch (error) {
            console.log("Error: ", contenido, error);
            throw error
        }
        return contenido;
    }

    async getById(id) {
        let contenido = []
        try {
            contenido = await fs.promises.readFile(this.fileName, 'utf8')
            const contendoID = JSON.parse(contenido);
            const found = contendoID.find(element => element.id === id);
            contenido = found ? found : null;
        } catch (error) {
            console.log(error);
            throw error
        }
        return contenido;
    }

    async deleteById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.fileName, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(prod => prod.id === id)
            if (producto !== undefined || producto !== null) {
                const dataArchParseFiltrado = dataArchParse.filter(prod => prod.id !== id)
                await fs.promises.writeFile(this.fileName, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
                console.log('Producto eliminado')
            } else {
                console.log('no existe el producto')
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        //deja vacio el array de carrito.json
        const obj = [];
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(obj, null, 2))
        } catch (error) {
            console.log("error -> ", error)
        }
    }

}

module.exports = ContenedorCarrito;