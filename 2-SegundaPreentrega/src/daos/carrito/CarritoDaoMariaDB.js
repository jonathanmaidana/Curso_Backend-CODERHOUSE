const { ContenedorMariaDB } = require ('../../contenedores/ContenedorMariaDB')
const config = require('../../../config')

class CarritoDaoMariaDB extends ContenedorMariaDB {
    constructor(){
        super(config.mariadb, 'carrito')
    }
}

module.exports = CarritoDaoMariaDB