const targetColor = document.getElementById("targetColor");
const yourColor = document.getElementById("yourColor");

const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");

const check = document.getElementById("check");
const next = document.getElementById("next");
const result = document.getElementById("result");

let target = {
    r:0,
    g:0,
    b:0
};

let best = localStorage.getItem("colorLabBest") || 0;

function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function newColor(){

    target.r = random(0,255);
    target.g = random(0,255);
    target.b = random(0,255);

    targetColor.style.background =
        `rgb(${target.r},${target.g},${target.b})`;

    result.textContent = "Accuracy: 0%";

}

function updatePlayer(){

    const r = red.value;
    const g = green.value;
    const b = blue.value;

    yourColor.style.background =
        `rgb(${r},${g},${b})`;

}

red.addEventListener("input",updatePlayer);
green.addEventListener("input",updatePlayer);
blue.addEventListener("input",updatePlayer);

check.addEventListener("click",()=>{

    const r = Number(red.value);
    const g = Number(green.value);
    const b = Number(blue.value);

    const distance = Math.sqrt(

        (r-target.r)**2 +
        (g-target.g)**2 +
        (b-target.b)**2

    );

    const maxDistance = Math.sqrt(255*255*3);

    let accuracy =
        100-(distance/maxDistance)*100;

    accuracy=Math.max(0,accuracy);

    accuracy=accuracy.toFixed(1);

    let text="";

    if(accuracy==100){

        text="🌈 PERFECT!";

    }else if(accuracy>=98){

        text="⭐⭐⭐⭐⭐ Amazing!";

    }else if(accuracy>=95){

        text="⭐⭐⭐⭐ Excellent!";

    }else if(accuracy>=90){

        text="⭐⭐⭐ Great!";

    }else if(accuracy>=80){

        text="⭐⭐ Good!";

    }else if(accuracy>=70){

        text="⭐ Nice!";

    }else{

        text="😅 Try Again";

    }

    result.innerHTML =
        `${text}<br>Accuracy: ${accuracy}%`;

    if(Number(accuracy)>best){

        best=Number(accuracy);

        localStorage.setItem(
            "colorLabBest",
            best
        );

    }

});

next.addEventListener("click",()=>{

    red.value=128;
    green.value=128;
    blue.value=128;

    updatePlayer();

    newColor();

});

updatePlayer();
newColor();
