// const { options } = require ('./sqlite3/conexionDB')
const { options } = require ('./options/mariaDB')
const knex = require('knex')(options);

const productos = [
    { name : ' Audi ' , price : 52642 } ,
    { name : ' Mercedes ' , price : 57127 } ,
    { name : ' Skoda ' , price : 9000 } ,
    { name : ' Volvo ' , price : 29000 } ,
    { name : ' Bentley ' , price : 350000 } ,
    { name : ' Citroen ' , price : 21000 } ,
    { name : ' Hummer ' , price : 41400 } ,
    { name : ' Volkswagen ' , price : 21600 } ,
]

class Contenedor {
    constructor(){
        
    }

        /* ----------------------------- Crea una tabla ----------------------------- */
        async createTable(tableName){
            try{
                await knex.schema.createTable(tableName, table => {
                    table.increments('id')
                    table.string('name')
                    table.integer('price')
                })
                console.log('table created successfully')
            }catch(error){
                console.log(error)
            }finally{
                knex.destroy()
            }
        }

        /* ----------------------- Inserta un array de objetos ---------------------- */
        async insertArray(){
            try{
                await knex('productos').insert(productos)
                console.log('productos inserted')
            }catch(error){
                console.log(error)
            }finally{
                await knex.destroy();
            }
        }

        /* ----------------------- Selecciona todos los objetos ---------------------- */
        async selectAll(){
            try{
                await knex.from('productos').select('*')
                    .then((res) => {
                        for (const item of res){
                            return (item)
                        }
                    })
            }catch(error) {
                console.log(error)
            }finally{
                await knex.destroy();
            }
        }

        /* ----------------------------- Inserta un objeto ---------------------------- */
        async insertItem(obj){
            try{
                await knex('productos').insert({
                    name: obj.name,
                    price: obj.price,
                    })
                console.log('item inserted successfully')
            }catch(error) {
                console.log(error)
            }finally{
                await knex.destroy();
            }
        }

        /* --------------------------- Actualiza un objeto -------------------------- */
        async updateItem(obj){
            try{
                await knex.from('productos').where().update({
                    name: obj.name,
                    price: obj.price,
                })
                console.log('item updated successfully')
            }catch(error) {
                console.log(error)
            }finally{
                await knex.destroy();
            }
        }

        /* ----------------------------- Elimina objetos ---------------------------- */
        async deleteItem(){
            try{
                await knex.from('productos').where('price', '>', '40000').del()
                console.log('item deleted successfully')
            }catch(error){
                console.log(error)
            }finally{
                await knex.destroy();
            }
        }

        /* ----------------------- Elimina el array de objetos ---------------------- */
        async deleteTable(){
            try{
                await knex.from('productos').del()
                console.log('table deleted')
            }catch(error) {
                console.log(error)
            }finally{
                await knex.destroy();
            }
        }
}

module.exports = Contenedor;