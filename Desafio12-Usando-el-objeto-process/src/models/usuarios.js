const ContenedorUsuarios = require ('../contenedor/contenedorUsuarios.js')

class UsuariosMongoDB extends ContenedorUsuarios {
    constructor(){
        super('usuarios', {
            username: {type: String, require: true},
            password: {type: String, require: true},
            email: {type: String, require: true}
        })
    }
}

module.exports = UsuariosMongoDB