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

function operationFunction(a, b, operator) {
  if (operator === "+") {
    result.innerHTML = a + b;
    ans = result.innerHTML;
  } else if (operator === "-") {
    result.innerHTML = a - b;
    ans = result.innerHTML;
  } else if (operator === "*") {
    result.innerHTML = a * b;
    ans = result.innerHTML;
  } else if (operator === "/") {
    if (b === 0) {
      result.innerHTML = "Can't divide by 0.";
      ans = 0;
    } else {
      result.innerHTML = a / b;
      ans = result.innerHTML;
    }
  }
}

function addToHistory(obj) {
  let htmlContentToAppend = "";

  if (obj.output === "Can't divide by 0.") {
    obj.output = "Error.";
  }

  if (historyArray.length <= 4) {
    historyArray.unshift(obj);
  } else {
    historyArray.pop();
    historyArray.unshift(obj);
  }

  historyArray.forEach((element) => {
    htmlContentToAppend += `
          <div class="history">
              <p class="historyInput">${element.input}</p>
              <p class="historyOutput">${element.output}</p>
          </div>
          `;
  });

  document.getElementById("historyContainer").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", () => {
  const numKeys = document.querySelectorAll(".numKey");
  const operatorKeys = document.querySelectorAll(".operatorKey");

  operatorKeys.forEach((key) => {
    key.addEventListener("click", () => {
      numInput.innerHTML += key.innerHTML;
      operation = key.innerHTML;
      leftHand = numInput.innerHTML.slice(0, -1);

      console.log(leftHand.length);
    });
  });

  numKeys.forEach((key) => {
    key.addEventListener("click", () => {
      numInput.innerHTML += key.innerHTML;
    });
  });

  equal.addEventListener("click", () => {
    let a = parseFloat(leftHand);
    let b = parseFloat(numInput.innerHTML.slice(leftHand.length + 1));

    operationFunction(a, b, operation);

    let newEntry = {
      input: numInput.innerHTML,
      output: result.innerHTML,
    };

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
    numInput.innerHTML = ans;
  });

  historyClear.addEventListener("click", () => {
    historyArray = [];
    historyContainer.innerHTML = "";
  });
});
