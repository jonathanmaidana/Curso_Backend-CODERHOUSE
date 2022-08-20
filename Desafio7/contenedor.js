const fs = require('fs')

class Contenedor {
    constructor(text){
        this.text = text
    }
    
    //Devuelve todos los objetos del array
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.text, 'utf-8')
            const dataParse =  await JSON.parse(data)
            if(dataParse.length){
                return dataParse
            }
            else{
                return {error: 'No hay productos'}
            }
        }
        catch(err){
            console.log(err)
        }
    }

    //Recibe y agregar un nuevo objeto al array
    async newObj(obj){
        console.log(obj)
        try{
            //LEO EL ARCHIVO
            const data = await fs.promises.readFile(this.text, 'utf8')
            //CONVIERTO EL ARCHIVO A UN OBJETO JS
            const dataParse = await JSON.parse(data)
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
}

module.exports = Contenedor;