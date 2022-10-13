import mongoose from 'mongoose'
import config from '../mongoDB/connection.js'

mongoose.connect(config.mongodb.conexionDB, config.mongodb.options)

class ContenedorMensajes {
    constructor(collectionName, scheme) {
        this.collection = mongoose.model(collectionName, scheme)
    }

    async getAll(){
        const getAll = await this.collection.find({}, {_id: 0, __v: 0})
        try{    
            if(this.collection.length){
                return getAll
            }else{
                return {error: 'No hay mensajes'}
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
                await newObjSave
            }else{
                await newObjSave
            }
        }catch(error){
            console.log(error)
        }
    }

}

export default  ContenedorMensajes 