import MensajesMongoDB from '../../models/mensajes.js'
const apiMensajes = new MensajesMongoDB()
// import { normalizarMensajes } from '../../normalizacion/index.js'

export default async function configurarSocket(socket, sockets) {
    const getAll = await apiMensajes.getAll()
    socket.emit('message', getAll);


    socket.on('new-message', async (data) => {
        data.fyh = new Date().toLocaleString()
        await apiMensajes.newObj(data);
        sockets.emit('message', getAll);
    })
}