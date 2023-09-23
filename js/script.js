let clear = document.getElementById("ac");
let backspace = document.getElementById("c");
let equal = document.getElementById("igual");
let numInput = document.getElementById("numInput");
let result = document.getElementById("numOutput");
let ansButton = document.getElementById("keyAns");
let historyContainer = document.getElementById("historyContainer");
let historyClear = document.getElementById("clear");

let operation = "";
let leftHand = "";
let ans = "";
let historyArray = [];
let equalKeyPressed = false;

function operationFunction(a, b, operator) {
  //Se compara el operador ingresado
  //para realizar la operacion correspondiente y se valida
  //que no se divida por 0.

  if (operator === "+") {
    let res = a + b;
    if (res.toString.length < 20) {
      result.innerHTML = res;
    } else {
      result.innerHTML = res.toPrecision(20);
    }
    ans = result.innerHTML;
  } else if (operator === "-") {
    let res = a - b;
    if (res.toString.length < 20) {
      result.innerHTML = res;
    } else {
      result.innerHTML = res.toPrecision(20);
    }
    ans = result.innerHTML;
  } else if (operator === "*") {
    let res = a * b;
    if (res.toString.length < 20) {
      result.innerHTML = res;
    } else {
      result.innerHTML = res.toPrecision(20);
    }
    ans = result.innerHTML;
  } else if (operator === "/") {
    if (b === 0) {
      result.innerHTML = "Can't divide by 0.";
      ans = 0;
    } else {
      let res = a / b;
      if (res.toString.length < 20) {
        result.innerHTML = res;
      } else {
        result.innerHTML = res.toPrecision(20);
      }
      ans = result.innerHTML;
    }
  }
}

function addToHistory(obj) {
  let htmlContentToAppend = "";

  //Cambiamos el mensaje de error para que se vea mejor en el historial.

  if (obj.output === "Can't divide by 0.") {
    obj.output = "Error.";
  }

  //Se limita el largo de los strings para que se vean mejor en el historial.

  if (obj.output.length > 9) {
    obj.output = parseFloat(obj.output.slice(0, 9)) + "...";
  }

  if (obj.input.length > 16) {
    obj.input = parseFloat(obj.input.slice(0, 16)) + operation + "...";
  }

  //Se agrega la entrada al historial y se valida que no se agreguen mas de 5 entradas.
  //Si se agregan mas de 5, se elimina la ultima entrada y se agrega la nueva al principio.

  if (historyArray.length <= 4) {
    historyArray.unshift(obj);
  } else {
    historyArray.pop();
    historyArray.unshift(obj);
  }

  //Se crea el html para agregar al historial ciclando por el array de entradas.

  historyArray.forEach((element) => {
    htmlContentToAppend += `
          <div class="history">
              <p class="historyInput">${element.input}</p>
              <p class="historyOutput">${element.output}</p>
          </div>
          `;
  });

  //Se agrega el html al historial.

  document.getElementById("historyContainer").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", () => {
  //Agarramos todos los botones de numeros y operadores.

  const numKeys = document.querySelectorAll(".numKey");
  const operatorKeys = document.querySelectorAll(".operatorKey");

  //Event listeners para los botones de operaiones.
  //Al presionarlos, se agrega el simbolo de la operacion al input (parte de arriba del display),
  //y se guardan los valores del numero ingresado antes del operador y que operador se selecciono.
  operatorKeys.forEach((key) => {
    key.addEventListener("click", () => {
      //Se valida que no se presione un operador si no hay un numero ingresado.

      if (numInput.innerHTML === "") {
        numInput.innerHTML = "";
      } else {
        if (equalKeyPressed) {
          equalKeyPressed = false;
          operation = key.innerHTML;
          numInput.innerHTML = ans;
        }
        operation = key.innerHTML;
        numInput.innerHTML += operation;
      }

      //Al presionar las teclas se va formando un string adentro del input.
      //Para poder agarrar el numero ingresado antes del operador,
      //se usa slice para agarrar el string desde el principio hasta
      //el ultimo caracter antes del operador.
      leftHand = numInput.innerHTML.slice(0, -1);
    });
  });

  //Event listeners para los botones de numeros.
  //Al presionarlos, se agrega el numero al input (parte de arriba del display).
  //La estructura de control es para resetear el input
  //si se presiona el boton de igual y despues se presiona un numero.

  numKeys.forEach((key) => {
    key.addEventListener("click", () => {
      if (equalKeyPressed) {
        numInput.innerHTML = key.innerHTML;
        equalKeyPressed = false;
      } else {
        numInput.innerHTML += key.innerHTML;
      }
    });
  });

  //Event listeners para los botones de operaciones especiales.
  equal.addEventListener("click", () => {
    //Se valida que se presionó el boton de igual para cambiar el comportamiento
    //de la calculadora en caso de que se presione un numero despues.
    equalKeyPressed = true;

    let a = parseFloat(leftHand); //el numero ingresado antes del operador.

    //Para conseguir el numero ingresado despues del operador pensé de la siguiente forma:
    //El primer dígito del segundo numero ingresado despues del operador
    //siempre va a estar despues del largo del primero numero, osea,
    //cuantos dígitos tiene el primer numero ingresado (lefthand), + 1 porque
    //no precisamos el operador, y como slice no incluye el caracter en la posicion de inicio,
    //podemos decirle que comience desde la posicion operador.
    let b = parseFloat(numInput.innerHTML.slice(leftHand.length + 1));

    //Se llama a la funcion que realiza la operacion con los dos numeros ingresados y el operador.
    operationFunction(a, b, operation);

    //Se crea un objeto con el input y el output de la operacion realizada para el historial.
    let newEntry = {
      input: numInput.innerHTML,
      output: result.innerHTML,
    };

    //Se llama a la funcion que agrega la entrada al historial con el último resultado.
    addToHistory(newEntry);
  });

  clear.addEventListener("click", () => {
    numInput.innerHTML = "";
    operation = "";
    result.innerHTML = "0.";
  });

  backspace.addEventListener("click", () => {
    numInput.innerHTML = numInput.innerHTML.slice(0, -1);
  });

  ansButton.addEventListener("click", () => {
    if (equalKeyPressed) {
      numInput.innerHTML = ans;
    } else {
      numInput.innerHTML += ans;
    }
  });

  historyClear.addEventListener("click", () => {
    historyArray = [];
    historyContainer.innerHTML = "";
  });
});
