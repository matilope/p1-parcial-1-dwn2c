/**
 * Funcion mostrar crea elementos html con la informacion que hay dentro del localStorage con la clave discos
 * @param {number} index parametro opcional para reutilizar el codigo de mostrar en la funcion verDiscoCodigoUnico
 * @returns no devuelve nada
 * 
 * Funcion cargar pregunta al usuario y crea un objeto con la informacion que el usuario le otorgo, no recibe ningun parametro
 * @returns hace tres returns vacio en caso de cancelar al pedirle el nombre, autor o codigo unico para cancelar la funcion y no dejar al usuario en una especie de loop infinito
 * 
 * Clase Disco crea un objeto disco y recibe 4 parametros en el constructor especificados aqui abajo, ese objeto creado se termina guardando en el localstorage
 * @param {string} nombre
 * @param {string} autor
 * @param {number} codigoUnico
 * @param {array} pistas
 */

// Discos:
let disco,
  nombre,
  autor,
  codigoUnico,
  pistas = [],
  pista,
  duracion,
  local,
  main = document.querySelector("main"),
  ulPistas = null;

// Clase disco:
class Disco {
  constructor(nombre, autor, codigoUnico, pistas) {
    this.nombre = nombre;
    this.autor = autor;
    this.codigoUnico = codigoUnico;
    this.pistas = pistas;
  }
}

// Función Mostrar:
const Mostrar = (index) => {
  /* Reseteo el main para cuando llamo a la funcion Mostrar se me muestre la data actualizada, entonces borro la data y luego se pone la data actualizada del local cada vez que se ejecuta la funcion */
  main.innerHTML = `<header><h1>Programación I | Parcial 1 | LÓPEZ MUÑOZ, MATÍAS GABRIEL</h1></header>
                    <button onclick="Cargar();">Cargar nuevo disco</button>
                    <button onclick="Mostrar();">Mostrar discos ingresados</button>`;

  /* Para que cada vez que se ejecute esta funcion Mostrar se vuelva a ordenar, por ejemplo cuando edito, de esta forma se vuelve a ordernar el array en el html */
  if (localStorage.getItem("discos")) {
    local = JSON.parse(localStorage.getItem("discos")).sort((a, b) => {
      return b.codigoUnico - a.codigoUnico;
    });
  }

  /* Variables que uso para el evento de ocultar */
  let section;
  let eliminarTotal;

  /* El boton ocultar no debe aparecer cuando se busca un disco especifico */
  if (!index) {
    /* Para que al presionarse no vuelvan a hacer el pedido de mostrar de nuevo los discos */
    let buttonMostrar = document.querySelector("button[onclick='Mostrar();']");
    buttonMostrar.style.display = "none";
    let buttonOcultar = document.createElement("button");
    buttonOcultar.textContent = "Ocultar discos";
    main.appendChild(buttonOcultar);
    buttonOcultar.addEventListener("click", () => {
      buttonOcultar.style.display = "none";
      buttonMostrar.style.display = "inline-block";
      if (section && eliminarTotal) {
        section.style.display = "none";
        eliminarTotal.style.display = "none";
      } else {
        buttonMostrar.style.display = "none";
      }
    });
  }

  /* Creo un button para poder buscar un disco especifico */
  let buttonDiscoEspecifico = document.createElement("button");
  buttonDiscoEspecifico.setAttribute("onclick", `verDiscoCodigoUnico();`);
  buttonDiscoEspecifico.innerHTML = "Buscar disco especifico";
  main.appendChild(buttonDiscoEspecifico);


  /* Compruebo si local existe y si no es un array vacio porque si borro todos los objetos dentro del array uno por uno, queda el array vacio y necesito validar eso para mostrar el mensaje que se muestra en el else */
  if (local && local.length > 0) {
    section = document.createElement("section");
    main.appendChild(section);
    section.classList.add("discosingresados");
    let h2 = document.createElement("h2");
    section.appendChild(h2);
    h2.textContent = "Discos ingresados";

    /* informar cantidad de discos ingresados */
    if (!index) {
      /* Si no esta el index no hace falta que me diga la cantidad de discos */
      alertPersonalizado("Discos ingresados: " + local.length);

      /* Creo un solo elemento para permitir eliminar todos los discos subidos y lo anexo al main en caso tambien de no existir el indice, cuando quiero buscar un solo disco, no hace falta que esta opcion aparezca */
      eliminarTotal = document.createElement("button");
      eliminarTotal.setAttribute("onclick", `eliminarDiscosCompleto();`);
      eliminarTotal.style = "margin-top:40px; background-color: #2a4a8f; border-radius:10px;";
      eliminarTotal.innerHTML = "Eliminar discografia completa";
      main.appendChild(eliminarTotal);
    } else {
      /* Si esta el index, aprovecho el else para ordenar distinto el local y me deje acceder al codigo unico que quiero realmente y no que me los agarre al reves, ya que tengo invertida la posicion de los objetos dentro del array */
      local = JSON.parse(localStorage.getItem("discos")).sort((a, b) => {
        return a.codigoUnico - b.codigoUnico;
      });
    }


    /* Recorriendo el array de objetos de localstorage */
    for (let i = 0; i < local.length; i++) {

      /* Si esta el index al i lo igual al index - 1 (ya que el codigo unico arranca de 1 a 999) pero el indice del primer objeto dentro del array es 0 entonces, si quiero ver el primer disco, veo el del indice 0 de esta forma */
      if (index) {
        i = index - 1;
      }

      /* Si existe el index y ese index no existe en local le digo reseteo el main y creo un parrafo para informarle al usuario */
      if (index && !local[index - 1]) {
        main.innerHTML = `<header><h1>Programación I | Parcial 1 | LÓPEZ MUÑOZ, MATÍAS GABRIEL</h1></header>
                <button onclick="Cargar();">Cargar nuevo disco</button>
                <button onclick="Mostrar();">Mostrar discos ingresados</button>
                <button onclick="verDiscoCodigoUnico();">Buscar disco especifico</button>`;
        let p = document.createElement("p");
        main.appendChild(p);
        p.style = "margin: 20px;";
        p.innerHTML = "No se ha encontrado ningun disco";
      } else {

        /* Creando elementos */
        let article = document.createElement("article");
        let h3 = document.createElement("h3");
        let ul = document.createElement("ul");
        let editar = document.createElement("button");
        let eliminar = document.createElement("button");
        let verInformacion = document.createElement("button");
        let img = document.createElement("img");

        /* Seteando la informacion en los atributos y nombre de los botones */
        img.src = "img/discos.webp";
        img.alt = "Imagen representativa de Discos";
        editar.setAttribute("onclick", `Editar(${i});`);
        eliminar.setAttribute("onclick", `Eliminar(${i});`);
        verInformacion.setAttribute("onclick", `verMasInformacion(${i});`);
        editar.innerHTML = "Editar";
        eliminar.innerHTML = "Eliminar";
        verInformacion.innerHTML = "Ver mas información";

        /* Anexo elementos creados */
        section.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(ul);
        article.appendChild(editar);
        article.appendChild(eliminar);
        article.appendChild(verInformacion);

        /* Nombre del disco */
        h3.textContent = local[i].nombre;

        /* La funcion muestra la duración total de cada disco */
        let duraciones = duracionTotal();

        // La funcion duracionMayor solo me devuelve el codigoUnico del disco para poder compararlo y avisar que es el disco que mas duracion tiene, guardarlo en una variable es mas entendible pero preferi cambiarlo y optimizar un poco el codigo

        /* li's con el resto de los datos */
        let ulData = `<li>Autor: ${local[i].autor}</li>
                      <li>Codigo unico: ${local[i].codigoUnico}</li>
                      <li>Duración total: ${duracionMayor() == local[i].codigoUnico ?  `${duraciones[i].duracion} segundos <span style="display:block; color:#3b3bff;">*Es el disco con mayor duración*</span>` : `${duraciones[i].duracion} segundos`}</li>
                      <li>Pistas (total ${local[i].pistas.length}): <button class="verpistas" onclick="verPistasExtras(${i});">Ver pistas</button></li>`;

        /* Inserto los li's dentro de un ul */
        ul.innerHTML = ulData;

        /* i ya es igual al indice porque lo iguala arriba si es que el indice existe. ademas utilizo el break para que no se sigue ejecutando el bucle y me devuelva solo el codigo del que pido en caso de ser necesario */
        /* De esta forma re utilizo el codigo de mostrar en la funcion de verDiscoCodigoUnico */
        if (i == index - 1) {
          break;
        }

      }
    }

  } else {
    // Doy un mensaje de que no hay discos si es que el usuario ejecuta la funcion de mostrar y no hay discos cargados
    let p = document.createElement("p");
    main.appendChild(p);
    p.style = "margin: 20px;";
    p.innerHTML = "No se ha encontrado ningun disco";
  }
};

// Función Cargar:
const Cargar = () => {
  do {
    nombre = prompt("Ingresa el nombre del disco");

    /* Si el usuario cancela termino la funcion */
    if (nombre === null) {
      return;
    }
    
    while (nombre.length < 1) {
      nombre = prompt("Ingresa el nombre del disco, recuerda que no puede quedar vacio");
    }

    while (!isNaN(nombre) && nombre !== null) {
      nombre = prompt("Ingresa el nombre del disco, recuerda que no puede empezar con un numero");
    }

  } while (!isNaN(nombre));

  do {
    autor = prompt("Ingresa el autor del disco");
    
    /* Si el usuario cancela termino la funcion */
    if (autor === null) {
      return;
    }

    while (autor.length < 1) {
      autor = prompt("Ingresa el autor del disco, recuerda que no puede quedar vacio");
    }

    while (!isNaN(autor) && autor !== null) {
      autor = prompt("Ingresa el autor del disco, recuerda que no puede empezar con un numero");
    }

  } while (!isNaN(autor));

  do {
    codigoUnico = prompt("Ingresa el codigo numérico único del disco (1-999)");

    /* Si el usuario cancela termino la funcion */
    if (codigoUnico === null) {
      return;
    }

    codigoUnico = parseInt(codigoUnico);

    if (local) {
      for (let i = 0; i < local.length; i++) {
        /* Uso un while para que vuelva a repetir en caso de que el usuario vuelva a poner un codigo que ya fue utilizado y guardado en el localstorage */
        while (local[i].codigoUnico == codigoUnico) {
          codigoUnico = parseInt(prompt("Codigo duplicado, por favor recuerdo que el codigo de cada disco debe ser único"));
        }
      }
    }

  } while (!(codigoUnico >= 1 && codigoUnico <= 999));

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

    pistas.push({
      pista: pista,
      duracion: duracion,
    });
  } while (confirm("¿Quieres ingresar otra pista?"));

  disco = new Disco(nombre, autor, codigoUnico, pistas);

  /* Compruebo si local esta y si esta, pusheo solo el objeto de disco, si no esta porque es la primera vez que cargo un disco, seteo el item y encierro el objeto dentro de un array */
  if (local) {
    local.push(disco);
    localStorage.setItem("discos", JSON.stringify(local));
  } else {
    localStorage.setItem("discos", JSON.stringify([disco]));
  }

  Mostrar();

  /* Vacio el array de pistas para que pueda subir las pistas en el nuevo disco en caso de que el usuario quiera volver a cargar un nuevo disco luego */
  pistas = [];

  alertPersonalizado("Se ha creado el disco correctamente..");

};
