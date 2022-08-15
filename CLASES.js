class Usuario {
    constructor(name, lastname, bookname, authorname, pets) {
        this.nombre = name;
        this.apellido = lastname;
        this.libros = [
            this.nombre= bookname,
            this.autor= authorname,
        ]
        this.mascotas = [pets];
    } 

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(bookname, authorname) {
        this.libros.push(bookname, authorname);
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}

const ejemplo1 = new Usuario('Manuel', 'Charris', 'Harry Potter', 'jk rowling', 'perro');
console.log(ejemplo1.getFullName());
console.log(ejemplo1.countMascotas());
console.log(ejemplo1.getBookNames());
ejemplo1.addMascota('gato');
console.log(ejemplo1.countMascotas());
ejemplo1.addBook('El señor de los anillos', 'J.R.R. Tolkien');
console.log(ejemplo1.getBookNames());

