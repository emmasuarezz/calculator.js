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

document.addEventListener("DOMContentLoaded", () => {
  const numkeysContainer = document.querySelectorAll(".numKey");
  const operatorkeysContainer = document.querySelectorAll(".operatorKey");

  operatorkeysContainer.forEach((key) => {
    key.addEventListener("click", () => {
      numInput.innerHTML += key.innerHTML;
      operation = key.innerHTML;
      leftHand = numInput.innerHTML.slice(0, -1);

      console.log(leftHand.length);
    });
  });

  numkeysContainer.forEach((key) => {
    key.addEventListener("click", () => {
      numInput.innerHTML += key.innerHTML;
    });
  });

  equal.addEventListener("click", () => {
    let i = 0;
    let htmlContentToAppend = "";
    let a = parseFloat(leftHand);
    let b = parseFloat(numInput.innerHTML.slice(leftHand.length + 1));

    if (operation === "+") {
      result.innerHTML = a + b;
      ans = result.innerHTML;
    } else if (operation === "-") {
      result.innerHTML = a - b;
      ans = result.innerHTML;
    } else if (operation === "*") {
      result.innerHTML = a * b;
      ans = result.innerHTML;
    } else if (operation === "/") {
      if (b === 0) {
        result.innerHTML = "Math Error";
        ans = 0;
      } else {
        result.innerHTML = a / b;
        ans = result.innerHTML;
      }
    }

    if (historyArray.length <= 4) {
      historyArray.unshift({
        input: numInput.innerHTML,
        output: result.innerHTML,
      });
    } else {
      historyArray.pop();
      historyArray.unshift({
        input: numInput.innerHTML,
        output: result.innerHTML,
      });
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
