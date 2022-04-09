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
}

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

function calcularTotal(items){
    let total = 0;

    //Calculamos el total con reduce
    items.forEach((item) =>{
        total = total + item.monto;
    })

    return total;
}


function analisisBalanceMensual(){

    //Definimos ingresos, egresos y el balance
    const lD = new LibroDiario(calcularMes(), calcularAnio(), obtenerItems());
    lD.calcularBalance();

    return lD;
}

function calcularMes(){
    const mesesAnio = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
    let mes = prompt("Por favor ingrese el mes a analizar.");

    while(!mesesAnio.includes(mes.toLowerCase())){

        mes = prompt("Valor Erroneo. Por favor ingrese el mes a analizar.");

    }

    return mes.toLowerCase();
}

function calcularAnio(){
    const date = new Date();
    let anioActual = date.getFullYear();

    let anio = parseInt(prompt("Por favor ingrese el anio."));

    while(anio > anioActual || isNaN(parseInt(anio))){ 
        anio = prompt("Año Erroneo. Por favor ingrese el año a analizar.");

    }

    return anio;
}


function obtenerItems(){

    //Declaramos las variables a utilizar dentro de la función
    let continuar = 'S', id = 0, tipo = "", categoria = "", nombre = "", monto;

    const items = [];

    //Mientras el usuario quiera continuar introduciendo items:
    while(continuar.toUpperCase() === "S"){

        //Solicitamos datos al usuario
        tipo = chequeoErroresItem(tipo, "Indique tipo de item: INGRESO o EGRESO");
        categoria = seleccionCategoria(categoria, tipo);
        nombre = chequeoErroresNombre(nombre, "Ingrese nombre/descripción del item.");
        monto = chequeoErroresMonto(monto, "El monto del item como valor positivo (>0).");
        
        //Insertamos los elementos en las listas
        items.push(new Item(id, tipo, categoria, nombre, monto));
        
        //chequeamos que el usuario quiera seguir introduciendo ingresos
        continuar = chequeoErroresCont(continuar,"¿Desea continuar ingresando items? S/N");

        id ++;
    }

    //Retornamos listado de items
    return items;

}

function seleccionCategoria(categoria, tipo){
    let categIng = ["Sueldo", "Aguinaldo","Ingresos Extra","Inversiones","Freelance", "Rentas","Jubilación", "Bonus","Comisiones","Pensiones","Plus","Otros"];
    let categEgr = ["Comida", "Deportes","Deudas","Entretenimiento","Facturas","Gimnasio","Hogar","Mascotas", "Regalos",
                            "Restaurante", "Ropa", "Salud","Tarjeta de Credito", "Transporte", "Impuestos", "Otros"];

    if (tipo.toUpperCase() === "INGRESO"){

        mensajePrompt = "Indique la categoria del ingreso ingresando el número:\n"
        categIng.forEach(categoria => mensajePrompt += `${categIng.indexOf(categoria)+1}- ${categoria}\n`);

        categoria = chequeoErroresCategoria(categoria, categIng, mensajePrompt, 0, 12);

    } else {

        mensajePrompt = "Indique la categoria del egreso ingresando el número:\n" 
        categEgr.forEach(categoria => mensajePrompt += `${categEgr.indexOf(categoria)+1}- ${categoria}\n`);

        categoria = chequeoErroresCategoria(categoria, categEgr, mensajePrompt, 0, 16);
    }

    return categoria;
}

function chequeoErroresCategoria(categoria, categItems, mensajePrompt, rangoInicio, rangoFin){

    categoria = parseInt(prompt(mensajePrompt));
    
    // Chequea si el valor ingresado por el usuario es correcto
    while((categoria < rangoInicio) || (categoria > rangoFin)){

        categoria = prompt("Respuesta incorrecta. " + mensajePrompt);

    }

    return categItems[categoria-1];
}

function chequeoErroresMonto(valor, mensajePrompt){

    valor = parseFloat(prompt(mensajePrompt));

    // Chequea si el valor ingresado por el usuario es mayor a cero
    while(valor < 0){

        valor =  parseFloat(prompt("Monto incorrecto. "+mensajePrompt));

    }

    return valor;
}

function chequeoErroresItem(tipoItem,  mensajePrompt){

    tipoItem = prompt(mensajePrompt);

    // Chequea si el valor ingresado por el usuario es correcto
    while((tipoItem.toUpperCase() !== "INGRESO") && (tipoItem.toUpperCase() !== "EGRESO")){

        tipoItem = prompt("Respuesta incorrecta " + mensajePrompt);

    }

    return tipoItem;
}

function buscarItems(listadoItems){

    //Declaración de variables
    let continuar = 'S', nombre = '';
    
    continuar = chequeoErroresCont(continuar,"¿Desea buscar items por nombre o descripción? S/N");

    //Mientras el usuario quiera continuar:
    while(continuar.toUpperCase() === "S"){

        //Solicitamos el nombre o descripción por el cual vamos a filtrar
        nombre = chequeoErroresNombre(nombre,"Ingrese nombre o descripción de los items a buscar.");

        //Hacemos el filtrado
        const itemsFiltrados = listadoItems.filter((item)=> item.includes(nombre));

        //Mostramos el array final filtrado
        if (itemsFiltrados.length === 0){

            alert("No se han encontrado items con el nombre / descripción ingresada.");  

        } else {

            alert("Los items encontrados son los siguientes:\n" + itemsFiltrados.join("\n"));  
            
        }

        //chequeamos que el usuario quiera seguir buscando más items
        continuar = chequeoErroresCont(continuar,"¿Desea buscar más items por nombre o descripción? S/N");

    }  

}

function chequeoErroresNombre(nombre,  mensajePrompt){

    nombre = prompt(mensajePrompt);

    // Chequea si el valor ingresado por el usuario es correcto
    while(nombre === "" || !isNaN(parseInt(nombre))){

        nombre = prompt("Respuesta incorrecta. " + mensajePrompt);

    }

    return nombre;
}

function chequeoErroresCont(continuar,  mensajePrompt){

    continuar = prompt(mensajePrompt);

    // Chequea si el valor ingresado por el usuario es correcto
    while((continuar.toUpperCase() !== "S") && (continuar.toUpperCase() !== "N")){

        continuar = prompt("Respuesta incorrecta " + mensajePrompt);

    }

    return continuar;
}
            
function armarListado(listadoItems){
    const detalle = [];

    for(const item of listadoItems){

        detalle.push(item.detalleItem());

    }

    return detalle;
}

//Ahora vamos a la ejecución de todo:
const libroDiarioAnual = [];

alert("Bienvenido al calculador de balances para cuidar tu salud financiera. \nA continuación se le solicitara primero el ingreso del mes y anio a analizar, luego ingresar los ingresos y egresos.");

//Realizamos el análisis mensual del balance
const lD = analisisBalanceMensual();

//Armamos los listados finales de ingresos y egresos
const detalleIng = armarListado(lD.obtenerIngresos());
const detalleEgr = armarListado(lD.obtenerEgresos());

//Muestra de datos en los elementos de la pantalla
let cabecera = document.getElementById("cabecera");
cabecera.innerText = "Balance - " + lD.mes + " " + lD.anio; 

let cantItems = document.getElementById("cantItems");
cantItems.innerText = lD.items.length; 

let totalIng = document.getElementById("totalIng");
totalIng.innerText = calcularTotal(lD.obtenerIngresos()).toLocaleString("es-CO", {style: "currency",currency: "COP"});

let totalEgr = document.getElementById("totalEgr");
totalEgr.innerText = calcularTotal(lD.obtenerEgresos()).toLocaleString("es-CO", {style: "currency",currency: "COP"});

let totalBal = document.getElementById("totalBal");
totalBal.innerText = lD.balance.toLocaleString("es-CO", {style: "currency",currency: "COP"});
totalBal.className = (lD.balance < 0) ? ("fs-4 text-danger") : ("fs-4 text-success");

for (const item of lD.items) {

    let lineaTabla = document.createElement("tr");

    //Definimos el innerHTML del elemento con una plantilla de texto
    lineaTabla.innerHTML = `<td>${(item.tipo.toUpperCase() === "EGRESO") ? ("<i class='material-icons' style='color: red;''>south_west</i>") : 
                            ("<i class='material-icons' style='color: green;''>north_east</i>")}</td>
                            <td>${item.categoria}</td>
                            <td>${item.nombre}</td>
                            <td>${item.monto.toLocaleString("es-CO", {style: "currency",currency: "COP"})}</td>
                            <td><i class="material-icons icono" style="font-size:18px; 
                            color: green;" data-bs-toggle="modal" ${(item.tipo.toUpperCase() === "EGRESO") ?
                             (" data-bs-target='#editarEgreso'") : (" data-bs-target='#editarIngreso'")} >edit</i><i class="material-icons icono"
                            style="font-size:18px;color: red;"">delete</i></td>`;

    let cuerpoTabla = document.querySelector(".bodyTable");
    cuerpoTabla.appendChild(lineaTabla);

}

buscarItems(armarListado(lD.items));

