const fs = require('fs')

export default class Contenedor {
    public text: string;

    constructor(text: string){
        this.text = text;
    }
    
    //Devuelve todos los objetos del array
    async getAll(){
        try{
            const data: string = await fs.promises.readFile(this.text, 'utf-8')
            const dataParse: string = await JSON.parse(data)
            if(dataParse.length){
                return dataParse
            }
            else{
                console.log(`No hay productos`)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    //Devuelve el objeto según el id
    async getById(id: number){
        try{
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataIdParse  = await JSON.parse(data)
            const producto = dataIdParse.find(producto => producto.id === id)
            if (producto){
                return producto
            }
            else{   
                return console.log('No se encontro el producto')
            }
            // producto ? console.log(producto) : console.log('No se encontro el producto')
        } 
        catch(err){
            console.log(err)
        }
    }

    // //Recibe un objeto del array y lo modifica
    async updateById(obj){
        console.log(obj)
        try{
            const data = await fs.promises.readFile(this.text, 'utf8')
            let dataParse = await JSON.parse(data)
            const objIndex = dataParse.findIndex(prod => prod.id === obj.id);
            if(objIndex !== -1){
                dataParse[objIndex] = obj
                await fs.promises.writeFile(this.text, JSON.stringify(dataParse, null, 2))
                return {msg: `El producto con el id ${obj.id} fue actualizado`}
            }
            else{
                return {error: 'El producto no existe'}
            }
        }catch(err){
            console.log(err)
        }
    }

    // Recibe y agregar un nuevo objeto al array
    async newObj(obj: object){
        try{
            //LEO EL ARCHIVO
            const data = await fs.promises.readFile(this.text, 'utf8')
            //CONVIERTO EL ARCHIVO A UN OBJETO JS
            const dataParse = JSON.parse(data)
            if(dataParse.length) //[].length = 0 => false (0 = false, 1 = true)
            {
                //SI HAY ALGO EN EL ARCHIVO COPIA EL CONTENIDO DEL VIEJO Y NUEVO ARRAY Y LOS JUNTA
                await fs.promises.writeFile(this.text, JSON.stringify([...dataParse, {...obj, id: dataParse.length + 1}], null, 2))
            }else{
                //SI NO HAY NADA EN EL ARCHIVO SOBREESCRIBE ESTO
                // await fs.promises.writeFile(this.text, JSON.stringify([{...obj, id: dataParse.length + 1}], null, 2))
                await fs.promises.writeFile(this.text, JSON.stringify([{...obj, id: dataParse.length + 1}], null, 2))
            }
                return dataParse.length + 1
                // console.log(dataParse.length + 1)
        }catch(err){
            console.log(err)
        }
    }

    //Elimina un objeto del array según su id
    async deleteById(id: number){
        try {
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataParse = JSON.parse(data)
            const producto = dataParse.find((item) => item.id === id)

            if(producto){
                const productoBorrado = dataParse.filter((item) => item.id !== id)
                await fs.promises.writeFile(this.text, JSON.stringify(productoBorrado, null, 2), 'utf8')
                return {msg: `El producto con el id ${producto.id} se elimino`}   
            } else{
                return {err: 'Producto no encontrado'}
            }
        }
        catch(err){
            console.log(err)
        }
    }
}
