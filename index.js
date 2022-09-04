// Discos:
let discos = [],
  nombre,
  autor,
  codigoUnico,
  pistas = [],
  pista,
  duracion,
  local,
  main = document.querySelector("main");

if (localStorage.getItem("discos")) {
  local = JSON.parse(localStorage.getItem("discos")).sort((a, b) => {
    return b.codigoUnico - a.codigoUnico;
  });
}

// Función Mostrar:
const Mostrar = (index) => {
  /* Reseteo el main para cuando llamo a la funcion Mostrar se me muestre la data actualizada, entonces borro la data y luego se pone la data actualizada del local cada vez que se ejecuta la funcion */
  main.innerHTML = `<header><h1>Programación I | Parcial 1 | LÓPEZ MUÑOZ, MATÍAS GABRIEL</h1></header>
  <button onClick="Cargar();">Cargar nuevo disco</button>
  <button onClick="Mostrar();">Mostrar discos ingresados</button>
  <button onclick="verDiscoCodigoUnico();">Buscar disco especifico</button>`;

  if (localStorage.getItem("discos")) {
    local = JSON.parse(localStorage.getItem("discos")).sort((a, b) => {
      return b.codigoUnico - a.codigoUnico;
    });
  }

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

  /* Variables que uso para el evento de ocultar */
  let section;
  let eliminarTotal;

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
      eliminarTotal.innerHTML = "Eliminar discografia completa";
      main.appendChild(eliminarTotal);
    } else {
      /* Si esta el index, de paso aprovecho este else para ordenar distinto el local y me deje acceder al codigo unico que quiero realmente y no que me los agarre al reves, ya que tengo invertida la posicion de los objetos dentro del array */
      /* Asi que aprovecho y lo invierto en este caso el local */
      local = JSON.parse(localStorage.getItem("discos")).sort((a, b) => {
        return a.codigoUnico - b.codigoUnico;
      });
    }


    /* Recorriendo el array de objetos de localstorage */
    for (let i = 0; i < local.length; i++) {


      /*Si esta el index al i lo igual al index - 1 (ya que el codigo unico arranca de 1 a 999) pero el indice del primer objeto dentro del array es 0 entonces, si quiero ver el primer disco, veo el del indice 0 de esta forma */
      if (index) {
        i = index - 1;
      }

      if (index && !local[index - 1]) {
        alertPersonalizado("Disco solicitado no existe");
        main.innerHTML = `<header><h1>Programación I | Parcial 1 | LÓPEZ MUÑOZ, MATÍAS GABRIEL</h1></header>
        <button onClick="Cargar();">Cargar nuevo disco</button>
        <button onClick="Mostrar();">Mostrar discos ingresados</button>
        <button onclick="verDiscoCodigoUnico();">Buscar disco especifico</button>`;
        let p = document.createElement("p");
        main.appendChild(p);
        p.innerHTML = "No se ha encontrado ningun disco";
      } else {

        /* Creando elementos */
        let div = document.createElement("div");
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
        section.appendChild(div);
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(ul);
        div.appendChild(editar);
        div.appendChild(eliminar);
        div.appendChild(verInformacion);

        /* Unorder list con la data */
        h3.textContent = local[i].nombre;
        let ulData = `<li>Autor: ${local[i].autor}</li><li>Codigo unico: ${local[i].codigoUnico}</li><li>Pistas (total ${local[i].pistas.length}): <ul>`;
        for (let j = 0; j < local[i].pistas.length; j++) {
          ulData += `<li>Nombre de pista: ${local[i].pistas[j].pista}</li><li>Duracion de la pista: 
        <span class="${local[i].pistas[j].duracion > 180 ? "duracionMayor" : "duracionMenor"}">${local[i].pistas[j].duracion}</span>
        <button onclick="EliminarPista(${i}, ${j});">X</button></li>`;
        }
        ulData += "</ul></li>";
        ul.innerHTML = ulData;

        /* i ya es igual al indice porque lo igual arriba si es que el indice existe. ademas utilizo el break para que no se sigue ejecutando el bucle y me devuelva solo el codigo del que pido en caso de ser necesario*/
        if (i == index - 1) {
          break;
        }

      }
    }

  } else {
    // Doy un mensaje de que no hay discos si es que el usuario ejecuta la funcion de mostrar y no hay discos cargados
    let p = document.createElement("p");
    main.appendChild(p);
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

  discos.push({
    nombre: nombre,
    autor: autor,
    codigoUnico: codigoUnico,
    pistas: pistas,
  });

  /* Compruebo si local esta y si esta, pusheo solo el objeto de discos, si no esta pusheo el array y el objeto para que se guarde un array de objetos */
  if (local) {
    local.push(discos[0]);
    localStorage.setItem("discos", JSON.stringify(local));
  } else {
    localStorage.setItem("discos", JSON.stringify(discos));
  }

  /* Vacio los valores para que al publicar no se vuelvan a poner los valores cargados anteriormente */
  pistas = [];
  discos = [];

  Mostrar();

  alertPersonalizado("Se ha creado el disco correctamente..");
};

// Función Editar:
const Editar = (index) => {
  let edicion;

  /* Compruebo que el indice existe, si no existe devuelta -1, por eso pregunto si es mayor y ahi saco el elemento (ese solo) de ese index y lo guardo en una variable para poder editarlo */
  if (index > -1) {
    edicion = local.splice(index, 1);
  }

  /* Edito en caso de querer, los nuevos datos, aparte el prompt lo relleno con los datos anteriores para una mejor guia al usuario */
  do {
    edicion[0].nombre = prompt("Ingresa el nombre del disco", edicion[0].nombre);
  } while (!isNaN(edicion[0].nombre));

  do {
    edicion[0].autor = prompt("Ingresa el autor del disco", edicion[0].autor);
  } while (!isNaN(edicion[0].autor));

  /* Si confirma, le borro toda las pistas para que despues pueda volver a ingresar las nuevas */

  if (confirm("¿Quieres agregar mas pistas?")) {
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

  if (localStorage.getItem("discos")) {
    /* Si existe, lo elimino completamente */
    localStorage.removeItem("discos");
    alertPersonalizado("Se han eliminado los discos correctamente.");

    /* Cargo la data actualizada */
    Mostrar();
  } else {
    /* Si no existe doy un alerta aunque el boton no figura si no existen discos CHEQUEAR SI VALE LA PENA, OBVIAMENTE NO PERO BUENOOOO */
    alertPersonalizado("Los discos no se han encontrado.");
  }
};

// Función Eliminar Pista
const EliminarPista = (indexLocal, indexPistas) => {
  local[indexLocal].pistas.splice(indexPistas, 1);

  localStorage.setItem("discos", JSON.stringify(local));

  /* Cargo la data actualizada */
  Mostrar();

  alertPersonalizado("Se ha eliminado la pista correctamente.");
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

  let promedioDuracion = parseFloat((duracionTotal / cantidadPistas).toFixed(1));

  alertPersonalizado(
    `<li>Cantidad de pistas: ${cantidadPistas}</li>
    <li>Duracion total de las pistas: ${duracionTotal} segundos</li>
    <li>Promedio de las pistas: ${promedioDuracion} segundos</li>
    <li>Pista con mayor duracion: ${pistaMayorDuracion}, ${mayorDuracion} segundos</li>`,
    "200",
    "400"
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
function alertPersonalizado(mensaje, altura, ancho) {
  /* Scroleo al top que es donde aparece la alerta */
  window.scrollTo({
    top: 0,
    left: 0,
  });

  /* Creo un alert personalizado para darle una buena interfaz a la página */
  let div = document.createElement("div");
  div.classList.add("animacion");
  main.appendChild(div);
  if (altura && ancho) {
    div.style.height = altura + "px";
    div.style.width = ancho + "px";
    let ul = document.createElement("ul");
    ul.style.color = "white";
    ul.innerHTML = mensaje;
    div.appendChild(ul);
    let botonCerrar = document.createElement("button");
    botonCerrar.innerHTML = "X";
    botonCerrar.classList.add("botonCerrar");
    div.appendChild(botonCerrar);
    botonCerrar.addEventListener("click", () => {
      div.style = "display:none;";
    });
  } else {
    let p = document.createElement("p");
    div.appendChild(p);
    p.style = "color:white;";
    p.innerHTML = mensaje;
    setTimeout(() => {
      div.style = "display:none;";
    }, 2000);
  }

}