/**
 * Funcion verDiscoUnico muestra un disco especifico, reutilizando la funcion mostrar
 * @returns no devuelve nada
 */

// Función Ver Codigo Unico
const verDiscoCodigoUnico = () => {
    codigoUnico = parseInt(prompt("Ingresa el codigo numérico único del disco que quieres ver (1-999)"));
    if (codigoUnico >= 1 && codigoUnico <= 999) {
        /* Re utilizo el codigo de Mostrar pasandole un argumento */
        Mostrar(codigoUnico);
    } else {
        alertPersonalizado("El codigo no existe...");
    }

};