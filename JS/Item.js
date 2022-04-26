//Clase Item - (id, tipo, categoria, nombre, monto)
class Item{
            
    //Metodo Constructor
    constructor(id, tipo, categoria, nombre, monto){
        this.id = id;
        this.tipo = tipo;
        this.categoria = categoria;
        this.nombre = nombre;
        this.monto = monto;
    }

    //Metodos
    detalleItem(){
        return "Categoria: " + this.categoria + ", Nombre: " + this.nombre + ", monto: " + this.monto;
    }

    getID() {
        return this.id;
    }

    getTipo() {
        return this.tipo;
    }

    getCategoria() {
        return this.categoria;
    }

    getNombre() {
        return this.nombre;
    }

    getMonto() {
        return this.monto;
    }

    setCategoria(categoria) {
        this.categoria = categoria;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setMonto(monto) {
        this.monto = monto;
    }
}