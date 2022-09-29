const { ContenedorMariaDB } = require ('../../contenedores/ContenedorMariaDB')
const config = require('../../../config')

class ProductosDaoSQLite3 extends ContenedorMariaDB {
    constructor(){
        super(config.sqlite3, 'productos')
    }
}

module.exports = ProductosDaoSQLite3