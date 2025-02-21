import { database as db } from "./database.js";

let param = new URLSearchParams(window.location.search);
let urlParamValue = param.get("id");

const videoSource = document.querySelector("video");
const movieTitle = document.querySelector("#movie-title");

const mainDiv = document.querySelector(".movie-row");
function redirector(id) {
  location.href = `player.html?id=${id}`;
}
let charLimit = 130;
let movieFragment = document.createDocumentFragment();

function makeFourRandomNumbers() {
  // creates a array with 4 random unique numbers
  let randomFour = Array.from(
    new Set(String(Math.floor(Math.random() * 10000)).split(""))
  );
  if (randomFour.length != 4) {
    makeFourRandomNumbers();
  } else {
    return randomFour;
  }
}

let randomFour = makeFourRandomNumbers() || [1, 2, 3, 4];

randomFour.forEach((n) => {
  n = Number(n);
  let newDiv = document.createElement("div");
  newDiv.className = "movie-item";
  newDiv.addEventListener("click", () => {
    redirector(db[n].id);
  });
  let newImg = document.createElement("img");
  newImg.className = "movie-img";
  newImg.src = db[n].coverImg;
  let nameDiv = document.createElement("div");
  nameDiv.className = "movie-title";
  nameDiv.innerHTML = db[n].name;
  let descDiv = document.createElement("div");
  descDiv.className = "movie-desc";
  // 170 is the char limit
  descDiv.innerHTML = db[n].desc;
  if (db[n].desc.length >= charLimit) {
    let desc = db[n].desc.slice(0, charLimit);
    desc += ".....";
    descDiv.innerHTML = desc;
  }
  newDiv.append(newImg, nameDiv, descDiv);
  movieFragment.append(newDiv);
});

mainDiv.appendChild(movieFragment);

db.map((m) => {
  if (m.id == urlParamValue) {
    videoSource.src = m.videoSrc;
    movieTitle.innerHTML = m.name;
    return;
  }
});
