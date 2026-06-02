const rockPaperScissorsList = document.querySelector("#rock-paper-scissors-list");
const compScore = document.querySelector(".comp_score");
const myScore = document.querySelector(".my_score");
const drawScore = document.querySelector(".draw_score");
const myAnswerImg = document.querySelector(".my_answer");
const compAnswerImg = document.querySelector(".comp_answer");
const roundResultText = document.querySelector("#text_rock_paper_scissors");
const continueBtn = document.querySelector(".btn_continue");
const resultModal = document.querySelector(".rock-paper-scissors-modal");
const resultModalText = document.querySelector(".rock-paper-scissors-modal-result");
const newGameModalBtn = document.querySelector(".rock-paper-scissors-modal-btn");

const rockPaperScissors = {
    stone: {
        src: "./images/rock.svg",
        alt: "Камінь"
    },
    scissors: {
        src: "./images/scissors.svg",
        alt: "Ножиці"
    },
    paper: {
        src: "./images/paper.svg",
        alt: "Папір"
    }
};

let isRoundActive = false;
let computerAnswerTimer = null;
let playedRounds = 0;
let isGameFinished = false;
const maxRounds = 5;

rockPaperScissorsList.addEventListener("click", (event) => {
    const clickedButton = event.target.closest("button");
    if (!clickedButton || isRoundActive) return;

    const userAnswer = clickedButton.id;
    const computerAnswer = randomComputerAnswer(Object.keys(rockPaperScissors));

    isRoundActive = true;
    highlightSelectedButton(clickedButton);
    showAnswer(myAnswerImg, userAnswer);
    hideAnswer(compAnswerImg);
    showRoundResult("Комп’ютер думає...", "draw");
    roundResultText.classList.add("thinking");

    computerAnswerTimer = setTimeout(() => {
        const result = getWinner(userAnswer, computerAnswer);

        roundResultText.classList.remove("thinking");
        showAnswer(compAnswerImg, computerAnswer);
        updateScores(result);
        playedRounds += 1;
        showRoundResult(getRoundMessage(result), result.type);
        computerAnswerTimer = null;

        if (playedRounds === maxRounds) {
            finishRockPaperScissorsGame();
        }
    }, 1000);
});

continueBtn.addEventListener("click", resetRockPaperScissorsRound);
newGameModalBtn.addEventListener("click", startNewRockPaperScissorsGame);
resultModal.addEventListener("click", (event) => {
    if (event.target === resultModal) {
        startNewRockPaperScissorsGame();
    }
});

function getWinner(userAnswer, computerAnswer) {
    if (userAnswer === computerAnswer) {
        return {
            type: "draw",
            text: "Нічия!"
        };
    }

    if ((userAnswer === "stone" && computerAnswer === "scissors") ||
        (userAnswer === "scissors" && computerAnswer === "paper") ||
        (userAnswer === "paper" && computerAnswer === "stone")) {
        return {
            type: "win",
            text: "Ви виграли!"
        };
    }

    return {
        type: "lose",
        text: "Комп’ютер виграв!"
    };
}

function updateScores(result) {
    if (result.type === "win") {
        myScore.textContent = parseInt(myScore.textContent) + 1;
    } else if (result.type === "lose") {
        compScore.textContent = parseInt(compScore.textContent) + 1;
    } else {
        drawScore.textContent = parseInt(drawScore.textContent) + 1;
    }
}

function randomComputerAnswer(answers) {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}

function showAnswer(answerImg, answer) {
    answerImg.src = rockPaperScissors[answer].src;
    answerImg.alt = rockPaperScissors[answer].alt;
    answerImg.style.display = "block";
}

function hideAnswer(answerImg) {
    answerImg.removeAttribute("src");
    answerImg.alt = "";
    answerImg.style.display = "none";
}

function showRoundResult(text, type) {
    roundResultText.textContent = text;
    roundResultText.classList.remove("win", "lose", "draw");
    roundResultText.classList.add(type);
}

function resetRockPaperScissorsRound() {
    clearTimeout(computerAnswerTimer);
    computerAnswerTimer = null;

    if (isGameFinished) {
        playedRounds = 0;
        isGameFinished = false;
        myScore.textContent = "0";
        compScore.textContent = "0";
        drawScore.textContent = "0";
        continueBtn.textContent = "Наступний раунд";
    }

    isRoundActive = false;
    hideAnswer(myAnswerImg);
    hideAnswer(compAnswerImg);
    clearSelectedButtons();
    roundResultText.textContent = "";
    roundResultText.classList.remove("win", "lose", "draw", "thinking");
}

function getRoundMessage(result) {
    if (playedRounds < maxRounds) {
        return result.text;
    }

    return `${result.text} ${getFinalGameMessage()}`;
}

function getFinalGameMessage() {
    const userPoints = parseInt(myScore.textContent);
    const computerPoints = parseInt(compScore.textContent);

    if (userPoints > computerPoints) {
        return "Ви виграли гру!";
    }

    if (computerPoints > userPoints) {
        return "Комп’ютер виграв гру!";
    }

    return "Гра завершилась нічиєю!";
}

function finishRockPaperScissorsGame() {
    isGameFinished = true;
    isRoundActive = true;
    continueBtn.textContent = "Нова гра";
    showRockPaperScissorsModal();

    if (didUserWinRockPaperScissorsGame()) {
        showRockPaperScissorsConfetti();
    }
}

function didUserWinRockPaperScissorsGame() {
    const userPoints = parseInt(myScore.textContent);
    const computerPoints = parseInt(compScore.textContent);

    return userPoints > computerPoints;
}

function showRockPaperScissorsConfetti() {
    if (typeof confetti !== "function") return;

    confetti({
        particleCount: 120,
        spread: 90,
        origin: {
            x: 0.5,
            y: 0.62
        }
    });
}

function showRockPaperScissorsModal() {
    resultModalText.textContent = getFinalGameMessage();
    resultModal.classList.add("show");
    resultModal.setAttribute("aria-hidden", "false");
}

function startNewRockPaperScissorsGame() {
    resultModal.classList.remove("show");
    resultModal.setAttribute("aria-hidden", "true");
    resetRockPaperScissorsRound();
}

function highlightSelectedButton(selectedButton) {
    clearSelectedButtons();
    selectedButton.classList.add("selected");
}

function clearSelectedButtons() {
    const choiceButtons = rockPaperScissorsList.querySelectorAll("button");

    choiceButtons.forEach((button) => {
        button.classList.remove("selected");
    });
}
