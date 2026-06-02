const inputNumberGuess = document.querySelector(".input_number_guess");
const submitNumberGuess = document.querySelector(".number_guess_search_btn");
const countAttempts = document.querySelector(".count_attempts");
const textNumberGuess = document.querySelector("#text_number_guess");
const numberGuessModal = document.querySelector(".number-guess-modal");
const numberGuessModalTitle = document.querySelector(".number-guess-modal-title");
const numberGuessModalText = document.querySelector(".number-guess-modal-text");
const numberGuessNewGameBtn = document.querySelector(".number-guess-modal-new-game");
const numberGuessCloseBtn = document.querySelector(".number-guess-modal-close");

let attempts = 3;
let computerChoice = computerGuess();

submitNumberGuess.addEventListener("click", playGuessRound);
numberGuessNewGameBtn.addEventListener("click", startNewGuessGame);
numberGuessCloseBtn.addEventListener("click", hideNumberGuessModal);

numberGuessModal.addEventListener("click", (event) => {
    if (event.target === numberGuessModal) {
        hideNumberGuessModal();
    }
});

inputNumberGuess.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        playGuessRound();
    }
});

function playGuessRound() {
    if (attempts === 0) {
        startNewGuessGame();
        return;
    }

    const userGuess = getUserGuess();

    if (userGuess === null) {
        showGuessMessage("Введіть число від 0 до 10.", "red");
        return;
    }

    if (userGuess === computerChoice) {
        attempts = 0;
        updateAttempts();
        showGuessMessage("Вітаємо! Ви вгадали число.", "green");
        showNumberGuessModal("Ви вгадали!", `Загадане число: ${computerChoice}`, "win");
        showNumberGuessConfetti();
        return;
    }

    attempts -= 1;
    updateAttempts();

    if (attempts === 0) {
        showGuessMessage(`Спроби закінчилися. Було загадано число ${computerChoice}.`, "red");
        showNumberGuessModal("Спроби закінчилися", `Комп’ютер загадав число ${computerChoice}. Спробуйте ще раз!`, "lose");
        return;
    }

    if (userGuess < computerChoice) {
        showGuessMessage("Загадане число більше. Спробуйте ще раз.", "red");
    } else {
        showGuessMessage("Загадане число менше. Спробуйте ще раз.", "red");
    }

    inputNumberGuess.select();
}

function startNewGuessGame() {
    hideNumberGuessModal();
    attempts = 3;
    computerChoice = computerGuess();
    inputNumberGuess.value = "";
    updateAttempts();
    showGuessMessage("Нове число загадано. Спробуйте вгадати!", "green");
    inputNumberGuess.focus();
}

function computerGuess() {
    return Math.floor(Math.random() * 11);
}

function getUserGuess() {
    const userGuess = Number(inputNumberGuess.value);

    if (inputNumberGuess.value === "" || !Number.isInteger(userGuess) || userGuess < 0 || userGuess > 10) {
        return null;
    }

    return userGuess;
}

function updateAttempts() {
    countAttempts.textContent = attempts;
}

function showGuessMessage(message, colorClass) {
    textNumberGuess.textContent = message;
    textNumberGuess.classList.remove("green", "red");
    textNumberGuess.classList.add(colorClass);
}

function showNumberGuessConfetti() {
    if (typeof confetti !== "function") return;

    confetti({
        particleCount: 90,
        spread: 75,
        origin: {
            x: 0.5,
            y: 0.58
        }
    });
}

function showNumberGuessModal(title, text, resultClass) {
    numberGuessModalTitle.textContent = title;
    numberGuessModalText.textContent = text;
    numberGuessModal.classList.remove("win", "lose");
    numberGuessModal.classList.add("show", resultClass);
    numberGuessModal.setAttribute("aria-hidden", "false");
}

function hideNumberGuessModal() {
    numberGuessModal.classList.remove("show", "win", "lose");
    numberGuessModal.setAttribute("aria-hidden", "true");
}
