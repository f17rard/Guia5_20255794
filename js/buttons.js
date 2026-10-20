function aviso() {
    alert("Bienvenido al mundo JavaScript");
}

function confirmacion(){
    let confirmacion = confirm("¿Desea salir de la Sesión?"); //almacena un booleano al mostrar un modal con 2 opciones (true, false)
    alert(`valor seleccionado ${confirmacion}`);
}

function capturarDatos() {
    let nombre = prompt("¿Cuál es su nombre?");
    let edad = prompt("¿Cuál es su edad?, 0");

    alert(`Su nombre es ${nombre} y su edad ${edad}`);
}

function dibujarParrafo() {
    let parrafo = prompt(
        "Escriba la información que desea visualizar en el párrafo"
    );

    const p = document.querySelector("#idParrafo");
    p.innerHTML = parrafo;
}