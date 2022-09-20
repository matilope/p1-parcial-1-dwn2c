/**
 * Funcion eliminar
 * @param {number} index parametro importante para poder eliminar el objeto especifico dentro del array del disco
 * @returns no devuelve nada
 * 
 * Funcion eliminarDiscosCompleto elimina el array de disco almacenado en el localstorage
 * @returns no devuelve nada
 * 
 * Funcion eliminar pista
 * @param {number} indexLocal parametro del index del array de discos
 * @param {number} indexPistas parametro para poder eliminar el objeto especifico dentro del array de pistas
 * @returns no devuelve nada
 */

// Función Eliminar:
const Eliminar = (index) => {
    /* Compruebo que el indice existe, si no existe devuelta -1, por eso pregunto si es mayor y ahi saco el elemento (ese solo) de ese index. */
    /* Como no vimos splice lo saco y lo hago de otra forma */
    /*
    if (index > -1) {
        local.splice(index, 1);
    }
    */

    let discosNoEliminados = [];
    for (let i = 0; i < local.length; i++) {
        if (local[i] !== local[index]) {
            discosNoEliminados.push(local[i]);
        }
    }

    local = discosNoEliminados;

    /* Luego con ese item eliminado mando al localstorage el string con toda la data de los discos, excepto el que se pidio eliminar */
    /* Tambien compruebo, que si elimina el ultimo que elimine el localStorage completo */
    if (local.length > 0) {
        localStorage.setItem("discos", JSON.stringify(local));
    } else {
        localStorage.removeItem("discos");
    }

    /* Cargo la data actualizada */
    Mostrar();

    alertPersonalizado("Se ha eliminado el disco correctamente.");
};

// Función Eliminar Discos Completo:
const eliminarDiscosCompleto = () => {
    /* Compruebo si existe el array de discos en el localstorage */
    if (local) {
        /* Si existe, lo elimino completamente */
        localStorage.removeItem("discos");
        alertPersonalizado("Se han eliminado los discos.");
        /* Recargo la pagina */
        document.location.reload();
    }
    /* No uso else porque el boton que llama a esta funcion solo va a parecer si hay discos subidos al localstorage */
};

// Función Eliminar Pista
const eliminarPista = (indexLocal, indexPistas) => {

    /* local[indexLocal].pistas.splice(indexPistas, 1); */

    /* Como no vimos splice lo resuelvo de esta manera */
    let pistasNoEliminadas = [];
    for (let i = 0; i < local[indexLocal].pistas.length; i++) {
        if (local[indexLocal].pistas[i] !== local[indexLocal].pistas[indexPistas]) {
            pistasNoEliminadas.push(local[indexLocal].pistas[i]);
        }
    }

    local[indexLocal].pistas = pistasNoEliminadas;

    localStorage.setItem("discos", JSON.stringify(local));

    /* Cargo la data actualizada por si se vuelve a apretar el mismo disco */
    Mostrar();

    /* Elimino el div creado en el alert realizada */
    document.body.removeChild(document.querySelector(".animacion"));
    document.body.removeChild(document.querySelector(".divExtra"));

    alertPersonalizado("Se ha eliminado la pista correctamente.");

    setTimeout(() => {
        /* Para que se actualice el alert donde se ven las pistas tambien vuelvo a llamar a la funcion */
        verPistasExtras(indexLocal);
    }, 2000);


};