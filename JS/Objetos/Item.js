//Clase Item - (id, tipo, categoria, nombre, monto)
class Item{
            
    //Metodo Constructor
    constructor(id, tipo, categoria, nombre, fecha, monto){
        this.id = id;
        this.tipo = tipo;
        this.categoria = categoria;
        this.nombre = nombre;
        this.fecha = fecha;
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

    getFecha() {
        return this.fecha;
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

    setFecha(fecha) {
        this.fecha = fecha;
    }

    setMonto(monto) {
        this.monto = monto;
    }
}