class Usuario {
    constructor(nombre, apellido, libros=[], mascotas=[]){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(mascotas){
        this.mascotas.push(mascotas)
    }
    countMascotas(){
        let totalMacotas = this.mascotas.length
        return totalMacotas
    }
    addLibros(nombrelibro,autorlibro){
        this.libros.push({nombre: nombrelibro, autor: autorlibro})
        return `${this.libros}`
    }
    getBookNames(libros){
      let books = libros.nombre
        return books
    }
}
let Nadhir = new Usuario("Nadhir", "Naciff", [], [])
Nadhir.addMascota("gato")
Nadhir.addMascota("perro")
Nadhir.addMascota("loro")
Nadhir.addLibros("Asi hablo zaratustra","Nietzche")
Nadhir.addLibros("Interpretacion de los suenos","Freud")
Nadhir.addLibros("El alquimista","Paulo Coelho")
console.log("El nombre es" , Nadhir.getFullName())
console.log("Tiene", Nadhir.countMascotas(), "mascotas :")
console.log(Nadhir.mascotas)
console.log("los libros son", Nadhir.getBookNames())
