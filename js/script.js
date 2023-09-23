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
let res = "";
let historyArray = [];
let equalKeyPressed = false;
let operatorKeyPressed = false;
let ansKeyPressed = false;
let ansFirst = false;
let ansSecond = false;

function operationFunction(a, b, operator) {
  //Se compara el operador ingresado
  //para realizar la operacion correspondiente y se valida
  //que no se divida por 0.

  if (isNaN(b)) {
    if (isNaN(a)) {
      result.innerHTML = "Syntax Error.";
      ans = 0;
    } else {
      result.innerHTML = a;
      ans = result.innerHTML;
    }
  }
  if (operator === "+") {
    res = a + b;
    if (res.toString.length < 20) {
      result.innerHTML = res;
    } else {
      result.innerHTML = res.toPrecision(20);
    }
    ans = result.innerHTML;
  } else if (operator === "-") {
    res = a - b;
    if (res.toString.length < 20) {
      result.innerHTML = res;
    } else {
      result.innerHTML = res.toPrecision(20);
    }
    ans = result.innerHTML;
  } else if (operator === "*") {
    res = a * b;
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
      res = a / b;
      if (res.toString.length < 20) {
        result.innerHTML = res;
      } else {
        result.innerHTML = res.toPrecision(20);
      }

      console.log(res);
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

  if (obj.output === "Syntax Error.") {
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

  //Se agrega al HTML.

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
      //Se valida que no se presione un operador si no hay un numero ingresado

      if (numInput.innerHTML === "") {
        numInput.innerHTML += "";
      } else {
        operatorKeyPressed = true;

        //Se valida que se presionó el boton de igual para
        //mostrar el resultado de la operacion anterior en el input
        //y poder seguir operando con ese resultado, sin necesidad de presionar el boton de ans.

        if (equalKeyPressed) {
          equalKeyPressed = false;
          if (result.innerHTML === "Can't divide by 0.") {
            numInput.innerHTML = "";
          } else {
            numInput.innerHTML = result.innerHTML;
          }
        }

        //Al presionar las teclas se va formando un string adentro del input.
        //Para poder agarrar el numero ingresado antes del operador,
        //se usa slice para agarrar el string desde el principio hasta
        //el ultimo caracter antes del operador.

        numInput.innerHTML += key.innerHTML;
        operation = key.innerHTML;
        leftHand = numInput.innerHTML.slice(0, -1);
      }
    });
  });

  //Event listeners para los botones de numeros.
  //Al presionarlos, se agrega el numero al input (parte de arriba del display).
  //La estructura de control es para resetear el input
  //si se presiona el boton de igual y despues se presiona un numero.

  numKeys.forEach((key) => {
    key.addEventListener("click", () => {
      //Al presionar el boton de igual y despues un numero, se resetea el input
      //al numero presionado. Si el ultimo comando no fue el de igual, se agrega el numero al input.

      if (equalKeyPressed) {
        equalKeyPressed = false;
        numInput.innerHTML = key.innerHTML;
        leftHand = numInput.innerHTML;
      } else {
        numInput.innerHTML += key.innerHTML;

        //Mientras no se presione un operador, quiero guardar el numero ingresado
        //para el caso que se presione igual sin ningun operador. En ese caso solo mostramos
        //el input en el output.

        if (!operatorKeyPressed) {
          leftHand = numInput.innerHTML;
        }
      }
    });
  });

  //Event listeners para los botones de operaciones especiales.
  equal.addEventListener("click", () => {
    //Se valida que se presionó el boton de igual para cambiar el comportamiento
    //de la calculadora en caso de que se presione un numero despues. Reseteamos que se presionó un operador tambien.
    equalKeyPressed = true;
    operatorKeyPressed = false;
    ansKeyPressed = false;

    //Los objetos son para poder integrar bien la funcion ANS, al ser presionada
    //quiero que la pantalla muestre ANS pero aun asi operar con el valor
    //del resultado anterior.

    let num1 = {
      display: numInput.innerHTML,
      input: parseFloat(leftHand),
    }; //El numero ingresado antes del operador.

    if (ansFirst || leftHand.includes("ANS")) {
      ansFirst = false;
      num1 = {
        display: "ANS",
        input: parseFloat(ans),
      };
    }
    let num2 = {
      display: numInput.innerHTML.slice(leftHand.length + 1),
      input: parseFloat(numInput.innerHTML.slice(leftHand.length + 1)),
    }; //El numero ingresado despues del operador.

    //Para conseguir el numero ingresado despues del operador pensé de la siguiente forma:
    //El primer dígito del segundo numero ingresado despues del operador siempre va a estar despues
    //del largo del primero numero, osea,  despues de n dígitos que tiene el primer numero ingresado (lefthand), + 1 porque
    //no precisamos el operador, y como slice no incluye el caracter en la posicion de inicio, podemos decirle
    //que comience desde la posicion del operador.

    if (ansSecond) {
      ansSecond = false;
      num2 = {
        display: "ANS",
        input: parseFloat(ans),
      };
    }
    //Se llama a la funcion que realiza la operacion con los dos numeros ingresados y el operador.
    operationFunction(num1.input, num2.input, operation);

    if (isNaN(res)) {
      result.innerHTML = "Syntax Error.";
    }

    //Se crea un objeto con el input y el output de la operacion realizada para el historial, en el caso que
    //el input sea vacio o solo un punto no se agrega al historial.
    if (numInput.innerHTML !== "" && numInput.innerHTML !== ".") {
      let newEntry = {
        input: numInput.innerHTML,
        output: result.innerHTML,
      };

      //Se llama a la funcion que agrega la entrada al historial con el último resultado.
      addToHistory(newEntry);

      //Se resetea el operador y el leftHand para que no se acumulen.
      operation = "";
      leftHand = "";
    }
  });

  clear.addEventListener("click", () => {
    //Se resetean todas las variables y se resetea el display.

    equalKeyPressed = false;
    operatorKeyPressed = false;
    numInput.innerHTML = "";
    operation = "";
    result.innerHTML = "0";
  });

  backspace.addEventListener("click", () => {
    numInput.innerHTML = numInput.innerHTML.slice(0, -1);
  });

  ansButton.addEventListener("click", () => {
    ansKeyPressed = true;

    if (equalKeyPressed) {
      ansFirst = true;
      equalKeyPressed = false;
      numInput.innerHTML = "ANS";
    } else {
      if (operatorKeyPressed) {
        ansSecond = true;
        numInput.innerHTML += "ANS";
      } else {
        numInput.innerHTML = "ANS";
      }
    }
  });

  historyClear.addEventListener("click", () => {
    historyArray = [];
    historyContainer.innerHTML = "";
  });
});
