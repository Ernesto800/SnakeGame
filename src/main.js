let cajas = document.querySelectorAll("div");
const numCajas = cajas.length;
const anchoCuadricula = 10;

let serpiente = [2, 1, 0];
let direccion = "right";
let comidaIndex = 0;
let juegoActivo = true;
let intervaloMovimiento;
let velocidad = 500;
let puntuacion = 0;

function iniciarJuego() {
    serpiente.forEach(index => cajas[index].classList.add("snake"));
    generarComida();
    intervaloMovimiento = setInterval(moverSerpiente, velocidad);
}

function generarComida() {
    do {
        comidaIndex = Math.floor(Math.random() * numCajas);
    } while (serpiente.includes(comidaIndex));
    cajas[comidaIndex].classList.add("food");
}

function moverSerpiente() {
    if (!juegoActivo) return;

    let cola = serpiente.pop();
    cajas[cola].classList.remove("snake");

    let cabeza = serpiente[0];
    let siguienteIndex;

    if (direccion === "up") {
        siguienteIndex = cabeza - anchoCuadricula;
    } else if (direccion === "left") {
        siguienteIndex = cabeza - 1;
    } else if (direccion === "down") {
        siguienteIndex = cabeza + anchoCuadricula;
    } else if (direccion === "right") {
        siguienteIndex = cabeza + 1;
    }

    const esBordeDerecho = (cabeza % anchoCuadricula === anchoCuadricula - 1 && direccion === "right");
    const esBordeIzquierdo = (cabeza % anchoCuadricula === 0 && direccion === "left");
    const esBordeSuperior = (cabeza < anchoCuadricula && direccion === "up");
    const esBordeInferior = (cabeza >= numCajas - anchoCuadricula && direccion === "down");

    if (esBordeDerecho || esBordeIzquierdo || esBordeSuperior || esBordeInferior ||
        serpiente.includes(siguienteIndex)
    ) {
        juegoActivo = false;
        clearInterval(intervaloMovimiento);
        alert(`¡Juego terminado! Tu puntuación: ${puntuacion}`);
        return;
    }

    serpiente.unshift(siguienteIndex);
    cajas[siguienteIndex].classList.add("snake");

    if (siguienteIndex === comidaIndex) {
        cajas[comidaIndex].classList.remove("food");
        serpiente.push(cola);
        cajas[cola].classList.add("snake");

        puntuacion++;
        document.getElementById("puntuacion").textContent = `Puntuación: ${puntuacion}`;

        generarComida();

        clearInterval(intervaloMovimiento);
        velocidad = Math.max(100, velocidad * 0.9);
        intervaloMovimiento = setInterval(moverSerpiente, velocidad);
    }
}

document.addEventListener("keydown", (event) => {
    if (!juegoActivo) return;

    if (event.key === "ArrowUp" && direccion !== "down") {
        direccion = "up";
    } else if (event.key === "ArrowLeft" && direccion !== "right") {
        direccion = "left";
    } else if (event.key === "ArrowDown" && direccion !== "up") {
        direccion = "down";
    } else if (event.key === "ArrowRight" && direccion !== "left") {
        direccion = "right";
    }
});

window.onload = () => {
    cajas = document.querySelectorAll("div");
    
    const puntuacionElement = document.createElement('div');
    puntuacionElement.id = 'puntuacion';
    puntuacionElement.textContent = 'Puntuación: 0';
    document.body.insertBefore(puntuacionElement, document.querySelector('section'));
    
    iniciarJuego();
};