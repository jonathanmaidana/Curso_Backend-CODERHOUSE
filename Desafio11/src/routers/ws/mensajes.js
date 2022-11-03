const MensajesMongoDB = require('../../models/mensajes.js')
const apiMensajes = new MensajesMongoDB()
// const { normalizarMensajes } = require ('../../normalizacion/index.js')

const configurarSocket = async (socket, sockets) => {
    const getAll = await apiMensajes.getAll()
    socket.emit('message', getAll);

    socket.on('new-message', async (data) => {
        data.fyh = new Date().toLocaleString()
        await apiMensajes.newObj(data);
        sockets.emit('message', getAll);
    })
}

module.exports = configurarSocket