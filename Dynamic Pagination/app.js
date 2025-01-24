const people = [
  // Put Data here like this {id:x, name:y, family:z,}
];

let listContainer = document.getElementById("list");
let paginationContainer = document.getElementById("pagination");

let current_page = 1;
let rows = 5;

function displayUserInformation(
  names,
  listElement,
  pageContainer,
  rows_per_page,
  current_page
) {
  listContainer.innerHTML = "";
  let end = rows_per_page * current_page;
  let start = end - rows_per_page;
  let itemArray = names.slice(start, end);
  itemArray.forEach(function (person) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `${person.name} ${person.family}`;
    listElement.appendChild(item);
  });
  paginationButtonGenerator(current_page);
}
function paginationButtonGenerator(current_page) {
  paginationContainer.innerHTML = "";
  let pages = Math.ceil(people.length / rows);
  let i = 1;

  while (pages > i) {
    let newButton = document.createElement("button");
    newButton.className = "pagination-btn";
    newButton.innerHTML = i;
    newButton.addEventListener("click", function (e) {
      current_page = e.target.innerHTML;
      displayUserInformation(
        people,
        listContainer,
        paginationContainer,
        rows,
        current_page
      );
    });
    paginationContainer.append(newButton);
    i++;
  }
}

displayUserInformation(
  people,
  listContainer,
  paginationContainer,
  rows,
  current_page
);
