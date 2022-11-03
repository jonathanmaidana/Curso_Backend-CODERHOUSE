const ApiProductosMock = require('../../api/productos.js')
const apiProductos = new ApiProductosMock()

const configurarSocket =  (socket, sockets) => {
    const getAll =  apiProductos.listarAll()
    socket.emit('product', getAll);

    socket.on('new-product', async data => {
        apiProductos.guardar(data)
        sockets.emit('product', getAll);
    })
}

module.exports = configurarSocket