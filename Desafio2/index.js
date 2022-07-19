const Contenedor = require("./contenedor");

const contenedor = new Contenedor('./productos.txt')

// AGREGAR UN OBJETO AL ARRAY
contenedor.save({title: 'zapatillas4', price: 5000, description:'zapatillas nike'})

// BORRAR UN OBJETO SEGUN EL ID ASIGNADO
// contenedor.getById(3)

// MUESTRA TODOS LOS OBJETOS DEL ARRAY
// contenedor.getAll()

// BORRA UN OBJETO SEGUN EL ID ASIGNADO
// contenedor.deleteById(2)

// BORRA EL ARRAY COMPLETO
// contenedor.deleteAll()