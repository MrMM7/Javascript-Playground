const input = document.getElementById("itemInput");
const todoList = document.getElementById("todoList");
const clearAllBtn = document.getElementById("clearButton");
const addBtn = document.getElementById("addButton");
let array = JSON.parse(localStorage.getItem("Todos"));
if (array === null) array = [];
const container = document.querySelector(".container");
const preLoader = document.querySelector(".preloader");
const themeChangerBtn = document.getElementById("theme");
let themeFlag = JSON.parse(localStorage.getItem("theme")) || false;

// Fake artifical preload wait
setTimeout(function () {
  preLoader.classList.add("fade-out-background");
  preLoader.firstElementChild.classList.add("fade-out");
  container.style.visibility = "visible";
}, 5000);

function newTodo() {
  if (input.value.trim() != "") {
    let newLiElement = document.createElement("li");
    newLiElement.className = "completed well";
    let newLableElement = document.createElement("label");
    newLableElement.innerHTML = input.value;
    let newCompleteBtn = document.createElement("button");
    newCompleteBtn.innerHTML = "Complete";
    newCompleteBtn.className = "btn btn-success";
    newCompleteBtn.addEventListener("click", function () {
      if (newLableElement.classList.contains("completed")) {
        newLableElement.classList.remove("completed");
        newCompleteBtn.innerHTML = "Complete";
        item.status = "inComplete";
      } else {
        newLableElement.classList.add("completed");
        newCompleteBtn.innerHTML = "unComplete";
        item.status = "Complete";
      }
    });
    let newDeleteBtn = document.createElement("button");
    newDeleteBtn.innerHTML = "Delete";
    newDeleteBtn.className = "btn btn-danger";
    newDeleteBtn.addEventListener("click", function (e) {
      array.forEach(function (item) {
        if (
          item.content ===
          e.target.previousElementSibling.previousElementSibling.innerHTML
        ) {
          let itemIndex = array.indexOf(item);
          array.splice(itemIndex, 1);
        }
      });

      e.target.parentElement.remove();
    });
    array.push({ content: newLableElement.innerHTML, status: "inComplete" });
    newLiElement.append(newLableElement, newCompleteBtn, newDeleteBtn);
    todoList.append(newLiElement);
    input.value = "";
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter")
    if (input.value.trim() != "") {
      newTodo();
    }
});

clearAllBtn.addEventListener("click", function () {
  todoList.innerHTML = "";
  localStorage.clear();
  array = [];
});

addBtn.addEventListener("click", newTodo);

window.addEventListener("keydown", function () {
  input.focus();
});

window.addEventListener("unload", function () {
  localStorage.setItem("Todos", JSON.stringify(array));
});
window.addEventListener("load", function () {
  if (array != "") {
    array.forEach(function (item) {
      let newLiElement = document.createElement("li");
      newLiElement.className = "completed well";
      let newLableElement = document.createElement("label");
      newLableElement.innerHTML = item.content;
      let newCompleteBtn = document.createElement("button");
      newCompleteBtn.innerHTML = "Complete";
      newCompleteBtn.className = "btn btn-success";
      newCompleteBtn.addEventListener("click", function () {
        if (newLableElement.classList.contains("completed")) {
          newLableElement.classList.remove("completed");
          newCompleteBtn.innerHTML = "Complete";
          item.status = "inComplete";
        } else {
          newLableElement.classList.add("completed");
          newCompleteBtn.innerHTML = "unComplete";
          item.status = "Complete";
        }
      });
      let newDeleteBtn = document.createElement("button");
      newDeleteBtn.innerHTML = "Delete";
      newDeleteBtn.className = "btn btn-danger";
      newDeleteBtn.addEventListener("click", function (e) {
        array.forEach(function (item) {
          if (
            item.content ===
            e.target.previousElementSibling.previousElementSibling.innerHTML
          ) {
            let itemIndex = array.indexOf(item);
            array.splice(itemIndex, 1);
          }
        });

        e.target.parentElement.remove();
      });
      newLiElement.append(newLableElement, newCompleteBtn, newDeleteBtn);
      todoList.append(newLiElement);
      if (item.status === "Complete") {
        newLableElement.classList.add("completed");
        newCompleteBtn.innerHTML = "unComplete";
      }
    });
  }
});
themeChangerBtn.addEventListener("click", function () {
  themeFlag = !themeFlag; // Toggle the theme flag

  if (themeFlag) {
    document.body.classList.add("darkBody");
    document.querySelectorAll("label").forEach((item) => {
      item.classList.add("darkLabel");
    });
    input.classList.add("darkInput");
    document.querySelectorAll(".completed").forEach((item) => {
      item.classList.add("darkTodo");
    });
  } else {
    document.body.classList.remove("darkBody");
    document.querySelectorAll("label").forEach((item) => {
      item.classList.remove("darkLabel");
    });
    input.classList.remove("darkInput");
    document.querySelectorAll(".completed").forEach((item) => {
      item.classList.remove("darkTodo");
    });
  }

  localStorage.setItem("theme", JSON.stringify(themeFlag)); // Save updated value
});
window.onload = function () {
  if (themeFlag) {
    document.body.classList.add("darkBody");
    document.querySelectorAll("label").forEach((item) => {
      item.classList.add("darkLabel");
    });
    input.classList.add("darkInput");
    document.querySelectorAll(".completed").forEach((item) => {
      item.classList.add("darkTodo");
    });
  } else {
    document.body.classList.remove("darkBody");
    document.querySelectorAll("label").forEach((item) => {
      item.classList.remove("darkLabel");
    });
    input.classList.remove("darkInput");
    document.querySelectorAll(".completed").forEach((item) => {
      item.classList.remove("darkTodo");
    });
  }
};
