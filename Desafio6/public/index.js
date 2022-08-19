
const server= io().connect()

server.on('mensaje-server', data =>{
    console.log('mensaje-servidor: ', data)
})