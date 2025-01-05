let $ = document;

const divList = $.getElementById("listed");
divList.style.cursor = "default";
const input = $.getElementById("input-field");
const btnDelete = $.getElementById("btn-delete");
const addBtn = $.getElementById("btn-save");
const colorList = $.querySelectorAll(".color-box");
const warningText = $.getElementById("warningText");

function addTodo(event) {
  if (input.value.trim() != "") {
    if (event.key == "Enter") {
      const newDivElem = $.createElement("div");
      newDivElem.className = "card shadow-sm rounded";
      newDivElem.style.backgroundColor = input.style.backgroundColor;
      newDivElem.style.cursor = "pointer";
      const newPElem = document.createElement("p");
      newPElem.innerHTML = input.value.trim();
      newPElem.className = "card-text p-3";
      newDivElem.addEventListener("click", function (event) {
        newDivElem.remove();
      });
      newDivElem.append(newPElem);
      divList.append(newDivElem);
      input.value = "";
      input.style.backgroundColor = "white";
    }
  }
}
function addTodoBtn() {
  if (input.value.trim() != "") {
    const newDivElem = $.createElement("div");
    newDivElem.className = "card shadow-sm rounded";
    newDivElem.style.backgroundColor = input.style.backgroundColor;
    const newPElem = document.createElement("p");
    newPElem.innerHTML = input.value.trim();
    newPElem.className = "card-text p-3";
    newDivElem.addEventListener("click", function (event) {
      newDivElem.remove();
    });
    newDivElem.append(newPElem);
    divList.append(newDivElem);
    input.value = "";
    input.style.backgroundColor = "white";
  }
}
input.addEventListener("keydown", addTodo);

btnDelete.addEventListener("click", function () {
  input.value = "";
});

addBtn.addEventListener("click", addTodoBtn);

colorList.forEach(function (item) {
  item.addEventListener("click", function () {
    input.style.backgroundColor = item.style.backgroundColor;
  });
});

$.body.addEventListener("keydown", function () {
  input.focus();
});
