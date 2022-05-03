# ¡HEY WALLET!

Proyecto Final del curso de JavaScript de CoderHouse.
Este proyecto consiste en un gestor de ingresos y egresos, con los cuales calcula el balance y se pueden realizar ciertos análisis de los resultados obtenidos.
Pensado para poder gestionar la salud financiera personal.

## ACERCA DEL PROYECTO

En este simulador interactivo podes modificar el mes y el año desde la tuercad del header e ir desplazandote por los libros diarios de los diferentes periodos (Mes,Año).

Luego se pueden agregar items, asi como editarlos y eliminarlos. También pueden filtrarse los resultados obtenidos así como borrar los filtros.

En la parte de los totales se veran los siguientes totales: cantidad total de items, monto total de ingresos, monto total de egresos y el balance final, el cual se pondrá en verde en caso de ser positivo y en rojo en caso de ser negativo. 

Finalmente en la tabla se muestra el detalle de los items ingresados por el usuario para el mes y año indicado en el header. Y como se mencionó, ira cambiando en base a los filtrados, cambios de periodos y/o agregados y/o eliminados de items.

Se agregó toda la logica para la visualización de gráficos de los ingresos y egresos a lo largo de un año. Se puede cambiar de año desde la tuerquita del header.

Se agregó una sección exclusiva para los ingresos y egresos donde se ve el detalle de los mismos, y un detalle de las categorias ingresadas (nombre, cantidad, monto total) todo esto se ve en función de un mes y año en particular. Se puede cambiar de mes y año desde la tuerquita del header. Además se puede filtrar por categoria si de desea para solo ver el detalle de los ingresos o egresos de una categoria en particular.

Se agregaron Exports A Excel para que se pueda exportar la información a excel y guardarla o manejarla fuera de ¡Hey Wallet!

## LIBRERIAS

Se inclueron las librerias de [Sweet Alert](https://sweetalert2.github.io/) y [Luxon](https://moment.github.io/luxon/#/).

## ACERCA DE LOS EXPORT

Para los export segui las indicaciones de [este blog](https://parzibyte.me/blog/2019/12/04/exportar-tabla-html-excel-javascript/) y la documentación correspondiente de TableExport:
- [Github](https://github.com/clarketm/TableExport/)
- [Página de TableExport](https://tableexport.travismclarke.com/)
