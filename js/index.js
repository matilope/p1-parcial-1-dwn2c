/**
 * Funcion mostrar crea elementos html con la informacion que hay dentro del localStorage con la clave discos
 * @param {number} index parametro opcional, el mismo se lo usa para reutilizar esta funcion en caso de que el usuario quiera ver un solo disco
 * el alert de discos ingresados se muestra si no se pasa el parametro
 * en el for igualo al principio del bloque el i con el index
 * despues utilizo break al final del for para que no vuelva a ejecutarse y se termine alli el recorrido y solo me termine mostrando el disco con el codigo unico solicitado
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
    }
  });

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

    /* Informar cantidad de discos ingresados en caso de que no haya buscado solo un disco */
    /* A veces si ponia por ej un codigoUnico existente de 767, me daba 0 el index y se daba la alerta */
    if (!index && index !== 0) {
      alertPersonalizado("Discos ingresados: " + local.length);
    }

    /* Creo un solo elemento para permitir eliminar todos los discos subidos y lo anexo al main en caso tambien de no existir el indice, cuando quiero buscar un solo disco, no hace falta que esta opcion aparezca */
    eliminarTotal = document.createElement("button");
    eliminarTotal.setAttribute("onclick", `eliminarDiscosCompleto();`);
    eliminarTotal.style = "margin-top:40px; background-color: #2a4a8f; border-radius:10px;";
    eliminarTotal.innerHTML = "Eliminar discografia completa";
    main.appendChild(eliminarTotal);


    /* Recorriendo el array de objetos de localstorage */
    for (let i = 0; i < local.length; i++) {

      /* Re utilizo funcion mostrar usando el index si es que se le pasa, eso me deja ver solo un unico disco */
      if (index) {
        i = index;
      }

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

      /* La funcion duracionTotal devuelve justamente, la duración total de cada disco, dejandome aprovechar el i del ciclo de arriba */
      let duraciones = duracionTotal();

      /* La funcion duracionMayor devuelve el codigoUnico del disco con mas duracion total */
      let codigoUnicoDuracionMayor = duracionMayor();

      /* li's con el resto de los datos */
      let ulData = `<li>Autor: ${local[i].autor}</li>
                      <li>Codigo unico: ${local[i].codigoUnico}</li>
                      <li>Duración total: ${codigoUnicoDuracionMayor == local[i].codigoUnico ? `${duraciones[i].duracion} segundos <span style="display:block; color:#3b3bff;">*Es el disco con mayor duración*</span>` : `${duraciones[i].duracion} segundos`}</li>
                      <li>Pistas (total ${local[i].pistas.length}): <button class="verpistas" onclick="verPistasExtras(${i});">Ver pistas</button></li>`;

      /* Inserto los li's dentro de un ul */
      ul.innerHTML = ulData;

      /* Rompo el ciclo en caso de que i sea igual a index, o sea se dio la condicion de arriba y corto el ciclo aca */
      if (i == index) {
        break;
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
    // Aqui uso while para que no cambie entre un prompt y el otro, que si lo dejo vacio, lo pueda leer en el prompt
    while (nombre.length < 1) {
      nombre = prompt("Ingresa el nombre del disco, recuerda que no puede quedar vacio");
    }

  } while (nombre.length < 1);


  do {
    autor = prompt("Ingresa el autor del disco");

    /* Si el usuario cancela termino la funcion */
    if (autor === null) {
      return;
    }

    /* Si el usuario cancela termino la funcion */
    if (autor === null) {
      return;
    }
    // Aqui uso while para que no cambie entre un prompt y el otro, que si lo dejo vacio, lo pueda leer en el prompt
    while (autor.length < 1) {
      autor = prompt("Ingresa el autor del disco, recuerda que no puede quedar vacio");
    }

  } while (autor.length < 1);


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
      // Aqui uso while para que no cambie entre un prompt y el otro, que si lo dejo vacio, lo pueda leer en el prompt
      while (pista !== null && pista.length < 1) {
        pista = prompt("Ingresa el nombre de la pista, recuerda que no puede quedar vacio");
      }
      while (pista == null) {
        pista = prompt("El nombre de la pista es obligatoria, por favor, ingrese el nombre de la pista");
      }
    } while (pistas == null);

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