let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highestScore = localStorage.getItem('highestScore') || 0;  // Retrieve highest score from localStorage or default to 0

let h2 = document.querySelector("h2");
document.getElementById('highest-score').textContent = highestScore;  // Display highest score on the UI

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;  

    let randIdx = Math.floor(Math.random() * 3);  
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
    gameSeq.push(randColor);
    console.log("gameseq", gameSeq);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // If the current score (level) is greater than the highest score, update it
        if (level > highestScore) {
            highestScore = level;
            document.getElementById('highest-score').textContent = highestScore;  // Update displayed highest score
            localStorage.setItem('highestScore', highestScore);  // Store the new highest score in localStorage
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;  
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");  
    userSeq.push(userColor); 

    checkAns(userSeq.length - 1);  
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
