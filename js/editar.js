/**
 * Funcion editar, edita el disco, especificamente un objeto dentro del array de discos
 * @param {number} index parametro importante para poder sacar el indice del disco que se quiere editar
 * @returns para terminar la ejecucion de la funcion se usa el return, solo en caso de si el usuario se arrepiente, el mismo puede cancelar cuando se le pregunta el nombre del disco y el autor
 */

// Función Editar:
const Editar = (index) => {
    let edicion;

    edicion = local[index];

    /* Guardo la informacion inicial del nombre y el autor */
    let nombre = local[index].nombre;
    let autor = local[index].autor;

    do {
        edicion.nombre = prompt("Ingresa el nombre del disco", nombre);

        /* Le doy un mensaje personalizado en el prompt en caso de que escriba numeros tambien hago que este mensaje NO se muestre si el usuario cancela */
        if (!isNaN(edicion.nombre) && edicion.nombre !== null) {
            edicion.nombre = prompt("Ingresa el nombre del disco, recuerda que no puede empezar con un numero", nombre);
        }

        /* Verifico si es null para permitir al usuario cancelar en caso de arrepentirse de editar esta variable */
        if (edicion.nombre === null) {
            /* Si el usuario cancela significa que quiere salir de la edicion, entonces termino la funcion y no se actualiza la misma */
            alertPersonalizado("La edicion se ha cancelado");

            /* Como ahora edicion.nombre es null, uso la variable nombre en donde tengo el valor que estaba anteriormente y se lo vuelvo a colocar a edicion.nombre */
            edicion.nombre = nombre;

            /* Finalizo la funcion */
            return;
        }
    } while (!isNaN(edicion.nombre));

    do {
        edicion.autor = prompt("Ingresa el autor del disco", autor);

        /* Le doy un mensaje personalizado en el prompt  en caso de que escriba numeros tambien hago que este mensaje NO se muestre si el usuario cancela */
        if (!isNaN(edicion.autor) && edicion.autor !== null) {
            edicion.autor = prompt("Ingresa el autor del disco, recuerda que no puede empezar con un numero", autor);
        }

        /* Verifico si es null para permitir al usuario cancelar en caso de arrepentirse de editar esta variable */
        if (edicion.autor === null) {
            /* Si el usuario cancela significa que quiere salir de la edicion, entonces termino la funcion y no se actualiza la misma */
            alertPersonalizado("La edicion se ha cancelado");

            /* Como ahora edicion.autor es null, uso la variable autor en donde tengo el valor que estaba anteriormente y se lo vuelvo a colocar a edicion.autor */
            /* Lo mismo con nombre, tengo que guardarlo nuevamente como estaba al principio asi al editar puede volver a ver el resultado que tenia inicialmente */
            edicion.nombre = nombre;
            edicion.autor = autor;

            /* Finalizo la funcion */
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

    /* con el metodo splice lo que hacia aca era pushear pero como no lo vimos use esta forma de resolverlo */
    local[index] = edicion;

    localStorage.setItem("discos", JSON.stringify(local));

    /* Cargo la data actualizada */
    Mostrar();

    alertPersonalizado("Se ha editado correctamente..");
};