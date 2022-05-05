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

cabecera.textContent = `Divisas - ${date.day}/${date.month}/${date.year}`;

fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolaroficial",)
  .then(response => response.json())
  .then(json => {
      
        //Creo una nueva linea en la tabla
        let lineaTabla = document.createElement("tr");

        //Desestructuro el item + uso de alias
        let {compra, fecha, venta} = json;
        
        //Le asigno un id para identificar al item
        lineaTabla.id = "itemDolarOficial";
    
        //Convierto el monto al formato deseado
        let compraConvertido = compra.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
        let ventaConvertido = venta.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

        //Definimos el innerHTML del elemento con una plantilla de texto
        lineaTabla.innerHTML = `<td>DOLAR (USD)</td>
                                <td>Oficial</td>
                                <td>${fecha}</td>
                                <td>${compraConvertido}</td>
                                <td>${ventaConvertido}</td>`;
        
        //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
        let cuerpoTabla = document.querySelector(".bodyTable");
        cuerpoTabla.appendChild(lineaTabla);
  }
    
    )
  .catch(error =>
    Swal.fire({
        title: '¡Error!',
        text: 'UPS! Ha habido un error con DOLAR OFICIAL: ' + error,
        icon: 'error',
        confirmButtonColor: "#198754",
        confirmButtonText: 'OK',
    })  
     );

fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue",)
  .then(response => response.json())
  .then(json => {
      
        //Creo una nueva linea en la tabla
        let lineaTabla = document.createElement("tr");

        //Desestructuro el item + uso de alias
        let {compra, fecha, venta} = json;
        
        //Le asigno un id para identificar al item
        lineaTabla.id = "itemDolarBlue";
    
        //Convierto el monto al formato deseado
        let compraConvertido = compra.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
        let ventaConvertido = venta.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

        //Definimos el innerHTML del elemento con una plantilla de texto
        lineaTabla.innerHTML = `<td>DOLAR (USD)</td>
                                <td>Blue</td>
                                <td>${fecha}</td>
                                <td>${compraConvertido}</td>
                                <td>${ventaConvertido}</td>`;
        
        //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
        let cuerpoTabla = document.querySelector(".bodyTable");
        cuerpoTabla.appendChild(lineaTabla);
  }
    
    )
  .catch(error =>
    Swal.fire({
        title: '¡Error!',
        text: 'UPS! Ha habido un error con DOLAR BLUE: ' + error,
        icon: 'error',
        confirmButtonColor: "#198754",
        confirmButtonText: 'OK',
    })  
     );

fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarbolsa")
    .then(response => response.json())
    .then(json => {
        
        //Creo una nueva linea en la tabla
        let lineaTabla = document.createElement("tr");

        //Desestructuro el item + uso de alias
        let {compra, fecha, venta} = json;
        
        //Le asigno un id para identificar al item
        lineaTabla.id = "itemDolarBolsa";
    
        //Convierto el monto al formato deseado
        let compraConvertido = compra.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
        let ventaConvertido = venta.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

        //Definimos el innerHTML del elemento con una plantilla de texto
        lineaTabla.innerHTML = `<td>DOLAR (USD)</td>
                                <td>Bolsa</td>
                                <td>${fecha}</td>
                                <td>${compraConvertido}</td>
                                <td>${ventaConvertido}</td>`;
        
        //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
        let cuerpoTabla = document.querySelector(".bodyTable");
        cuerpoTabla.appendChild(lineaTabla);
    }
    
    )
    .catch(error =>
    Swal.fire({
        title: '¡Error!',
        text: 'UPS! Ha habido un error con DOLAR BOLSA: ' + error,
        icon: 'error',
        confirmButtonColor: "#198754",
        confirmButtonText: 'OK',
    })  
    );


fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/euro/nacion")
.then(response => response.json())
.then(json => {
    
    //Creo una nueva linea en la tabla
    let lineaTabla = document.createElement("tr");

    //Desestructuro el item + uso de alias
    let {compra, fecha, venta} = json;
    
    //Le asigno un id para identificar al item
    lineaTabla.id = "itemEuroNacion";

    //Convierto el monto al formato deseado
    let compraConvertido = compra.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
    let ventaConvertido = venta.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    //Definimos el innerHTML del elemento con una plantilla de texto
    lineaTabla.innerHTML = `<td>EURO (EUR)</td>
                            <td>Banco Nación</td>
                            <td>${fecha}</td>
                            <td>${compraConvertido}</td>
                            <td>${ventaConvertido}</td>`;
    
    //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
    let cuerpoTabla = document.querySelector(".bodyTable");
    cuerpoTabla.appendChild(lineaTabla);
}

)
.catch(error =>
Swal.fire({
    title: '¡Error!',
    text: 'UPS! Ha habido un error con EURO NACIÓN: ' + error,
    icon: 'error',
    confirmButtonColor: "#198754",
    confirmButtonText: 'OK',
})  
);


fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/euro/galicia")
.then(response => response.json())
.then(json => {
    
    //Creo una nueva linea en la tabla
    let lineaTabla = document.createElement("tr");

    //Desestructuro el item + uso de alias
    let {compra, fecha, venta} = json;
    
    //Le asigno un id para identificar al item
    lineaTabla.id = "itemEurogalicia";

    //Convierto el monto al formato deseado
    let compraConvertido = compra.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
    let ventaConvertido = venta.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    //Definimos el innerHTML del elemento con una plantilla de texto
    lineaTabla.innerHTML = `<td>EURO (EUR)</td>
                            <td>Banco Galicia</td>
                            <td>${fecha}</td>
                            <td>${compraConvertido}</td>
                            <td>${ventaConvertido}</td>`;
    
    //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
    let cuerpoTabla = document.querySelector(".bodyTable");
    cuerpoTabla.appendChild(lineaTabla);
}

)
.catch(error =>
Swal.fire({
    title: '¡Error!',
    text: 'UPS! Ha habido un error con EURO GALICIA: ' + error,
    icon: 'error',
    confirmButtonColor: "#198754",
    confirmButtonText: 'OK',
})  
);


fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/euro/bbva")
.then(response => response.json())
.then(json => {
    
    //Creo una nueva linea en la tabla
    let lineaTabla = document.createElement("tr");

    //Desestructuro el item + uso de alias
    let {compra, fecha, venta} = json;
    
    //Le asigno un id para identificar al item
    lineaTabla.id = "itemEuroBBVA";

    //Convierto el monto al formato deseado
    let compraConvertido = compra.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
    let ventaConvertido = venta.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    //Definimos el innerHTML del elemento con una plantilla de texto
    lineaTabla.innerHTML = `<td>EURO (EUR)</td>
                            <td>Banco BBVA (Francés)</td>
                            <td>${fecha}</td>
                            <td>${compraConvertido}</td>
                            <td>${ventaConvertido}</td>`;
    
    //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
    let cuerpoTabla = document.querySelector(".bodyTable");
    cuerpoTabla.appendChild(lineaTabla);
}

)
.catch(error =>
Swal.fire({
    title: '¡Error!',
    text: 'UPS! Ha habido un error con EURO BBVA: ' + error,
    icon: 'error',
    confirmButtonColor: "#198754",
    confirmButtonText: 'OK',
})  
);
