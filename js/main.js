const scripts = [
    "./js/header.js",
    "./js/birthday.js",
    "./js/calculator.js",
    "./js/time-calculator.js",
    "./js/dino.js",
    "./js/football.js",
    "./js/max-number.js",
    "./js/number-guess.js",
    "./js/team-slider.js",
    "./js/scientists.js",
    "./js/rock-paper-scissors.js"
];

loadScripts(scripts);

function loadScripts(scriptPaths) {
    scriptPaths.reduce((chain, scriptPath) => {
        return chain.then(() => loadScript(scriptPath));
    }, Promise.resolve());
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.append(script);
    });
}
