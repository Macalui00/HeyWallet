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

//Elementos del cambio de fecha
let btnDate = document.getElementById("btn-Date");
let btnChangeDate = document.getElementById("btn-ChangeDate");
let selecAnio = document.getElementById("selecAnio");
let selecMes = document.getElementById("selecMes");

//Utilizados en la edición y eliminación de un item
let id, tipoItem;

//Configuro la cabecera del index //Uso de optimización de asignación de variables
cabecera.textContent = `Balance - ${lD?.mes || mesActualNombre} ${lD?.anio || anioActual}`;

//Seteo la tabla y los totales para el momento de volver a acceder a la pagina web
//Cargo la tabla con los datos del libro diario
cargarTabla(lD.items);

//Calculo los totales con los datos del libro diario
calcularTotales();

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
        cabecera.textContent = "Balance - " + (lD?.mes || mesActualNombre)+ " " + (lD?.anio || anioActual);
        
        //Limpio la tabla
        limpiarTabla();

        //Cargo la tabla con los datos del libro diario
        cargarTabla(lD.items);

        //Calculo nuevamente los totales
        calcularTotales();

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

//Al cliquear en el boton "Agregar Item" del modal Agregar Item
btnAddItem.onclick = () => {

    //Valido que los datos ingresados en el formulario esten correctos
    validarFormAgrItem(id);
     
    //Verifico si el tipo de item indicado es un Ingreso 
    if (tipoIngreso.checked) {
        
        if (continuar){
            
            //Creo el item en el listado de items
            lD.items.push(new Item(lD.items[(lD?.items[(lD?.items?.length-1 || 0)]?.id+1|| 0),"INGRESO", catIngreso.value, nombre.value, parseFloat(monto.value.replaceAll(",","."))));
                        
            //Limpio los campos del modal
            limpiarFormAgrItem();

            //Agrego al item en la tabla
            agregarItemATabla();

            //calculo los totales
            calcularTotales();

            if(obtenerIDLibroDiario(mesActualNombre, anioActual) !== -1){
                //Actualizo el libro diario actual
                libroDiarioAnual[obtenerIDLibroDiario(mesActualNombre, anioActual)] = lD;

                //Actualizo el Libro Diario Anual en el Local Storage
                localStorage.setItem('libroDiarioAnual', JSON.stringify(libroDiarioAnual));
            }

            Swal.fire({
                title: '¡Agregado!',
                icon: 'success',
                confirmButtonColor: "#198754",
                text: 'El item ha sido agregado exitosamente.'
            })

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

            if(obtenerIDLibroDiario(mesActualNombre, anioActual) !== -1){
                //Actualizo el libro diario actual
                libroDiarioAnual[obtenerIDLibroDiario(mesActualNombre, anioActual)] = lD;

                //Actualizo el Libro Diario Anual en el Local Storage
                localStorage.setItem('libroDiarioAnual', JSON.stringify(libroDiarioAnual));
            }

            Swal.fire({
                title: '¡Agregado!',
                icon: 'success',
                confirmButtonColor: "#198754",
                text: 'El item ha sido agregado exitosamente.'
            })

        }
        
    }
    

}

//Al cliquear en el boton "Editar Item" del modal Editar Item
btnEditItem.onclick = () => {
       
    //Seteo el continuar para limpiar valores previos
    continuar = true;

    //Valido los valores editados por el cliente
    validarFormEditItem();

    //Si hubieron errores en la validación, no avanzo con la modificacion
    if (continuar){    
        
        Swal.fire({
            title: '¿Está seguro que desea editar el item?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: "#dc3545",
            confirmButtonColor: "#198754",
            confirmButtonText: 'Sí, seguro',
            cancelButtonText: 'No, no quiero'
        }).then((result) => {

            if (result.isConfirmed) {

                //Obtengo la linea de la tabla en cuestion
                let lineaTabla = document.getElementById("item" + id); 
                let celdas = lineaTabla.getElementsByTagName('td');
                
                //Edito los campos del item en la tabla
                celdas[1].textContent = (tipoItem === "EGRESO") ? (catEgresoEdit.value) : (catIngresoEdit.value);
                celdas[2].textContent = nombreEdit.value; 
                celdas[3].textContent = parseFloat(montoEdit.value.replaceAll(",", ".")).toLocaleString("es-CO", {style: "currency",currency: "COP"}).replace(/[$]/g,'');
                
                const item = new Item (lD.items[id-1].id, lD.items[id-1].tipo, lD.items[id-1].categoria, lD.items[id-1].nombre, lD.items[id-1].monto);
                
                //Edito los campos del item en el listado de items
                item.setCategoria((tipoItem === "EGRESO") ? (catEgresoEdit.value) : (catIngresoEdit.value));
                item.setNombre(nombreEdit.value);
                item.setMonto(parseFloat(montoEdit.value.replaceAll(",", ".")));

                lD.items[id-1] = item;
                
                //Calculo nuevamente los totales
                calcularTotales();

                if(obtenerIDLibroDiario(mesActualNombre, anioActual) !== -1){
                    //Actualizo el libro diario actual
                    libroDiarioAnual[obtenerIDLibroDiario(mesActualNombre, anioActual)] = lD;

                    //Actualizo el Libro Diario Anual en el Local Storage
                    localStorage.setItem('libroDiarioAnual', JSON.stringify(libroDiarioAnual));
                }
                    
                Swal.fire({
                    title: '¡Editado!',
                    icon: 'success',
                    confirmButtonColor: "#198754",
                    text: 'El item ha sido modificado exitosamente.'
                })
            }
        })

    }
    

}

//Al cliquear en el boton "Eliminar Item" del modal Eliminar Item
function deleteItem(){
    Swal.fire({
        title: '¿Está seguro que desea eliminar el item?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: "#dc3545",
        confirmButtonColor: "#198754",
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {
        
        if (result.isConfirmed) {
            //Selecciono la linea de la tabla del item en cuestión y la elimino
            let lineaTabla = document.getElementById("item"+id);
            
            lineaTabla.remove();

            //Elimino el item en cuestion del listado de items
            lD.items.splice(id-1,1);
            
            //Actualizar los ids
            actualizarItems();
                
            //Calculo nuevamente los totales
            calcularTotales();

            if(obtenerIDLibroDiario(mesActualNombre, anioActual) !== -1){
                //Actualizo el libro diario actual
                libroDiarioAnual[obtenerIDLibroDiario(mesActualNombre, anioActual)] = lD;

                //Actualizo el Libro Diario Anual en el Local Storage
                localStorage.setItem('libroDiarioAnual', JSON.stringify(libroDiarioAnual));
            }

            Swal.fire({
                title: '¡Eliminado!',
                icon: 'success',
                confirmButtonColor: "#198754",
                text: 'El item ha sido eliminado exitosamente.'
            })
        }
    })
    

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

        Swal.fire({
            title: '¡Error!',
            text: 'No se ingresó nombre por el cual buscar.',
            icon: 'error',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        })  


    } else{ //Caso contrario, filtro

        itemsFiltrados = lD.items.filter((item)=> item.nombre.includes(nombreABuscar.value));

    }

    //En caso de que no se hayan obtenido resultados
    if (itemsFiltrados.length === 0){

        Swal.fire({
            title: 'No hay resultados',
            text: 'No se han encontrado items con el nombre ingresado.',
            icon: 'info',
            confirmButtonColor: "#198754",
            confirmButtonText: 'OK',
        })  

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
