//Calculo el total del listado items
function obtenerMontos(items){
    const montos = [];

    //Calculamos el total con reduce
    items.forEach((item) =>{
        montos.push(item.monto);
    });

    return montos;
}

//Calculo el total del listado items
function calcularTotal(items){
    let total = 0;
    // let total = montos.reduce((acc, monto) => acc + parseInt(monto), 0);
    // return isNaN(total) ? 0 : total;
    //Calculamos el total con reduce
    items.forEach((item) =>{
        total = total + item.monto;
    });
    return total;
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

//Obtengo el libro diario del mes y anio
function obtenerIDLibroDiario(mes, anio){
    
    for(let i = 0; i < libroDiarioAnual.length; i++){  
        
        //Si existe el libro diario para ese mes y anio
        if (libroDiarioAnual[i].mes === mes && libroDiarioAnual[i].anio === anio){

            return i;

        }
    }

    //No existe el libro diario para ese mes y anio
    return -1;
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


//Verifico si existe el item con determinado nombre y categoria retorno true
function existeItem(idItem, catItem, nombreItem){
    for(const item of lD.items){

        //Si existe el item con tal nombre y categoria retorno true
        if (item.nombre === nombreItem && item.categoria === catItem && idItem !== item.id){

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

            Swal.fire({
                title: '¡Error!',
                text: '¡Falta ingresar nombre!',
                icon: 'error',
                confirmButtonColor: "#198754",
                confirmButtonText: 'OK',
            });

            continuar = false;

        //Valido que no haya un item con (categoria, nombre) iguales
        } else if(existeItem(id,((tipoIngreso.checked) ? (catIngreso.value) : (catEgreso.value)), nombre.value)) {

            Swal.fire({
                title: '¡Error!',
                text: '¡No se puede ingresar más de un item con la misma categoria y nombre!',
                icon: 'error',
                confirmButtonColor: "#198754",
                confirmButtonText: 'OK',
            });

            continuar = false;

        } else {

            //Valido que el monto no haya quedado vacío
            if (isNaN(parseFloat(monto.value))){

                Swal.fire({
                    title: '¡Error!',
                    text: 'Ha ingresado monto erroneo.',
                    icon: 'error',
                    confirmButtonColor: "#198754",
                    confirmButtonText: 'OK',
                });

                continuar = false;
               
            //Valido que el monto no sea negativo
            } else if (parseFloat(monto.value) < 0) {

                Swal.fire({
                    title: '¡Error!',
                    text: '¡El monto debe ser mayor a cero!',
                    icon: 'error',
                    confirmButtonColor: "#198754",
                    confirmButtonText: 'OK',
                });
                
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

    //Desestructuro el item + uso de alias
    let {id: itemId, tipo, categoria, nombre, monto} = item;

    //Le asigno un id para identificar al item
    lineaTabla.id = "item" + itemId;

    let montoConvertido = monto.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
    //Definimos el innerHTML del elemento con una plantilla de texto
    lineaTabla.innerHTML = `<td>${(tipo.toUpperCase() === "EGRESO") ? ("<i class='material-icons text-danger' style=''>south_west</i>") : 
                            ("<i class='material-icons text-success' style=''>north_east</i>")}</td>
                            <td>${categoria}</td>
                            <td>${nombre}</td>
                            <td>${montoConvertido}</td>
                            <td><i class="material-icons icono iconEdit text-success" style="" data-bs-toggle="modal" onclick="cargarItemEdit(this)" data-bs-target="#editarItem">edit</i>
                            <i class="material-icons icono text-danger" id="btn-DeleteItem" style="" onclick="cargarItemElim(this);deleteItem();">delete</i></td>`;

    //Obtengo el cuerpo de la tabla
    let cuerpoTabla = document.querySelector(".bodyTable");

    //Le agrego al cuerpo de la tabla la nueva linea de tabla creada
    cuerpoTabla.appendChild(lineaTabla);
    
}

//Calculo los totales de cantidad de items, total ingresos, total egresos, total balance
function calcularTotales(){

    //Calculo y muestro la cantidad de items
    cantItems.innerText = lD?.items?.length || 0;

    const ingresos = (lD?.obtenerIngresos() || []);
    const egresos = (lD?.obtenerEgresos() || []);
    
    //Calculo y muestro el total de ingresos
    totalIng.innerText = calcularTotal(ingresos).toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    //Calculo y muestro el total de egresos
    totalEgr.innerText = calcularTotal(egresos).toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    lD.calcularBalance();

    //Calculo y muestro el total de balance
    totalBal.innerText = lD.balance.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

    //Si el balance es positivo lo muestro en verde, si es negativo lo muestro en rojo
    totalBal.className = (lD.balance < 0) ? ("fs-5 text-danger") : ("fs-5 text-success");

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
    if (tipoItem.toUpperCase() === "INGRESO" && catIngresoEdit.value.length === 0) {

        Swal.fire({
            title: '¡Error!',
            text: '¡Falta ingresar categoria ingreso!',
            icon: 'error',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        });  

        continuar = false;

    //Valido si el item es de tipo egreso, la categoria no haya quedado vacía
    } else if (tipoItem.toUpperCase() === "EGRESO" && catEgresoEdit.value.length === 0) {
        
        Swal.fire({
            title: '¡Error!',
            text: '¡Falta ingresar categoria egreso!',
            icon: 'error',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        }); 

        continuar = false;

    } else {

        //Valido que el nombre no haya quedado vacío
        if (nombreEdit.value.length === 0){

            Swal.fire({
                title: '¡Error!',
                text: '¡Falta ingresar nombre!',
                icon: 'error',
                confirmButtonColor: "#198754",
                confirmButtonText: 'OK',
            });

            continuar = false;

        //Valido que no haya un item con (categoria, nombre) iguales
        } else if(existeItem(id,((tipoItem.toUpperCase() === "INGRESO") ? (catIngresoEdit.value) : (catEgresoEdit.value)), nombreEdit.value)) {

            Swal.fire({
                title: '¡Error!',
                text: '¡No se puede ingresar más de un item con la misma categoria y nombre!',
                icon: 'error',
                confirmButtonColor: "#198754",
                confirmButtonText: 'OK',
            });  

            continuar = false;

        } else {

            //Valido que el monto no haya quedado vacío
            if (isNaN(parseFloat(montoEdit.value))){

                alert("¡UPS! Monto Erroneo.");

                Swal.fire({
                    title: '¡Error!',
                    text: 'Ha ingresado monto erroneo.',
                    icon: 'error',
                    confirmButtonColor: "#198754",
                    confirmButtonText: 'OK',
                });  
    
                continuar = false;
                
            //Valido que el monto no sea negativo
            } else if (parseFloat(montoEdit.value) < 0) {

                Swal.fire({
                    title: '¡Error!',
                    text: '¡El monto debe ser mayor a cero!',
                    icon: 'error',
                    confirmButtonColor: "#198754",
                    confirmButtonText: 'OK',
                });  

                continuar = false;

            //Pasó las validaciones
            } else {

                continuar = true;

            }
        }    
    }
    
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

//Limpiar la tabla
function limpiarTabla(){

    let cuerpoTabla = document.querySelector(".bodyTable");

    while (cuerpoTabla.firstChild) {
        
        cuerpoTabla.removeChild(cuerpoTabla.firstChild);

    }
}

//Actualizar los id de los items, una vez eliminado un item.
function actualizarItems(){

    for(let i=0; i < lD.items.length; i++){
        if (lD.items[i].id !== (i+1)){
            lD.items[i].id = i+1;
        }
    }

}

//Cargar la tabla con todos los items del mes y anio actual
function cargarTabla(items){
    for (const item of items) {
        
        //Creo una nueva linea en la tabla
        let lineaTabla = document.createElement("tr");

        //Desestructuro el item + uso de alias
        let {id: itemId, tipo, categoria, nombre, monto} = item;
        //Le asigno un id para identificar al item
        lineaTabla.id = "item" + itemId;
    
        //Convierto el monto al formato deseado
        let montoConvertido = monto.toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');

        //Definimos el innerHTML del elemento con una plantilla de texto
        lineaTabla.innerHTML = `<td>${(tipo.toUpperCase() === "EGRESO") ? ("<i class='material-icons text-danger' style=''>south_west</i>") : 
                                ("<i class='material-icons text-success' style=''>north_east</i>")}</td>
                                <td>${categoria}</td>
                                <td>${nombre}</td>
                                <td>${montoConvertido}</td>
                                <td><i class="material-icons icono iconEdit text-success" style="" data-bs-toggle="modal" onclick="cargarItemEdit(this)" data-bs-target="#editarItem">edit</i>
                                <i class="material-icons icono text-danger" id="btn-DeleteItem" style="" onclick="cargarItemElim(this);deleteItem();">delete</i></td>`;
        
        //Obtengo el cuerpo de la tabla y agrego la nueva linea a la misma       
        let cuerpoTabla = document.querySelector(".bodyTable");
        cuerpoTabla.appendChild(lineaTabla);
    
    }

}
