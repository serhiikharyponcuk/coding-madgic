const calculatorFirstInput = document.querySelector("#num1");
const calculatorSecondInput = document.querySelector("#num2");
const calculatorResultInput = document.querySelector("#result");
const calculatorOperationButtons = document.querySelectorAll(".buttons-group .circle-btn");
const calculatorEqualsButton = document.querySelector("#equals");

let selectedCalculatorOperation = null;

calculatorOperationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseCalculatorOperation(button.textContent);
  });
});

calculatorEqualsButton.addEventListener("click", calculateNumbers);

calculatorSecondInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculateNumbers();
  }
});

// Запам'ятовує, яку дію вибрав користувач: +, -, * або /.
function chooseCalculatorOperation(operation) {
  if (operation === selectedCalculatorOperation) {
    return; // Якщо користувач вибрав ту ж дію, нічого не робимо.
  }
  selectedCalculatorOperation = operation;
  /*
    ПЛАН РОБОТИ

    1. Записати operation у selectedCalculatorOperation.
    2. За бажанням додати активний клас на вибрану кнопку.
    3. Прибрати активний клас з інших кнопок.
  */
}

// Виконує обрану математичну дію над двома числами.
function calculateNumbers() {
  const num1 = parseFloat(calculatorFirstInput.value.trim());
  const num2 = parseFloat(calculatorSecondInput.value.trim());
  if (isNaN(num1) || isNaN(num2)) {
    return;
  }
  if (!selectedCalculatorOperation) {
    return;
  }
  let result;
  switch (selectedCalculatorOperation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        calculatorResultInput.value = "Помилка: ділення на нуль";
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }
  calculatorResultInput.value = result;
  
  /*
    ПЛАН РОБОТИ

    1. Взяти значення з calculatorFirstInput.
    2. Взяти значення з calculatorSecondInput.
    3. Перетворити обидва значення на числа.
    4. Перевірити, що обидва значення є числами.
    5. Перевірити, що користувач обрав математичну дію.
    6. Якщо дія "+", додати числа.
    7. Якщо дія "-", відняти числа.
    8. Якщо дія "*", помножити числа.
    9. Якщо дія "/", перевірити ділення на нуль і поділити числа.
    10. Записати результат у calculatorResultInput.
  */
}
