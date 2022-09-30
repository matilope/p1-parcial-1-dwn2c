/**
 * Funcion verDiscoCodigoUnico muestra un disco especifico, reutiliza la funcion mostrar pasandole un parametro en caso de que el index coincida y existe en el array guardado en localstorage
 * @returns no devuelve nada
 * 
 * Funcion indexCodigoUnico
 * @returns {number} index, el index que devuelve es el index del disco que tiene el codigo unico solicitado
 */

// Función Ver Codigo Unico
const verDiscoCodigoUnico = () => {

    let index = indexCodigoUnico();

    /* Me fijo que existe local y si existe lo recorro para ver si el index es correcto y coincide, si no coincide, ejecuta el if donde reseteo el main y doy el aviso */
    if (local) {
        for (let i = 0; i < local.length; i++) {
            if (!local[index]) {
                var flag = false;
            } else {
                flag = true;
                break;
            }
        }
    }

    /* Si no existe o no coincide el codigo ejecuto este codigo */
    if (!flag) {
        /* Reseteo el main */
        main.innerHTML = `<header><h1>Programación I | Parcial 1 | LÓPEZ MUÑOZ, MATÍAS GABRIEL</h1></header>
                    <button onclick="Cargar();">Cargar nuevo disco</button>
                    <button onclick="Mostrar();">Mostrar todos los discos ingresados</button>
                    <button onclick="verDiscoCodigoUnico();">Buscar disco especifico</button>`;
        let p = document.createElement("p");
        p.style = "margin:20px;"
        p.innerHTML = "Parece que el codigo ingresado no existe."
        main.appendChild(p);
    } else {
        /* Reutilizo la funcion mostrar */
        Mostrar(index);
    }

};

const indexCodigoUnico = () => {

    do {

        codigoUnico = prompt("Ingresa el codigo numérico único del disco que quieres ver (1-999)");

        if (codigoUnico == null) {
            return;
        }

        codigoUnico = parseInt(codigoUnico);

    } while (isNaN(codigoUnico));


    if (codigoUnico >= 1 && codigoUnico <= 999 && localStorage.getItem("discos")) {

        local = JSON.parse(localStorage.getItem("discos")).sort((a, b) => {
            return b.codigoUnico - a.codigoUnico;
        });

        let index = null;

        for (let i = 0; i < local.length; i++) {
            if (local[i].codigoUnico === codigoUnico) {
                index = i;
                var flag = true;
                break;
            } else {
                flag = false;
            }
        }

        if (index !== null) {
            return index;
        }

    }
};