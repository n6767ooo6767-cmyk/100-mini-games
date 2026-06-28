const box = document.getElementById("box");
const text = document.getElementById("text");
const startBtn = document.getElementById("start");
const best = document.getElementById("best");

let startTime = 0;
let waiting = false;
let canClick = false;
let timeout;

let bestScore = localStorage.getItem("reactionBest");

if (bestScore) {
    best.textContent = bestScore + " ms";
} else {
    best.textContent = "—";
}

function startGame() {

    clearTimeout(timeout);

    waiting = true;
    canClick = false;

    box.style.background = "#ff3b30";
    box.style.boxShadow = "0 0 25px rgba(255,59,48,.35)";
    box.textContent = "";

    text.textContent = "Жди зелёного цвета...";

    const delay = Math.random() * 3000 + 2000;

    timeout = setTimeout(() => {

        waiting = false;
        canClick = true;

        box.style.background = "#32d74b";
        box.style.boxShadow = "0 0 35px rgba(50,215,75,.6)";
        box.textContent = "CLICK!";

        startTime = performance.now();

    }, delay);

}

startBtn.addEventListener("click", startGame);

box.addEventListener("click", () => {

    if (waiting) {

        clearTimeout(timeout);

        text.textContent = "❌ Слишком рано!";

        box.style.background = "#ff3b30";
        box.textContent = "";

        waiting = false;

        return;

    }

    if (!canClick) return;

    canClick = false;

    const reaction = Math.round(performance.now() - startTime);

    text.textContent = `⚡ ${reaction} ms`;

    box.style.background = "#4ea5ff";
    box.style.boxShadow = "0 0 35px rgba(78,165,255,.5)";
    box.textContent = "GOOD!";

    if (!bestScore || reaction < bestScore) {

        bestScore = reaction;

        localStorage.setItem("reactionBest", reaction);

        best.textContent = reaction + " ms";

    }

});
