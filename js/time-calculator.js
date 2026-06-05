const timecalcMinutesInput = document.querySelector("#timecalc-minutesInput");
const timecalcButton = document.querySelector("#timecalc-button");
const timecalcResult = document.querySelector("#timecalc-result");

timecalcButton.addEventListener("click", calculateTime);

timecalcMinutesInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculateTime();
  }
});

// Запускає калькулятор часу після кліку або натискання Enter.
function calculateTime() {
  const minutes = parseInt(timecalcMinutesInput.value);
  if (isNaN(minutes) || minutes < 0) {
    timecalcResult.textContent = "Будь ласка, введіть правильне число хвилин.";
    return;
  }
  
  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const remainingMinutes = minutes % 60;
  console.log(minutes, days, hours, remainingMinutes);
  timecalcResult.textContent = `${minutes} хвилин це ${days} днів, ${hours} годин і ${remainingMinutes} хвилин.`;

  /*
    ПЛАН РОБОТИ

    1. Взяти значення з timecalcMinutesInput.
    2. Перетворити його на число.
    3. Перевірити, що користувач ввів правильне число хвилин.
    4. Порахувати:
       - скільки це днів;
       - скільки годин залишилось;
       - скільки хвилин залишилось.
    5. Красиво вивести результат у timecalcResult.
    6. Якщо значення неправильне, показати підказку замість результату.
  */
}
console.log("Калькулятор часу завантажено.");
