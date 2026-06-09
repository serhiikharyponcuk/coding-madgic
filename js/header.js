const interactFilterBtn = document.querySelector("#interact-filter");
const gamesFilter = document.querySelector("#games-filter");
const filterMenuBtn = document.querySelector("#filter-menu");
const filterMenuModal = document.querySelector("#filter-menu-modal");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const main = document.querySelector("main");
const teamSection = document.querySelector(".team-section");
const resetFilterButtons = document.querySelectorAll("#show-all, #show-all-mobile");
const teamButtons = document.querySelectorAll(".our-team, #team-mobile");
const contactButtons = document.querySelectorAll(".contacts, #contacts-mobile");
const themeButtons = document.querySelectorAll(".theme-btn");
const filterButtons = {
    numeric: [
        document.querySelector("#game-int"),
        document.querySelector("#game-int-mobile")
    ],
    game: [
        document.querySelector("#game-game"),
        document.querySelector("#game-game-mobile")
    ],
    exploratory: [
        document.querySelector("#game-exploratory"),
        document.querySelector("#game-exploratory-mobile")
    ]
};
const allFilterButtons = Object.values(filterButtons).flat().filter(Boolean);
const filteredSections = document.querySelectorAll("[data-game-category]");
const savedTheme = localStorage.getItem("codingMagicTheme");

setTheme(savedTheme === "dark");

themeButtons.forEach((themeButton) => {
    themeButton.addEventListener("change", () => {
        setTheme(themeButton.checked);
    });
});

resetFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showAllSections();
        gamesFilter.classList.add("hidden");
        closeMobileFilterMenu();
        scrollToElement(main);
    });
});

teamButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showAllSections();
        closeMobileFilterMenu();
        scrollToElement(teamSection);
    });
});

contactButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showAllSections();
        closeMobileFilterMenu();
        scrollToElement(footer);
    });
});

interactFilterBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    gamesFilter.classList.toggle("hidden");
});

filterMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isMenuOpen = filterMenuModal.classList.toggle("show");

    filterMenuBtn.classList.toggle("active", isMenuOpen);
    filterMenuBtn.setAttribute("aria-expanded", isMenuOpen);
});

document.addEventListener("click", (event) => {
    if (!gamesFilter.contains(event.target) && !interactFilterBtn.contains(event.target)) {
        gamesFilter.classList.add("hidden");
    }

    if (!filterMenuModal.contains(event.target) && !filterMenuBtn.contains(event.target)) {
        closeMobileFilterMenu();
    }
});

Object.entries(filterButtons).forEach(([category, buttons]) => {
    buttons.forEach((button) => {
        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            filterSections(category);
            gamesFilter.classList.add("hidden");
            closeMobileFilterMenu();
            scrollToElement(main);
        });
    });
});

function filterSections(activeCategory) {
    filteredSections.forEach((section) => {
        const isActiveSection = section.dataset.gameCategory === activeCategory;

        section.hidden = !isActiveSection;
    });

    setActiveFilterButton(activeCategory);
}

function showAllSections() {
    filteredSections.forEach((section) => {
        section.hidden = false;
    });

    allFilterButtons.forEach((button) => {
        button.classList.remove("filter-active");
        button.setAttribute("aria-pressed", "false");
    });
}

function setActiveFilterButton(activeCategory) {
    allFilterButtons.forEach((button) => {
        const isActiveButton = filterButtons[activeCategory].includes(button);

        button.classList.toggle("filter-active", isActiveButton);
        button.setAttribute("aria-pressed", isActiveButton);
    });
}

function closeMobileFilterMenu() {
    filterMenuModal.classList.remove("show");
    filterMenuBtn.classList.remove("active");
    filterMenuBtn.setAttribute("aria-expanded", "false");
}

function setTheme(isDarkTheme) {
    document.body.classList.toggle("dark", isDarkTheme);
    header.classList.toggle("dark", isDarkTheme);
    footer.classList.toggle("dark", isDarkTheme);
    main.classList.toggle("dark", isDarkTheme);

    themeButtons.forEach((themeButton) => {
        themeButton.checked = isDarkTheme;
    });

    localStorage.setItem("codingMagicTheme", isDarkTheme ? "dark" : "light");
}

function scrollToElement(element) {
    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}
