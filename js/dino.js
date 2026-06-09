const dinoGameField = document.querySelector(".game-field");
const dino = document.querySelector(".dino-image");
const cactuses = document.querySelectorAll(".cactus-image");
const pterodactyl = document.querySelector(".pterodactyl-image");
const dinoStartBtn = document.querySelector("#startBtn");
const dinoScore = document.querySelector("#dino-score");
const dinoRecordText = document.querySelector("#dino-record");
const dinoHorizon = document.querySelector(".dino-horizon");
const dinoHorizonPieces = document.querySelectorAll(".dino-horizon-piece");
const dinoModal = document.querySelector(".dino-modal");
const dinoModalScore = document.querySelector(".dino-modal-score");
const dinoModalRecord = document.querySelector(".dino-modal-record");
const dinoModalBtn = document.querySelector(".dino-modal-btn");
const dinoModalEndBtn = document.querySelector(".dino-modal-end-btn");

let isDinoGameStarted = false;
let isDinoJumping = false;
let dinoPoints = 0;
let recordBeforeRound = 0;

let obstacleMoveTimer = null;
let dinoScoreTimer = null;

let obstacleRight = -100;
let obstacleSpeed = 2;
let obstacleType = "one-cactus";
let horizonPosition = 0;
let cloudPosition = 0;

const dinoJumpTime = 960;
const cactusGap = 17;
const horizonWidth = 600;
const speedIncreaseEveryPoints = 25;
const speedIncreaseStep = 0.25;
const dinoRecordStorageKey = "dinoRecord";
const dinoRecordSecret = "coding-magic-dino";

let dinoRecord = getSavedDinoRecord();
recordBeforeRound = dinoRecord;

dinoRecordText.textContent = dinoRecord;

dinoStartBtn.addEventListener("click", startDinoGame);
dinoModalBtn.addEventListener("click", startDinoGame);
dinoModalEndBtn.addEventListener("click", finishDinoGameSession);

dinoModal.addEventListener("click", (event) => {
  if (event.target === dinoModal) {
    hideDinoModal();
  }
});

// Стрибок з клавіатури. Працює тільки коли гра вже почалась.
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && isDinoGameStarted) {
    event.preventDefault();
    jumpDino();
  }
});

// Стрибок кліком по полю. Це зручно для телефона або планшета.
dinoGameField.addEventListener("click", () => {
  if (isDinoGameStarted) {
    jumpDino();
  }
});

// Починає гру: обнуляє очки, швидкість, фон і запускає таймери.
function startDinoGame() {
  clearInterval(obstacleMoveTimer);
  clearInterval(dinoScoreTimer);

  isDinoGameStarted = true;
  isDinoJumping = false;
  dinoPoints = 0;
  recordBeforeRound = dinoRecord;
  obstacleRight = -100;
  obstacleSpeed = 2;
  horizonPosition = 0;
  cloudPosition = dinoGameField.offsetWidth * 0.7;

  dinoScore.textContent = dinoPoints;
  dinoRecordText.textContent = dinoRecord;
  dinoStartBtn.setAttribute("disabled", "disabled");
  dinoStartBtn.textContent = "Почати гру";
  dino.classList.remove("jump");
  dinoGameField.classList.add("is-running");
  hideDinoModal();
  moveDinoBackground();

  chooseNextObstacle();

  obstacleMoveTimer = setInterval(moveObstacle, 20);
  dinoScoreTimer = setInterval(addDinoPoint, 50);
}

// Робить стрибок динозаврика і не дозволяє стрибати повторно в повітрі.
function jumpDino() {
  if (isDinoJumping) {
    return;
  }

  isDinoJumping = true;
  dino.classList.add("jump");

  setTimeout(() => {
    dino.classList.remove("jump");
    isDinoJumping = false;
  }, dinoJumpTime);
}

// Обирає наступну перешкоду. Чим більше очок, тим складніші варіанти.
function chooseNextObstacle() {
  let obstacleTypes = ["one-cactus"];

  if (dinoPoints >= 120) {
    obstacleTypes = ["one-cactus", "two-cactuses"];
  }

  if (dinoPoints >= 260) {
    obstacleTypes = ["one-cactus", "two-cactuses", "three-cactuses"];
  }

  if (dinoPoints >= 350) {
    obstacleTypes = ["one-cactus", "two-cactuses", "three-cactuses", "pterodactyl"];
  }

  if (dinoPoints === 0) {
    obstacleType = "one-cactus";
    obstacleRight = getObstacleStartRight();
    hideAllObstacles();
    showObstacle();
    return;
  }

  const randomIndex = Math.floor(Math.random() * obstacleTypes.length);

  obstacleType = obstacleTypes[randomIndex];
  obstacleRight = getObstacleStartRight();

  hideAllObstacles();
  showObstacle();
}

// Рухає активну перешкоду, фон і перевіряє програш.
function moveObstacle() {
  obstacleRight += obstacleSpeed;
  moveDinoBackground();
  showObstacle();

  if (isDinoCollision()) {
    endDinoGame();
    return;
  }

  if (obstacleRight > getObstacleEndRight()) {
    chooseNextObstacle();
  }
}

// Рахує правий край дороги, щоб перешкоди не спавнились поза лінією горизонту.
function getObstacleStartRight() {
  const fieldWidth = dinoGameField.offsetWidth;
  const horizonWidthOnScreen = dinoHorizon.offsetWidth;
  const sideSpace = (fieldWidth - horizonWidthOnScreen) / 2;

  return Math.max(0, sideSpace - getCurrentObstacleWidth());
}

// Рахує момент, коли перешкода вже пройшла лівий край дороги і можна брати нову.
function getObstacleEndRight() {
  const fieldWidth = dinoGameField.offsetWidth;
  const horizonWidthOnScreen = dinoHorizon.offsetWidth;
  const sideSpace = (fieldWidth - horizonWidthOnScreen) / 2;

  return fieldWidth - sideSpace + 80;
}

// У птеродактиля і кактуса різна ширина, тому стартову позицію рахуємо під активну перешкоду.
function getCurrentObstacleWidth() {
  if (obstacleType === "pterodactyl") {
    return 46;
  }

  return 17;
}

// Рухає дорогу з тією ж швидкістю, що й кактуси, а хмаринку повільніше.
function moveDinoBackground() {
  horizonPosition += obstacleSpeed;

  if (horizonPosition >= horizonWidth) {
    horizonPosition = 0;
  }

  dinoHorizonPieces.forEach((piece) => {
    piece.style.transform = `translateX(${-horizonPosition}px)`;
  });

  cloudPosition -= obstacleSpeed * 0.25;

  if (cloudPosition < -60) {
    cloudPosition = dinoGameField.offsetWidth + 80;
  }

  dinoGameField.style.setProperty("--dino-cloud-left", `${cloudPosition}px`);
}

// Показує потрібну перешкоду за її назвою.
function showObstacle() {
  if (obstacleType === "one-cactus") {
    showCactuses(1);
    return;
  }

  if (obstacleType === "two-cactuses") {
    showCactuses(2);
    return;
  }

  if (obstacleType === "three-cactuses") {
    showCactuses(3);
    return;
  }

  showPterodactyl();
}

// Показує 1, 2 або 3 маленькі кактуси поруч.
function showCactuses(count) {
  pterodactyl.style.display = "none";

  cactuses.forEach((cactus, index) => {
    if (index < count) {
      cactus.style.display = "block";
      cactus.style.right = `${obstacleRight + index * cactusGap}px`;
    } else {
      cactus.style.display = "none";
      cactus.style.right = "-100px";
    }
  });
}

// Показує птеродактиля і ховає всі кактуси.
function showPterodactyl() {
  cactuses.forEach((cactus) => {
    cactus.style.display = "none";
    cactus.style.right = "-100px";
  });

  pterodactyl.style.display = "block";
  pterodactyl.style.right = `${obstacleRight}px`;
}

// Додає очки, оновлює рекорд і поступово прискорює гру без ліміту.
function addDinoPoint() {
  dinoPoints += 1;
  dinoScore.textContent = dinoPoints;
  updateDinoRecord();

  if (dinoPoints % speedIncreaseEveryPoints === 0) {
    obstacleSpeed += speedIncreaseStep;
  }
}

// Якщо поточні очки більші за рекорд, зберігає новий рекорд.
function updateDinoRecord() {
  if (dinoPoints > dinoRecord) {
    dinoRecord = dinoPoints;
    saveDinoRecord(dinoRecord);
  }

  dinoRecordText.textContent = dinoRecord;
}

// Читає рекорд із localStorage і перевіряє простий контрольний код.
function getSavedDinoRecord() {
  try {
    const savedText = localStorage.getItem(dinoRecordStorageKey);

    if (!savedText) {
      return 0;
    }

    const savedRecord = JSON.parse(savedText);
    const savedScore = Number(savedRecord.score);
    const savedCode = savedRecord.code;

    if (Number.isNaN(savedScore) || savedScore < 0) {
      return 0;
    }

    if (savedCode !== createDinoRecordCode(savedScore)) {
      return 0;
    }

    return savedScore;
  } catch (error) {
    return 0;
  }
}

// Зберігає рекорд разом із контрольним кодом.
function saveDinoRecord(record) {
  const recordData = {
    score: record,
    code: createDinoRecordCode(record),
  };

  localStorage.setItem(dinoRecordStorageKey, JSON.stringify(recordData));
}

// Створює контрольний код для рекорду.
function createDinoRecordCode(record) {
  return btoa(`${record * 37 + 11}-${dinoRecordSecret}`);
}

// Перевіряє, чи динозаврик торкнувся будь-якої видимої перешкоди.
function isDinoCollision() {
  const obstacles = [...cactuses, pterodactyl];

  return obstacles.some((obstacle) => {
    if (obstacle.style.display === "none") {
      return false;
    }

    return isElementsTouching(dino, obstacle);
  });
}

// Перевіряє перетин двох прямокутників на сторінці.
function isElementsTouching(firstElement, secondElement) {
  const firstRect = firstElement.getBoundingClientRect();
  const secondRect = secondElement.getBoundingClientRect();

  return (
    firstRect.left + 8 < secondRect.right &&
    firstRect.right - 8 > secondRect.left &&
    firstRect.top + 8 < secondRect.bottom &&
    firstRect.bottom - 8 > secondRect.top
  );
}

// Завершує гру: зупиняє таймери, показує повідомлення і кнопку повтору.
function endDinoGame() {
  isDinoGameStarted = false;
  clearInterval(obstacleMoveTimer);
  clearInterval(dinoScoreTimer);

  dinoStartBtn.removeAttribute("disabled");
  dinoStartBtn.textContent = "Зіграти ще раз";
  dinoGameField.classList.remove("is-running");
  hideAllObstacles();
  showDinoModal();
}

// Показує результат після програшу: очки, рекорд і скільки бракує до нового.
function showDinoModal() {
  const isNewRecord = dinoPoints > recordBeforeRound;

  dinoModalScore.textContent = `Ваш результат: ${dinoPoints}`;

  if (isNewRecord) {
    dinoModalRecord.textContent = `Новий рекорд: ${dinoRecord}`;
  } else {
    const pointsToNewRecord = dinoRecord - dinoPoints + 1;
    dinoModalRecord.textContent = `Рекорд: ${dinoRecord}. До нового рекорду потрібно ще ${pointsToNewRecord} оч.`;
  }

  dinoModal.classList.add("show");
  dinoModal.setAttribute("aria-hidden", "false");
}

// Ховає модалку перед новим раундом або після кліку по затемненому фону.
function hideDinoModal() {
  dinoModal.classList.remove("show");
  dinoModal.setAttribute("aria-hidden", "true");
}

// Закриває модалку після завершення гри, не запускаючи новий раунд.
function finishDinoGameSession() {
  hideDinoModal();
  dinoStartBtn.removeAttribute("disabled");
  dinoStartBtn.textContent = "Почати гру";
}

// Ховає всі перешкоди і повертає їх за правий край.
function hideAllObstacles() {
  cactuses.forEach((cactus) => {
    cactus.style.display = "none";
    cactus.style.right = "-100px";
  });

  pterodactyl.style.display = "none";
  pterodactyl.style.right = "-120px";
}
