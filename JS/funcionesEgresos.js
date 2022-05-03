//Calculo el total del listado items
function calcularTotal(items){
    let total = 0;

    //Calculamos el total con reduce
    items.forEach((item) =>{
        total = total + item.monto;
    });

    return total;
}

//Obtengo el libro diario del mes y anio
function obtenerLD(mes, anio){
    for(const libro of libroDiarioAnual){  

        //Si existe el libro diario para ese mes y anio
        if (libro.mes === mes && libro.anio === anio){

            return new LibroDiario(libro.mes, libro.anio, libro.items);

        }
        
    }

    //No existe el libro diario para ese mes y anio
    return {};
}

//Verifico si existe el libro diario para ese mes y anio
function existeLD(mes, anio){
    for(const libro of libroDiarioAnual){
        
        //Si existe el libro diario para ese mes y anio
        if (libro.mes === mes && libro.anio === anio){

            return true;

        }
    }

    //No existe el libro diario para ese mes y anio
    return false;
}

//Obtengo el Libro Diario Actual
function obtenerLibroDiarioAct(mes, anio){
    
    if (existeLD(mes, anio)){

        //Retorno el libro diario en cuestion
        return obtenerLD(mes, anio);

    } else {

        //Defino la variable de Libro Diario Actual por default
        const libroDiarioAct = new LibroDiario(mes, anio, []);
            
        //Agrego el Libro Diario del Mes Actual al Listado
        libroDiarioAnual.push(libroDiarioAct);

        //Actualizo el Libro Diario Anual en el Local Storage
        localStorage.setItem('libroDiarioAnual', JSON.stringify(libroDiarioAnual));

        //Retorno el libro diario en cuestion
        return libroDiarioAct;
    }
   
}

//Limpiar la tabla
function limpiarTablaEgresos(){

    let cuerpoTabla = document.querySelector(".egresos");

    while (cuerpoTabla.firstChild) {
        
        cuerpoTabla.removeChild(cuerpoTabla.firstChild);

    }
}

//Limpiar la tabla
function limpiarTablaCategEgr(){

    let cuerpoTabla = document.querySelector(".categoriasEgr");

    while (cuerpoTabla.firstChild) {
        
        cuerpoTabla.removeChild(cuerpoTabla.firstChild);

    }
    
}

//Cargar la tabla con todos los items del mes y anio actual
function cargarTablaEgresos(items){
    for (const item of items) {
        
        if (item.tipo === 'EGRESO'){
            //Creo una nueva linea en la tabla
            let lineaTabla = document.createElement("tr");

            //Desestructuro el item + uso de alias
            let {id: itemId, categoria, nombre, fecha, monto} = item;

            //Le asigno un id para identificar al item
            lineaTabla.id = "itemEgr" + itemId;
        
            //Convierto el monto al formato deseado
            let montoConvertido = monto.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

            //Definimos el innerHTML del elemento con una plantilla de texto
            lineaTabla.innerHTML = `<td>${categoria}</td>
                                    <td>${nombre}</td>
                                    <td>${fecha}</td>
                                    <td>${montoConvertido}</td>`;
            
            //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
            let cuerpoTabla = document.querySelector(".egresos");
            cuerpoTabla.appendChild(lineaTabla);
        }
        
    
    }

}

//Cargar la tabla con todos los items del mes y anio actual
function cargarTablaCategEgr(categorias, totales){
    for (let i=0; i<categorias.length; i++) {

        //Creo una nueva linea en la tabla
        let lineaTabla = document.createElement("tr");

        //Desestructuro el item + uso de alias
        let categoria = categorias[i], total = totales[i];
    
        //Convierto el monto al formato deseado
        let totalConvertido = total.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

        //Definimos el innerHTML del elemento con una plantilla de texto
        lineaTabla.innerHTML = `<td>${categoria}</td>
                                <td>${totalConvertido}</td>`;
        
        //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
        let cuerpoTabla = document.querySelector(".categoriasEgr");
        cuerpoTabla.appendChild(lineaTabla);
       
    }

}

// obtener las categorias de ingresos para un libro diario de un año particular
function obtenerCategoriasEgresos(libroDM, mes, anio){
    //Defino el listado de categorias
    const categorias = [];

    //si corresponde al anio en cuestión
    if (libroDM.mes === mes && libroDM.anio === anio){

        libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

        //obtengo el listado de ingresos
        const egresos = (libroDM?.obtenerEgresos() || []);

        //por cada ingreso
        egresos.forEach((item) =>{

            //si la categoria no esta en el listado de categorias
            if (categorias.indexOf(item.categoria) === -1){

                //lo agrego al listado de categorias
                categorias.push(item.categoria);

            }

        });
        
    }

    //retorno el listado de categorias
    return categorias;
}

// obtener los totales de las categorias de ingresos para un libro diario de un año particular
function obtenerTotalesCategEgr(libroDM, categorias, mes, anio){
    //obtener totales de cada categoria
    const totalesCateg = [];
    
    //por cada categoria
    categorias.forEach((categoria)=>{
        let total = 0;

        //si corresponde al anio en cuestion
        if (libroDM.mes === mes && libroDM.anio === anio){

            libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);
            
            //obtengo los ingresos
            const egresos = (libroDM?.obtenerEgresos() || []);

            //calculo el total para esa categoria
            total = calcularTotal(egresos.filter((item)=> item.categoria === categoria));
            
        }

        //inserto el total final de esa categoria
        totalesCateg.push(total);

    });

    //retornar los totales de categorias
    return totalesCateg;
}