const { ContenedorArchivo } = require ('../../contenedores/ContenedorArchivo')

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('./archivo/carrito.txt')
    }
}

module.exports = CarritoDaoArchivo