// Елементи гри, які вже є в HTML.
const dinoGameField = document.querySelector(".game-field");
const dino = document.querySelector(".dino-image");
const cactuses = document.querySelectorAll(".cactus-image");
const pterodactyl = document.querySelector(".pterodactyl-image");
const dinoStartBtn = document.querySelector("#startBtn");
const dinoLoseMessage = document.querySelector("#message");
const dinoScore = document.querySelector("#dino-score");

// Прості змінні стану гри.
let isDinoGameStarted = false;
let isDinoJumping = false;
let dinoPoints = 0;

// Тут зберігатимуться таймери. Вони знадобляться, щоб зупинити гру після програшу.
let cactusMoveTimer = null;
let dinoScoreTimer = null;

// Базові налаштування. Їх можна змінювати, коли основна версія вже працюватиме.
const dinoJumpHeight = 95;
const dinoJumpTime = 1150;
let cactusSpeed = 5;


dinoStartBtn.addEventListener("click", startDinoGame);
function startDinoGame() {
  // 1. Початок гри
  isDinoGameStarted = true;
   dinoLoseMessage.style.display = "none";
   dinoStartBtn.setAttribute("disabled", "disabled");
   dinoPoints = 0;
   cactusSpeed = 5;
   dinoScore.textContent = dinoPoints;
   cactuses.forEach(cactus => cactus.style.right = "-60px");
   moveCactus();
scorePoints();}

   function moveCactus() {
     let cactusIndex = 0;
       cactusMoveTimer = setInterval(() => {
          if (!isDinoGameStarted) return;
          const cactus = cactuses[cactusIndex];
          cactus.style.display = "block";
          let cactusRight = parseInt(cactus.style.right);
          console.log("Cactus right:", cactusRight);
          console.log("Cactus speed:", cactusSpeed);
          cactus.classList.add("cactus-move");
          cactusRight += cactusSpeed;
          cactus.style.right = cactusRight + "px";
            if (cactusRight > dinoGameField.offsetWidth) {
              cactus.style.right = "-60px";
            }
            if(dinoPoints > 500 ){
               cactusIndex++;
               if(cactusIndex >= cactuses.length) {
                 cactusIndex = 0;
               }
            }
       }, 100);
    }
    function scorePoints() {
      dinoScoreTimer = setInterval(() => {
        if (!isDinoGameStarted) return;
        dinoPoints++;
        dinoScore.textContent = dinoPoints;
        if (dinoPoints % 10 === 0) {
          cactusSpeed += 1;
        }
      }, 50);}

      function dinoJump() {
        if (isDinoJumping) return;
        isDinoJumping = true;
        dino.classList.add("jump");
         setTimeout(() => {
            dino.classList.remove("jump");
            isDinoJumping = false;
         }, dinoJumpTime);
      }

      document.addEventListener("keydown", (e) => {
        if (e.code === "Space" && isDinoGameStarted) {
          e.preventDefault();
          dinoJump();
        }
      });

      dinoGameField.addEventListener("click", (e) => {
        if (isDinoGameStarted) {
          e.preventDefault();
          dinoJump();
        }
      });

      function checkCollision() {
        const dinoRect = dino.getBoundingClientRect();
        cactuses.forEach(cactus => {
          const cactusRect = cactus.getBoundingClientRect();
          if (
            dinoRect.left < cactusRect.right &&
            dinoRect.right > cactusRect.left &&
            dinoRect.top < cactusRect.bottom &&
            dinoRect.bottom > cactusRect.top
          ) {
            endDinoGame();
         }
         });}
         setInterval(() => {
           if (isDinoGameStarted) {
             checkCollision();
           }
         }, 10);
         function endDinoGame() {
           isDinoGameStarted = false;
           clearInterval(cactusMoveTimer);
           clearInterval(dinoScoreTimer);
           dinoLoseMessage.style.display = "block";
           dinoStartBtn.removeAttribute("disabled");
           cactuses.forEach(cactus => cactus.style.right = "-60px");
         }
/*
  ПЛАН РОБОТИ

  1. Початок гри
     - Додати обробник click на dinoStartBtn.
     - Сховати dinoLoseMessage.
     - Обнулити dinoPoints і показати 0 у dinoScore.
     - Показати перший кактус.
     - Запустити рух кактуса та збільшення очок.

  2. Стрибок динозаврика
     - Додати обробник keydown на document.
     - Якщо натиснуто пробіл і динозаврик не стрибає, запустити стрибок.
     - Для телефона можна також додати click на dinoGameField.
     - Найпростіший варіант: додавати динозаврику CSS-клас із анімацією.
     todo: додати стиль для максимальноЇ швидкості кактуса, щоб він не зникав раптово, а поступово зникав за правим краєм поля.

  3. Рух кактуса
     - Взяти один кактус із масиву cactuses.
     - Поступово змінювати його style.right за допомогою setInterval.
     - Коли кактус вийшов за лівий край, повернути його вправо.
     - Після базової версії можна випадково обирати один із трьох кактусів.

  4. Перевірка зіткнення
     - Отримати координати динозаврика та кактуса через getBoundingClientRect().
     - Якщо прямокутники перетнулися, завершити гру.

  5. Завершення гри
     - Зупинити таймери через clearInterval().
     - Показати dinoLoseMessage.
     - Показати кнопку старту ще раз.
     - Повернути кактуси за правий край поля.

  6. Очки
     - Окремим setInterval збільшувати dinoPoints.
     - Записувати нове значення у dinoScore.textContent.

  ДОДАТКОВО ПІСЛЯ БАЗОВОЇ ВЕРСІЇ
  - Додати pterodactyl як складнішу перешкоду.
  - Поступово збільшувати cactusSpeed.
  - Запускати конфеті після певної кількості очок.
*/