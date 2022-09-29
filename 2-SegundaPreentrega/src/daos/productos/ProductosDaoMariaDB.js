const { ContenedorMariaDB } = require ('../../contenedores/ContenedorMariaDB')
const config = require('../../../config')

class ProductosDaoMariaDB extends ContenedorMariaDB {
    constructor(){
        super(config.mariadb, 'productos')
    }
}

module.exports = ProductosDaoMariaDB