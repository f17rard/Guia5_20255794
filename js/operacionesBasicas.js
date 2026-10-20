const parrafo = document.querySelector("#idParrafo");
console.log(parrafo);

const btnSumar = document.querySelector("#idBtnSumar");
const btnRestar = document.querySelector("#idBtnRestar");
const btnMultiplicar = document.querySelector("#idBtnMultiplicar");
const btnDividir = document.querySelector("#idBtnDividir");

btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);

let resultado;

function sumar() {
    let num1 = parseFloat(prompt("Ingrese el primer numero a sumar"));
    let num2 = parseFloat(prompt("Ingrese el segundo numero a sumar"));
    resultado = num1 + num2;
    parrafo.innerHTML = `${num1} + ${num2} = ${resultado}`;
}

function restar(){
    let num1 = parseFloat(prompt("Ingrese el primer numero a restar"));
    let num2 = parseFloat(prompt("Ingrese el segundo numero a restar"));
    resultado = num1 - num2;
    parrafo.innerHTML = `${num1} - ${num2} = ${resultado}`;
}

function multiplicar() {
    let num1 = parseFloat(prompt("Ingrese el primer numero a multiplicar"));
    let num2 = parseFloat(prompt("Ingrese el segundo numero a multiplicar"));
    resultado = num1 * num2;
    parrafo.innerHTML = `${num1} x ${num2} = ${resultado}`;
}

function dividir(){
    let num1 = parseFloat(prompt("Ingrese el primer numero a dividir"));
    let num2 = parseFloat(prompt("Ingrese el segundo numero a dividir"));
    let mensaje;
    if(num2!=0){
        resultado = num1/num2;
        mensaje = `${num1} / ${num2} = ${resultado}`;
    } else {
        mensaje = `El valor ${num1} / ${num2} no se puede dividir`;
    }

    parrafo.innerHTML = mensaje;
}