/**
 * Funcion editar, edita el disco, especificamente un objeto dentro del array de discos
 * @param {number} index parametro importante para poder sacar el indice del disco que se quiere editar
 * @returns para terminar la ejecucion de la funcion se usa el return, solo en caso de si el usuario se arrepiente, el mismo puede cancelar cuando se le pregunta el nombre del disco y el autor
 */

// Función Editar:
const Editar = (index) => {
    let edicion;

    /* Compruebo que el indice existe, si no existe devuelta -1, por eso pregunto si es mayor y ahi saco el elemento (ese solo) de ese index y lo guardo en una variable para poder editarlo */
    if (index > -1) {
        edicion = local.splice(index, 1)[0];
    }

    /* Variables de resguardo en caso de que el usuario no quiera editar el nombre o el autor del disco */
    /* Ver error */
    let nombreReservado = edicion.nombre;
    let autorReservado = edicion.autor;

    /* Edito en caso de querer, los nuevos datos, aparte el prompt lo relleno con los datos anteriores para una mejor guia al usuario */
    do {
        edicion.nombre = prompt("Ingresa el nombre del disco", edicion.nombre);
        /* Verifico si es null para permitir al usuario cancelar en caso de arrepentirse de editar esta variable */
        if (edicion.nombre === null) {
            edicion.nombre = nombreReservado;
            /* Si el usuario cancela significa que quiere salir de la edicion, entonces termino la funcion y no se actualiza la misma */
            alertPersonalizado("La edicion se ha cancelado");
            return;
        }
    } while (!isNaN(edicion.nombre));

    do {
        edicion.autor = prompt("Ingresa el autor del disco", edicion.autor);
        /* Verifico si es null para permitir al usuario cancelar en caso de arrepentirse de editar esta variable */
        if (edicion.autor === null) {
            edicion.autor = autorReservado;
            /* Si el usuario cancela significa que quiere salir de la edicion, entonces termino la funcion y no se actualiza la misma */
            alertPersonalizado("La edicion se ha cancelado");
            return;
        }
    } while (!isNaN(edicion.autor));

    /* Si confirma, puede volver a ingresar mas pistas, si cancela quedan las pistas que ya tenia agregada unicamente */

    if (confirm("¿Quieres agregar mas pistas?")) {
        /* En este caso si el usuario pone para subir una pista tiene que terminar la accion de poner correctamente el nombre de la pista y la duracion porque aparte en otra funcion le doy la opcion de poder eliminar en caso de arrepentirse */
        do {
            do {
                pista = prompt("Ingresa el nombre de la pista");
            } while (!isNaN(pista));

            do {
                duracion = parseInt(prompt("Ingrese la duracion de la pista"));
                while (!(duracion >= 0 && duracion <= 7200)) {
                    duracion = parseInt(prompt("Ingrese la duracion de la pista, recuerde que la duracion de la pista no puede ser menor a 0 ni mayor a 7200 segundos."));
                }
            } while (isNaN(duracion));

            /* Guardo las pistas y las mando al array pistas */
            edicion.pistas.push({
                pista: pista,
                duracion: duracion,
            });
        } while (confirm("¿Quieres ingresar otra pista?"));
    }

    local.push(edicion);

    localStorage.setItem("discos", JSON.stringify(local));

    /* Cargo la data actualizada */
    Mostrar();

    alertPersonalizado("Se ha editado correctamente..");
};