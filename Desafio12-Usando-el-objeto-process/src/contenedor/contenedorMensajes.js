const mongoose = require('mongoose')
const config = require('../../mongoDB/connection.js')

mongoose.connect(config.mongodb.conexionDB, config.mongodb.options)

class ContenedorUsuarios {
    constructor(collectionName, scheme) {
        this.collection = mongoose.model(collectionName, scheme)
    }

    async getAll(){
        const getAll = await this.collection.find({}, {_id: 0, __v: 0})
        try{    
            if(this.collection.length){
                return getAll
            }else{
                return {error: 'No hay usuarios'}
            }
        }catch(error){
            console.log(error)
        }
    }

    async newObj(obj){
        console.log(obj)
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

}

module.exports = ContenedorUsuarios 