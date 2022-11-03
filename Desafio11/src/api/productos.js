const ContenedorProductos = require('../contenedor/contenedorProductos.js')
const  {generarProductos}  = require('../utils/generadorDeProductos.js')

class ApiProductosMock extends ContenedorProductos {
    constructor() { super() }

    popular(cant = 5) {
        for (let i = 0; i < cant; i++) {
            const nuevoProducto = generarProductos()
            this.guardar(nuevoProducto)
        }
        return this.elementos
    }
}

module.exports = ApiProductosMock