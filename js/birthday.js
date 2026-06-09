const birthdayInput = document.querySelector(".input_birthday");
const birthdayButton = document.querySelector(".birthday_search_btn");
const birthdayText = document.querySelector("#text_birthday");

birthdayButton.addEventListener("click", checkBirthdayYear);

birthdayInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkBirthdayYear();
  }
});

// Перевіряє рік після кліку або натискання Enter.
function checkBirthdayYear() {
  const yearValue = birthdayInput.value.trim();
  const year = Number(yearValue);
  const currentYear = new Date().getFullYear();

  if (yearValue === "") {
    showBirthdayMessage("Введіть рік народження", "error");
    return;
  }

  if (!Number.isInteger(year)) {
    showBirthdayMessage("Рік має бути цілим числом", "error");
    return;
  }

  if (year < 1) {
    showBirthdayMessage("Введіть реальний рік", "error");
    return;
  }

  if (year > currentYear) {
    showBirthdayMessage("Цей рік ще не настав", "error");
    return;
  }

  if (isLeapYear(year)) {
    showBirthdayMessage("Ви народилися у високосний рік!", "success");
    return;
  }

  showBirthdayMessage("Ваш рік народження не високосний", "neutral");
}

// Перевіряє, чи є рік високосним.
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  return year % 4 === 0;
}

// Показує повідомлення і запускає маленьку анімацію.
function showBirthdayMessage(message, status) {
  birthdayText.textContent = message;
  birthdayText.classList.remove("birthday-success", "birthday-error", "birthday-neutral", "birthday-show");
  birthdayText.classList.add(`birthday-${status}`);

  requestAnimationFrame(() => {
    birthdayText.classList.add("birthday-show");
  });
}
