import { database as db } from "./database.js";

const mainDiv = document.querySelector(".movie-row");
function redirector(id) {
  location.href = `player.html?id=${id}`;
}
let charLimit = 140;
let movieFragment = document.createDocumentFragment();
db.forEach((m) => {
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

const h1Elem = document.querySelector("h1");
if (mainDiv.innerHTML !== "") {
  h1Elem.remove();
}
