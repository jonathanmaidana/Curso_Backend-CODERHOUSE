const { ContenedorFirebase } = require ('../../contenedores/ContenedorFirebase')

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('carrito')
    }
}

module.exports = CarritoDaoFirebase