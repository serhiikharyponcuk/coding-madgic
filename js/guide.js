const gameGuides = document.querySelectorAll('.game-guide');

gameGuides.forEach((gameGuide) => {
    const guideButton = gameGuide.querySelector('summary');

    guideButton.addEventListener('click', (event) => {
        if (!gameGuide.open) {
            return;
        }

        event.preventDefault();

        if (gameGuide.classList.contains('closing')) {
            return;
        }

        closeGameGuide(gameGuide);
    });
});

document.addEventListener('click', (event) => {
    gameGuides.forEach((gameGuide) => {
        if (gameGuide.open && !gameGuide.contains(event.target)) {
            closeGameGuide(gameGuide);
        }
    });
});

function closeGameGuide(gameGuide) {
    if (gameGuide.classList.contains('closing')) {
        return;
    }

    gameGuide.classList.add('closing');

    setTimeout(() => {
        gameGuide.open = false;
        gameGuide.classList.remove('closing');
    }, 420);
}
