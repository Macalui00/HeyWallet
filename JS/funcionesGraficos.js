// Determinar si existe el libro diario para el año en cuestión
function existeLibroAnio(anio){
    for(const libro of libroDiarioAnual){
        
        //Si existe el libro diario para ese anio
        if (libro.anio === anio){

            return true;

        }
    }

    //No existe el libro diario para ese anio
    return false;
}

// Obtener los ingresos totales de un libro diario de un año particular
function obtenerIngresosTotales(libroDA, anio){
    const montos = [];

    //Calculamos el total con reduce
    libroDA.forEach((libroDM) =>{
        if (libroDM.anio === anio){
            libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

            const ingresos = (libroDM?.obtenerIngresos() || []);

            montos.push(calcularTotal(obtenerMontos(ingresos)));
        }
    });

    return montos;
}

// Obtener los egresos totales de un libro diario de un año particular
function obtenerEgresosTotales(libroDA, anio){
    const montos = [];

    //Calculamos el total con reduce
    libroDA.forEach((libroDM) =>{
        if (libroDM.anio === anio){
            libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

            const egresos = (libroDM?.obtenerEgresos() || []);
            
            montos.push(calcularTotal(obtenerMontos(egresos)));
        }
    });

    return montos;
}

// Obtener los meses de un libro diario de un año particular
function obtenerMeses(libroDA, anio){
    const meses = [];

    libroDA.forEach((libroDM) =>{
        if (libroDM.anio === anio){
            meses.push(libroDM.mes);
        }
    });

    return ordernarMeses(meses);
}

// funcion para ordenar los meses del libro diario de un año particular
function ordernarMeses(meses){
   const mesesAnio = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
   const mesesOrdenados = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
   
   mesesAnio.forEach((mes) =>{
       
        if (meses.indexOf(mes) === -1){
            mesesOrdenados.splice(mesesOrdenados.indexOf(mes),1);
        }
        
    });

    return mesesOrdenados;

}

// obtener las categorias de ingresos para un libro diario de un año particular
function obtenerCategoriasIngresos(libroDA, anio){
    const categorias = [];

    libroDA.forEach((libroDM) =>{
        if (libroDM.anio === anio){
            libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

            const ingresos = (libroDM?.obtenerIngresos() || []);
            ingresos.forEach((item) =>{
                if (categorias.indexOf(item.categoria) === -1){
                    categorias.push(item.categoria);
                }
            });
           
        }
    });

    return categorias;
}

// obtener las categorias de egresos para un libro diario de un año particular
function obtenerCategoriasEgresos(libroDA, anio){
    const categorias = [];

    libroDA.forEach((libroDM) =>{
        if (libroDM.anio === anio){
            libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);

            const egresos = (libroDM?.obtenerEgresos() || []);

            egresos.forEach((item) =>{
                if (categorias.indexOf(item.categoria) === -1){
                    categorias.push(item.categoria);
                }
            });
           
        }
    });

    return categorias;
}

// obtener los totales de las categorias de ingresos para un libro diario de un año particular
function obtenerTotalesCategIngr(libroDA, categorias, anio){
    const totalesCateg = [];
    
    categorias.forEach((categoria)=>{
        let total = 0;

        libroDA.forEach((libroDM) =>{

            if (libroDM.anio === anio){

                libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);
                
                const ingresos = (libroDM?.obtenerIngresos() || []);

                total = total + calcularTotal(obtenerMontos(ingresos.filter((item)=> item.categoria === categoria)));
               
            }
            
        });

        totalesCateg.push(total);

    });

    return totalesCateg;
}

// obtener los totales de las categorias de egresos para un libro diario de un año particular
function obtenerTotalesCategEgr(libroDA, categorias, anio){
    const totalesCateg = [];
       
    categorias.forEach((categoria)=>{
        let total = 0;

        libroDA.forEach((libroDM) =>{

            if (libroDM.anio === anio){

                libroDM = new LibroDiario(libroDM.mes, libroDM.anio, libroDM.items);
                
                const egresos = (libroDM?.obtenerEgresos() || []);

                total = total + calcularTotal(obtenerMontos(egresos.filter((item)=> item.categoria === categoria)));
               
            }
            
        });

        totalesCateg.push(total);

    });

    return totalesCateg;
}

// obtener un listado random de colores para la gráfica
function obtenerListadoColores(categorias){

    const coloresCateg = [];
    let color;

    for(let i=0; i < categorias.length; i++){
        color = "rgba(" + getRandomNumber() + "," + getRandomNumber() + "," + getRandomNumber() + ")";
       
        coloresCateg.push(color);
    }

    return coloresCateg;
}

// obtener un número random de 0 a 255
function getRandomNumber(){
    return Math.floor(Math.random()*256);
}

// Función de Actualización de Gráfica 1
function actualizarGrafica1(){

    etiquetasGraf1 = obtenerMeses(libroDiarioAnual, anioActual);
    egresosGraf1 = obtenerEgresosTotales(libroDiarioAnual, anioActual);
    ingresosGraf1 = obtenerIngresosTotales(libroDiarioAnual, anioActual);
    grafica1.data.datasets[0].data = ingresosGraf1;
    grafica1.data.datasets[1].data = egresosGraf1;
    grafica1.data.labels = etiquetasGraf1;
    grafica1.data.datasets[0].label = "Ingresos - " + anioActual;
    grafica1.data.datasets[1].label = "Egresos - " + anioActual;
    grafica1.update();
    
}

// Función de Actualización de Gráfica 2
function actualizarGrafica2(){

    etiquetasGraf1 = obtenerMeses(libroDiarioAnual, anioActual);
    ingresosGraf2 = obtenerIngresosTotales(libroDiarioAnual, anioActual);
    egresosGraf2 = obtenerEgresosTotales(libroDiarioAnual, anioActual);
    grafica2.data.datasets[0].data = ingresosGraf2;
    grafica2.data.datasets[1].data = egresosGraf2;
    grafica2.data.labels = etiquetasGraf1;
    grafica2.data.datasets[0].label = "Ingresos - " + anioActual;
    grafica2.data.datasets[1].label = "Egresos - " + anioActual;
    grafica2.update();
    
}

// Función de Actualización de Gráfica 3
function actualizarGrafica3(){

    etiquetasGraf3 = obtenerCategoriasIngresos(libroDiarioAnual, anioActual);
    coloresGraf3 = obtenerListadoColores(etiquetasGraf3);
    ingresosGraf3 = obtenerTotalesCategIngr(libroDiarioAnual, etiquetasGraf3, anioActual);
    grafica3.data.datasets[0].data = ingresosGraf3;
    grafica3.data.datasets[0].backgroundColor = coloresGraf3;
    grafica3.data.datasets[0].borderColor = coloresGraf3;
    grafica3.data.labels = etiquetasGraf3;
    grafica3.update();
    
}

// Función de Actualización de Gráfica 4
function actualizarGrafica4(){

    etiquetasGraf4 = obtenerCategoriasEgresos(libroDiarioAnual, anioActual);
    coloresGraf4 = obtenerListadoColores(etiquetasGraf4);
    egresosGraf4 = obtenerTotalesCategEgr(libroDiarioAnual, etiquetasGraf4, anioActual);
    grafica4.data.datasets[0].data = egresosGraf4;
    grafica4.data.datasets[0].backgroundColor = coloresGraf4;
    grafica4.data.datasets[0].borderColor = coloresGraf4;
    grafica4.data.labels = etiquetasGraf4;
    grafica4.update();
    
}