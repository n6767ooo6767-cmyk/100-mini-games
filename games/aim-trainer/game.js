const game = document.getElementById("game");
const target = document.getElementById("target");

const startBtn = document.getElementById("start");

const timeText = document.getElementById("time");
const hitsText = document.getElementById("hits");
const bestText = document.getElementById("best");

let hits = 0;
let time = 30;
let timer;
let playing = false;

let best = localStorage.getItem("aimBest") || 0;
bestText.textContent = best;

function moveTarget(){

    const size = target.offsetWidth;

    const x = Math.random() * (game.clientWidth - size);
    const y = Math.random() * (game.clientHeight - size);

    target.style.left = x + "px";
    target.style.top = y + "px";

}

function endGame(){

    playing = false;

    clearInterval(timer);

    target.style.display = "none";

    startBtn.disabled = false;
    startBtn.textContent = "Play Again";

    if(hits > best){

        best = hits;

        localStorage.setItem("aimBest", best);

        bestText.textContent = best;

        alert("🏆 New Record!\nHits: " + hits);

    }else{

        alert("Time's up!\nHits: " + hits);

    }

}

startBtn.addEventListener("click", ()=>{

    hits = 0;
    time = 30;

    hitsText.textContent = hits;
    timeText.textContent = time;

    playing = true;

    startBtn.disabled = true;

    target.style.display = "block";

    moveTarget();

    timer = setInterval(()=>{

        time--;

        timeText.textContent = time;

        if(time <= 0){

            endGame();

        }

    },1000);

});

target.addEventListener("click", ()=>{

    if(!playing) return;

    hits++;

    hitsText.textContent = hits;

    target.animate([

        {transform:"scale(1.4)",opacity:0.5},
        {transform:"scale(1)",opacity:1}

    ],{

        duration:120

    });

    moveTarget();

});

game.addEventListener("click",(e)=>{

    if(!playing) return;

    if(e.target !== target){

        game.animate([

            {transform:"translateX(-2px)"},
            {transform:"translateX(2px)"},
            {transform:"translateX(0px)"}

        ],{

            duration:80

        });

    }

});
