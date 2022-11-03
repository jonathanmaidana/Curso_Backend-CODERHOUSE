import ApiProductosMock from '../../api/productos.js'
const apiProductos = new ApiProductosMock()

export default async function configurarSocket(socket, sockets) {
    const getAll = await apiProductos.listarAll()
    socket.emit('product', getAll);

    socket.on('new-product', async data => {
        apiProductos.guardar(data)
        sockets.emit('product', getAll);
    })
}