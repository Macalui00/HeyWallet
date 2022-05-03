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
let formularioBuscadorIng = document.getElementById("formularioBuscadorIng");
let btnSearchIng = document.getElementById("btn-Search-Ing");
let categABuscarIng = document.getElementById("buscarXCategIng");
let btnCleanIng = document.getElementById("btn-Clean-Ing");

//Elementos del cambio de fecha
let btnDate = document.getElementById("btn-Date");
let btnChangeDate = document.getElementById("btn-ChangeDateI");
let selecAnio = document.getElementById("selecAnio");
let selecMes = document.getElementById("selecMes");

//Utilizados en la edición y eliminación de un item
let id, tipoItem;

//Configuro la cabecera del index //Uso de optimización de asignación de variables
cabecera.textContent = `Ingresos - ${lD?.mes || mesActualNombre} ${lD?.anio || anioActual}`;

//Seteo la tabla y los totales para el momento de volver a acceder a la pagina web
//Cargo la tabla con los datos del libro diario
cargarTablaIngresos(lD.items);

const categorias = obtenerCategoriasIngresos(lD, mesActualNombre, anioActual);
const totales = obtenerTotalesCategIngr(lD, categorias, mesActualNombre, anioActual);

cargarTablaCategIng(categorias, totales);

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
    let mesIngrNumero = mesesAnio.indexOf(selecMes.value);
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
        limpiarTablaIngresos();
        limpiarTablaCategIngr();

        //Cargo la tabla con los datos del libro diario
        cargarTablaIngresos(lD.items);
        const categorias = obtenerCategoriasIngresos(lD, mesActualNombre, anioActual);
        const totales = obtenerTotalesCategIngr(lD, categorias, mesActualNombre, anioActual);

        cargarTablaCategIng(categorias, totales);


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
formularioBuscadorIng.addEventListener("submit", buscarItemsIng);

//Buscar los items que aplican al filtro
function buscarItemsIng(e){

    let error = false;

    //categorias validas actuales de ingresos
    const categorias = ['sueldo','aguinaldo','ingresos extra','inversiones','freelance','rentas','jubilación','bonus','comisiones','pensiones','plus','otros'];

    e.preventDefault();

    //Declaro el array de items filtrados
    let itemsFiltrados = [];

    //Si el campo de nombre está vacío retorno mensaje de error
    if(categABuscarIng.length === 0){

        Swal.fire({
            title: '¡Error!',
            text: 'No se ingresó una categoria por el cual buscar.',
            icon: 'error',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        });  

        error = true;

    } else if(categorias.indexOf(categABuscarIng.value.toLowerCase()) === -1){ //si la categoria no existe

        Swal.fire({
            title: '¡Error!',
            text: 'Se ingreso una categoria incorrecta.',
            icon: 'error',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        });  

        error = true;

    } else { //Caso contrario, filtro

        itemsFiltrados = lD.items.filter((item)=> item.categoria.toLowerCase() === categABuscarIng.value.toLowerCase());

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

            limpiarTablaIngresos();
            cargarTablaIngresos(itemsFiltrados);        
        }
    }


}

//Al cliquear el botón de Limpiar
btnCleanIng.onclick = () => {

    //Limpio la tabla
    limpiarTablaIngresos();

    //Cargo la tabla con los datos del libro diario
    cargarTablaIngresos(lD.items);

    //Limpio el campo de Filtrado por Nombre
    categABuscarIng.value = "";
}
