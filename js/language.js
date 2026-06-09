const languageStorageKey = "codingMagicLanguage";
const defaultLanguage = "en";
const supportedLanguages = ["en", "nl", "uk"];
let activeLanguage = localStorage.getItem(languageStorageKey) || defaultLanguage;
let isApplyingLanguage = false;

const translations = {
  "Інтерактив": {
    en: "Interactive",
    nl: "Interactief",
    uk: "Інтерактив"
  },
  "Числовий": {
    en: "Numeric",
    nl: "Numeriek",
    uk: "Числовий"
  },
  "Ігровий": {
    en: "Games",
    nl: "Spellen",
    uk: "Ігровий"
  },
  "Ознайомчий": {
    en: "Learning",
    nl: "Verkennend",
    uk: "Ознайомчий"
  },
  "Скинути фільтр": {
    en: "Reset filter",
    nl: "Filter wissen",
    uk: "Скинути фільтр"
  },
  "Наша команда": {
    en: "Our team",
    nl: "Ons team",
    uk: "Наша команда"
  },
  "Контакти": {
    en: "Contacts",
    nl: "Contacten",
    uk: "Контакти"
  },
  "Підписатися": {
    en: "Subscribe",
    nl: "Abonneren",
    uk: "Підписатися"
  },
  "Підписатись": {
    en: "Subscribe",
    nl: "Abonneren",
    uk: "Підписатись"
  },
  "Привіт!": {
    en: "Hi!",
    nl: "Hoi!",
    uk: "Привіт!"
  },
  "Ви потрапили на сайт інтерактивних ігор та завдань": {
    en: "You are on a website with interactive games and tasks",
    nl: "Je bent op een website met interactieve spellen en opdrachten",
    uk: "Ви потрапили на сайт інтерактивних ігор та завдань"
  },
  "Надіємось, що вам сподобається і ви отримаєте позитивні емоції!": {
    en: "We hope you enjoy it and get lots of positive emotions!",
    nl: "We hopen dat je het leuk vindt en positieve emoties krijgt!",
    uk: "Надіємось, що вам сподобається і ви отримаєте позитивні емоції!"
  },
  "Бажаємо Вам гарно провести час!": {
    en: "Have a great time!",
    nl: "Veel plezier!",
    uk: "Бажаємо Вам гарно провести час!"
  },
  "Введіть своє ім’я:": {
    en: "Enter your name:",
    nl: "Voer je naam in:",
    uk: "Введіть своє ім’я:"
  },
  "Зберегти": {
    en: "Save",
    nl: "Opslaan",
    uk: "Зберегти"
  },
  "Підпишіться, щоб не пропустити новинки сайту": {
    en: "Subscribe so you do not miss site updates",
    nl: "Abonneer je zodat je geen updates mist",
    uk: "Підпишіться, щоб не пропустити новинки сайту"
  },
  "Темна тема": {
    en: "Dark theme",
    nl: "Donker thema",
    uk: "Темна тема"
  },
  "Мова": {
    en: "Language",
    nl: "Taal",
    uk: "Мова"
  },
  "Популярні інетрактивні ігри": {
    en: "Popular interactive games",
    nl: "Populaire interactieve spellen",
    uk: "Популярні інетрактивні ігри"
  },
  "Перевір в який рік ти народився": {
    en: "Check the year you were born",
    nl: "Controleer het jaar waarin je geboren bent",
    uk: "Перевір в який рік ти народився"
  },
  "Як грати?": {
    en: "How to play?",
    nl: "Hoe speel je?",
    uk: "Як грати?"
  },
  "Введіть рік народження та натисніть кнопку пошуку. Ви дізнаєтесь, чи був цей рік високосним.": {
    en: "Enter a birth year and press the search button. You will find out whether that year was a leap year.",
    nl: "Voer een geboortejaar in en druk op de zoekknop. Je ziet of dat jaar een schrikkeljaar was.",
    uk: "Введіть рік народження та натисніть кнопку пошуку. Ви дізнаєтесь, чи був цей рік високосним."
  },
  "Калькулятор": {
    en: "Calculator",
    nl: "Rekenmachine",
    uk: "Калькулятор"
  },
  "Як користуватись?": {
    en: "How to use it?",
    nl: "Hoe gebruik je het?",
    uk: "Як користуватись?"
  },
  "Введіть два числа, оберіть математичну дію та натисніть знак дорівнює. Результат з’явиться у правому полі.": {
    en: "Enter two numbers, choose an operation, and press equals. The result will appear in the right field.",
    nl: "Voer twee getallen in, kies een bewerking en druk op is gelijk aan. Het resultaat verschijnt rechts.",
    uk: "Введіть два числа, оберіть математичну дію та натисніть знак дорівнює. Результат з’явиться у правому полі."
  },
  "Калькулятор часу": {
    en: "Time calculator",
    nl: "Tijdcalculator",
    uk: "Калькулятор часу"
  },
  "Введіть кількість хвилин і натисніть кнопку пошуку. Калькулятор переведе значення у дні, години та хвилини.": {
    en: "Enter minutes and press the search button. The calculator converts the value into days, hours, and minutes.",
    nl: "Voer minuten in en druk op de zoekknop. De calculator zet dit om naar dagen, uren en minuten.",
    uk: "Введіть кількість хвилин і натисніть кнопку пошуку. Калькулятор переведе значення у дні, години та хвилини."
  },
  "3 дн. 15:45:01": {
    en: "3 days 15:45:01",
    nl: "3 dagen 15:45:01",
    uk: "3 дн. 15:45:01"
  },
  "Google динозавр": {
    en: "Google dinosaur",
    nl: "Google dinosaurus",
    uk: "Google динозавр"
  },
  "Почніть гру та допоможіть динозавру перестрибувати перешкоди. Для стрибка натискайте пробіл або поле гри.": {
    en: "Start the game and help the dinosaur jump over obstacles. Press Space or tap the game field to jump.",
    nl: "Start het spel en help de dinosaurus over obstakels springen. Druk op spatie of tik op het speelveld om te springen.",
    uk: "Почніть гру та допоможіть динозавру перестрибувати перешкоди. Для стрибка натискайте пробіл або поле гри."
  },
  "Очки:": {
    en: "Score:",
    nl: "Score:",
    uk: "Очки:"
  },
  "Рекорд:": {
    en: "Record:",
    nl: "Record:",
    uk: "Рекорд:"
  },
  "Почати гру": {
    en: "Start game",
    nl: "Spel starten",
    uk: "Почати гру"
  },
  "Гра закінчилась": {
    en: "Game over",
    nl: "Spel afgelopen",
    uk: "Гра закінчилась"
  },
  "Зіграти ще раз": {
    en: "Play again",
    nl: "Nog een keer",
    uk: "Зіграти ще раз"
  },
  "Закінчити гру": {
    en: "End game",
    nl: "Spel beëindigen",
    uk: "Закінчити гру"
  },
  "Футбол": {
    en: "Football",
    nl: "Voetbal",
    uk: "Футбол"
  },
  "Натисніть «Грати», наведіть стрілку мишкою або пальцем, затисніть поле для сили удару та відпустіть, щоб м’яч полетів у ворота.": {
    en: "Press Play, aim the arrow with your mouse or finger, hold the field to charge power, and release to shoot the ball into the goal.",
    nl: "Druk op Spelen, richt de pijl met muis of vinger, houd het veld vast voor kracht en laat los om op doel te schieten.",
    uk: "Натисніть «Грати», наведіть стрілку мишкою або пальцем, затисніть поле для сили удару та відпустіть, щоб м’яч полетів у ворота."
  },
  "Складність": {
    en: "Difficulty",
    nl: "Moeilijkheid",
    uk: "Складність"
  },
  "Легка": {
    en: "Easy",
    nl: "Makkelijk",
    uk: "Легка"
  },
  "Середня": {
    en: "Medium",
    nl: "Gemiddeld",
    uk: "Середня"
  },
  "Складна": {
    en: "Hard",
    nl: "Moeilijk",
    uk: "Складна"
  },
  "Зупинити": {
    en: "Pause",
    nl: "Pauzeren",
    uk: "Зупинити"
  },
  "Грати": {
    en: "Play",
    nl: "Spelen",
    uk: "Грати"
  },
  "Голів забито:": {
    en: "Goals scored:",
    nl: "Doelpunten:",
    uk: "Голів забито:"
  },
  "Введіть 3 числа": {
    en: "Enter 3 numbers",
    nl: "Voer 3 getallen in",
    uk: "Введіть 3 числа"
  },
  "Введіть три числа. Сторінка визначить найбільше значення та покаже введені числа на графіку.": {
    en: "Enter three numbers. The page will find the largest value and show the entered numbers on a chart.",
    nl: "Voer drie getallen in. De pagina vindt de grootste waarde en toont de getallen in een grafiek.",
    uk: "Введіть три числа. Сторінка визначить найбільше значення та покаже введені числа на графіку."
  },
  "Найбільше число, яке ви ввели :": {
    en: "The largest number you entered:",
    nl: "Het grootste getal dat je invoerde:",
    uk: "Найбільше число, яке ви ввели :"
  },
  "Вгадай число, яке загадав комп’ютер": {
    en: "Guess the number chosen by the computer",
    nl: "Raad het getal van de computer",
    uk: "Вгадай число, яке загадав комп’ютер"
  },
  "Введіть число та натисніть кнопку пошуку. Спробуйте відгадати число комп’ютера за три спроби.": {
    en: "Enter a number and press the search button. Try to guess the computer's number in three attempts.",
    nl: "Voer een getal in en druk op de zoekknop. Raad het getal van de computer in drie pogingen.",
    uk: "Введіть число та натисніть кнопку пошуку. Спробуйте відгадати число комп’ютера за три спроби."
  },
  "Комп’ютер загадав число від 0 до 10": {
    en: "The computer chose a number from 0 to 10",
    nl: "De computer koos een getal van 0 tot 10",
    uk: "Комп’ютер загадав число від 0 до 10"
  },
  "Спроби:": {
    en: "Attempts:",
    nl: "Pogingen:",
    uk: "Спроби:"
  },
  "Закрити": {
    en: "Close",
    nl: "Sluiten",
    uk: "Закрити"
  },
  "Сергій Харипончук": {
    en: "Serhii Kharyponchuk",
    nl: "Serhii Kharyponchuk",
    uk: "Сергій Харипончук"
  },
  "Розробник": {
    en: "Developer",
    nl: "Ontwikkelaar",
    uk: "Розробник"
  },
  "Відповідав за розробку та налаштування всього проєкту.": {
    en: "Responsible for developing and setting up the entire project.",
    nl: "Verantwoordelijk voor de ontwikkeling en instelling van het hele project.",
    uk: "Відповідав за розробку та налаштування всього проєкту."
  },
  "Артем Фауст": {
    en: "Artem Faust",
    nl: "Artem Faust",
    uk: "Артем Фауст"
  },
  "Вчитель": {
    en: "Teacher",
    nl: "Leraar",
    uk: "Вчитель"
  },
  "Допомагав і перевіряв логіку JavaScript.": {
    en: "Helped and checked the JavaScript logic.",
    nl: "Hielp en controleerde de JavaScript-logica.",
    uk: "Допомагав і перевіряв логіку JavaScript."
  },
  "Камінь - ножиці - папір": {
    en: "Rock - paper - scissors",
    nl: "Steen - papier - schaar",
    uk: "Камінь - ножиці - папір"
  },
  "Оберіть камінь, ножиці або папір. Через секунду з’явиться вибір комп’ютера. Після п’яти раундів гра покаже переможця.": {
    en: "Choose rock, scissors, or paper. After one second the computer's choice appears. After five rounds the game shows the winner.",
    nl: "Kies steen, schaar of papier. Na één seconde verschijnt de keuze van de computer. Na vijf rondes toont het spel de winnaar.",
    uk: "Оберіть камінь, ножиці або папір. Через секунду з’явиться вибір комп’ютера. Після п’яти раундів гра покаже переможця."
  },
  "Камінь": {
    en: "Rock",
    nl: "Steen",
    uk: "Камінь"
  },
  "Ножиці": {
    en: "Scissors",
    nl: "Schaar",
    uk: "Ножиці"
  },
  "Папір": {
    en: "Paper",
    nl: "Papier",
    uk: "Папір"
  },
  "Рахунок:": {
    en: "Score:",
    nl: "Score:",
    uk: "Рахунок:"
  },
  "Комп’ютер -": {
    en: "Computer -",
    nl: "Computer -",
    uk: "Комп’ютер -"
  },
  "Ви -": {
    en: "You -",
    nl: "Jij -",
    uk: "Ви -"
  },
  "Нічия -": {
    en: "Draw -",
    nl: "Gelijkspel -",
    uk: "Нічия -"
  },
  "Наступний раунд": {
    en: "Next round",
    nl: "Volgende ronde",
    uk: "Наступний раунд"
  },
  "Гру завершено": {
    en: "Game finished",
    nl: "Spel voltooid",
    uk: "Гру завершено"
  },
  "Нова гра": {
    en: "New game",
    nl: "Nieuw spel",
    uk: "Нова гра"
  },
  "Обери вченого/их": {
    en: "Choose scientist(s)",
    nl: "Kies wetenschapper(s)",
    uk: "Обери вченого/их"
  },
  "Що треба робити?": {
    en: "What should you do?",
    nl: "Wat moet je doen?",
    uk: "Що треба робити?"
  },
  "Натискайте кнопки із завданнями, щоб фільтрувати або сортувати картки вчених і знаходити правильні відповіді.": {
    en: "Press the task buttons to filter or sort scientist cards and find the correct answers.",
    nl: "Druk op de opdrachtknoppen om kaarten van wetenschappers te filteren of te sorteren en de juiste antwoorden te vinden.",
    uk: "Натискайте кнопки із завданнями, щоб фільтрувати або сортувати картки вчених і знаходити правильні відповіді."
  },
  "Які вчені народилися в 19 ст.": {
    en: "Which scientists were born in the 19th century?",
    nl: "Welke wetenschappers zijn geboren in de 19e eeuw?",
    uk: "Які вчені народилися в 19 ст."
  },
  "Знайти рік народження Albert Einstein": {
    en: "Find Albert Einstein's birth year",
    nl: "Zoek het geboortejaar van Albert Einstein",
    uk: "Знайти рік народження Albert Einstein"
  },
  "Відсортувати вчених за алфавітом": {
    en: "Sort scientists alphabetically",
    nl: "Sorteer wetenschappers alfabetisch",
    uk: "Відсортувати вчених за алфавітом"
  },
  "Знайти вчених, прізвища яких починаються на літеру “C”": {
    en: "Find scientists whose surnames start with “C”",
    nl: "Zoek wetenschappers van wie de achternaam met “C” begint",
    uk: "Знайти вчених, прізвища яких починаються на літеру “C”"
  },
  "Відсортувати вчених за кількістю прожитих років": {
    en: "Sort scientists by years lived",
    nl: "Sorteer wetenschappers op levensjaren",
    uk: "Відсортувати вчених за кількістю прожитих років"
  },
  "Видалити всіх вчених, ім’я яких починається на “А”": {
    en: "Remove all scientists whose first name starts with “A”",
    nl: "Verwijder alle wetenschappers van wie de voornaam met “A” begint",
    uk: "Видалити всіх вчених, ім’я яких починається на “А”"
  },
  "Знайти вченого, який народився найпізніше": {
    en: "Find the scientist born most recently",
    nl: "Zoek de wetenschapper die het laatst geboren is",
    uk: "Знайти вченого, який народився найпізніше"
  },
  "Знайти вченого, який прожив найдовше і вченого, який прожив найменше": {
    en: "Find the scientist who lived the longest and the one who lived the shortest",
    nl: "Zoek de wetenschapper die het langst leefde en degene die het kortst leefde",
    uk: "Знайти вченого, який прожив найдовше і вченого, який прожив найменше"
  },
  "Знайти вчених, в яких співпадають перші літери імені і прізвища": {
    en: "Find scientists whose first name and surname start with the same letter",
    nl: "Zoek wetenschappers van wie voornaam en achternaam met dezelfde letter beginnen",
    uk: "Знайти вчених, в яких співпадають перші літери імені і прізвища"
  },
  "Тел: +38 (123) 456 78 90": {
    en: "Phone: +38 (123) 456 78 90",
    nl: "Tel: +38 (123) 456 78 90",
    uk: "Тел: +38 (123) 456 78 90"
  },
  "*Підписавшись, Ви зможете отримувати інформацію про новинки на сайті": {
    en: "*By subscribing, you can receive information about site updates",
    nl: "*Door je te abonneren ontvang je informatie over updates op de site",
    uk: "*Підписавшись, Ви зможете отримувати інформацію про новинки на сайті"
  },
  "Дякую за підписку!": {
    en: "Thanks for subscribing!",
    nl: "Bedankt voor je abonnement!",
    uk: "Дякую за підписку!"
  },
  "Перемкнути тему": {
    en: "Toggle theme",
    nl: "Thema wisselen",
    uk: "Перемкнути тему"
  },
  "Відкрити меню": {
    en: "Open menu",
    nl: "Menu openen",
    uk: "Відкрити меню"
  },
  "Ваше ім’я...": {
    en: "Your name...",
    nl: "Je naam...",
    uk: "Ваше ім’я..."
  },
  "Введіть рік народження": {
    en: "Enter birth year",
    nl: "Voer geboortejaar in",
    uk: "Введіть рік народження"
  },
  "Введіть число": {
    en: "Enter a number",
    nl: "Voer een getal in",
    uk: "Введіть число"
  },
  "Результат": {
    en: "Result",
    nl: "Resultaat",
    uk: "Результат"
  },
  "Попередній учасник": {
    en: "Previous member",
    nl: "Vorige deelnemer",
    uk: "Попередній учасник"
  },
  "Наступний учасник": {
    en: "Next member",
    nl: "Volgende deelnemer",
    uk: "Наступний учасник"
  },
  "Ваш вибір": {
    en: "Your choice",
    nl: "Jouw keuze",
    uk: "Ваш вибір"
  },
  "Вибір комп’ютера": {
    en: "Computer choice",
    nl: "Keuze van de computer",
    uk: "Вибір комп’ютера"
  },
  "Ваша ел. адреса...": {
    en: "Your email...",
    nl: "Je e-mailadres...",
    uk: "Ваша ел. адреса..."
  },
  "Ви вже підписані": {
    en: "Already subscribed",
    nl: "Al geabonneerd",
    uk: "Ви вже підписані"
  },
  "Готово": {
    en: "Done",
    nl: "Klaar",
    uk: "Готово"
  },
  "Ви підписані": {
    en: "Subscribed",
    nl: "Geabonneerd",
    uk: "Ви підписані"
  },
  "Рік має бути цілим числом": {
    en: "The year must be a whole number",
    nl: "Het jaar moet een geheel getal zijn",
    uk: "Рік має бути цілим числом"
  },
  "Введіть реальний рік": {
    en: "Enter a real year",
    nl: "Voer een echt jaar in",
    uk: "Введіть реальний рік"
  },
  "Цей рік ще не настав": {
    en: "This year has not happened yet",
    nl: "Dit jaar is nog niet begonnen",
    uk: "Цей рік ще не настав"
  },
  "Ви народилися у високосний рік!": {
    en: "You were born in a leap year!",
    nl: "Je bent geboren in een schrikkeljaar!",
    uk: "Ви народилися у високосний рік!"
  },
  "Ваш рік народження не високосний": {
    en: "Your birth year is not a leap year",
    nl: "Je geboortejaar is geen schrikkeljaar",
    uk: "Ваш рік народження не високосний"
  },
  "Введіть кількість хвилин": {
    en: "Enter the number of minutes",
    nl: "Voer het aantal minuten in",
    uk: "Введіть кількість хвилин"
  },
  "Введіть ціле число хвилин": {
    en: "Enter a whole number of minutes",
    nl: "Voer een geheel aantal minuten in",
    uk: "Введіть ціле число хвилин"
  },
  "Введіть 0 або більше хвилин": {
    en: "Enter 0 or more minutes",
    nl: "Voer 0 of meer minuten in",
    uk: "Введіть 0 або більше хвилин"
  },
  "Введіть число від 0 до 10.": {
    en: "Enter a number from 0 to 10.",
    nl: "Voer een getal van 0 tot 10 in.",
    uk: "Введіть число від 0 до 10."
  },
  "Вітаємо! Ви вгадали число.": {
    en: "Congrats! You guessed the number.",
    nl: "Gefeliciteerd! Je hebt het getal geraden.",
    uk: "Вітаємо! Ви вгадали число."
  },
  "Ви вгадали!": {
    en: "You guessed it!",
    nl: "Je hebt het geraden!",
    uk: "Ви вгадали!"
  },
  "Спроби закінчилися": {
    en: "No attempts left",
    nl: "Geen pogingen meer",
    uk: "Спроби закінчилися"
  },
  "Загадане число більше. Спробуйте ще раз.": {
    en: "The chosen number is higher. Try again.",
    nl: "Het gekozen getal is hoger. Probeer opnieuw.",
    uk: "Загадане число більше. Спробуйте ще раз."
  },
  "Загадане число менше. Спробуйте ще раз.": {
    en: "The chosen number is lower. Try again.",
    nl: "Het gekozen getal is lager. Probeer opnieuw.",
    uk: "Загадане число менше. Спробуйте ще раз."
  },
  "Нове число загадано. Спробуйте вгадати!": {
    en: "A new number has been chosen. Try to guess it!",
    nl: "Er is een nieuw getal gekozen. Probeer het te raden!",
    uk: "Нове число загадано. Спробуйте вгадати!"
  },
  "Комп’ютер думає...": {
    en: "The computer is thinking...",
    nl: "De computer denkt na...",
    uk: "Комп’ютер думає..."
  },
  "Нічия!": {
    en: "Draw!",
    nl: "Gelijkspel!",
    uk: "Нічия!"
  },
  "Ви виграли!": {
    en: "You won!",
    nl: "Jij hebt gewonnen!",
    uk: "Ви виграли!"
  },
  "Комп’ютер виграв!": {
    en: "The computer won!",
    nl: "De computer heeft gewonnen!",
    uk: "Комп’ютер виграв!"
  },
  "Ви виграли гру!": {
    en: "You won the game!",
    nl: "Jij hebt het spel gewonnen!",
    uk: "Ви виграли гру!"
  },
  "Комп’ютер виграв гру!": {
    en: "The computer won the game!",
    nl: "De computer heeft het spel gewonnen!",
    uk: "Комп’ютер виграв гру!"
  },
  "Гра завершилась нічиєю!": {
    en: "The game ended in a draw!",
    nl: "Het spel eindigde gelijk!",
    uk: "Гра завершилась нічиєю!"
  }
};

const reverseTranslationMap = createReverseTranslationMap(translations);

setupLanguageSwitcher();
setLanguage(activeLanguage);
observeLanguageChanges();

function setupLanguageSwitcher() {
  document.querySelectorAll(".language-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });
}

function setLanguage(language) {
  if (!supportedLanguages.includes(language)) {
    language = defaultLanguage;
  }

  activeLanguage = language;
  localStorage.setItem(languageStorageKey, activeLanguage);
  document.documentElement.lang = activeLanguage;
  document.body.dataset.language = activeLanguage;

  isApplyingLanguage = true;
  translateElement(document.body);
  updateLanguageButtons();
  isApplyingLanguage = false;

  document.dispatchEvent(new CustomEvent("codingMagicLanguageChange", {
    detail: {
      language: activeLanguage
    }
  }));
}

function translateElement(rootElement) {
  translateTextNodes(rootElement);
  translateAttributes(rootElement);
}

function translateTextNodes(rootElement) {
  const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, {
    acceptNode(textNode) {
      if (!textNode.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      if (["SCRIPT", "STYLE"].includes(textNode.parentElement?.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(translateTextNode);
}

function translateTextNode(textNode) {
  const text = textNode.nodeValue;
  const startSpaces = text.match(/^\s*/)[0];
  const endSpaces = text.match(/\s*$/)[0];
  const cleanText = text.trim();
  const translatedText = translateText(cleanText);

  if (translatedText !== cleanText) {
    textNode.nodeValue = `${startSpaces}${translatedText}${endSpaces}`;
  }
}

function translateAttributes(rootElement) {
  const elements = [rootElement, ...rootElement.querySelectorAll("*")];
  const attributeNames = ["placeholder", "aria-label", "alt", "title"];

  elements.forEach((element) => {
    attributeNames.forEach((attributeName) => {
      if (!element.hasAttribute(attributeName)) {
        return;
      }

      const value = element.getAttribute(attributeName);
      const translatedValue = translateText(value);

      if (translatedValue !== value) {
        element.setAttribute(attributeName, translatedValue);
      }
    });
  });
}

function translateText(text) {
  const cleanText = text.trim();
  const compactText = cleanText.replace(/\s+/g, " ");
  const specialTranslation = translateSpecialText(compactText);

  if (specialTranslation) {
    return specialTranslation;
  }

  const translationKey = reverseTranslationMap[compactText] || compactText;
  const translation = translations[translationKey];

  if (!translation) {
    return text;
  }

  return translation[activeLanguage] || translation.uk || text;
}

function translateSpecialText(text) {
  const greetingMatch = text.match(/^(?:Вітаємо|Welcome|Welkom), (.+)!$/);
  if (greetingMatch) {
    return {
      en: `Welcome, ${greetingMatch[1]}!`,
      nl: `Welkom, ${greetingMatch[1]}!`,
      uk: `Вітаємо, ${greetingMatch[1]}!`
    }[activeLanguage];
  }

  const timeMatch = text.match(/^(\d+) (?:дн\.|days|dagen) (\d+) (?:год\.|h\.|u\.) (\d+) (?:хв\.|min\.)$/);
  if (timeMatch) {
    return {
      en: `${timeMatch[1]} days ${timeMatch[2]} h. ${timeMatch[3]} min.`,
      nl: `${timeMatch[1]} dagen ${timeMatch[2]} u. ${timeMatch[3]} min.`,
      uk: `${timeMatch[1]} дн. ${timeMatch[2]} год. ${timeMatch[3]} хв.`
    }[activeLanguage];
  }

  const userScoreMatch = text.match(/^(?:Ваш результат|Your score|Jouw score): (\d+)$/);
  if (userScoreMatch) {
    return {
      en: `Your score: ${userScoreMatch[1]}`,
      nl: `Jouw score: ${userScoreMatch[1]}`,
      uk: `Ваш результат: ${userScoreMatch[1]}`
    }[activeLanguage];
  }

  const newRecordMatch = text.match(/^(?:Новий рекорд|New record|Nieuw record): (\d+)$/);
  if (newRecordMatch) {
    return {
      en: `New record: ${newRecordMatch[1]}`,
      nl: `Nieuw record: ${newRecordMatch[1]}`,
      uk: `Новий рекорд: ${newRecordMatch[1]}`
    }[activeLanguage];
  }

  const guessedNumberMatch = text.match(/^(?:Загадане число|Chosen number|Gekozen getal): (\d+)$/);
  if (guessedNumberMatch) {
    return {
      en: `Chosen number: ${guessedNumberMatch[1]}`,
      nl: `Gekozen getal: ${guessedNumberMatch[1]}`,
      uk: `Загадане число: ${guessedNumberMatch[1]}`
    }[activeLanguage];
  }

  const recordNeedMatch = text.match(/^(?:Рекорд|Record): (\d+)\. (?:До нового рекорду потрібно ще|You need|Je hebt nog) (\d+) (?:оч\.|more points for a new record\.|punten nodig voor een nieuw record\.)$/);
  if (recordNeedMatch) {
    return {
      en: `Record: ${recordNeedMatch[1]}. You need ${recordNeedMatch[2]} more points for a new record.`,
      nl: `Record: ${recordNeedMatch[1]}. Je hebt nog ${recordNeedMatch[2]} punten nodig voor een nieuw record.`,
      uk: `Рекорд: ${recordNeedMatch[1]}. До нового рекорду потрібно ще ${recordNeedMatch[2]} оч.`
    }[activeLanguage];
  }

  const attemptsFinishedMatch = text.match(/^(?:Спроби закінчилися\. Було загадано число|No attempts left\. The chosen number was|Geen pogingen meer\. Het gekozen getal was) (\d+)\.$/);
  if (attemptsFinishedMatch) {
    return {
      en: `No attempts left. The chosen number was ${attemptsFinishedMatch[1]}.`,
      nl: `Geen pogingen meer. Het gekozen getal was ${attemptsFinishedMatch[1]}.`,
      uk: `Спроби закінчилися. Було загадано число ${attemptsFinishedMatch[1]}.`
    }[activeLanguage];
  }

  const computerNumberMatch = text.match(/^(?:Комп’ютер загадав число|The computer chose number|De computer koos getal) (\d+)\. (?:Спробуйте ще раз!|Try again!|Probeer opnieuw!)$/);
  if (computerNumberMatch) {
    return {
      en: `The computer chose number ${computerNumberMatch[1]}. Try again!`,
      nl: `De computer koos getal ${computerNumberMatch[1]}. Probeer opnieuw!`,
      uk: `Комп’ютер загадав число ${computerNumberMatch[1]}. Спробуйте ще раз!`
    }[activeLanguage];
  }

  const translatedParts = translateTextParts(text);
  if (translatedParts) {
    return translatedParts;
  }

  return "";
}

function translateTextParts(text) {
  const parts = text.split(/(?<=[.!?])\s+/);

  if (parts.length < 2) {
    return "";
  }

  const translatedParts = parts.map((part) => {
    const translationKey = reverseTranslationMap[part] || part;
    const translation = translations[translationKey];

    return translation ? translation[activeLanguage] : "";
  });

  if (translatedParts.some((part) => part === "")) {
    return "";
  }

  return translatedParts.join(" ");
}

function updateLanguageButtons() {
  document.querySelectorAll(".language-btn").forEach((button) => {
    const isActive = button.dataset.lang === activeLanguage;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive);
  });
}

function observeLanguageChanges() {
  const observer = new MutationObserver((mutations) => {
    if (isApplyingLanguage) {
      return;
    }

    isApplyingLanguage = true;

    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") {
        translateTextNode(mutation.target);
        return;
      }

      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          translateTextNode(node);
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          translateElement(node);
        }
      });
    });

    isApplyingLanguage = false;
  });

  observer.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true
  });
}

function createReverseTranslationMap(translationList) {
  const reverseMap = {};

  Object.entries(translationList).forEach(([key, values]) => {
    reverseMap[key] = key;

    Object.values(values).forEach((value) => {
      reverseMap[value] = key;
    });
  });

  return reverseMap;
}

window.setCodingMagicLanguage = setLanguage;
window.getCodingMagicLanguage = () => activeLanguage;
window.translateCodingMagic = translateText;
