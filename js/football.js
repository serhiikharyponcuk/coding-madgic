const field = document.querySelector('.field');
const ball = document.querySelector('.ball');
const gate = document.querySelector('.gate');
const arrow = document.querySelector('.arrow-move');
const playBtn = document.querySelector('.football-play-btn');
const overlay = document.querySelector('.football-overlay');
const score = document.querySelector('#score');
const difficultySelect = document.querySelector('#football-difficulty');

const minArrowLength = 70;
const maxArrowLength = 150;
const ballRespawnX = 150;
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
let isCharging = false;
let isBallMoving = false;
let chargeTimer = null;
let ballTimer = null;
let gateTimer = null;
let gateMovesDown = true;

playBtn.addEventListener('click', startFootballGame);
field.addEventListener('mousemove', moveArrow);
field.addEventListener('mousedown', startCharge);
document.addEventListener('mouseup', shootBall);

function startFootballGame() {
    overlay.classList.add('hidden');
    placeBallAtStart();
    moveGate();
}

function placeBallAtStart() {
    const fieldRect = field.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    ballX = ballRespawnX;
    ballY = fieldRect.height / 2 - ballRect.height / 2;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    arrow.style.display = 'block';
}

function moveArrow(event) {
    if (isBallMoving) return;

    const fieldRect = field.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const cursorX = event.clientX - fieldRect.left;
    const cursorY = event.clientY - fieldRect.top;
    const ballCenterX = ballRect.left - fieldRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top - fieldRect.top + ballRect.height / 2;

    aimAngle = Math.atan2(cursorY - ballCenterY, cursorX - ballCenterX);
    rotateArrow();
}

function rotateArrow() {
    const angleInDegrees = aimAngle * (180 / Math.PI);

    arrow.style.transform = `translateY(-50%) rotate(${angleInDegrees}deg)`;
}

function startCharge(event) {
    if (event.button !== 0 || isBallMoving || !overlay.classList.contains('hidden')) return;

    isCharging = true;
    clearInterval(chargeTimer);
    chargeTimer = setInterval(changeArrowLength, 20);
}

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

    arrow.style.width = `${arrowLength}px`;
}

function shootBall() {
    if (!isCharging) return;

    isCharging = false;
    clearInterval(chargeTimer);

    const power = (arrowLength - minArrowLength) / (maxArrowLength - minArrowLength);
    const speed = 3 + power * 11;
    const speedX = Math.cos(aimAngle) * speed;
    const speedY = Math.sin(aimAngle) * speed;
    const maxDistance = 160 + power * 650;
    let traveledDistance = 0;

    isBallMoving = true;
    arrow.style.display = 'none';

    clearInterval(ballTimer);
    ballTimer = setInterval(() => {
        ballX += speedX;
        ballY += speedY;
        traveledDistance += speed;
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        if (isGoal()) {
            score.textContent = Number(score.textContent) + 1;
            showGoalConfetti();
            finishShot();
        } else if (isBallOutsideField() || traveledDistance >= maxDistance) {
            finishShot();
        }
    }, 16);
}

function isGoal() {
    const ballRect = ball.getBoundingClientRect();
    const gateRect = gate.getBoundingClientRect();

    return ballRect.right > gateRect.left &&
        ballRect.left < gateRect.right &&
        ballRect.bottom > gateRect.top &&
        ballRect.top < gateRect.bottom;
}

function isBallOutsideField() {
    const fieldRect = field.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    return ballRect.right < fieldRect.left ||
        ballRect.left > fieldRect.right ||
        ballRect.bottom < fieldRect.top ||
        ballRect.top > fieldRect.bottom;
}

function finishShot() {
    clearInterval(ballTimer);
    arrowLength = minArrowLength;
    arrow.style.width = `${arrowLength}px`;

    setTimeout(() => {
        placeBallAtStart();
        isBallMoving = false;
    }, 350);
}

function moveGate() {
    clearTimeout(gateTimer);

    const fieldRect = field.getBoundingClientRect();
    const gateRect = gate.getBoundingClientRect();
    const maxGateTop = fieldRect.height - gateRect.height;
    const difficulty = difficulties[difficultySelect.value];

    gate.style.top = gateMovesDown ? `${maxGateTop}px` : '0px';
    gateMovesDown = !gateMovesDown;

    const pause = Math.random() < difficulty.pauseChance
        ? getRandomPause(difficulty.minPause, difficulty.maxPause)
        : 0;

    gate.style.transitionDuration = `${difficulty.gateSpeed}ms`;
    gateTimer = setTimeout(moveGate, difficulty.gateSpeed + pause);
}

function getRandomPause(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showGoalConfetti() {
    if (typeof confetti !== 'function') return;

    confetti({
        particleCount: 90,
        spread: 75,
        origin: {
            x: 0.78,
            y: 0.55
        }
    });
}
