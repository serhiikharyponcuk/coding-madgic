const birthdayInput = document.querySelector(".input_birthday");
const birthdayButton = document.querySelector(".birthday_search_btn");
const birthdayText = document.querySelector("#text_birthday");

birthdayButton.addEventListener("click", checkBirthdayYear);

birthdayInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkBirthdayYear();
  }
});

// Запускає перевірку року народження після кліку або натискання Enter.
function checkBirthdayYear() {
  /*
    ПЛАН РОБОТИ

    1. Взяти значення з birthdayInput.
    2. Перетворити його на число.
    3. Перевірити, що користувач ввів реальний рік.
    4. Викликати функцію isLeapYear.
    5. Якщо рік високосний, показати зелене повідомлення.
    6. Якщо рік не високосний, показати червоне повідомлення.
    7. Якщо введення неправильне, показати підказку.
  */
}

// Перевіряє, чи є рік високосним.
function isLeapYear(year) {
  /*
    ПЛАН РОБОТИ

    1. Якщо рік ділиться на 400, це високосний рік.
    2. Якщо рік ділиться на 100, це не високосний рік.
    3. Якщо рік ділиться на 4, це високосний рік.
    4. В інших випадках рік не високосний.
  */
}
