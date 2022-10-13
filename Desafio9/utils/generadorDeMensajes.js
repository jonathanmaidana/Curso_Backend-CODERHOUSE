import { faker } from '@faker-js/faker'
faker.locale = 'es'

function generarMensaje(id) {
    return {
    id,
    title: faker.commerce.product(),//findName() deprecado
    price: faker.commerce.price(),
    thumbnail: faker.image.food(100,100,true),
    }
}

export { generarMensaje }