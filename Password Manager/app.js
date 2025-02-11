const popupMenu = document.querySelector(".popup-menu");
const addPassword = document.getElementById("addPassword");
const passwordListElement = document.getElementById("passwordList");
const searchInput = document.getElementById("search");

const websiteInput = document.getElementById("website");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const saveBtn = document.getElementById("savebtn");

const closeBtn = document.querySelector(".close");

let randomPasswordLength = 128;

let elementArray;

function popupMenuShower() {
  popupMenu.classList.remove("hidden");
}

function validator() {
  if (
    websiteInput.value.trim() === "" ||
    usernameInput.value.trim() === "" ||
    passwordInput.value.trim() === "" ||
    !websiteInput.value.trim().includes(".")
  ) {
    return;
  } else {
    passwordListElement.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
            <td class="website">${websiteInput.value.trim()}</td>
            <td class="user">${usernameInput.value.trim()}</td>
            <td class="pass" data-password="${passwordInput.value.trim()}"> ******** </td>
            <td>
              <button onclick="copyPassword()">Copy</button>
              <button onclick="deleteFunction()">Delete</button>
            </td>
          </tr>
        `
    );
    usernameInput.value = "";
    websiteInput.value = "";
    passwordInput.value = "";
    popupMenu.classList.add("hidden");
    saveAllFunction();
  }
}

function closePopup() {
  usernameInput.value = "";
  passwordInput.value = "";
  websiteInput.value = "";
  popupMenu.classList.add("hidden");
}

function copyPassword() {
  const password =
    event.target.parentElement.previousElementSibling.dataset.password;
  navigator.clipboard.writeText(password);
}

function deleteFunction() {
  const password = event.target.parentElement.parentElement;
  password.remove();
}

function saveAllFunction() {
  let webArray = [];
  let usersArray = [];
  let passArray = [];
  let allWebsites = document.querySelectorAll(".website");
  let allUsers = document.querySelectorAll(".user");
  let allPass = document.querySelectorAll(".pass");

  allWebsites.forEach((item) => {
    webArray.push(item.innerHTML);
  });
  allUsers.forEach((item) => {
    usersArray.push(item.innerHTML);
  });
  allPass.forEach((item) => {
    passArray.push(item.dataset.password);
    item.dataset = "";
  });
  localStorage.setItem("webArr", JSON.stringify(webArray));
  localStorage.setItem("usersArr", JSON.stringify(usersArray));
  localStorage.setItem("passArr", JSON.stringify(passArray));
}

function loadPreviousPasswords() {
  const webArray = JSON.parse(localStorage.getItem("webArr")) || [];
  const usersArray = JSON.parse(localStorage.getItem("usersArr")) || [];
  const passArray = JSON.parse(localStorage.getItem("passArr")) || [];

  elementArray = [];

  // passwordListElement.

  for (let i = 0; i < webArray.length; i++) {
    const rowString = `
      <tr>
        <td class="website">${webArray[i]}</td>
        <td class="user">${usersArray[i]}</td>
        <td class="pass" data-password="${passArray[i]}"> ******** </td>
        <td>
          <button onclick="copyPassword(this)">Copy</button>
          <button onclick="deleteFunction(this)">Delete</button>
        </td>
      </tr>
    `;

    elementArray.push(rowString);
  }

  elementArray.forEach((elem) => {
    passwordListElement.insertAdjacentHTML("beforeend", elem);
  });
}

function searchEngine() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const webArray = JSON.parse(localStorage.getItem("webArr")) || [];
  const usersArray = JSON.parse(localStorage.getItem("usersArr")) || [];
  const passArray = JSON.parse(localStorage.getItem("passArr")) || [];

  let elementArray = [];

  passwordListElement.innerHTML = "";

  for (let i = 0; i < webArray.length; i++) {
    if (webArray[i].toLowerCase().includes(searchTerm)) {
      const rowString = `
        <tr>
          <td class="website">${webArray[i]}</td>
          <td class="user">${usersArray[i]}</td>
          <td class="pass" data-password="${passArray[i]}"> ******** </td>
          <td>
            <button onclick="copyPassword(this)">Copy</button>
            <button onclick="deleteFunction(this)">Delete</button>
          </td>
        </tr>
      `;
      elementArray.push(rowString);
    }
  }

  passwordListElement.innerHTML = elementArray.join("");
}

function generatePassword() {
  let allLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    ",",
    ".",
    "<",
    ">",
    "/",
    "?",
    "|",
    "\\",
  ];
  let password = "";
  for (let index = 0; index < randomPasswordLength; index++) {
    let randomNum = Math.floor(Math.random() * allLetters.length);
    password += allLetters[randomNum];
  }
  passwordInput.value = password;
}

addPassword.addEventListener("click", popupMenuShower);
saveBtn.addEventListener("click", validator);
closeBtn.addEventListener("click", closePopup);

websiteInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    usernameInput.focus();
  }

  if (e.key === "ArrowUp") {
    passwordInput.focus();
  }

  if (e.key === "Enter") {
    validator();
  }
});

usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    passwordInput.focus();
  }
  if (e.key === "ArrowUp") {
    websiteInput.focus();
  }
  if (e.key === "Enter") {
    validator();
  }
});

passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    usernameInput.focus();
  }
  if (e.key === "ArrowDown") {
    websiteInput.focus();
  }

  if (e.key === "Enter") {
    validator();
  }
});

window.addEventListener("unload", saveAllFunction);
window.addEventListener("load", loadPreviousPasswords);
searchInput.addEventListener("input", searchEngine);
passwordInput.addEventListener("keydown", (e) => {
  if ((e.ctrlKey === true && e.key === "q") || e.key === "Q") {
    generatePassword();
  }
});
