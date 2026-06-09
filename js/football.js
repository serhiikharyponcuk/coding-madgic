const field = document.querySelector(".field");
const ball = document.querySelector(".ball");
const gate = document.querySelector(".gate");
const arrow = document.querySelector(".arrow-move");
const playBtn = document.querySelector(".football-play-btn");
const stopBtn = document.querySelector(".football-stop-btn");
const overlay = document.querySelector(".football-overlay");
const score = document.querySelector("#score");
const difficultySelect = document.querySelector("#football-difficulty");
const scoreBoard = document.querySelector(".score-board");

const minArrowLength = 70;
const maxArrowLength = 150;
const desktopBallRespawnX = 150;
const difficulties = {
  easy: {
    gateSpeed: 1200,
    pauseChance: 0.7,
    minPause: 700,
    maxPause: 1800
  },
  medium: {
    gateSpeed: 800,
    pauseChance: 0.5,
    minPause: 400,
    maxPause: 1300
  },
  hard: {
    gateSpeed: 450,
    pauseChance: 0.25,
    minPause: 150,
    maxPause: 600
  }
};

let ballX = 0;
let ballY = 0;
let arrowLength = minArrowLength;
let arrowGrows = true;
let aimAngle = 0;
let activePointerId = null;
let isGameStarted = false;
let isCharging = false;
let isBallMoving = false;
let chargeTimer = null;
let ballTimer = null;
let gateTimer = null;
let shotResetTimer = null;
let gateMovesDown = true;

playBtn.addEventListener("click", startFootballGame);
stopBtn.addEventListener("click", stopFootballGame);
difficultySelect.addEventListener("change", restartGateMove);
field.addEventListener("pointerdown", startCharge);
field.addEventListener("pointermove", moveArrow);
field.addEventListener("pointerup", shootBall);
field.addEventListener("pointercancel", cancelCharge);
document.addEventListener("pointerup", shootBall);

// Починає гру: прибирає плівку, ставить м'яч і запускає ворота.
function startFootballGame() {
  isGameStarted = true;
  overlay.classList.add("hidden");
  field.classList.add("football-started");
  placeBallAtStart();
  restartGateMove();
}

// Зупиняє гру і повертає стартову плівку.
function stopFootballGame() {
  isGameStarted = false;
  isCharging = false;
  isBallMoving = false;

  clearInterval(chargeTimer);
  clearInterval(ballTimer);
  clearTimeout(gateTimer);
  clearTimeout(shotResetTimer);

  if (activePointerId !== null && field.hasPointerCapture(activePointerId)) {
    field.releasePointerCapture(activePointerId);
  }

  activePointerId = null;
  arrowLength = minArrowLength;
  arrowGrows = true;
  arrow.style.display = "none";
  rotateArrow();

  field.classList.remove("football-started", "football-aiming", "football-shooting");
  overlay.classList.remove("hidden");
  stopGateAtCenter();
}

// Ставить м'яч ближче до лівої частини поля, але підлаштовує позицію під телефон.
function placeBallAtStart() {
  const fieldRect = field.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  const mobileRespawnX = fieldRect.width * 0.28;

  ballX = Math.min(desktopBallRespawnX, mobileRespawnX);
  ballY = fieldRect.height / 2 - ballRect.height / 2;

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
  arrow.style.display = "block";
  rotateArrow();
}

// Повертає стрілку у бік курсора або пальця.
function moveArrow(event) {
  if (!isGameStarted || isBallMoving) {
    return;
  }

  if (activePointerId !== null && event.pointerId !== activePointerId) {
    return;
  }

  event.preventDefault();
  updateAim(event);
}

// Починає заряд сили удару.
function startCharge(event) {
  if (!canUseField(event)) {
    return;
  }

  event.preventDefault();
  activePointerId = event.pointerId;
  isCharging = true;
  field.classList.add("football-aiming");
  field.setPointerCapture(event.pointerId);
  updateAim(event);

  clearInterval(chargeTimer);
  chargeTimer = setInterval(changeArrowLength, 20);
}

// Перевіряє, чи можна починати удар саме з цього місця.
function canUseField(event) {
  const isDifficultyClick = event.target.closest(".football-difficulty");
  const isStopClick = event.target.closest(".football-stop-btn");
  const isOverlayClick = event.target.closest(".football-overlay");
  const isLeftMouseButton = event.pointerType !== "mouse" || event.button === 0;

  return isGameStarted && !isBallMoving && !isDifficultyClick && !isStopClick && !isOverlayClick && isLeftMouseButton;
}

// Рахує кут від центра м'яча до точки наведення.
function updateAim(event) {
  const fieldRect = field.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  const pointerX = event.clientX - fieldRect.left;
  const pointerY = event.clientY - fieldRect.top;
  const ballCenterX = ballRect.left - fieldRect.left + ballRect.width / 2;
  const ballCenterY = ballRect.top - fieldRect.top + ballRect.height / 2;

  aimAngle = Math.atan2(pointerY - ballCenterY, pointerX - ballCenterX);
  rotateArrow();
}

// Малює стрілку з поточним кутом і довжиною.
function rotateArrow() {
  const angleInDegrees = aimAngle * (180 / Math.PI);

  arrow.style.width = `${arrowLength}px`;
  arrow.style.transform = `translateY(-50%) rotate(${angleInDegrees}deg)`;
}

// Робить стрілку то довшою, то коротшою, поки гравець тримає палець або мишку.
function changeArrowLength() {
  if (arrowGrows) {
    arrowLength += 2;
  } else {
    arrowLength -= 2;
  }

  if (arrowLength >= maxArrowLength) {
    arrowGrows = false;
  }

  if (arrowLength <= minArrowLength) {
    arrowGrows = true;
  }

  rotateArrow();
}

// Відпускає м'яч у напрямку стрілки.
function shootBall(event) {
  if (!isCharging) {
    return;
  }

  if (event && activePointerId !== null && event.pointerId !== activePointerId) {
    return;
  }

  isCharging = false;
  isBallMoving = true;
  activePointerId = null;
  field.classList.remove("football-aiming");
  field.classList.add("football-shooting");
  clearInterval(chargeTimer);

  const fieldRect = field.getBoundingClientRect();
  const power = (arrowLength - minArrowLength) / (maxArrowLength - minArrowLength);
  const speed = 4 + power * 11;
  const speedX = Math.cos(aimAngle) * speed;
  const speedY = Math.sin(aimAngle) * speed;
  const maxDistance = fieldRect.width * (0.5 + power * 0.9);
  let traveledDistance = 0;

  arrow.style.display = "none";
  clearInterval(ballTimer);
  ballTimer = setInterval(() => {
    ballX += speedX;
    ballY += speedY;
    traveledDistance += speed;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    if (isGoal()) {
      addGoal();
      finishShot();
      return;
    }

    if (isBallOutsideField() || traveledDistance >= maxDistance) {
      finishShot();
    }
  }, 16);
}

// Скасовує заряд, якщо палець був перерваний системою.
function cancelCharge() {
  if (!isCharging) {
    return;
  }

  isCharging = false;
  activePointerId = null;
  field.classList.remove("football-aiming");
  clearInterval(chargeTimer);
}

// Перевіряє перетин м'яча з воротами.
function isGoal() {
  const ballRect = ball.getBoundingClientRect();
  const gateRect = gate.getBoundingClientRect();
  const goalPadding = 10;
  const goalFrontDepth = 14;
  const ballCenterY = ballRect.top + ballRect.height / 2;
  const goalFrontStart = gateRect.left + goalPadding;
  const goalFrontEnd = goalFrontStart + goalFrontDepth;
  const goalTop = gateRect.top + goalPadding;
  const goalBottom = gateRect.bottom - goalPadding;

  return ballRect.right >= goalFrontStart &&
    ballRect.left <= goalFrontEnd &&
    ballCenterY >= goalTop &&
    ballCenterY <= goalBottom;
}

// Перевіряє, чи м'яч вилетів за межі поля.
function isBallOutsideField() {
  const fieldRect = field.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  return ballRect.right < fieldRect.left ||
    ballRect.left > fieldRect.right ||
    ballRect.bottom < fieldRect.top ||
    ballRect.top > fieldRect.bottom;
}

// Додає гол і запускає маленьке святкування.
function addGoal() {
  score.textContent = Number(score.textContent) + 1;
  scoreBoard.classList.remove("score-board-goal");

  requestAnimationFrame(() => {
    scoreBoard.classList.add("score-board-goal");
  });

  setTimeout(() => {
    scoreBoard.classList.remove("score-board-goal");
  }, 520);

  showGoalConfetti();
}

// Завершує удар і повертає м'яч на старт.
function finishShot() {
  clearInterval(ballTimer);
  clearTimeout(shotResetTimer);
  arrowLength = minArrowLength;
  arrowGrows = true;
  rotateArrow();

  shotResetTimer = setTimeout(() => {
    placeBallAtStart();
    isBallMoving = false;
    field.classList.remove("football-shooting");
  }, 350);
}

// Перезапускає рух воріт після старту або зміни складності.
function restartGateMove() {
  if (!isGameStarted) {
    return;
  }

  clearTimeout(gateTimer);
  moveGate();
}

// Рухає ворота вгору-вниз і іноді робить паузу, щоб було складніше вгадати.
function moveGate() {
  const fieldRect = field.getBoundingClientRect();
  const gateRect = gate.getBoundingClientRect();
  const maxGateTop = Math.max(0, fieldRect.height - gateRect.height);
  const difficulty = difficulties[difficultySelect.value];
  const gateTop = gateMovesDown ? maxGateTop : 0;

  gate.style.transitionDuration = `${difficulty.gateSpeed}ms`;
  gate.style.top = `${gateTop}px`;
  gateMovesDown = !gateMovesDown;

  const pause = Math.random() < difficulty.pauseChance
    ? getRandomPause(difficulty.minPause, difficulty.maxPause)
    : 0;

  gateTimer = setTimeout(moveGate, difficulty.gateSpeed + pause);
}

// Ставить ворота приблизно по центру, коли гра зупинена.
function stopGateAtCenter() {
  const fieldRect = field.getBoundingClientRect();
  const gateRect = gate.getBoundingClientRect();
  const centerTop = Math.max(0, (fieldRect.height - gateRect.height) / 2);

  gate.style.transitionDuration = "0ms";
  gate.style.top = `${centerTop}px`;
}

// Дає випадкову паузу для руху воріт.
function getRandomPause(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Запускає конфеті після гола.
function showGoalConfetti() {
  if (typeof confetti !== "function") {
    return;
  }

  confetti({
    particleCount: 90,
    spread: 75,
    origin: {
      x: 0.78,
      y: 0.55
    }
  });
}
