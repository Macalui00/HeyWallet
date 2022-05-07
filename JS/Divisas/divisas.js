//Obtengo la fecha actual
const DateTime = luxon.DateTime
const date = DateTime.now();

//Obtengo los elementos del DOM que voy a utilizar
//Elemento de cabecera
let cabecera = document.getElementById("cabecera");

//EXPORT TABLES
const btnExportarDivisas = document.querySelector("#btnExportarDivisas"),
tablaDivisas = document.querySelector("#tablaDivisas");

//AL CLIQUEAR EXPORTAR TABLA DE CATEGORIAS INGRESOS
btnExportarDivisas.addEventListener("click", function() {

    let tableExport = new TableExport(tablaDivisas, {
        exportButtons: false, // No queremos botones
        filename: `Divisas - ${date.day}.${date.month}.${date.year}`, //Nombre del archivo de Excel
        sheetname: `Divisas`, //Título de la hoja
    });

    let datos = tableExport.getExportData(); //Obtengo los datos exportables
    let preferenciasDocumento = datos.tablaDivisas.xlsx;
    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);

});

//Cabecera de Página de Divisas
cabecera.textContent = `Divisas - ${date.toLocaleString(DateTime.DATE_SHORT)}`;

//dolar oficial
fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolaroficial")
.then(response => response.json())
.then(json => {

    //Creo una nueva linea en la tabla
    armarTablaDivisas(json, "itemDolarOficial", "DOLAR (USD)", "Oficial");
        
}
    
    )
    .catch(error =>
        console.warn(error)
    );

//dolar blue
fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue")
.then(response => response.json())
.then(json => {

    //Creo una nueva linea en la tabla
    armarTablaDivisas(json, "itemDolarBlue", "DOLAR (USD)", "Blue");

}
    
    )
.catch(error =>
        console.warn(error)
    );

//dolar bolsa
fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarbolsa")
    .then(response => response.json())
    .then(json => {

        //Creo una nueva linea en la tabla
        armarTablaDivisas(json, "itemDolarBolsa", "DOLAR (USD)", "Bolsa");

    }
    
    )
    .catch(error =>
        console.warn(error)
    );

//euro nacion
fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/euro/nacion")
    .then(response => response.json())
    .then(json => {

        //Creo una nueva linea en la tabla
        armarTablaDivisas(json, "itemEuroNacion", "EURO (EUR)", "Banco Nación");

    }

    )
    .catch(error =>
        console.warn(error)
    );

//euro galicia
fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/euro/galicia")
    .then(response => response.json())
    .then(json => {

        //Creo una nueva linea en la tabla
        armarTablaDivisas(json, "itemEuroGalicia", "EURO (EUR)", "Banco Galicia");
        
    }

    )
    .catch(error =>
        console.warn(error)
    );

//euro BBVA
fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/euro/bbva")
    .then(response => response.json())
    .then(json => {
                
        //Creo una nueva linea en la tabla
        armarTablaDivisas(json, "itemEuroBBVA", "EURO (EUR)", "Banco BBVA (Francés)");

    }

    )
    .catch(error =>
        console.warn(error)
    );