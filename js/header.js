const interactFilterBtn = document.querySelector("#interact-filter");
const gamesFilter = document.querySelector("#games-filter");
const filterMenuBtn = document.querySelector("#filter-menu");
const filterMenuModal = document.querySelector("#filter-menu-modal");
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
const filteredSections = document.querySelectorAll("[data-game-category]");

interactFilterBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    gamesFilter.classList.toggle("hidden");
});

filterMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    filterMenuModal.classList.toggle("show");
});

document.addEventListener("click", (event) => {
    if (!gamesFilter.contains(event.target) && event.target !== interactFilterBtn) {
        gamesFilter.classList.add("hidden");
    }

    if (!filterMenuModal.contains(event.target) && event.target !== filterMenuBtn) {
        filterMenuModal.classList.remove("show");
    }
});

Object.entries(filterButtons).forEach(([category, buttons]) => {
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            filterSections(category);
            gamesFilter.classList.add("hidden");
            filterMenuModal.classList.remove("show");
        });
    });
});

function filterSections(activeCategory) {
    filteredSections.forEach((section) => {
        const isActiveSection = section.dataset.gameCategory === activeCategory;
        section.hidden = !isActiveSection;
    });
}
