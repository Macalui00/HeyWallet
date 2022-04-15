//Clase Item
class Item{
            
    //Metodo Constructor
    constructor(id, tipo, categoria, nombre, monto){
        this.id = id;
        this.tipo = tipo;
        this.categoria = categoria;
        this.nombre = nombre;
        this.monto = monto;
    }

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

//Clase Libro diario - (mes, anio)
class LibroDiario{

    //Metodo Constructor
    constructor(mes, anio, items){
        this.mes = mes;
        this.anio = anio;
        this.items = items;
    }

    obtenerIngresos(){
        return this.items.filter((item)=> item.tipo.toUpperCase() === "INGRESO");
    }
    
    obtenerEgresos(){
        return this.items.filter((item)=> item.tipo.toUpperCase() === "EGRESO");
    }

    calcularBalance(){
        const ingresos = this.obtenerIngresos();
        const egresos = this.obtenerEgresos();

        const totalIng = calcularTotal(ingresos);
        const totalEgr = calcularTotal(egresos);

        this.balance = totalIng - totalEgr;
    }

    analisisBalance(analisisOK, analisisNOTOK){
        return (this.balance < 0) ? analisisNOTOK : analisisOK; 
    }

}

//Calculo el total del listado items
function calcularTotal(items){
    let total = 0;

    //Calculamos el total con reduce
    items.forEach((item) =>{
        total = total + item.monto;
    })

    return total;
}

//Obtengo la fecha actual
const date = new Date();

//Definimos ingresos, egresos y el balance
const lD = new LibroDiario(date.getMonth(), date.getFullYear(), []);
   
//obtengo los elementos del DOM que voy a utilizar

//Elementos de ingreso de items
let tipoEgreso = document.getElementById("tipoEgreso");
let tipoIngreso = document.getElementById("tipoIngreso");
let btnAddItem = document.getElementById("btn-addItem");
let btnModalAddItem = document.getElementById("btn-modalAddItem");
let catIngreso = document.getElementById("catIngreso");
let catEgreso = document.getElementById("catEgreso");
let nombre = document.getElementById("nombre");
let monto = document.getElementById("monto");

let divEgreso = document.getElementById("div-Egreso");
let divIngreso = document.getElementById("div-Ingreso");

//Elementos de totales
let cantItems = document.getElementById("cantItems");
let totalIng = document.getElementById("totalIng");
let totalEgr = document.getElementById("totalEgr");
let totalBal = document.getElementById("totalBal");

let continuar;

//Elementos de edición de items
let iconEdit = document.getElementsByClassName("iconEdit");
let divEgresoEdit = document.getElementById("div-EgresoEdit");
let divIngresoEdit = document.getElementById("div-IngresoEdit");
let catIngresoEdit = document.getElementById("catIngresoEdit");
let catEgresoEdit = document.getElementById("catEgresoEdit");
let nombreEdit = document.getElementById("nombreEdit");
let montoEdit = document.getElementById("montoEdit");
let editarItemLabel = document.getElementById("editarItemLabel");

let btnEditItem = document.getElementById("btn-editItem"); 

//Elementos de eliminación de items
let btnDeleteItem = document.getElementById("btn-DeleteItem");

//Elementos de busqueda de items
let formularioBuscador = document.getElementById("formularioBuscador");
let btnSearch = document.getElementById("btn-Search");
let nombreABuscar = document.getElementById("buscarXNombre");
let btnClean = document.getElementById("btn-Clean");


//Utilizados en la edición y eliminación de un item
let id, tipoItem;

// Ocultando y desocultando categorias en función si el usuario selecciona tipo de item Ingreso o Egreso.
tipoEgreso.onclick = () => {
    
    divEgreso.className = "mb-3";
    divIngreso.className = "mb-3 d-none";

}


tipoIngreso.onclick = () => {

    divEgreso.className = "mb-3 d-none";
    divIngreso.className = "mb-3";

}

//Al hacer click en el boton de modal Agregar Item seteo que categoria se mostrará por default al abrir el modal
btnModalAddItem.onclick = () => {

    divEgreso.className = "mb-3 d-none";
    divIngreso.className = "mb-3";

}

//Verifico si existe el item con determinado nombre y categoria retorno true
function existeItem(catItem, nombreItem){
    for(const item of lD.items){

        //Si existe el item con tal nombre y categoria retorno true
        if (item.nombre === nombreItem && item.categoria === catItem){

            return true;

        }
    }

    //No existe el item con tal nombre y categoria retorno false
    return false;
}

//Validar formulario antes de agregar el item
function validarFormAgrItem(){
    
    //Valido si el item es de tipo ingreso, la categoria no haya quedado vacía
    if (tipoIngreso.checked && catIngreso.value.length === 0) {

        alert("¡Falta ingresar categoria ingreso!");
        continuar = false;

    //Valido si el item es de tipo egreso, la categoria no haya quedado vacía
    } else if (tipoEgreso.checked && catEgreso.value.length === 0) {

        alert("¡Falta ingresar categoria egreso!");
        continuar = false;

    } else {

        //Valido que el nombre no haya quedado vacío
        if (nombre.value.length === 0){

            alert("¡Falta ingresar nombre!");
            continuar = false;

        //Valido que no haya un item con (categoria, nombre) iguales
        } else if(existeItem(((tipoIngreso.checked) ? (catIngreso.value) : (catEgreso.value)), nombre.value)) {

            alert("¡No se puede ingresar más de un item con la misma categoria y nombre!");
            continuar = false;

        } else {

            //Valido que el monto no haya quedado vacío
            if (isNaN(parseFloat(monto.value))){

                alert("¡UPS! Monto Erroneo.");
                continuar = false;
               
            //Valido que el monto no sea negativo
            } else if (parseFloat(monto.value) < 0) {

                alert("¡El monto debe ser mayor a cero!");
                continuar = false;

            //Pasó las validaciones
            } else {

                continuar = true;

            }
        }    
    }
    
}

//Limpiar Formulario de Agregado de Item
function limpiarFormAgrItem(){

    //Lo seteo para que por default muestre tipo de item Ingreso
    if (tipoIngreso.checked){

        //limpio el campo de categoria ingreso
        catIngreso.value = "";

    } else {

        //limpio el campo de categoria egreso
        catEgreso.value = "";

        //Para que muestre la categoria de Ingreso
        divEgreso.className = "mb-3 d-none";
        divIngreso.className = "mb-3";

    }

    //Indico Tipo de Item: ingreso
    tipoIngreso.checked = true;
    tipoEgreso.checked = false;

    //limpio los campos de nombre y monto
    nombre.value = "";
    monto.value = "";
    
}

//Agrego el item en la tabla
function agregarItemATabla(){

    //Obtengo el item que que acabo de agregar al listado de la tabla
    const item = lD.items[lD.items.length-1];

    //Creo la linea de la tabla en la que colocaré el item
    let lineaTabla = document.createElement("tr");

    //Le asigno un id para identificar al item
    lineaTabla.id = "item" + item.id;

    let montoConvertido = item.monto.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
    //Definimos el innerHTML del elemento con una plantilla de texto
    lineaTabla.innerHTML = `<td>${(item.tipo.toUpperCase() === "EGRESO") ? ("<i class='material-icons text-danger' style=''>south_west</i>") : 
                            ("<i class='material-icons text-success' style=''>north_east</i>")}</td>
                            <td>${item.categoria}</td>
                            <td>${item.nombre}</td>
                            <td>${montoConvertido}</td>
                            <td><i class="material-icons icono iconEdit text-success" style="" data-bs-toggle="modal" onclick="cargarItemEdit(this)" data-bs-target="#editarItem">edit</i>
                            <i class="material-icons icono text-danger" style="" data-bs-toggle="modal" onclick="cargarItemElim(this)" data-bs-target="#eliminarItem">delete</i></td>`;

    //Obtengo el cuerpo de la tabla
    let cuerpoTabla = document.querySelector(".bodyTable");

    //Le agrego al cuerpo de la tabla la nueva linea de tabla creada
    cuerpoTabla.appendChild(lineaTabla);
    
}

//Calculo los totales de cantidad de items, total ingresos, total egresos, total balance
function calcularTotales(){

    //Calculo y muestro la cantidad de items
    cantItems.innerText = lD.items.length;
    
    //Calculo y muestro el total de ingresos
    totalIng.innerText = calcularTotal(lD.obtenerIngresos()).toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    //Calculo y muestro el total de egresos
    totalEgr.innerText = calcularTotal(lD.obtenerEgresos()).toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    lD.calcularBalance();

    //Calculo y muestro el total de balance
    totalBal.innerText = lD.balance.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    //Si el balance es positivo lo muestro en verde, si es negativo lo muestro en rojo
    totalBal.className = (lD.balance < 0) ? ("fs-5 text-danger") : ("fs-5 text-success");

}

//Al cliquear en el boton "Agregar Item" del modal Agregar Item
btnAddItem.onclick = () => {
    
    //Valido que los datos ingresados en el formulario esten correctos
    validarFormAgrItem();
     
    //Verifico si el tipo de item indicado es un Ingreso 
    if (tipoIngreso.checked) {
        
        if (continuar){
            
            //Creo el item en el listado de items
            lD.items.push(new Item(lD.items.length+1,"INGRESO", catIngreso.value, nombre.value, parseFloat(monto.value.replaceAll(",","."))));
            
            //Limpio los campos del modal
            limpiarFormAgrItem();

            //Agrego al item en la tabla
            agregarItemATabla();

            //calculo los totales
            calcularTotales();

        }
    
    //Caso contrario es un Egreso 
    } else {
        
        if (continuar){
             
            //Creo el item en el listado de items
            lD.items.push(new Item(lD.items.length+1,"EGRESO", catEgreso.value, nombre.value, parseFloat(monto.value.replaceAll(",","."))));
            
            //Limpio los campos del modal
            limpiarFormAgrItem();

            //Agrego al item en la tabla
            agregarItemATabla();

            //calculo los totales
            calcularTotales();

        }
    }
    

}

//Busco el id del item en cuestión
function buscarIdItem(categoria, nombre){
    for (const item of lD.items){
        if (item.nombre === nombre && item.categoria === categoria){
            return item.id;
        }
    }
}

//Cargo los datos del item a editar
function cargarItemEdit(nodo){
    
    //Obtengo la linea de datos del item en cuestión en la tabla
    let nodoTd = nodo.parentNode; //Nodo TD
    let nodoTr = nodoTd.parentNode; //Nodo TR
    let nodosEnTr = nodoTr.getElementsByTagName('td');
    
    //Obtengo los datos del item en cuestión que estan en la tabla
    let tipo = nodosEnTr[0].textContent; //En la tabla el tipo esta representado por un icon de nombre north_east o west_east
    let categoria = nodosEnTr[1].textContent;
    let nombre = nodosEnTr[2].textContent; 
    let monto = nodosEnTr[3].textContent;
    
    //Obtengo el id del item en función de su categoria y nombre
    id = buscarIdItem(categoria, nombre);

    //Si es de tipo north_east es un ingreso
    if (tipo === "north_east"){
        
        //Hago que solo se muestre el seleccionable de categorias ingresos
        divEgresoEdit.className = "mb-3 d-none";
        divIngresoEdit.className = "mb-3";

        //Indico que el tipo de item es INGRESO, valor usado en validarFormEditItem
        tipoItem = "INGRESO";

        //Cambio el titulo del modal a Editar Ingreso
        editarItemLabel.textContent = "Editar Ingreso";

        //Cargo la categoria del item
        catIngresoEdit.value = categoria;
    
    //Si es de tipo west_east es un egreso
    } else {

        //Hago que solo se muestre el seleccionable de categorias ingresos
        divEgresoEdit.className = "mb-3";
        divIngresoEdit.className = "mb-3 d-none";

        //Indico que el tipo de item es INGRESO, valor usado en validarFormEditItem
        tipoItem = "EGRESO";
        
        //Cambio el titulo del modal a Editar Egreso
        editarItemLabel.textContent = "Editar Egreso";

        //Cargo la categoria del item
        catEgresoEdit.value = categoria;

    }
    
    //Cargo el nombre y el monto del item
    nombreEdit.value = nombre;
    montoEdit.value = monto.replaceAll(".","");

}

//Valido los datos editados por el usuario
function validarFormEditItem(){

    //Valido si el item es de tipo ingreso, la categoria no haya quedado vacía
    if (tipoItem.toLowerCase() === "INGRESO" && catIngresoEdit.value.length === 0) {

        alert("¡Falta ingresar categoria ingreso!");
        continuar = false;

    //Valido si el item es de tipo egreso, la categoria no haya quedado vacía
    } else if (tipoItem.toLowerCase() === "EGRESO" && catEgresoEdit.value.length === 0) {

        alert("¡Falta ingresar categoria egreso!");
        continuar = false;

    } else {

        //Valido que el nombre no haya quedado vacío
        if (nombreEdit.value.length === 0){

            alert("¡Falta ingresar nombre!");
            continuar = false;

        //Valido que no haya un item con (categoria, nombre) iguales
        } else if(existeItem(((tipoItem.toLowerCase() === "INGRESO") ? (catIngresoEdit.value) : (catEgresoEdit.value)), nombreEdit.value)) {

            alert("¡No se puede ingresar más de un item con la misma categoria y nombre!");
            continuar = false;

        } else {

            //Valido que el monto no haya quedado vacío
            if (isNaN(parseFloat(montoEdit.value))){

                alert("¡UPS! Monto Erroneo.");
                continuar = false;
                
            //Valido que el monto no sea negativo
            } else if (parseFloat(montoEdit.value) < 0) {

                alert("¡El monto debe ser mayor a cero!");
                continuar = false;

            //Pasó las validaciones
            } else {

                continuar = true;

            }
        }    
    }
    
}

//Al cliquear en el boton "Editar Item" del modal Editar Item
btnEditItem.onclick = () => {
    //Seteo el continuar para limpiar valores previos
    continuar = true;

    //Valido los valores editados por el cliente
    validarFormEditItem();

    //Obtengo la linea de la tabla en cuestion
    let lineaTabla = document.getElementById("item" + id); 
    let celdas = lineaTabla.getElementsByTagName('td');
    
    //Edito los campos del item en la tabla
    celdas[1].textContent = (tipoItem === "EGRESO") ? (catEgresoEdit.value) : (catIngresoEdit.value);
    celdas[2].textContent = nombreEdit.value; 
    celdas[3].textContent = parseFloat(montoEdit.value.replaceAll(",", ".")).toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
    
    //Edito los campos del item en el listado de items
    lD.items[id-1].setCategoria((tipoItem === "EGRESO") ? (catEgresoEdit.value) : (catIngresoEdit.value));
    lD.items[id-1].setNombre(nombreEdit.value);
    lD.items[id-1].setMonto(parseFloat(montoEdit.value.replaceAll(",", ".")));

    //Calculo nuevamente los totales
    calcularTotales();
    
}

//Obtenemos la información correspondiente al item a eliminar
function cargarItemElim(nodo){
    //Seteo el id para limpiar valores previos
    id = "";
    
    //Obtengo los datos del item en cuestión
    let nodoTd = nodo.parentNode; //Nodo TD
    let nodoTr = nodoTd.parentNode; //Nodo TR
    let nodosEnTr = nodoTr.getElementsByTagName('td');
    
    //Obtengo la categoria y nombre del item en cuestión
    let nombre = nodosEnTr[2].textContent; 
    let categoria = nodosEnTr[1].textContent;
    
    //Obtengo el id del item en función de su categoria y nombre
    id = buscarIdItem(categoria, nombre); 

}

//Al cliquear en el boton "Eliminar Item" del modal Eliminar Item
btnDeleteItem.onclick = () => {

    //Selecciono la linea de la tabla del item en cuestión y la elimino
    let lineaTabla = document.getElementById("item"+id);
    lineaTabla.remove();

    //Elimino el item en cuestion del listado de items
    lD.items.splice(id-1,1);

    //Calculo nuevamente los totales
    calcularTotales();

}

function limpiarTabla(){

    let cuerpoTabla = document.querySelector(".bodyTable");

    while (cuerpoTabla.firstChild) {
        
        cuerpoTabla.removeChild(cuerpoTabla.firstChild);

    }
}

function cargarTabla(items){
    
    for (const item of items) {

        let lineaTabla = document.createElement("tr");
        
        //Le asigno un id para identificar al item
        lineaTabla.id = "item" + item.id;
    
        let montoConvertido = item.monto.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

        //Definimos el innerHTML del elemento con una plantilla de texto
        lineaTabla.innerHTML = `<td>${(item.tipo.toUpperCase() === "EGRESO") ? ("<i class='material-icons text-danger' style=''>south_west</i>") : 
                                ("<i class='material-icons text-success' style=''>north_east</i>")}</td>
                                <td>${item.categoria}</td>
                                <td>${item.nombre}</td>
                                <td>${montoConvertido}</td>
                                <td><i class="material-icons icono iconEdit text-success" style="" data-bs-toggle="modal" onclick="cargarItemEdit(this)" data-bs-target="#editarItem">edit</i>
                                <i class="material-icons icono text-danger" style="" data-bs-toggle="modal" onclick="cargarItemElim(this)" data-bs-target="#eliminarItem">delete</i></td>`;
                     
        let cuerpoTabla = document.querySelector(".bodyTable");
        cuerpoTabla.appendChild(lineaTabla);
    
    }

}

//Al cliquear el botón de Buscar
formularioBuscador.addEventListener("submit", buscarItems);

//Buscar los items que aplican al filtro
function buscarItems(e){

    e.preventDefault();

    //Declaro el array de items filtrados
    let itemsFiltrados = [];

    //Si el campo de nombre está vacío retorno mensaje de error
    if(nombreABuscar.length === 0){

        alert("No se ingresó nombre por el cual buscar.");

    } else{ //Caso contrario, filtro

        itemsFiltrados = lD.items.filter((item)=> item.nombre.includes(nombreABuscar.value));

    }

    //En caso de que no se hayan obtenido resultados
    if (itemsFiltrados.length === 0){

        alert("No se han encontrado items con el nombre / descripción ingresada.");  

    } else { //Mostramos el array final filtrado en la tabla

        limpiarTabla();
        cargarTabla(itemsFiltrados);
        
    }
}

//Al cliquear el botón de Limpiar
btnClean.onclick = () => {

    //Limpio la tabla
    limpiarTabla();

    //Cargo la tabla con los datos del libro diario
    cargarTabla(lD.items);

    //Limpio el campo de Filtrado por Nombre
    nombreABuscar.value = "";
}

