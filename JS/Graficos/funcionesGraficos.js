// Determinar si existe el libro diario para el año en cuestión
function existeLibroAnio(anio){
    //Por cada libro del libro diario anual
    for(const libro of libroDiarioAnual){
        
        //Si existe el libro diario para ese anio
        if (libro.anio === anio){

            //se retorna true
            return true;

        }
    }

    //No existe el libro diario para ese anio
    return false;
}
// funcion para ordenar los meses del libro diario de un año particular
function ordernarMeses(meses){
    //defino el array de meses del año y el array que retornara los meses ordenados de un año particular
    const mesesAnio = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const mesesOrdenados = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
    //por cada mes del año
    mesesAnio.forEach((mes) =>{
        
        //Si no pertenece ese mes al listado de meses
         if (meses.indexOf(mes) === -1){

             //lo borro del array meses ordenados
             mesesOrdenados.splice(mesesOrdenados.indexOf(mes),1);

         }
         
     });
 
     //retorno el listado de meses ordenados
     return mesesOrdenados;
 
 }

// Obtener el libro diario ordenado para un anio en particular
function obtenerLibroDiarioOrdenado(libroDA, anio){
    //defino el array del libro diario ordenado
    const libroDiarioOrd = [];

    //defino el array de meses del anio
    const mesesAnio = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
    //Por cada mes del año
    mesesAnio.forEach((mes) =>{
        
        //Por cada libro diario mensual
        libroDA.forEach((libroDM) =>{

            //si coincide al mes y anio en cuestión
            if (libroDM.anio === anio && libroDM.mes === mes){

                libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

                //lo agrego al listado de libros diarios ordenados
                libroDiarioOrd.push(libroDM);
            }
        });

    });

    //retorno el listado de libros diarios ordenados
    return libroDiarioOrd;
}

// Obtener los ingresos totales de un libro diario de un año particular
function obtenerIngresosTotales(libroDA, anio){
    //defino el array de montos
    const montos = [];

    //obtengo el libro diario ordenado en cuestión
    libroDA = obtenerLibroDiarioOrdenado(libroDA, anio);

    //Por cada libro diario mensual del anio en cuestión
    libroDA.forEach((libroDM) =>{
        libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

        //obtengo los ingresos
        const ingresos = (libroDM?.obtenerIngresos() || []);

        //calculo los montos y lo inserto en el listado de montos
        montos.push(calcularTotal(ingresos));
    });

    //retorno el listado de montos
    return montos;
}

// Obtener los egresos totales de un libro diario de un año particular
function obtenerEgresosTotales(libroDA, anio){
    //defino el array de montos
    const montos = [];

    //obtengo el libro diario ordenado en cuestión
    libroDA = obtenerLibroDiarioOrdenado(libroDA, anio);

    //Por cada libro diario mensual del anio en cuestión
    libroDA.forEach((libroDM) =>{
        libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);
        
        //obtengo los egresos
        const egresos = (libroDM?.obtenerEgresos() || []);
        
        //calculo los montos y lo inserto en el listado de montos
        montos.push(calcularTotal(egresos));
    });

    //retorno el listado de montos
    return montos;
}

// Obtener los meses de un libro diario de un año particular
function obtenerMeses(libroDA, anio){
    //defino el listado de meses del libro diario de un año en particular
    const meses = [];

    //por cada libro diario mensual
    libroDA.forEach((libroDM) =>{

        //si el libro diario mensual coincide en el anio solicitado
        if (libroDM.anio === anio){

            //lo agrego al listado de meses
            meses.push(libroDM.mes);
        }

    });

    //retorno el listado de meses ordenado
    return ordernarMeses(meses);
}

// obtener las categorias de ingresos para un libro diario de un año particular
function obtenerCategoriasIngresos(libroDA, anio){
    //Defino el listado de categorias
    const categorias = [];

    //por cada libro diario mensual
    libroDA.forEach((libroDM) =>{

        //si corresponde al anio en cuestión
        if (libroDM.anio === anio){

            libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

            //obtengo el listado de ingresos
            const ingresos = (libroDM?.obtenerIngresos() || []);

            //por cada ingreso
            ingresos.forEach((item) =>{

                //si la categoria no esta en el listado de categorias
                if (categorias.indexOf(item.categoria) === -1){

                    //lo agrego al listado de categorias
                    categorias.push(item.categoria);

                }

            });
           
        }
    });

    //retorno el listado de categorias
    return categorias;
}

// obtener las categorias de egresos para un libro diario de un año particular
function obtenerCategoriasEgresos(libroDA, anio){
    //Defino el listado de categorias
    const categorias = [];

    //por cada libro diario mensual
    libroDA.forEach((libroDM) =>{
        
        //si corresponde al anio en cuestión
        if (libroDM.anio === anio){

            libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

            //obtengo el listado de egresos
            const egresos = (libroDM?.obtenerEgresos() || []);

            //por cada egreso
            egresos.forEach((item) =>{

                //si la categoria no esta en el listado de categorias
                if (categorias.indexOf(item.categoria) === -1){

                    //lo agrego al listado de categorias
                    categorias.push(item.categoria);

                }

            });
           
        }
    });

    //retorno el listado de categorias
    return categorias;
}

// obtener los totales de las categorias de ingresos para un libro diario de un año particular
function obtenerTotalesCategIngr(libroDA, categorias, anio){
    //obtener totales de cada categoria
    const totalesCateg = [];
    
    //por cada categoria
    categorias.forEach((categoria)=>{
        let total = 0;

        //por cada libro diario mensual
        libroDA.forEach((libroDM) =>{

            //si corresponde al anio en cuestion
            if (libroDM.anio === anio){

                libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);
                
                //obtengo los ingresos
                const ingresos = (libroDM?.obtenerIngresos() || []);

                //calculo el total para esa categoria
                total = total + calcularTotal(ingresos.filter((item)=> item.categoria === categoria));
               
            }
            
        });

        //inserto el total final de esa categoria
        totalesCateg.push(total);

    });

    //retornar los totales de categorias
    return totalesCateg;
}

// obtener los totales de las categorias de egresos para un libro diario de un año particular
function obtenerTotalesCategEgr(libroDA, categorias, anio){
    //defino el listado de totales de categorias
    const totalesCateg = [];
       
    //por cada categoria
    categorias.forEach((categoria)=>{
        let total = 0;

        //por cada libro diario mensual
        libroDA.forEach((libroDM) =>{

            //si coincide en el anio en cuestion
            if (libroDM.anio === anio){

                libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);
                
                //obtengo los egresos
                const egresos = (libroDM?.obtenerEgresos() || []);

                //calculo el total para esa categoria
                total = total + calcularTotal(egresos.filter((item)=> item.categoria === categoria));
               
            }
            
        });
        
        //inserto el total final de esa categoria
        totalesCateg.push(total);

    });

    //retornar los totales de categorias
    return totalesCateg;
}

// obtener un listado random de colores para la gráfica
function obtenerListadoColores(categorias){

    //defino el array de colores para cada categoria y la variable color
    const coloresCateg = [];
    let color;

    //por cada categoria
    for(let i=0; i < categorias.length; i++){

        //obtengo un color random
        color = "rgba(" + getRandomNumber() + "," + getRandomNumber() + "," + getRandomNumber() + ")";
       
        //lo inserto en el listado
        coloresCateg.push(color);
    }

    //retorno los colores de las categorias
    return coloresCateg;
}

// obtener un número random de 0 a 255
function getRandomNumber(){
    return Math.floor(Math.random()*256);
}

// Función de Actualización de Gráfica 1
function actualizarGrafica1(){

    const etiquetasGraf1 = obtenerMeses(libroDiarioAnual, anioActual);
    const egresosGraf1 = obtenerEgresosTotales(libroDiarioAnual, anioActual);
    const ingresosGraf1 = obtenerIngresosTotales(libroDiarioAnual, anioActual);
    grafica1.data.datasets[0].data = ingresosGraf1;
    grafica1.data.datasets[1].data = egresosGraf1;
    grafica1.data.labels = etiquetasGraf1;
    grafica1.data.datasets[0].label = "Ingresos - " + anioActual;
    grafica1.data.datasets[1].label = "Egresos - " + anioActual;
    grafica1.update();
    
}

// Función de Actualización de Gráfica 2
function actualizarGrafica2(){

    const etiquetasGraf1 = obtenerMeses(libroDiarioAnual, anioActual);
    const ingresosGraf2 = obtenerIngresosTotales(libroDiarioAnual, anioActual);
    const egresosGraf2 = obtenerEgresosTotales(libroDiarioAnual, anioActual);
    grafica2.data.datasets[0].data = ingresosGraf2;
    grafica2.data.datasets[1].data = egresosGraf2;
    grafica2.data.labels = etiquetasGraf1;
    grafica2.data.datasets[0].label = "Ingresos - " + anioActual;
    grafica2.data.datasets[1].label = "Egresos - " + anioActual;
    grafica2.update();
    
}

// Función de Actualización de Gráfica 3
function actualizarGrafica3(){

    const etiquetasGraf3 = obtenerCategoriasIngresos(libroDiarioAnual, anioActual);
    const coloresGraf3 = obtenerListadoColores(etiquetasGraf3);
    const ingresosGraf3 = obtenerTotalesCategIngr(libroDiarioAnual, etiquetasGraf3, anioActual);
    grafica3.data.datasets[0].data = ingresosGraf3;
    grafica3.data.datasets[0].backgroundColor = coloresGraf3;
    grafica3.data.datasets[0].borderColor = coloresGraf3;
    grafica3.data.labels = etiquetasGraf3;
    grafica3.update();
    
}

// Función de Actualización de Gráfica 4
function actualizarGrafica4(){

    const etiquetasGraf4 = obtenerCategoriasEgresos(libroDiarioAnual, anioActual);
    const coloresGraf4 = obtenerListadoColores(etiquetasGraf4);
    const egresosGraf4 = obtenerTotalesCategEgr(libroDiarioAnual, etiquetasGraf4, anioActual);
    grafica4.data.datasets[0].data = egresosGraf4;
    grafica4.data.datasets[0].backgroundColor = coloresGraf4;
    grafica4.data.datasets[0].borderColor = coloresGraf4;
    grafica4.data.labels = etiquetasGraf4;
    grafica4.update();
    
}