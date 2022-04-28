//Defino el libro diario anual
const libroDiarioAnual = (localStorage.getItem('libroDiarioAnual') === null ) ? [] : JSON.parse(localStorage.getItem('libroDiarioAnual'));

//Obtengo la fecha actual
const date = new Date();
let mesActualNombre = date.toLocaleString("es-AR", { month: "long" });
let anioActual = date.getFullYear();

//Definimos ingresos, egresos y el balance
let lD = obtenerLibroDiarioAct(mesActualNombre, anioActual);

//Elementos del cambio de anio
let btnYear = document.getElementById("btn-Year");
let btnChangeYear = document.getElementById("btn-ChangeYear");
let selecAnio = document.getElementById("selecAnio");

//Elemento de cabecera
let cabeceraGraficas = document.getElementById("cabecera-Graficas");

//Configuro la cabecera de la sección de gráficos
cabeceraGraficas.textContent = `Gráficos - ${anioActual}`;

/*------------------------ Grafico 1 ---------------------------*/
// Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#grafica");

// Las etiquetas son las que van en el eje X. 
let etiquetasGraf1 = obtenerMeses(libroDiarioAnual, anioActual);

// Los datos del grafico 
let ingresosGraf1 = obtenerIngresosTotales(libroDiarioAnual, anioActual);
let egresosGraf1 = obtenerEgresosTotales(libroDiarioAnual, anioActual);

// Podemos tener varios conjuntos de datos. Comencemos con uno
let datosIngrGraf3Graf1 = {
    label: "Ingresos",
    data: ingresosGraf1, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(42, 167, 53, 0.97)', // Color de fondo
    borderColor: 'rgba(42, 167, 53, 0.97)', // Color del borde
    borderWidth: 1,// Ancho del borde
};

let datosEgrGraf4Graf1 = {
    label: "Egresos",
    data: egresosGraf1, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(235, 54, 54, 0.97)', // Color de fondo
    borderColor: 'rgba(235, 54, 54, 0.97)', // Color del borde
    borderWidth: 1,// Ancho del borde
};     

let grafica1 = new Chart($grafica, {
    type: 'line',// Tipo de gráfica
    data: {
        labels: etiquetasGraf1,
        datasets: [
            datosIngrGraf3Graf1,
            datosEgrGraf4Graf1,            
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
        plugins: {
            title: {
                display: true,
                text: 'Comparativa Ingresos vs Egresos',
                color: "#009d63",
                font: {
                    size: 20
                }
            }
        }
    }
});

/*------------------------ Grafico 2 ---------------------------*/
// Obtener una referencia al elemento canvas del DOM
const $grafica2 = document.querySelector("#grafica2");

//Data ingresos y egresos
let ingresosGraf2 = obtenerIngresosTotales(libroDiarioAnual, anioActual);
let egresosGraf2 = obtenerEgresosTotales(libroDiarioAnual, anioActual);

// Podemos tener varios conjuntos de datos
let datosIng2022 = {
    label: "Ingresos - 2022",
    data: ingresosGraf2, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(42, 167, 53, 0.97)', // Color de fondo
    borderColor: 'rgba(42, 167, 53, 0.97)', // Color del borde
    borderWidth: 1,// Ancho del borde
};

let datosEgr2022 = {
    label: "Egresos - 2022",
    data: egresosGraf2, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(235, 54, 54, 0.97)',// Color de fondo
    borderColor: 'rgba(235, 54, 54, 0.97)',// Color del borde
    borderWidth: 1,// Ancho del borde
};

const grafica2 = new Chart($grafica2, {
    type: 'bar',// Tipo de gráfica
    data: {
        labels: etiquetasGraf1,
        datasets: [
            datosIng2022,
            datosEgr2022,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
        plugins: {
            title: {
                display: true,
                text: 'Comparativa Ingresos vs Egresos',
                color: "#009d63",
                font: {
                    size: 20
                }
            }
        }
    }
});

/*------------------------ Grafico 3 ---------------------------*/
// Obtener una referencia al elemento canvas del DOM
const $grafica3 = document.querySelector("#grafica3");

// Las etiquetas son las porciones de la gráfica
let etiquetasGraf3 = obtenerCategoriasIngresos(libroDiarioAnual, anioActual);

// Los datos del grafico 
let coloresGraf3 = obtenerListadoColores(etiquetasGraf3);
let ingresosGraf3 = obtenerTotalesCategIngr(libroDiarioAnual, etiquetasGraf3, anioActual);

// Podemos tener varios conjuntos de datos. Comencemos con uno
let datosIngrGraf3 = {
    data: ingresosGraf3, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    // Ahora debería haber tantos background colors como datos, es decir, para este ejemplo, 4
    backgroundColor: coloresGraf3,// Color de fondo
    borderColor: coloresGraf3,// Color del borde
    borderWidth: 1,// Ancho del borde
};

const grafica3 = new Chart($grafica3, {
    type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
    data: {
        labels: etiquetasGraf3,
        datasets: [
            datosIngrGraf3,
            // Aquí más datos...
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Tipos de Ingresos',
                color: "#009d63",
                font: {
                    size: 20
                }
            }
        }
    }
});

/*------------------------ Grafico 4 ---------------------------*/
// Obtener una referencia al elemento canvas del DOM
const $grafica4 = document.querySelector("#grafica4");

// Las etiquetas son las porciones de la gráfica
let etiquetasGraf4 = obtenerCategoriasEgresos(libroDiarioAnual, anioActual);

// Colores del grafico
let coloresGraf4 = obtenerListadoColores(etiquetasGraf4);

// Los datos del grafico 
let egresosGraf4 = obtenerTotalesCategEgr(libroDiarioAnual, etiquetasGraf4, anioActual);

// Podemos tener varios conjuntos de datos. Comencemos con uno
let datosEgrGraf4= {
    data: egresosGraf4, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    // Ahora debería haber tantos background colors como datos, es decir, para este ejemplo, 4
    backgroundColor: coloresGraf4,// Color de fondo
    borderColor: coloresGraf4,// Color del borde
    borderWidth: 1,// Ancho del borde
};

const grafica4 = new Chart($grafica4, {
    type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
    data: {
        labels: etiquetasGraf4,
        datasets: [
            datosEgrGraf4,
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Tipos de Egresos',
                color: "#009d63",
                font: {
                    size: 20,
                },
            }
        }
    }
});

//Al cliquear el botón de Cambiar Fecha en el Modal
btnChangeYear.onclick = () => {

    let anioIngresado = parseInt(selecAnio.value);
    
    //Si existe un libro diario para un año en particular
    if (existeLibroAnio(anioIngresado)){

        //Actualizar anio
        anioActual = anioIngresado;

        //Configuro la cabecera de la sección de gráficos
        cabeceraGraficas.textContent = `Gráficos - ${anioActual}`;

        //Actualizo las gráficas
        actualizarGrafica1();
        actualizarGrafica2();
        actualizarGrafica3();
        actualizarGrafica4();

    } else { //Si NO existe un libro diario para un año en particular

        alert("No existen datos para ese año.");

    }
   
}