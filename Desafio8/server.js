const Contenedor = require('./contenedor')

const contenedor = new Contenedor("./options/mariaDB")

// contenedor.createTable('productos')
contenedor.insertArray()
// contenedor.selectAll()
// contenedor.insertItem({title: 'Fiat', price: '50000'});
// contenedor.deleteItem()