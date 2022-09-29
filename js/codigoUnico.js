/**
 * Funcion verDiscoUnico muestra un disco especifico, habia reutilizado la funcion mostrar pasandole un parametro pero se hacia el codigo muy complicado de leer y preferi dejarlo de esta forma.
 * @returns no devuelve nada
 */

// Función Ver Codigo Unico
const verDiscoCodigoUnico = () => {
    codigoUnico = parseInt(prompt("Ingresa el codigo numérico único del disco que quieres ver (1-999)"));

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

            /* Reseteo el main */
            main.innerHTML = `<header><h1>Programación I | Parcial 1 | LÓPEZ MUÑOZ, MATÍAS GABRIEL</h1></header>
                        <button onclick="Cargar();">Cargar nuevo disco</button>
                        <button onclick="Mostrar();">Mostrar todos los discos ingresados</button>
                        <button onclick="verDiscoCodigoUnico();">Buscar disco especifico</button>`;

            /* Creo elementos*/
            let section = document.createElement("section");
            main.appendChild(section);
            section.classList.add("discosingresados");
            let h2 = document.createElement("h2");
            section.appendChild(h2);
            h2.textContent = "Discos ingresados";

            /* Creando mas elementos */
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
            editar.setAttribute("onclick", `Editar(${index});`);
            eliminar.setAttribute("onclick", `Eliminar(${index});`);
            verInformacion.setAttribute("onclick", `verMasInformacion(${index});`);
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
            h3.textContent = local[index].nombre;

            /* La funcion duracionTotal devuelve justamente, la duración total de cada disco, dejandome aprovechar el i del ciclo de arriba */
            let duraciones = duracionTotal();
            /* La funcion duracionMayor devuelve el codigoUnico del disco con mas duracion total */
            let codigoUnicoDuracionMayor = duracionMayor();

            /* li's con el resto de los datos */
            let ulData = `<li>Autor: ${local[index].autor}</li>
                          <li>Codigo unico: ${local[index].codigoUnico}</li>
                          <li>Duración total: ${codigoUnicoDuracionMayor == local[index].codigoUnico ? `${duraciones[index].duracion} segundos <span style="display:block; color:#3b3bff;">*Es el disco con mayor duración*</span>` : `${duraciones[index].duracion} segundos`}</li>
                          <li>Pistas (total ${local[index].pistas.length}): <button class="verpistas" onclick="verPistasExtras(${index});">Ver pistas</button></li>`;

            /* Inserto los li's dentro de un ul */
            ul.innerHTML = ulData;
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
    }

};