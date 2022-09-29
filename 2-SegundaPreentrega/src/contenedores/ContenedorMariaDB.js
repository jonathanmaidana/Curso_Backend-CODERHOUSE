const knex = require('knex')

class ContenedorMariaDB {
    constructor(config, tabla){
        this.knex = knex(config)
        this.tabla = tabla
    }

    /* ----------------------------- Crea una tabla ----------------------------- */
    async createTable(){
        try{
            await this.knex.schema.createTable(this.tabla, table => {
                table.increments('id')
                table.string('title')
                table.integer('price')
                table.string('thumbnail')
                console.log('Tabla creada')
            })
        }catch(error){
            console.log(error)
        }
    }

    /* ----------------------- Selecciona todos los objetos ---------------------- */
    async selectAll(){
        try{
            const result = await this.knex.select('*').from(this.tabla)
            const items =  result.map(function(item){
                return item
            })
            return items
        }catch(error){
            console.log(error)
        }
    }

       /* ----------------------- Selecciona todos los objetos ---------------------- */
    async selectById(id){
        console.log(id)
        try{
            const result = await this.knex.select('*').from(this.tabla).where('id', '=', id)
            const item =  result.map(function(item){
                return item
            })
            return item
        }catch(error){
            console.log(error)
        }
    }

    /* ----------------------------- Inserta un objeto ---------------------------- */
    async insertItem(obj){
        try{
            await this.knex(this.tabla).insert({
                title: obj.title,
                price: obj.price,
                thumbnail: obj.thumbnail
                })
            console.log('item inserted successfully')
        }catch(error) {
            console.log(error)
        }
    }

    /* --------------------------- Actualiza un objeto -------------------------- */
    async updateItem(obj){
        try{
            if(obj.id){
                await this.knex(this.tabla).where('id', '=', obj.id).update({
                    title: obj.title,
                    price: obj.price,
                    thumbnail: obj.thumbnail
                })
                return {msg: `El producto con el id ${obj.id} fue actualizado`}
            }else{
                return {msg: 'El producto no existe'}
            }
        }catch(error) {
            console.log(error)
        }
    }

    /* ----------------------------- Elimina un objeto ---------------------------- */
    async deleteItem(id){
        try{
            if(id){
                await this.knex(this.tabla).where('id', '=', id).del()
                return{msg: `El producto con el id ${id} fue eliminado`}
            }else{
                return{msg: `El producto no existe`}
            }
        }catch(error){
            console.log(error)
        }
    }

}

module.exports = { ContenedorMariaDB } 