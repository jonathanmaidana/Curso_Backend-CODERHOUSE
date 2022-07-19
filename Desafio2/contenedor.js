const fs = require('fs')

class Contenedor {
    constructor(text){
        this.text = text
    }

    //RECIBE UN OBJETO Y LO GUARDA CON UN ID
    async save(obj){
        try{
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataParse = JSON.parse(data)
            dataParse.length ? await fs.promises.writeFile(this.text, JSON.stringify([...dataParse, {...obj, id: dataParse.length + 1}], null, 2)) : await fs.promises.writeFile(this.text, JSON.stringify([{...obj, id: dataParse.length + 1}], null, 2))
                return dataParse.length + 1
        }catch(err){
            console.log(err)
        }
    }


    // RECIBE UN ID Y DEVUELVE EL OBJETO CON ESE ID
    async getById(id){
        try{
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataIdParse = JSON.parse(data)
            const producto = dataIdParse.find(producto => producto.id === id)
            producto ? console.log(producto) : console.log('No se encontro el producto')
        } 
        catch(err){
            console.log(err)
        }
    }


    //DEVUELVE EL ARRAY CON TODOS LOS OBJETOS DENTRO
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataParse = JSON.parse(data)
            dataParse.length ? console.log(dataParse) : console.log('No hay productos')
        }
        catch(err){
            console.log(err)
        }
    }


    //BORRA UN OBJETO DEL ARRAY CON EL ID BUSCADO
    async deleteById(id){
        try {
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataParse = JSON.parse(data)
            const producto = dataParse.find((item) => item.id === id)

            if(producto){
                const productoBorrado = dataParse.filter((item) => item.id !== id)
                await fs.promises.writeFile(this.text, JSON.stringify(productoBorrado, null, 2), 'utf8')
                console.log('Producto borrado')    
            } else{
                console.log('El producto no existe')
            }
        }
        catch(err){
            console.log(err)
        }
    }


    // BORRA TODOS LOS OBJETOS DEL ARRAY
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.text, JSON.stringify([]), 'utf8');
            console.log('Productos borrados')
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = Contenedor;