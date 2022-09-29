const { ContenedorMongoDB } = require ('../../contenedores/ContenedorMongoDB')

class ProductosDaoMongoDB  extends ContenedorMongoDB {
    constructor(){
        super('productos', {
            title: {type: String, require: true},
            price: {type: Number, require: true},
            thumbnail: {type: String, require: true}
        })
    }
}

module.exports = ProductosDaoMongoDB 