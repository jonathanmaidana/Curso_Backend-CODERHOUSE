const { ContenedorArchivo } = require ('../../contenedores/ContenedorArchivo')

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('./archivo/productos.txt')
    }
}

module.exports = ProductosDaoArchivo