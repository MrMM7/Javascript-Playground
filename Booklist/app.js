const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const addBtn = document.getElementById("addBtn");
const bookList = document.getElementById("book-list");
let dataBase = JSON.parse(localStorage.getItem("books")) || [];

window.addEventListener("load", function () {
  dataBase.forEach(function (book) {
    let newTrElement = document.createElement("tr");
    let newTitleElement = document.createElement("th");
    newTitleElement.innerHTML = book.Title;
    let newAuthorElement = document.createElement("th");
    newAuthorElement.innerHTML = book.Author;
    let newYearElement = document.createElement("th");
    newYearElement.innerHTML = book.Year;
    newTrElement.append(newTitleElement, newAuthorElement, newYearElement);
    bookList.append(newTrElement);
  });
});

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    titleInput.value.trim() != "" &&
    authorInput.value.trim() != "" &&
    yearInput.value.trim() != ""
  ) {
    if (!isNaN(yearInput.value)) {
      let newTrElement = document.createElement("tr");
      let newTitleElement = document.createElement("th");
      newTitleElement.innerHTML = titleInput.value;
      let newAuthorElement = document.createElement("th");
      newAuthorElement.innerHTML = authorInput.value;
      let newYearElement = document.createElement("th");
      newYearElement.innerHTML = yearInput.value;
      dataBase.push({
        Title: titleInput.value,
        Author: authorInput.value,
        Year: yearInput.value,
      });
      titleInput.value = "";
      authorInput.value = "";
      yearInput.value = "";
      newTrElement.append(newTitleElement, newAuthorElement, newYearElement);
      localStorage.setItem("books", JSON.stringify(dataBase));
      bookList.append(newTrElement);
    } else {
      alert("Please enter a valid number.");
    }
  } else {
    alert("Please fill the informations correctly.");
  }
});
window.addEventListener("keydown", function (e) {
  if (e.ctrlKey === true && e.key === "b") {
    localStorage.clear();
    [...bookList.children].forEach(function (i) {
      i.remove();
    });
  }
});
