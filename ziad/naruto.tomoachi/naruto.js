let hungerLevel = 100;
let sleepLevel = 100;
let trainingLevel = 100;

const hungerBar = document.getElementById("hunger-bar");
const sleepBar = document.getElementById("sleep-bar");
const trainingBar = document.getElementById("training-bar");
const naruto = document.getElementById("tails");

let hungerInterval;
let sleepInterval;
let trainingInterval;

startIntervals();

let gameIsResseting = false;

// Check and initialize achievements in localStorage
if (!localStorage.getItem("gameOverAchievement")) {
    localStorage.setItem("gameOverAchievement", "false");
}
if (!localStorage.getItem("allBarsFullAchievement")) {
    localStorage.setItem("allBarsFullAchievement", "false");
}

function startIntervals() {
    clearIntervals();
    hungerInterval = setInterval(decreaseHunger, 1000);
    sleepInterval = setInterval(decreaseSleep, 1000);
    trainingInterval = setInterval(decreaseTraining, 1000);
}

function clearIntervals() {
    clearInterval(hungerInterval);
    clearInterval(sleepInterval);
    clearInterval(trainingInterval);
}

function unlockAchievement(achievementName, message) {
    if (localStorage.getItem(achievementName) === "false") {
        localStorage.setItem(achievementName, "true"); // Mark achievement as claimed

        let achievementsDiv = document.getElementById("achievements");
        if (achievementsDiv) {
            achievementsDiv.style.display = "block"; // Show the achievement
        }

        let achievementText = achievementsDiv.querySelector("p");
        if (achievementText) {
            achievementText.textContent = `Achievement Unlocked: ${message}`;
        }

        let claimButton = achievementsDiv.querySelector("button");
        if (claimButton) {
            claimButton.onclick = function () {
                achievementsDiv.style.display = "none"; // Hide after claiming
            };
        }
    }
}

function again(){

}

function checkGameOver() {
    if (gameIsResseting) return;

    if (hungerLevel === 0 || sleepLevel === 0 || trainingLevel === 0) {
        unlockAchievement("gameOverAchievement", "It's game-over!");
        let dead = document.getElementById("skull");
        let smiling = document.getElementById("smiles");
        dead.style.display = "block";

        smiling.replaceWith(dead)

        let cry = document.getElementById("zuidpool").src;

        document.getElementById("buttons").style.display = "none";
        document.getElementById("tells").style.display = "none";
        document.getElementById("hinata").style.display = "none";
        document.getElementById("over").style.display = "block";
        document.getElementById("trie").style.display = "block";
        document.getElementById("okay").style.display = "block";
        document.getElementById("trie").style.position = "relative";
        document.getElementById("trie").style.top = "10em";
        document.getElementById("okay").style.top = "13em";
        document.getElementById("okay").style.left = "9em";

        naruto.src = cry;

        clearIntervals();
    }
}

function checkAllBarsFull() {
    if (hungerLevel === 100 && sleepLevel === 100 && trainingLevel === 100) {
        unlockAchievement("allBarsFullAchievement", "Welcome!");
        let dead = document.getElementById("skull");
        dead.style.display = "none";
    }
}

function decreaseHunger() {
    if (hungerLevel > 0) {
        hungerLevel -= 10;
        hungerBar.style.width = hungerLevel + "%";
        hungerBar.textContent = hungerLevel + "% ";
        checkAllBarsFull();
    } else {
        clearInterval(sleepInterval);
        hungerBar.textContent = "0%";
    }

    let firstElement = document.getElementById("first");
    let secondElement = document.getElementById("second");

    if (hungerLevel <= 70 && firstElement) {
        firstElement.style.display = "block";
    }
    if (hungerLevel <= 40 && firstElement && secondElement) {
        firstElement.innerHTML = secondElement.innerHTML;
    }
    checkGameOver();
}

function fullHunger() {
    hungerLevel = 100;
    hungerBar.style.width = hungerLevel + "%";
    hungerBar.textContent = "100%";
    checkAllBarsFull();
}
fullHunger();

function decreaseSleep() {
    if (sleepLevel > 0) {
        sleepLevel -= 10;
        sleepBar.style.width = sleepLevel + "%";
        sleepBar.textContent = sleepLevel + "% ";
        checkAllBarsFull();
    } else {
        clearInterval(hungerInterval);
        sleepBar.textContent = "0%";
    }

    let threeElement = document.getElementById("threede");
    let fourElement = document.getElementById("fourde");

    if (sleepLevel <= 70 && threeElement) {
        threeElement.style.display = "block";
    }
    if (sleepLevel <= 40 && threeElement && fourElement) {
        threeElement.innerHTML = fourElement.innerHTML;
    }
    checkGameOver();
}

function fullSleep() {
    sleepLevel = 100;
    sleepBar.style.width = sleepLevel + "%";
    sleepBar.textContent = "100%";
    checkAllBarsFull();
}
fullSleep();

function decreaseTraining() {
    if (trainingLevel > 0) {
        trainingLevel -= 10;
        trainingBar.style.width = trainingLevel + "%";
        trainingBar.textContent = trainingLevel + "% ";
        checkAllBarsFull();
    } else {
        clearInterval(trainingInterval);
        trainingBar.textContent = "0%";
    }

    let fiveElement = document.getElementById("fived");
    let sixElement = document.getElementById("sixed");

    if (trainingLevel <= 70 && fiveElement) {
        fiveElement.style.display = "block";
    }
    if (trainingLevel <= 40 && fiveElement && sixElement) {
        fiveElement.innerHTML = sixElement.innerHTML;
    }
    checkGameOver();
}

function fullTraining() {
    trainingLevel = 100;
    trainingBar.style.width = trainingLevel + "%";
    trainingBar.textContent = "100%";
    checkAllBarsFull();
}
fullTraining();

function food() {
    hungerLevel = Math.min(hungerLevel + 10, 100);
    hungerBar.style.width = `${hungerLevel}%`;
    hungerBar.textContent = hungerLevel + "%";

    const eating = document.getElementById("up");
    if (eating) {
        naruto.src = eating.src;
    }

    setTimeout(() => {
        naruto.src = document.getElementById("kid").src;
    }, 1500);
    checkAllBarsFull();
}

function sleep() {
    sleepLevel = Math.min(sleepLevel + 10, 100);
    sleepBar.style.width = `${sleepLevel}%`;
    sleepBar.textContent = sleepLevel + "%";

    const sleep = document.getElementById("sleeps");
    if (sleep) {
        naruto.src = sleep.src;
    }

    setTimeout(() => {
        naruto.src = document.getElementById("kid").src;
    }, 1500);
    checkAllBarsFull();
}

function train() {
    trainingLevel = Math.min(trainingLevel + 10, 100);
    trainingBar.style.width = trainingLevel + "%";
    trainingBar.textContent = trainingLevel + "%";

    const train = document.getElementById("trainnpic");
    if (train) {
        naruto.src = train.src;
    }

    setTimeout(() => {
        naruto.src = document.getElementById("kid").src;
    }, 1500);
    checkAllBarsFull();
}

let timer, sound, counter = 0;
sound = new Audio("sounds/themeSong..m4a");

function playAudio() {
    counter++;
    if (counter % 10 === 0) {
        sound.play();
    }
}

timer = setInterval(playAudio, 10);
