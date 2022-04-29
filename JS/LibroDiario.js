//Clase Libro diario - (mes, anio, items)
class LibroDiario{

    //Metodo Constructor
    constructor(mes, anio, items){
        this.mes = mes;
        this.anio = anio;
        this.items = items;
    }

    obtenerIngresos(){
        return this.items.filter((item)=> item.tipo.toUpperCase() === "INGRESO");
    }
    
    obtenerEgresos(){
        return this.items.filter((item)=> item.tipo.toUpperCase() === "EGRESO");
    }

    calcularBalance(){
        const ingresos = this.obtenerIngresos();
        const egresos = this.obtenerEgresos();

        const totalIng = calcularTotal(ingresos);
        const totalEgr = calcularTotal(egresos);
        
        this.balance = totalIng - totalEgr;
    }

    analisisBalance(analisisOK, analisisNOTOK){
        return (this.balance < 0) ? analisisNOTOK : analisisOK; 
    }

}
