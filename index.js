// Discos:
let discos = [],
  nombre,
  autor,
  codigoUnico,
  pistas = [],
  pista,
  duracion,
  local,
  main = document.querySelector("main"),
  ulPistas = null;

local = JSON.parse(localStorage.getItem("discos")).sort((a, b) => {
  return a.codigoUnico - b.codigoUnico;
});

// Clase de Discos:
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
      eliminarTotal.setAttribute("onclick", `EliminarDiscosCompleto();`);
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
        img.src = "./discos.webp";
        img.alt = "Imagen representativa de Discos";
        editar.setAttribute("onclick", `Editar(${i});`);
        eliminar.setAttribute("onclick", `Eliminar(${i});`);
        verInformacion.setAttribute("onclick", `VerMasInformacion(${i});`);
        editar.innerHTML = "Editar";
        eliminar.innerHTML = "Eliminar";
        verInformacion.innerHTML = "Ver mas informacion";

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

        /* Dos variables, una funcion muestra la duracion total de cada disco y la otra funcion solo me devuelve un solo objeto que tiene el codigoUnico del disco para poder compararlo y tambien la duracion */
        let duraciones = duracionTotal();
        let mayorDuracion = duracionMayor();

        /* li's con el resto de los datos */
        let ulData = `<li>Autor: ${local[i].autor}</li>
                      <li>Codigo unico: ${local[i].codigoUnico}</li>
                      <li>Duracion total: ${mayorDuracion.codigoUnico == local[i].codigoUnico ?  `${duraciones[i].duracion} segundos <span style="display:block; color:#3b3bff;">*Es el disco con mayor duración*</span>` : `${duraciones[i].duracion} segundos`}</li>
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
  } while (!isNaN(nombre));

  do {
    autor = prompt("Ingresa el autor del disco");
  } while (!isNaN(autor));

  do {
    codigoUnico = parseInt(prompt("Ingresa el codigo numérico único del disco (1-999)"));
    if (local) {
      for (let i = 0; i < local.length; i++) {
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

  discos = new Disco(nombre, autor, codigoUnico, pistas);

  /* Compruebo si local esta y si esta, pusheo solo el objeto de discos, si no esta pusheo el array y el objeto para que se guarde un array de objetos */
  if (local) {
    local.push(discos);
    localStorage.setItem("discos", JSON.stringify(local));
  } else {
    localStorage.setItem("discos", JSON.stringify([discos]));
  }

  Mostrar();

  /* Vacio los arrays para que pueda subir la data que quiera nuevamente */
  discos = [];
  pistas = [];

  alertPersonalizado("Se ha creado el disco correctamente..");

};

// Función Editar:
const Editar = (index) => {
  let edicion;

  /* Compruebo que el indice existe, si no existe devuelta -1, por eso pregunto si es mayor y ahi saco el elemento (ese solo) de ese index y lo guardo en una variable para poder editarlo */
  if (index > -1) {
    edicion = local.splice(index, 1);
  }

  /* Variables de resguardo en caso de que el usuario no quiera editar el nombre o el autor del disco */
  /* Ver error */
  let nombreReservado = edicion[0].nombre;
  let autorReservado = edicion[0].autor;

  /* Edito en caso de querer, los nuevos datos, aparte el prompt lo relleno con los datos anteriores para una mejor guia al usuario */
  do {
    edicion[0].nombre = prompt("Ingresa el nombre del disco", edicion[0].nombre);
    /* Verifico si es null para permitir al usuario cancelar en caso de arrepentirse de editar esta variable */
    if (edicion[0].nombre == null) {
      edicion[0].nombre = nombreReservado;
      /* Si el usuario cancela significa que quiere salir de la edicion, entonces termino la funcion y no se actualiza la misma */
      alertPersonalizado("La edicion se ha cancelado");
      return;
    }
  } while (!isNaN(edicion[0].nombre));

  do {
    edicion[0].autor = prompt("Ingresa el autor del disco", edicion[0].autor);
    /* Verifico si es null para permitir al usuario cancelar en caso de arrepentirse de editar esta variable */
    if (edicion[0].autor == null) {
      edicion[0].autor = autorReservado;
      /* Si el usuario cancela significa que quiere salir de la edicion, entonces termino la funcion y no se actualiza la misma */
      alertPersonalizado("La edicion se ha cancelado");
      return;
    }
  } while (!isNaN(edicion[0].autor));

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
      edicion[0].pistas.push({
        pista: pista,
        duracion: duracion,
      });
    } while (confirm("¿Quieres ingresar otra pista?"));
  }

  local.push(edicion[0]);

  localStorage.setItem("discos", JSON.stringify(local));

  /* Cargo la data actualizada */
  Mostrar();

  alertPersonalizado("Se ha editado correctamente..");
};

// Función Eliminar:
const Eliminar = (index) => {
  /* Compruebo que el indice existe, si no existe devuelta -1, por eso pregunto si es mayor y ahi saco el elemento (ese solo) de ese index. */
  if (index > -1) {
    local.splice(index, 1);
  }

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
const EliminarDiscosCompleto = () => {
  /* Compruebo si existe el array de discos en el localstorage */
  if (local) {
    /* Si existe, lo elimino completamente */
    localStorage.removeItem("discos");
    /* Reseteo el main para cuando llamo a la funcion Mostrar se me muestre la data actualizada, entonces borro la data y luego se pone la data actualizada del local cada vez que se ejecuta la funcion */
    main.innerHTML = `<header><h1>Programación I | Parcial 1 | LÓPEZ MUÑOZ, MATÍAS GABRIEL</h1></header>
    <button onClick="Cargar();">Cargar nuevo disco</button>
    <button onClick="Mostrar();">Mostrar discos ingresados</button>
    <button onclick="verDiscoCodigoUnico();">Buscar disco especifico</button>`;
    alertPersonalizado("Se han eliminado los discos.");
  }
};

// Función Eliminar Pista
const EliminarPista = (indexLocal, indexPistas) => {
  local[indexLocal].pistas.splice(indexPistas, 1);

  localStorage.setItem("discos", JSON.stringify(local));

  /* Cargo la data actualizada por si se vuelve a apretar el mismo disco */
  Mostrar();
  /* Elimino el div creado en el alert realizada */
  document.body.removeChild(document.querySelector(".animacion"));
  document.body.removeChild(document.querySelector(".divExtra"));

  alertPersonalizado("Se ha eliminado la pista correctamente.");

  setTimeout(() => {
    /* Para que se actualice el alert tambien vuelvo a llamar a la funcion */
    verPistasExtras(indexLocal);
  }, 1500);

};

// Función Ver Mas Informacion
const VerMasInformacion = (index) => {
  let dataExtra = local[index].pistas;
  let duracionTotal = null;
  let cantidadPistas = dataExtra.length;
  let mayorDuracion = Number.NEGATIVE_INFINITY;
  let pistaMayorDuracion;

  for (let i = 0; i < dataExtra.length; i++) {
    duracionTotal += dataExtra[i].duracion;
    if (dataExtra[i].duracion > mayorDuracion) {
      mayorDuracion = dataExtra[i].duracion;
      if (dataExtra[i].duracion === mayorDuracion) {
        pistaMayorDuracion = dataExtra[i].pista;
      }
    }
  }

  alertPersonalizado(
    `<li>Cantidad de pistas: ${cantidadPistas}</li>
    <li>Duracion total de las pistas: ${duracionTotal} segundos</li>
    <li>Promedio de las pistas: ${parseFloat((duracionTotal / cantidadPistas).toFixed(1))} segundos</li>
    <li>Pista con mayor duracion: ${pistaMayorDuracion}, ${mayorDuracion} segundos</li>`, true
  );
};

// Función Ver Codigo Unico
const verDiscoCodigoUnico = () => {
  codigoUnico = parseInt(prompt("Ingresa el codigo numérico único del disco que quieres ver (1-999)"));
  if (codigoUnico >= 1 && codigoUnico <= 999) {
    Mostrar(codigoUnico);
  } else {
    alertPersonalizado("El codigo no existe...");
  }

};

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
  if (alerta) {
    let ul = document.createElement("ul");
    ul.style.color = "white";
    ul.innerHTML = mensaje;
    div.appendChild(ul);
    let botonCerrar = document.createElement("button");
    botonCerrar.innerHTML = "X";
    botonCerrar.classList.add("botonCerrar");
    div.appendChild(botonCerrar);
    div.style.width = ul.clientWidth + 80 + "px";
    /* Le agrego "dinamicamente" la altura que tiene el ul segun su contenido y le sumo 40px para que tenga mas espacio el contenedor del alerta */
    div.style.height = ul.clientHeight + 40 + "px";
    /* Si se clickkea el boton de cerrar se da display none */
    botonCerrar.addEventListener("click", () => {
      document.body.removeChild(div);
      document.body.removeChild(divExtra);
    });
  } else {
    let p = document.createElement("p");
    div.appendChild(p);
    p.style = "color:white;";
    p.innerHTML = mensaje;
    setTimeout(() => {
      document.body.removeChild(div);
      document.body.removeChild(divExtra);
    }, 2000);
  }

}

// Funcion duracion total de cada disco

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

  arrayDuracion.sort((a, b) => {
    return b.codigoUnico - a.codigoUnico;
  });

  return arrayDuracion;

}

// Funcion disco con mayor duracion

function duracionMayor() {
  let arrayDuracion = duracionTotal();

  arrayDuracion.sort((a, b) => {
    return b.duracion - a.duracion;
  });

  return arrayDuracion[0];
}

// Funcion en donde creo varios li dependiendo de la cantidad de pistas que tengo en dicho disco

function verPistasExtras(index) {
  let ulPistas = '';
  for (let j = 0; j < local[index].pistas.length; j++) {
    ulPistas += `<li>Nombre de pista: ${local[index].pistas[j].pista}</li><li>Duracion de la pista: 
    <span class="${local[index].pistas[j].duracion > 180 ? "duracionMayor" : "duracionMenor"}">${local[index].pistas[j].duracion}</span>
    <button class="eliminarPista" onclick="EliminarPista(${index}, ${j});">X</button></li>`;
  }

  /* Si el length es 0 es porque no hay pistas y doy una alert para avisar que no hay pistas en el disco */
  if (local[index].pistas.length == 0) {
    alertPersonalizado("No se han encontrado pistas..");
  } else {
    /* Hay pistas asi que creo el ul y lo muestro en el alert */
    alertPersonalizado(ulPistas, true);
  }
}