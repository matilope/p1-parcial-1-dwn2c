/**
 * Funcion verMasInformacion utilizada para mostrar determinada informacion del disco como la cantidad de pistas, duracion total de las pistas, el promedio de las pistas y la pista con mayor duracion dentro del disco.
 * @param {number} index parametro utilizado para poder acceder al objeto especifico dentro del array de discos
 * @returns no devuelve nada
 * 
 * Funcion duracionTotal recorre el array de objetos del localstorage y mete en un array un objeto con la duracion total y el codigo unico de cada disco
 * @returns {array} el array en orden (en base al codigoUnico)
 * 
 * Funcion duracionMayor guarda en una variable el resultado de la funcion duracionTotal y la ordenada en base a la duracion, colocando en el primero lugar del array el objeto que tiene el valor de duracion mayor, siendo la posicion 0 el disco con mayor duracion de todos
 * @returns {object} un objeto que tiene como key y valor el codigo unico y la mayor duracion de entre todos los discos
 * 
 * Funcion verPistasExtras utilizada para mostrar las pistas de cada disco o del disco que se quiera ver dentro de la pagina, se recorre el array de pistas para poder ir mostrandolas en un alerta personalizada
 * @param {number} index parametro utilizado para identificar el objeto dentro del array de discos
 * @returns no devuelve nada
 */

// Función Ver Mas Informacion
function verMasInformacion(index) {
    let dataExtra;
    let duracionTotal;
    let cantidadPistas;
    let mayorDuracion;
    let pistaMayorDuracion;

    if (local[index].pistas && local[index].pistas.length > 0) {
        dataExtra = local[index].pistas;
        duracionTotal = null;
        cantidadPistas = dataExtra.length;
        mayorDuracion = Number.NEGATIVE_INFINITY;

        for (let i = 0; i < dataExtra.length; i++) {
            duracionTotal += dataExtra[i].duracion;
            if (dataExtra[i].duracion > mayorDuracion) {
                mayorDuracion = dataExtra[i].duracion;
                if (dataExtra[i].duracion === mayorDuracion) {
                    pistaMayorDuracion = dataExtra[i].pista;
                }
            }
        }

    } else {
        duracionTotal = 0;
        cantidadPistas = 0;
        mayorDuracion = null;
        pistaMayorDuracion = null;
    }

    alertPersonalizado(
        `<li>Cantidad de pistas: <span style="color:#ffeb00;">${cantidadPistas}</span></li>
      <li>Duración total de las pistas: <span style="color:#ffeb00;">${duracionTotal} segundos</span></li>
      <li>Promedio de las pistas: <span style="color:#ffeb00;">${duracionTotal == 0 ? '0' : parseFloat((duracionTotal / cantidadPistas).toFixed(1))} segundos</span></li>
      <li>Pista con mayor duración: <span style="color:#ffeb00;">${pistaMayorDuracion !==null ? pistaMayorDuracion : 'No hay pistas cargadas'} ${mayorDuracion !==null ? `, ${mayorDuracion} segundos` : ''}</span></li>`, true
    );
};

// Funcion duración total de cada disco
function duracionTotal() {

    let arrayDuracion = [];

    for (let i = 0; i < local.length; i++) {
        let index = 0;
        if (local[i].pistas.length !== 0) {
            arrayDuracion[i] = {
                codigoUnico: local[i].codigoUnico,
                duracion: local[i].pistas[index].duracion
            };
        } else {
            arrayDuracion[i] = {
                codigoUnico: local[i].codigoUnico,
                duracion: 0
            };
        }
        while (local[i].pistas.length > index + 1) {
            index++;
            arrayDuracion[i].duracion += local[i].pistas[index].duracion;
        }
    }

    return arrayDuracion;

}

// Funcion disco con mayor duracion
function duracionMayor() {
    let arrayDuracion = duracionTotal();

    // Le saque el sort a esta funcion
    let duracionMaxima = Number.NEGATIVE_INFINITY;
    let codigoUnico = null;
    for (let i = 0; i < arrayDuracion.length; i++) {
        /* Cuando se la condicion de abajo se actualiza el codigo unico */
        if (arrayDuracion[i].duracion > duracionMaxima) {
            duracionMaxima = arrayDuracion[i].duracion;
            codigoUnico = arrayDuracion[i].codigoUnico;
        }
    }

    return codigoUnico;
}

// Funcion en donde creo varios li dependiendo de la cantidad de pistas que tengo en dicho disco
function verPistasExtras(index) {
    let ulPistas = '';
    for (let j = 0; j < local[index].pistas.length; j++) {
        ulPistas += `<li>Nombre de pista: ${local[index].pistas[j].pista}</li><li>Duración de la pista: 
      <span class="${local[index].pistas[j].duracion > 180 ? "duracionMayor" : "duracionMenor"}">${local[index].pistas[j].duracion}</span>
      <button class="eliminarPista" onclick="eliminarPista(${index}, ${j});">X</button></li>`;
        /* Le agrego un separador para que el usuario pueda distinguir las distintas pistas */
        if (local[index].pistas.length > 1 && local[index].pistas.length - 1 !== j) {
            ulPistas += `<hr style="width:80%; margin:6px 0 6px 0; border-color:yellow;" />`;
        }
    }

    /* Si el length es 0 es porque no hay pistas y doy una alert para avisar que no hay pistas en el disco */
    if (local[index].pistas.length == 0) {
        alertPersonalizado("No se han encontrado pistas..");
    } else {
        /* Hay pistas asi que creo el ul y lo muestro en el alert */
        alertPersonalizado(ulPistas, true);
    }
}