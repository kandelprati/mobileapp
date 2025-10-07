'use strict';

// Initial values and flags
var wkFirst = "1";   // First input flag (1 = first input, 0 = after first input)
var wkTotal = 0;     // Total value
var wkInput = "";    // Currently clicked button value (not used in this snippet)
var wkCalc = "+";    // Current operation, initially "+"
var wkBefore = "1";  // Previous input state: 0 = number, 1 = operator

// Get elements on the page
const elementCalcLog = document.getElementById("calcLog");
const elementResult = document.getElementById("result");

const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");
const num0 = document.getElementById("num0");

const elementAdd = document.getElementById("add");
const elementSub = document.getElementById("sub");
const elementMult = document.getElementById("mult");
const elementDiv = document.getElementById("div");
const elementEqual = document.getElementById("equal");
const elementClear = document.getElementById("cancel");

// Attach event listeners for number buttons
num1.addEventListener("click", function (){edit("1")});
num2.addEventListener("click", function (){edit("2")});
num3.addEventListener("click", function (){edit("3")});
num4.addEventListener("click", function (){edit("4")});
num5.addEventListener("click", function (){edit("5")});
num6.addEventListener("click", function (){edit("6")});
num7.addEventListener("click", function (){edit("7")});
num8.addEventListener("click", function (){edit("8")});
num9.addEventListener("click", function (){edit("9")});
num0.addEventListener("click", function (){edit("0")});

// Attach event listeners for operator buttons
elementAdd.addEventListener("click", function() {update("+")});
elementSub.addEventListener("click", function() {update("-")});
elementMult.addEventListener("click", function() {update("*")});
elementDiv.addEventListener("click", function() {update("/")});

// Attach event listeners for equal and clear buttons
elementEqual.addEventListener("click", dspResult);
elementClear.addEventListener("click", clear);

// keyboardからの入力
document.addEventListener("keydown", keydownEvent, false);

// keydown
function keydownEvent(event) {
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) edit(event.key);
  if (["+", "-", "*", "/"].includes(event.key)) update(event.key);
  if (["=", "Enter"].includes(event.key)) dspResult();
  if (["c", "C", "Escape", "Backspace", "Delete"].includes(event.key)) clear();
}

// Function to handle number input
function edit(input) {
  if (wkBefore === "0") {
    // If previous input was a number, append the new digit (string concatenation)
    elementResult.innerHTML += input;
  } 
  else {
    // If previous input was an operator, start fresh with this digit
    elementResult.innerHTML = input;
  }
  wkFirst = "0";  // No longer the first input
  wkBefore = "0"; // Last input is a number
}

// Function to handle operator input
function update(calcType) {
  if (wkBefore === "0") {
    // If last input was a number, add it and operator to calculation log
    elementCalcLog.innerHTML = elementCalcLog.innerHTML + elementResult.innerHTML + calcType;
    calculator(); // Perform calculation immediately
  } else {
    // If last input was also operator
    if (wkFirst === "1") {
      // If first input, start calculation log with 0 + operator
      elementCalcLog.innerHTML = "0" + calcType;
    } else {
      // Replace last operator with the new one if exists
      let wkloglastword = elementCalcLog.innerHTML.slice(-1);
      if (["+", "-", "*", "/"].includes(wkloglastword)) {
        elementCalcLog.innerHTML = elementCalcLog.innerHTML.slice(0, -1) + calcType;
      } 
      else {
        // Otherwise append operator
        elementCalcLog.innerHTML = elementCalcLog.innerHTML + calcType;
      }
    }
  }
  wkCalc = calcType; // Update current operation
  wkBefore = "1";    // Last input is operator
}

// Function to display the result when "=" is pressed
function dspResult() {
  if (wkFirst === "0" && wkBefore === "0") {
    elementCalcLog.innerHTML = elementCalcLog.innerHTML + elementResult.innerHTML;
    calculator();
    wkCalc = "=";
    wkBefore = "1";
  }
}

// Function to clear everything
function clear() {
  elementResult.innerHTML = 0;
  elementCalcLog.innerHTML = "";
  wkFirst = "1";
  wkTotal = 0;
  wkCalc = "+";
  wkBefore = "1";
}

// Calculation logic based on current operator
function calculator() {
  switch (wkCalc) {
    case "+":
      wkTotal = Number(wkTotal) + Number(elementResult.innerHTML);
      break;
    case "-":
      wkTotal = Number(wkTotal) - Number(elementResult.innerHTML);
      break;
    case "*":
      wkTotal = Number(wkTotal) * Number(elementResult.innerHTML);
      break;
    case "/":
      wkTotal = Number(wkTotal) / Number(elementResult.innerHTML);
      break;
  }
  elementResult.innerHTML = wkTotal;
}

