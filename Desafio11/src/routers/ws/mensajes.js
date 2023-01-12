const MensajesMongoDB = require('../../models/mensajes.js')
const apiMensajes = new MensajesMongoDB()
// const { normalizarMensajes } = require ('../../normalizacion/index.js')

const configurarSocket = async (socket, sockets) => {
    socket.on('new-message', data => {
        data.fyh = new Date().toLocaleString()
        apiMensajes.newObj(data);
        sockets.emit('message', getAll);
    })
    
    const getAll = await apiMensajes.getAll()
    socket.emit('message', getAll);

}

module.exports = configurarSocket