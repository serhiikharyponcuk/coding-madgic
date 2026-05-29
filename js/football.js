const feild = document.querySelector('.field');
const ball = document.querySelector('.ball');
const gate = document.querySelector('.gate');
const arrow = document.querySelector('.arrow-move');

console.log(feild, ball, gate);

let ballX = 0;
let ballY = 0;
let gateX = 0;
let gateY = 0;

function moveBall(event) {
    const fieldRect = feild.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const gateRect = gate.getBoundingClientRect();
    ballX = event.clientX - fieldRect.left - ballRect.width / 2;
    ballY = event.clientY - fieldRect.top - ballRect.height / 2;
    gateX = gateRect.left - fieldRect.left;
    gateY = gateRect.top - fieldRect.top;
    console.log(ballX, ballY, gateX, gateY);

    // Move the ball
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // Check if the ball is in the gate
    if (
        ballX + ballRect.width > gateX &&
        ballX < gateX + gateRect.width &&
        ballY + ballRect.height > gateY &&
        ballY < gateY + gateRect.height
    ) {
        alert('Goal!');
    }
}
function resetBall() {
    ball.style.left = '0px';
    ball.style.top = '0px';
}
function moveGate() {
    const fieldRect = feild.getBoundingClientRect();
    const gateRect = gate.getBoundingClientRect();
    gate.style.top = `${Math.random() * (fieldRect.height - gateRect.height)}px`;
    setTimeout(() => {resetGate();
    }, 2000
 );

}
setInterval(moveGate, 2000);
function resetGate() {
    gate.style.top = '115px';
}
function moveArrow(event) {
    const fieldRect = feild.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const cursorX = event.clientX - fieldRect.left;
    const cursorY = event.clientY - fieldRect.top;
    const ballCenterX = ballRect.left - fieldRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top - fieldRect.top + ballRect.height / 2;
    const angle = Math.atan2(cursorY - ballCenterY, cursorX - ballCenterX) * (180 / Math.PI);

    arrow.style.transform = `translateY(-50%) rotate(${angle}deg)`;
}



feild.addEventListener('click', moveBall);
feild.addEventListener('mousemove', moveArrow);
