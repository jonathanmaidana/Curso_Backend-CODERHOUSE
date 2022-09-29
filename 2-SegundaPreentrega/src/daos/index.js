let productosDao
let carritoDao

switch (process.env.PERSISTENT) {
    case 'json':
        const {default: ProductosDaoArchivo} = await import('./productos/ProductosDaoArchivo')
        const {default: CarritoDaoArchivo} = await import('./carrito/CarritoDaoArchivo')
        productosDao = new ProductosDaoArchivo('../archivo/productos.txt')
        carritoDao = new CarritoDaoArchivo('../archivo/carrito.txt')
        break
        
    case 'firebase':
        const {default: ProductosDaoFirebase} = await import('./productos/ProductosDaoFirebase')
        const {default: CarritoDaoFirebase} = await import('./carrito/CarritoDaoFirebase')
        productosDao = new ProductosDaoFirebase()
        carritoDao = new CarritoDaoFirebase()
        break

    case 'mongodb':
        const {default: ProductosDaoMongoDB} = await import('./productos/ProductosDaoMongoDB')
        const {default: CarritoDaoMongoDB} = await import('./carrito/CarritoDaoMongoDB')
        productosDao = new ProductosDaoMongoDB()
        carritoDao = new CarritoDaoMongoDB()
        break

    case 'mariadb':
        const {default: ProductosDaoMariaDB} = await import('./productos/ProductosDaoMariaDB')
        const {default: CarritoDaoMariaDB} = await import('./carrito/CarritoDaoMariaDB')
        productosDao = new ProductosDaoMariaDB()
        carritoDao = new CarritoDaoMariaDB()
        break

    case 'sqlite3':
        const {default: ProductosDaoSQLite3} = await import('./productos/ProductosDaoSQLite3')
        const {default: CarritoDaoSQLite3} = await import('./carrito/CarritoDaoSQLite3')
        productosDao = new ProductosDaoSQLite3()
        carritoDao = new CarritoDaoSQLite3()
        break
}

export { productosDao, carritoDao }