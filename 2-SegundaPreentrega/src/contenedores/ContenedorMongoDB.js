const mongoose = require('mongoose');
const config = require('../../config')

mongoose.connect(config.mongodb.conexionDB, config.mongodb.options)

class ContenedorMongoDB {
    constructor(collectionName, scheme) {
        this.collection = mongoose.model(collectionName, scheme)
    }

    /* ----------------------- Selecciona todos los objetos ---------------------- */
    async getAll(){
        const getAll = await this.collection.find({}, {_id: 0, __v: 0})
        try{    
            if(this.collection.length){
                return getAll
            }else{
                return {error: 'No hay productos'}
            }
        }catch(error){
            console.log(error)
        }
    }

    /* --------------------- Devuelve el objeto según el id --------------------- */
    async getById(id){
        try{
            const getAll = await this.collection.find()
            const itemId = getAll.filter(item => item.id === id)
            if(itemId) {
                return itemId
            }else{
                console.log('No se encontró el producto')
            }
        }catch(error){
            console.log(error)
        }
    }

    /* ---------------- Recibe y agrega un nuevo objeto al array --------------- */
    async newObj(obj){
        try{
            const getAll = await this.collection.find()
            const newObj = new this.collection(obj)
            const newObjSave = await newObj.save()
            if(getAll){
                newObjSave
            }else{
                newObjSave
            }
        }catch(error){
            console.log(error)
        }
    }

    /* ---------------- Recibe un objeto del array y lo modifica ---------------- */
    async updateById(obj){
        try{
            const getAll = await this.collection.find()
            const itemIndex = getAll.findIndex(prod => prod.id === obj.id)
            if(itemIndex !== -1){
                await this.collection.updateOne({_id: obj.id}, {
                $set: {
                    title: obj.title,
                    price: obj.price,
                    thumbnail: obj.thumbnail
                }
            })
                return {msg: `El producto con el id ${obj.id} fue actualizado`}
            }else{
                return {error: 'El producto no existe'}
            }
        }catch(error){
            console.log(error)
        }
    }

    /* ----------------- Elimina un objeto del array según su id ---------------- */
    async deleteById(id){
        try{
            console.log(id)
            const getAll = await this.collection.find()
            const item = getAll.find((item) => item.id === id)
            if(item){
                await this.collection.deleteOne({_id: id})
                return {msg: `El producto con el id ${id} se elimino`} 
            }else{
                return {err: 'Producto no encontrado'}
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = { ContenedorMongoDB }