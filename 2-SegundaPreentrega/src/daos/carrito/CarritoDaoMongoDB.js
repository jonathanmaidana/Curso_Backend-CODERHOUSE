const { ContenedorMongoDB } = require ('../../contenedores/ContenedorMongoDB')

class CarritoDaoMongoDB  extends ContenedorMongoDB {
    constructor(){
        super('carrito', {
            title: {type: String, require: true},
            price: {type: Number, require: true},
            thumbnail: {type: String, require: true}
        })
    }
}

module.exports = CarritoDaoMongoDB 