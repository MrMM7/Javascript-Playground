const addBtn = document.getElementById("add_btn");
const modal = document.querySelector(".modal");
const overlay = document.getElementById("overlay");
const submitBtn = document.getElementById("todo_submit");
const input = document.getElementById("todo_input");
const todoContainer = [...document.querySelectorAll(".todo-container")];
const noStatus = document.getElementById("no_status");
const todoCloseBtn = document.querySelector(".btn");

function todoHandler() {
  if (input.value.trim() != "") {
    let newTodoElement = document.createElement("div");
    newTodoElement.className = "todo";
    newTodoElement.draggable = "true";
    newTodoElement.innerHTML = input.value;
    newTodoElement.id = newTodoElement.innerHTML;
    let newSpanElement = document.createElement("span");
    newSpanElement.className = "close";
    newSpanElement.innerHTML = "&times;";
    newSpanElement.addEventListener("click", function (e) {
      e.target.parentElement.remove();
    });
    newTodoElement.append(newSpanElement);
    newTodoElement.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("todo", newTodoElement.id);
    });
    noStatus.append(newTodoElement);
    modal.classList.remove("active");
    overlay.classList.remove("active");
    input.value = "";
  }
}

addBtn.addEventListener("click", function () {
  modal.classList.add("active");
  overlay.classList.add("active");
  window.addEventListener("keydown", function (e) {
    input.focus();
    if (e.key === "Enter") {
      todoHandler();
    }
  });
});
submitBtn.addEventListener("click", todoHandler);

todoContainer.forEach(function (item) {
  item.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  item.addEventListener("drop", function (e) {
    let targetId = e.dataTransfer.getData("todo");
    let target = document.getElementById(targetId);
    e.target.append(target);
  });
});

todoCloseBtn.addEventListener("click", function () {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  input.value = "";
});
