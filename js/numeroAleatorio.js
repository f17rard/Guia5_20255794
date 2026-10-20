const numeroAleatorio = Math.floor(Math.random() * 25) + 1;

const numeroIntentos = 3;

let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;

    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos){
        let numero = prompt(
            "¿Qué numero se ha generado (intento "+ intentos + ")?"
        );

        if(numero == numeroAleatorio){
            mensaje = `¡Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio}).
            Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos){
            mensaje = `Su numero de intentos ha terminado.
            El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        } else { //ejercicio 1 - se agregó un if para comparar "numero" entre "numeroAleatorio"
            if (numero < numeroAleatorio){
                mensaje = `Vuelva a intentar. Quedan ${
                numeroIntentos - intentos
                } intentos. El numero que buscas es mayor a ${numero}`;
            } else if (numero > numeroAleatorio){
                mensaje = `Vuelva a intentar. Quedan ${
                numeroIntentos - intentos
                } intentos. El numero que buscas es menor a ${numero}`;
            }
        }

        intentos++;

    } else {
        mensaje = `Su numero de intentos ha terminado.
        El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }

    parrafo.innerHTML=mensaje;
}