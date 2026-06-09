const scientists = [
    {
        name: "Albert",
        surname: "Einstein",
        born: 1879,
        dead: 1955,
        id: 1
    },
    {
        name: "Isaac",
        surname: "Newton",
        born: 1643,
        dead: 1727,
        id: 2
    },
    {
        name: "Galileo",
        surname: "Galilei",
        born: 1564,
        dead: 1642,
        id: 3
    },
    {
        name: "Marie",
        surname: "Curie",
        born: 1867,
        dead: 1934,
        id: 4
    },
    {
        name: "Johannes",
        surname: "Kepler",
        born: 1571,
        dead: 1630,
        id: 5
    },
    {
        name: "Nicolaus",
        surname: "Copernicus",
        born: 1473,
        dead: 1543,
        id: 6
    },
    {
        name: "Max",
        surname: "Planck",
        born: 1858,
        dead: 1947,
        id: 7
    },
    {
        name: "Katherine",
        surname: "Blodgett",
        born: 1898,
        dead: 1979,
        id: 8
    },
    {
        name: "Ada",
        surname: "Lovelace",
        born: 1815,
        dead: 1852,
        id: 9
    },
    {
        name: "Sarah E.",
        surname: "Goode",
        born: 1855,
        dead: 1905,
        id: 10
    },
    {
        name: "Lise",
        surname: "Meitner",
        born: 1878,
        dead: 1968,
        id: 11
    },
    {
        name: "Hanna",
        surname: "Hammarstrom",
        born: 1829,
        dead: 1909,
        id: 12
    }
];

const bornIn19CenturyBtn = document.querySelector("#s-born-19");
const albertBornBtn = document.querySelector("#albert-born");
const sortByAlphabetBtn = document.querySelector("#abc");
const surnameStartsWithCBtn = document.querySelector("#surname-c");
const sortByLifetimeBtn = document.querySelector("#longer-live");
const removeNameStartsWithABtn = document.querySelector("#name-a");
const youngestScientistBtn = document.querySelector("#younger");
const longestAndShortestLifeBtn = document.querySelector("#older");
const sameFirstLettersBtn = document.querySelector("#a-a");
const resetScientistsBtn = document.querySelector("#scientists-reset");
const scientistsList = document.querySelector(".scientists-list");
const scientistCards = scientistsList.querySelectorAll(".scientists-item");
const scientistsButtons = document.querySelectorAll(".scientists-btn");

bornIn19CenturyBtn.addEventListener("click", () => {
    const scientistsFilterBorn = scientists.filter(({ born }) => born >= 1800 && born <= 1900);

    setActiveScientistsButton(bornIn19CenturyBtn);
    scientistsRender(scientistsFilterBorn);
});

sortByAlphabetBtn.addEventListener("click", () => {
    const scientistsSortABC = [...scientists].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    setActiveScientistsButton(sortByAlphabetBtn);
    scientistsRender(scientistsSortABC);
});

sortByLifetimeBtn.addEventListener("click", () => {
    const scientistsSortYears = [...scientists].sort((a, b) =>
        (a.dead - a.born) - (b.dead - b.born)
    );

    setActiveScientistsButton(sortByLifetimeBtn);
    scientistsRender(scientistsSortYears);
});

youngestScientistBtn.addEventListener("click", () => {
    const scientistsLatestBorn = [...scientists].sort((a, b) =>
        b.born - a.born
    );

    setActiveScientistsButton(youngestScientistBtn);
    scientistsRender([scientistsLatestBorn[0]]);
});

albertBornBtn.addEventListener("click", () => {
    const einsteinBorn = scientists.filter(scientist =>
        scientist.name === "Albert"
    );

    setActiveScientistsButton(albertBornBtn);
    scientistsRender(einsteinBorn);
});

surnameStartsWithCBtn.addEventListener("click", () => {
    const scientistsLetterC = scientists.filter(scientist =>
        scientist.surname[0] === "C"
    );

    setActiveScientistsButton(surnameStartsWithCBtn);
    scientistsRender(scientistsLetterC);
});

removeNameStartsWithABtn.addEventListener("click", () => {
    const scientistsWithoutA = scientists.filter(scientist =>
        scientist.name[0] !== "A"
    );

    setActiveScientistsButton(removeNameStartsWithABtn);
    scientistsRender(scientistsWithoutA);
});

longestAndShortestLifeBtn.addEventListener("click", () => {
    const scientistsLife = [...scientists].sort((a, b) =>
        (b.dead - b.born) - (a.dead - a.born)
    );

    const longestLife = scientistsLife[0];
    const shortestLife = scientistsLife[scientistsLife.length - 1];

    setActiveScientistsButton(longestAndShortestLifeBtn);
    scientistsRender([longestLife, shortestLife]);
});

sameFirstLettersBtn.addEventListener("click", () => {
    const sameFirstLetters = scientists.filter(scientist =>
        scientist.name[0] === scientist.surname[0]
    );

    setActiveScientistsButton(sameFirstLettersBtn);
    scientistsRender(sameFirstLetters);
});

resetScientistsBtn.addEventListener("click", () => {
    clearActiveScientistsButton();
    scientistsRender(scientists);
});

function scientistsRender(scientistsToRender) {
    scientistCards.forEach((scientistCard, index) => {
        const scientist = scientistsToRender[index];

        scientistCard.innerHTML = "";
        scientistCard.classList.add("scientists-item-empty");

        if (!scientist) {
            return;
        }

        scientistCard.classList.remove("scientists-item-empty");
        scientistCard.innerHTML = `
            <p class="scientists-ful-name">${scientist.name} ${scientist.surname}</p>
            <p class="scientists-live">${scientist.born}-${scientist.dead}</p>
        `;
    });
}

function setActiveScientistsButton(activeButton) {
    scientistsButtons.forEach((button) => {
        button.classList.remove("scientists-btn-active");
    });

    activeButton.classList.add("scientists-btn-active");
}

function clearActiveScientistsButton() {
    scientistsButtons.forEach((button) => {
        button.classList.remove("scientists-btn-active");
    });
}

scientistsRender(scientists);
