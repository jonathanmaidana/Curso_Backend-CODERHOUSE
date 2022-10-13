import ContenedorProductos from '../contenedor/contenedorProductos.js'
import { generarMensaje } from '../utils/generadorDeMensajes.js'

class ApiProductosMock extends ContenedorProductos {
    constructor() { super() }

    popular(cant = 5) {
        // const nuevos = []
        for (let i = 0; i < cant; i++) {
            const nuevoProducto = generarMensaje()
            this.guardar(nuevoProducto)
        }
        return this.elementos
    }
}

export default ApiProductosMock