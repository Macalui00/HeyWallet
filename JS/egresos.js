//Defino el libro diario anual
const libroDiarioAnual = (localStorage.getItem('libroDiarioAnual') === null ) ? [] : JSON.parse(localStorage.getItem('libroDiarioAnual'));

//Obtengo la fecha actual
const DateTime = luxon.DateTime
const date = DateTime.now();

let mesActualNombre = date.toLocaleString({ month: "long" });
let anioActual = date.year;

//Definimos ingresos, egresos y el balance
let lD = obtenerLibroDiarioAct(mesActualNombre, anioActual);

//Obtengo los elementos del DOM que voy a utilizar
//Elemento de cabecera
let cabecera = document.getElementById("cabecera");

let continuar;

//Elementos de busqueda de items
let formularioBuscadorEgr = document.getElementById("formularioBuscadorEgr");
let btnSearchEgr = document.getElementById("btn-Search-Egr");
let categABuscarEgr = document.getElementById("buscarXCategEgr");
let btnCleanEgr = document.getElementById("btn-Clean-Egr");

//Elementos del cambio de fecha
let btnDate = document.getElementById("btn-Date");
let btnChangeDate = document.getElementById("btn-ChangeDateE");
let selecAnio = document.getElementById("selecAnio");
let selecMes = document.getElementById("selecMes");

//Utilizados en la edición y eliminación de un item
let id, tipoItem;

//Configuro la cabecera del index //Uso de optimización de asignación de variables
cabecera.textContent = `Egresos - ${lD?.mes || mesActualNombre} ${lD?.anio || anioActual}`;

//Seteo la tabla y los totales para el momento de volver a acceder a la pagina web
//Cargo la tabla con los datos del libro diario
cargarTablaEgresos(lD.items);

const categorias = obtenerCategoriasEgresos(lD, mesActualNombre, anioActual);
const totales = obtenerTotalesCategEgr(lD, categorias, mesActualNombre, anioActual);

cargarTablaCategEgr(categorias, totales);

//Al cliquear el botón de Cambio de Fecha
btnDate.onclick = () => { //Uso de optimización de asignación de variables
    selecAnio.value = lD?.anio || anioActual;
    selecMes.value = lD?.mes || mesActualNombre;
}

//Al cliquear el botón de Cambiar Fecha en el Modal
btnChangeDate.onclick = () => {

    //Defino y armo las fechas y formato de fecha que voy a utilizar
    const mesesAnio = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    //Mes ingresado en formato múmero (1, 2, 3, etc.)
    let mesIngrNumero = mesesAnio.indexOf(selecMes.value)+1;
    let anioIngresado = parseInt(selecAnio.value);
       
    //Mes ingresado en formato nombre (enero, febrero, marzo, etc.)
    let mesIngrNombre = selecMes.value.toLocaleString("es-AR", { month: "long" });
    
    //Chequeo que el mes y el año no superen el mes y año actual, solo se admiten mes y año previos
    if ( ((mesIngrNumero <= date.month) && (anioIngresado === date.year)) || (parseInt(selecAnio.value) < date.year) ) {

        //Si ya existe un libro diario para un mes y año en particular
        if (existeLD(mesIngrNombre, anioIngresado)){

            //Obtengo ese libro diario para visualizarlo.
            lD = obtenerLD(mesIngrNombre, anioIngresado);
           
            //Actualizar mes y anio
            mesActualNombre = mesIngrNombre;
            anioActual = anioIngresado;

        } else {
            
            //Creo el libro diario
            libroDiarioAnual.push(new LibroDiario(mesIngrNombre, anioIngresado, []));

            //Actualizo el Libro Diario Anual en el Local Storage
            localStorage.setItem('libroDiarioAnual', JSON.stringify(libroDiarioAnual));

            //Agrego el libro diario del mes actual al listado
            lD = obtenerLD(mesIngrNombre, anioIngresado);   
             
            //Actualizar mes y anio
            mesActualNombre = mesIngrNombre;
            anioActual = anioIngresado;

        }

        //Cambio de cabecera
        cabecera.textContent = "Ingresos - " + (lD?.mes || mesActualNombre)+ " " + (lD?.anio || anioActual);
        
        //Limpio la tabla
        limpiarTablaEgresos();
        limpiarTablaCategEgr();

        //Cargo la tabla con los datos del libro diario
        cargarTablaEgresos(lD.items);
        const categorias = obtenerCategoriasEgresos(lD, mesActualNombre, anioActual);
        const totales = obtenerTotalesCategEgr(lD, categorias, mesActualNombre, anioActual);
        cargarTablaCategEgr(categorias, totales);

    } else { //Si el mes y el año superen el mes y año actual, indigo fecha erronea.

        Swal.fire({
            title: '¡Error!',
            text: 'Fecha ingresada erronea.',
            icon: 'error',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        })  


    }
    
   
}

//Al cliquear el botón de Buscar
formularioBuscadorEgr.addEventListener("submit", buscarItemsEgr);

//Buscar los items que aplican al filtro
function buscarItemsEgr(e){

    let error = false;

    //categorias validas actuales de egresos
    const categorias = ['comida','deportes','deudas','entretenimiento','facturas','gimnasio','hogar','mascotas','regalos','restaurante','ropa','salud','tarjeta de credito','transporte','impuestos','otros'];

    e.preventDefault();

    //Declaro el array de items filtrados
    let itemsFiltrados = [];

    //Si el campo de nombre está vacío retorno mensaje de error
    if(categABuscarEgr.length === 0){

        Swal.fire({
            title: '¡Error!',
            text: 'No se ingresó una categoria por el cual buscar.',
            icon: 'error',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        });  

        error = true;

    } else if(categorias.indexOf(categABuscarEgr.value.toLowerCase()) === -1){ //si la categoria no existe

        Swal.fire({
            title: '¡Error!',
            text: 'Se ingreso una categoria incorrecta.',
            icon: 'error',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        });  

        error = true;

    } else { //Caso contrario, filtro

        itemsFiltrados = lD.items.filter((item)=> item.categoria.toLowerCase() === categABuscarEgr.value.toLowerCase());

    }

    if (!error){
        //En caso de que no se hayan obtenido resultados
        if (itemsFiltrados.length === 0){

            Swal.fire({
                title: 'No hay resultados',
                text: 'No se han encontrado items con la categoria ingresada.',
                icon: 'info',
                confirmButtonColor: "#198754",
                confirmButtonText: 'OK',
            })  

        } else { //Mostramos el array final filtrado en la tabla

            limpiarTablaEgresos();
            cargarTablaEgresos(itemsFiltrados);        
        }
    }
}


//Al cliquear el botón de Limpiar
btnCleanEgr.onclick = () => {

    //Limpio la tabla
    limpiarTablaEgresos();

    //Cargo la tabla con los datos del libro diario
    cargarTablaEgresos(lD.items);

    //Limpio el campo de Filtrado por Nombre
    categABuscarEgr.value = "";
}