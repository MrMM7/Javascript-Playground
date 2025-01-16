let gameGrid = document.querySelector(".card-grid");

// Create an array with pairs (1,1,2,2,3,3,4,4)
let values = [1, 1, 2, 2, 3, 3, 4, 4];

// Shuffle the values array (Fisher-Yates Shuffle)
for (let i = values.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [values[i], values[j]] = [values[j], values[i]];
}

// Create the cards with shuffled values
values.forEach(function (value) {
  let newDivElement = document.createElement("div");
  newDivElement.className = "card";
  newDivElement.dataset.value = value;
  gameGrid.append(newDivElement);
});
let $ = document;

const preLoadAnimation = $.querySelector(".preloader");

const cards = $.querySelectorAll(".card");

let firstCard;

let secondCard;

// preload animation
window.addEventListener("load", function () {
  preLoadAnimation.classList.add("hidden");
});

cards.forEach(function (item) {
  item.addEventListener("click", function () {
    if (item.classList.contains("flipped")) return;
    item.classList.add("flipped");
    if (!firstCard) {
      firstCard = item;
    } else if (!secondCard) {
      secondCard = item;
      console.log(secondCard, firstCard);
      setTimeout(checkCards, 500);
    }
  });
});

function checkCards() {
  if (firstCard.dataset.value == secondCard.dataset.value) {
  } else {
    secondCard.classList.remove("flipped");
    firstCard.classList.remove("flipped");
    secondCard.innerHTML = "";
    firstCard.innerHTML = "";
  }

  firstCard = null;
  secondCard = null;
}
