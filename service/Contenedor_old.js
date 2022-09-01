const fs = require('fs')
const short = require('short-uuid');

class Contenedor {

    constructor(file) {
        this.file = file
    }
    async read() {
        try {
            let data = await fs.promises.readFile("./" + this.file, "utf-8")
            return data

        } catch (error) {
            throw Error("Error al leer el archivo")
        }
    }
    async write(objeto, msg) {
        try {
            await fs.promises.writeFile("./" + this.file, JSON.stringify(objeto, null, 2))
            console.log(msg)
        } catch (error) {
            throw Error("Error al escribir en el archivo")
        }
    }
    async save(producto) {
        // let newId = 1;
        let objeto = {}

        let data = await this.read()
        let archivo = JSON.parse(data)

        if (!data) {
            // producto.id = newId
            objeto = [producto]
            await this.write(objeto, 'agregado')
        } else {
            producto.id = short.generate();
            objeto = producto
            archivo.push(objeto)
            await this.write(archivo, 'agregado')
        }
    }
    async getById(num) {
        let data = await this.read()
        let object = JSON.parse(data)

        let result = object.filter(producto => producto.id == num)
        return result
    }

    async getAll() {
        let data = await this.read()
        let object = JSON.parse(data)

        return object
    }

    async deleteById(num) {
        let data = await this.read()
        let object = JSON.parse(data)

        let producto = object.find(producto => producto.id == num)

        if (producto) {
            let index = object.indexOf(producto)
            console.log(index)
            object.splice(index, 1)
            await this.write(object, `producto con ID: ${num} eliminado`)
        } else {
            console.log(`no existe el producto con ID: ${num} `)
        }
    }

    async deleteAll() {
        let array = []
        await this.write(array, "Se eliminaron todos los productos")
    }

}

module.exports = Contenedor