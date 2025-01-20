let $ = document;

let clockTime = $.getElementById("timerDisplay");

let startBtn = $.getElementById("startBtn");

let pauseBtn = $.getElementById("pauseBtn");

let inputBox = $.getElementById("inputTime");

let resetBtn = $.getElementById("resetBtn");

let minutes = 0;

let seconds = 0;

function startFunction() {
  // Seconds to minute converter
  if (inputBox.value.trim() != "") {
    while (inputBox.value >= 60) {
      inputBox.value -= 60;
      minutes = minutes + 1;
      seconds = inputBox.value;
    }
    seconds = inputBox.value;
    inputBox.value = "";
    // Countdown Clock
    let interval = setInterval(function () {
      if (seconds === 0 && minutes === 0) {
        minutes = 0;
        seconds = 0;
        inputBox.value = "";
        clearInterval(interval);
      } else {
        if (seconds == 0) {
          minutes--;
          seconds = 60;
        } else if (seconds != 0) {
          seconds--;
        }

        if (minutes < 10 && seconds < 10) {
          clockTime.innerHTML = "0" + minutes + " : 0" + seconds;
        } else if (minutes < 10) {
          clockTime.innerHTML = "0" + minutes + " : " + seconds;
        } else if (seconds < 10) {
          clockTime.innerHTML = minutes + " : 0" + seconds;
        }
      }
    }, 1000);
    pauseBtn.addEventListener("click", function () {
      clearInterval(interval);
    });
    resetBtn.addEventListener("click", function () {
      clearInterval(interval);
      inputBox.value = "";
      minutes = 0;
      seconds = 0;
      clockTime.innerHTML = "00 : 00";
    });
  }
  clearInterval();
  return;
}

startBtn.addEventListener("click", startFunction);

// Auto Focus
window.addEventListener("keydown", function (e) {
  if (!isNaN(e.key)) inputBox.focus();
  if (e.key === "Enter") {
    startFunction();
  }
});
