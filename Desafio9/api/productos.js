import ContenedorProductos from '../contenedor/contenedorProductos.js'
import { generarProducto } from '../utils/generadorDeProductos.js'

class ApiProductosMock extends ContenedorProductos {
    constructor() { super() }

    popular(cant = 5) {
        for (let i = 0; i < cant; i++) {
            const nuevoProducto = generarProducto()
            this.guardar(nuevoProducto)
        }
        return this.elementos
    }
}

export default ApiProductosMock