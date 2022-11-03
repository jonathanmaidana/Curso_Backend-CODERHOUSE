const { faker } = require('@faker-js/faker')
faker.locale = 'es'

function generarProductos(id) {
    return {
    id,
    title: faker.commerce.product(),//findName() deprecado
    price: faker.commerce.price(),
    thumbnail: faker.image.food(100,100,true),
    }
}

module.exports = {generarProductos}