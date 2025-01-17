let PlayerMove = [...document.querySelectorAll(".choices button")];

let PlayerGuess;

let RPS = ["Rock", "Paper", "Scissors"];

let result = document.querySelector(".result");

PlayerMove.forEach(function (item) {
  item.addEventListener("click", function () {
    PlayerGuess = item.innerHTML;

    let guessRandom = Math.floor(Math.random() * 3);

    if (PlayerGuess === RPS[guessRandom]) {
      result.innerHTML = "Tie";
    } else if (
      (PlayerGuess === "Rock" && RPS[guessRandom] === "Scissors") ||
      (PlayerGuess === "Paper" && RPS[guessRandom] === "Rock") ||
      (PlayerGuess === "Scissors" && RPS[guessRandom] === "Paper")
    ) {
      result.innerHTML = "Winner";
    } else {
      result.innerHTML = "Loser";
    }
    console.log(
      "Players Guess: " + PlayerGuess,
      "\nComputers Guess: " + RPS[guessRandom]
    );
  });
});
