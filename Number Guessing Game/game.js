// what are you doing here? go play the game!

const input = document.querySelector("input");

const feedBack = document.querySelector("#feedbackMessage");

let randomNumer = Math.floor(Math.random() * 100);

let timesGuessed = 0;

let flag = false; // DO NOT CHANGE

const numberOfGuesses = 5; // change this number to change how many guesses the player has

let totalNumberOfWins = localStorage.getItem("wins") || 0;

let totalNumberOfLosses = localStorage.getItem("losses") || 0;

const winElement = document.getElementById("win");

winElement.innerHTML = totalNumberOfWins;

const lossElement = document.getElementById("lose");

lossElement.innerHTML = totalNumberOfLosses;

const resetbtn = document.getElementById("resetbtn");

let timerTime = 60; // this is in seconds DO NOT PUT MINUTES

let timerStarted = true;

let gameWonFlag = false;

const hintStartingGuess = 2;

function game() {
  if (timerStarted) {
    timer();
  }
  if (flag) {
    return;
  } else {
    if (randomNumer === Number(input.value)) {
      feedBack.innerHTML = "You won!";
      localStorage.setItem("wins", ++totalNumberOfWins);
      winElement.innerHTML = totalNumberOfWins;
      gameWonFlag = true;
      setTimeout(reloadFunction, 2500);
    } else {
      if (randomNumer > input.value) {
        feedBack.innerHTML = "Too low!";
      } else {
        feedBack.innerHTML = "Too high!";
      }
    }
    if (timesGuessed == hintStartingGuess) {
      hintSystem();
    }
    timesGuessed++;
  }
  if (timesGuessed === numberOfGuesses) gameEnd();
  // console.log(randomNumer); // uncomment the console.log to cheat ;)
}

// as the name suggests it ends the game when set number of guesses are guessed
function gameEnd() {
  feedBack.innerHTML = `You lost! The number was ${randomNumer}`;
  localStorage.setItem("losses", ++totalNumberOfLosses);
  flag = true;
  setTimeout(reloadFunction, 2500);
}

function reloadFunction() {
  location.reload();
}

function resetGame() {
  if (totalNumberOfLosses === 0 && totalNumberOfWins === 0) {
    const previousInnerHTML = feedBack.innerHTML;
    feedBack.innerHTML = "What are you trying to reset lil bro?";
    setTimeout(() => {
      feedBack.innerHTML = previousInnerHTML;
    }, 3500);
  } else {
    let pmpt = confirm("Are You Sure?");

    if (pmpt) {
      localStorage.removeItem("wins");
      localStorage.removeItem("losses");
      winElement.innerHTML = 0;
      lossElement.innerHTML = 0;
    } else {
      return;
    }
  }
}

function timeConverter() {
  timerTime;

  let seconds = 0;

  let minutes = 0;

  while (timerTime > 60) {
    timerTime -= 60;
    minutes++;
  }
  seconds = timerTime;

  let clockTime = [minutes, seconds];
  return clockTime;
}

function timer() {
  timerStarted = false;
  const clockElement = document.getElementById("clock");
  let minutes = timeConverter()[0];
  let seconds = timeConverter()[1];
  let clock = setInterval(() => {
    if (gameWonFlag) {
      clearInterval(clock);
    }
    seconds--;
    if (seconds == 0 && minutes != 0) {
      minutes--;
      seconds = 60;
    }
    if (minutes === 0 && seconds === 0) {
      clearInterval(clock);
      gameEnd();
    }
    if (minutes < 10 && seconds < 10) {
      clockElement.innerHTML = `0${minutes} : 0${seconds}`;
    } else if (minutes < 10) {
      clockElement.innerHTML = `0${minutes} : ${seconds}`;
    } else if (seconds < 10) {
      clockElement.innerHTML = `${minutes} : 0${seconds}`;
    }
    if (minutes === 0 && seconds < 33) {
      setInterval(() => {
        if (clockElement.style.backgroundColor === "white") {
          clockElement.style.backgroundColor = "red";
          clockElement.style.color = "white";
        } else {
          clockElement.style.backgroundColor = "white";
          clockElement.style.color = "black";
        }
      }, 500);
    }
  }, 1000);
}

function hintSystem() {
  let allHiddenElements = document.querySelectorAll(".hidden");
  allHiddenElements.forEach((e) => {
    e.classList.remove("hidden");
  });

  let firstRandomNum = Math.floor(Math.random() * 30);
  let secondRandomNum = Math.floor(Math.random() * 30);

  const hintElement = document.getElementById("hint");
  hintElement.innerHTML = `between ${randomNumer - firstRandomNum} and ${
    randomNumer + secondRandomNum
  }`;
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value != "") {
    game();
  }
});

window.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) input.focus();
});
input.addEventListener("input", () => {
  if (input.value > 100) {
    input.value = 100;
  }
});

const submitGuessBtn = document.getElementById("submitGuess");

resetbtn.addEventListener("click", resetGame);
submitGuessBtn.addEventListener("click", () => {
  if (input.value != "") {
    game();
  }
});
