/**
 * funcion alertPersonalizado, es una alerta un poco mas bonita y dinamica utilizada para dar un feedback al usuario de las acciones que toma en la pagina
 * @param {string} mensaje el mensaje que se va a mostrar en la alerta
 * @param {boolean} alerta usado como indicador, si le paso dos parametros a la funcion es porque voy a utilizar un ul y anexar el mensaje dentro de ese ul, en caso de no pasarse el segundo argumento, la funcion crea un parrafo y se anexa el mensaje en el parrafo dandole el mensaje al usuario
 * @returns no devuelve nada
 */

// Función Alert
function alertPersonalizado(mensaje, alerta) {

    /* Scroleo al top que es donde aparece la alerta */
    window.scrollTo({
        top: 0,
        left: 0,
    });

    /* Creo un alert personalizado para darle una buena interfaz a la página */
    let div = document.createElement("div");
    div.classList.add("animacion");
    let divExtra = document.createElement("div");
    divExtra.classList.add("divExtra");
    document.body.appendChild(div);
    document.body.appendChild(divExtra);
    document.body.style = "overflow-y:hidden;";

    /* Por si justo scrolleas al apretar algun boton que llama a esta funcion, lo que hago es esperar un segundo despues de llamar a la funcion y volver a scrollear al top si la condicion no se da */
    setTimeout(() => {
        if (divExtra.getBoundingClientRect().top < -20) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    }, 1000);

    if (alerta) {
        let ul = document.createElement("ul");
        ul.style.color = "white";
        ul.innerHTML = mensaje;
        div.appendChild(ul);
        let botonCerrar = document.createElement("button");
        botonCerrar.innerHTML = "X";
        botonCerrar.classList.add("botonCerrar");
        div.appendChild(botonCerrar);
        /* Le agrego "dinamicamente" la altura y el ancho que tiene el ul segun su contenido y le sumo 40px para que tenga mas espacio el contenedor del alerta */
        div.style.width = ul.clientWidth + 80 + "px";
        div.style.height = ul.clientHeight + 40 + "px";
        /* Si se clickea el boton de cerrar desaparece, lo elimino, podria darle display none pero si el usuario hace uso de esta funcion muchas veces, se va a llenar de divs y no tiene sentido que sigan estando porque no se reutilizan */
        botonCerrar.addEventListener("click", () => {
            document.body.style = "overflow-y:scroll;";
            document.body.removeChild(div);
            document.body.removeChild(divExtra);
        });
    } else {
        let p = document.createElement("p");
        div.appendChild(p);
        p.style = "color:white;";
        p.innerHTML = mensaje;
        setTimeout(() => {
            document.body.style = "overflow-y:scroll;";
            document.body.removeChild(div);
            document.body.removeChild(divExtra);
        }, 2000);
    }

}