const { ContenedorMariaDB } = require ('../../contenedores/ContenedorMariaDB')
const config = require('../../../config')

class CarritoDaoSQLite3 extends ContenedorMariaDB {
    constructor(){
        super(config.sqlite3, 'carrito')
    }
}

module.exports = CarritoDaoSQLite3