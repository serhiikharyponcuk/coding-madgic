const subscribeHeaderBtn = document.querySelector("#subscribe-header-btn");
const subscribeForm = document.querySelector("#subscribe-form");
const subscribeEmailInput = document.querySelector("#email-subscribe-input");
const subscribeSubmitBtn = document.querySelector(".subscribe-submit");
const subscribeModal = document.querySelector("#subscribe-modal");
const subscribeModalCloseBtn = document.querySelector(".subscribe-modal-close");
const welcomeModal = document.querySelector("#welcome-modal");
const welcomeModalCloseBtn = document.querySelector(".welcome-modal-close");
const nameInput = document.querySelector("#name-input");
const subscribeSideHint = document.querySelector(".subscribe-side-hint");
const subscribeSideHintBtn = document.querySelector(".subscribe-side-hint-btn");
const subscribeStorageKey = "codingMagicSubscriber";
const userNameStorageKey = "codingMagicUserName";

let sideHintTimer = null;
let subscribeCloseTimer = null;
let nameCloseTimer = null;

loadSubscribeState();

subscribeHeaderBtn.addEventListener("click", () => {
  if (isUserSubscribed()) {
    return;
  }

  scrollToSubscribeForm();
});
subscribeSideHintBtn.addEventListener("click", () => {
  hideSubscribeSideHint();
  scrollToSubscribeForm();
});

subscribeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  subscribeUser();
});

welcomeModal.addEventListener("submit", (event) => {
  event.preventDefault();
  saveUserName();
});

welcomeModalCloseBtn.addEventListener("click", hideNameModal);

welcomeModal.addEventListener("click", (event) => {
  if (event.target === welcomeModal) {
    hideNameModal();
  }
});

subscribeModalCloseBtn.addEventListener("click", () => {
  hideSubscribeModal(showNameModal);
});

subscribeModal.addEventListener("click", (event) => {
  if (event.target === subscribeModal) {
    hideSubscribeModal(showNameModal);
  }
});

// Завантажує стан підписки після відкриття сторінки.
function loadSubscribeState() {
  const savedName = localStorage.getItem(userNameStorageKey);

  if (isUserSubscribed()) {
    showSubscribedHeader(savedName);
    return;
  }

  showSubscribeHeader();
  startSideHints();
}

// Прокручує до форми в футері і ставить курсор в email.
function scrollToSubscribeForm() {
  subscribeForm.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  setTimeout(() => {
    subscribeEmailInput.focus();
  }, 450);
}

// Зберігає підписку і запускає модалку з ім'ям.
function subscribeUser() {
  if (isUserSubscribed()) {
    showSubscribedHeader(localStorage.getItem(userNameStorageKey));
    return;
  }

  const email = subscribeEmailInput.value.trim();

  if (email === "") {
    subscribeEmailInput.focus();
    subscribeEmailInput.classList.add("subscribe-input-error");

    setTimeout(() => {
      subscribeEmailInput.classList.remove("subscribe-input-error");
    }, 450);
    return;
  }

  localStorage.setItem(subscribeStorageKey, "true");
  stopSideHints();
  hideSubscribeSideHint();
  showSubscribedHeader(localStorage.getItem(userNameStorageKey));
  showSubscribeModal();

  setTimeout(() => {
    hideSubscribeModal(showNameModal);
  }, 1300);
}

// Показує подяку за підписку.
function showSubscribeModal() {
  clearTimeout(subscribeCloseTimer);
  subscribeModal.style.display = "flex";
  subscribeModal.classList.remove("is-closing");

  requestAnimationFrame(() => {
    subscribeModal.classList.add("show");
  });

  showSubscribeConfetti();
}

function hideSubscribeModal(afterClose) {
  clearTimeout(subscribeCloseTimer);
  subscribeModal.classList.add("is-closing");

  subscribeCloseTimer = setTimeout(() => {
    subscribeModal.classList.remove("show", "is-closing");
    subscribeModal.style.display = "none";

    if (typeof afterClose === "function") {
      afterClose();
    }
  }, 260);
}

// Запускає багато конфеті після успішної підписки.
function showSubscribeConfetti() {
  if (typeof confetti !== "function") {
    return;
  }

  confetti({
    particleCount: 140,
    spread: 95,
    origin: { x: 0.5, y: 0.48 }
  });

  setTimeout(() => {
    confetti({
      particleCount: 90,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 }
    });

    confetti({
      particleCount: 90,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 }
    });
  }, 250);

  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 120,
      startVelocity: 38,
      origin: { x: 0.5, y: 0.18 }
    });
  }, 520);
}

// Показує модалку для введення імені.
function showNameModal() {
  clearTimeout(nameCloseTimer);
  welcomeModal.classList.remove("is-closing");
  welcomeModal.classList.add("show");
  welcomeModal.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    nameInput.focus();
  }, 100);
}

function hideNameModal() {
  clearTimeout(nameCloseTimer);
  welcomeModal.classList.add("is-closing");
  welcomeModal.setAttribute("aria-hidden", "true");

  nameCloseTimer = setTimeout(() => {
    welcomeModal.classList.remove("show", "is-closing");
  }, 260);
}

// Зберігає ім'я і міняє текст у хедері.
function saveUserName() {
  const userName = nameInput.value.trim();

  if (userName === "") {
    nameInput.focus();
    return;
  }

  localStorage.setItem(userNameStorageKey, userName);
  showSubscribedHeader(userName);
  hideNameModal();
}

// Вигляд хедера до підписки.
function showSubscribeHeader() {
  subscribeHeaderBtn.textContent = "Підписатися";
  subscribeHeaderBtn.classList.add("subscribe-pulse");
  subscribeHeaderBtn.disabled = false;
  subscribeEmailInput.disabled = false;
  subscribeEmailInput.placeholder = "Ваша ел. адреса...";
  subscribeSubmitBtn.disabled = false;
  subscribeSubmitBtn.textContent = "Підписатись";
  subscribeForm.classList.remove("is-subscribed");
}

// Вигляд хедера після підписки.
function showSubscribedHeader(userName) {
  subscribeHeaderBtn.classList.remove("subscribe-pulse");
  subscribeHeaderBtn.disabled = true;
  subscribeEmailInput.disabled = true;
  subscribeEmailInput.value = "";
  subscribeEmailInput.placeholder = "Ви вже підписані";
  subscribeSubmitBtn.disabled = true;
  subscribeSubmitBtn.textContent = "Готово";
  subscribeForm.classList.add("is-subscribed");
  subscribeHeaderBtn.textContent = userName ? `Вітаємо, ${userName}!` : "Ви підписані";
}

// Запускає бокові нагадування, якщо користувач ще не підписався.
function isUserSubscribed() {
  return localStorage.getItem(subscribeStorageKey) === "true";
}

function startSideHints() {
  sideHintTimer = setInterval(() => {
    showSubscribeSideHint();
  }, 9000);

  setTimeout(showSubscribeSideHint, 2500);
}

function stopSideHints() {
  clearInterval(sideHintTimer);
}

function showSubscribeSideHint() {
  if (isUserSubscribed()) {
    stopSideHints();
    return;
  }

  subscribeSideHint.classList.add("show");

  setTimeout(() => {
    hideSubscribeSideHint();
  }, 4200);
}

function hideSubscribeSideHint() {
  subscribeSideHint.classList.remove("show");
}
