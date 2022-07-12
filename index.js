class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return this.nombre + ' ' + this.apellido
    }

    AddMascota(){
        this.mascotas.push()
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        this.libros.push({
            nombre: nombre,
            autor: autor
        })
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre)
    }
}

const usuario = new Usuario ('Jonathan', 'Maidana', [{nombre: 'Harry Potter', autor: 'J. K. Rowling'},{nombre: 'El señor de los anillos', autor: 'J. R. R. Tolkien'}], ['perro', 'gato'])
console.log(usuario.getFullName())
console.log(usuario.countMascotas())
console.log(usuario.getBookNames())