const ContenedorMensajes = require ('../contenedor/contenedorMensajes.js')

class MensajesMongoDB extends ContenedorMensajes {
    constructor(){
        super('mensajes', {
            author:{
                id: {type: String, require: true},
                nombre: {type: String, require: true},
                apellido: {type: String, require: true},
                edad: {type: Number, require: true},
                alias: {type: String},
                avatar: {type: String}
                },
            text: {type: String, trim: true, required: true},
            fyh: {type: String}
        })
    }
}

module.exports = MensajesMongoDB
