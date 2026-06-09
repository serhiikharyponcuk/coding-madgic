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
  const minutesValue = timecalcMinutesInput.value.trim();
  const minutes = Number(minutesValue);

  if (minutesValue === "") {
    showTimecalcResult("Введіть кількість хвилин", true);
    return;
  }

  if (!Number.isInteger(minutes)) {
    showTimecalcResult("Введіть ціле число хвилин", true);
    return;
  }

  if (minutes < 0) {
    showTimecalcResult("Введіть 0 або більше хвилин", true);
    return;
  }

  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const remainingMinutes = minutes % 60;

  showTimecalcResult(`${days} дн. ${hours} год. ${remainingMinutes} хв.`, false);
}

// Оновлює текст результату і запускає анімацію успіху або помилки.
function showTimecalcResult(text, isError) {
  timecalcResult.textContent = text;
  timecalcResult.classList.remove("timecalc-ready", "timecalc-error");

  requestAnimationFrame(() => {
    timecalcResult.classList.add(isError ? "timecalc-error" : "timecalc-ready");
  });
}
