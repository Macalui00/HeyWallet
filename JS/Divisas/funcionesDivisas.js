//Armado de Tabla de Divisas
function armarTablaDivisas(json, id, moneda, tipo){
    //Creo una nueva linea en la tabla
    let lineaTabla = document.createElement("tr");

    //Desestructuro el item + uso de alias
    let {compra, fecha, venta} = json;
    
    //Le asigno un id para identificar al item
    lineaTabla.id = "item" + id;

    //Convierto el monto al formato deseado
    let compraConvertido = compra.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
    let ventaConvertido = venta.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    //Definimos el innerHTML del elemento con una plantilla de texto
    lineaTabla.innerHTML = `<td>${moneda}</td>
                            <td>${tipo}</td>
                            <td>${fecha}</td>
                            <td>${compraConvertido}</td>
                            <td>${ventaConvertido}</td>`;
    
    //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
    let cuerpoTabla = document.querySelector(".bodyTable");
    cuerpoTabla.appendChild(lineaTabla);
}