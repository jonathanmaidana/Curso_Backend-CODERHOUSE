import ContenedorMensajes from '../contenedor/contenedorMensajes.js'

class MensajesMongoDB extends ContenedorMensajes {
    constructor(){
        super('mensajes', {
            author: {
                id: {type: String, require: true},
                nombre: { type: String, require: true},
                apellido: {type: String, require: true},
                edad: {type: Number, require: true},
                alias: { type: String, require: true},
            },
            text: {type: String, trim: true, required: true}
        })
    }
}

export default MensajesMongoDB 