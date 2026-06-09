const calculatorFirstInput = document.querySelector("#num1");
const calculatorSecondInput = document.querySelector("#num2");
const calculatorResultInput = document.querySelector("#result");
const calculatorOperationButtons = document.querySelectorAll(".buttons-group .circle-btn");
const calculatorEqualsButton = document.querySelector("#equals");

let selectedCalculatorOperation = null;

calculatorOperationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseCalculatorOperation(button);
  });
});

calculatorEqualsButton.addEventListener("click", calculateNumbers);

[calculatorFirstInput, calculatorSecondInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      calculateNumbers();
    }
  });
});

// Запам'ятовує обрану математичну дію і підсвічує її кнопку.
function chooseCalculatorOperation(button) {
  selectedCalculatorOperation = button.textContent.trim();

  calculatorOperationButtons.forEach((operationButton) => {
    operationButton.classList.remove("active");
  });

  button.classList.add("active");
  showCalculatorResult("Готово", false);
}

// Бере два числа, виконує обрану дію і показує результат.
function calculateNumbers() {
  const firstValue = calculatorFirstInput.value.trim();
  const secondValue = calculatorSecondInput.value.trim();
  const num1 = Number(firstValue);
  const num2 = Number(secondValue);

  if (firstValue === "" || secondValue === "" || Number.isNaN(num1) || Number.isNaN(num2)) {
    showCalculatorResult("Введіть два числа", true);
    return;
  }

  if (!selectedCalculatorOperation) {
    showCalculatorResult("Оберіть дію", true);
    return;
  }

  if (selectedCalculatorOperation === "/" && num2 === 0) {
    showCalculatorResult("На нуль ділити не можна", true);
    return;
  }

  const result = getCalculatorResult(num1, num2);
  const formattedResult = Number.isInteger(result) ? result : Number(result.toFixed(2));

  showCalculatorResult(formattedResult, false);
}

// Окремо рахує результат, щоб основна функція залишалась простою.
function getCalculatorResult(num1, num2) {
  if (selectedCalculatorOperation === "+") {
    return num1 + num2;
  }

  if (selectedCalculatorOperation === "-") {
    return num1 - num2;
  }

  if (selectedCalculatorOperation === "*") {
    return num1 * num2;
  }

  return num1 / num2;
}

// Виводить текст у поле результату і запускає потрібну анімацію.
function showCalculatorResult(value, isError) {
  calculatorResultInput.value = value;
  calculatorResultInput.classList.remove("result-ready", "result-error");

  requestAnimationFrame(() => {
    calculatorResultInput.classList.add(isError ? "result-error" : "result-ready");
  });
}
