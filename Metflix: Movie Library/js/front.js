import { database as db } from "./database.js";

const mainDiv = document.querySelector(".movie-row");
function redirector(id) {
  location.href = `player.html?id=${id}`;
}
function addMovies(arr) {
  let charLimit = 140;
  let movieFragment = document.createDocumentFragment();
  arr.forEach((m) => {
    let newDiv = document.createElement("div");
    newDiv.className = "movie-item";
    newDiv.addEventListener("click", () => {
      redirector(m.id);
    });
    let newImg = document.createElement("img");
    newImg.className = "movie-img";
    newImg.src = m.coverImg;
    let nameDiv = document.createElement("div");
    nameDiv.className = "movie-title";
    nameDiv.innerHTML = m.name;
    let descDiv = document.createElement("div");
    descDiv.className = "movie-desc";
    descDiv.innerHTML = m.desc;
    // 170 is the char limit
    if (m.desc.length >= charLimit) {
      let desc = m.desc.slice(0, charLimit);
      desc += ".....";
      descDiv.innerHTML = desc;
    }
    newDiv.append(newImg, nameDiv, descDiv);
    movieFragment.append(newDiv);
  });
  mainDiv.appendChild(movieFragment);
}

addMovies(db);

const h1Elem = document.querySelector("h1");
if (mainDiv.innerHTML !== "") {
  h1Elem.remove();
}

const inputBox = document.querySelector("input");

let randomNumber = Math.floor(Math.random() * 10);

inputBox.placeholder = db[randomNumber].name;
function searchEngine() {
  mainDiv.innerHTML = "";
  if (!inputBox.value.trim()) {
    addMovies(db);
  }
  let arr = [];
  db.forEach((obj) => {
    if (obj.name.toLowerCase().includes(inputBox.value.toLowerCase())) {
      arr.push(obj);
    }
  });

  addMovies(arr);
}

inputBox.addEventListener("input", searchEngine);
