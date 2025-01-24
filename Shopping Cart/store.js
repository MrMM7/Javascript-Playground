const allProduct = [
  { id: 1, imagesrc: "Images/Album 1.png", price: "12.99", product: "Album" },
  { id: 2, imagesrc: "Images/Album 2.png", price: "14.99", product: "Album" },
  { id: 3, imagesrc: "Images/Album 3.png", price: "21.99", product: "Album" },
  { id: 4, imagesrc: "Images/Album 4.png", price: "19.99", product: "Album" },
  { id: 5, imagesrc: "Images/Cofee.png", price: "9.99", product: "Coffee" },
  { id: 6, imagesrc: "Images/Shirt.png", price: "29.99", product: "Shirt" },
];

const productContainer = document.querySelector(".shop-items");
const cartContainer = document.querySelector(".cart-items");
let price = 0;

// Add all store products
allProduct.forEach(function (prod) {
  let mainDiv = document.createElement("div");
  mainDiv.className = "shop-item";
  let firstSpan = document.createElement("span");
  firstSpan.className = "shop-item-title";
  if (prod.product === "Album")
    firstSpan.innerHTML = prod.product + " " + prod.id;
  else firstSpan.innerHTML = prod.product;
  let newImg = document.createElement("img");
  newImg.className = "shop-item-image";
  newImg.src = prod.imagesrc;
  let secondDiv = document.createElement("div");
  secondDiv.className = "shop-item-details";
  let secondSpan = document.createElement("span");
  secondSpan.className = "shop-item-price";
  secondSpan.innerHTML = "$" + prod.price;
  let buyBtn = document.createElement("button");
  buyBtn.className = "btn btn-primary shop-item-button";
  buyBtn.type = "button";
  buyBtn.innerHTML = "ADD TO CART";
  buyBtn.addEventListener("click", addProduct);
  secondDiv.append(secondSpan, buyBtn);
  mainDiv.append(firstSpan, newImg, secondDiv);
  productContainer.append(mainDiv);
});

function addProduct(e) {
  let cartRow = document.createElement("div");
  cartRow.className = "cart-row";
  let imagesrc = e.target.parentElement.parentElement.children[1].src;
  let newRow = document.createElement("div");
  newRow.className = "cart-item cart-column";
  let cartItem = document.createElement("div");
  cartItem.className = "cart-item cart-column";
  let image = document.createElement("img");
  image.className = "cart-item-image";
  image.src = imagesrc;
  image.style.width = "100px";
  image.style.height = "100px";
  let firstSpan = document.createElement("span");
  firstSpan.className = "cart-item-title";
  firstSpan.innerHTML =
    e.target.parentElement.parentElement.children[0].innerHTML;
  let priceSpan = document.createElement("span");
  priceSpan.className = "cart-price cart-column";
  priceSpan.innerHTML = e.target.parentElement.children[0].innerHTML;
  let lastDiv = document.createElement("div");
  lastDiv.className = "cart-quantity cart-column";
  let newInput = document.createElement("input");
  newInput.className = "cart-quantity-input";
  newInput.type = "number";
  newInput.value = 1;
  newInput.min = 0;
  newInput.addEventListener("input", inputCountHandler);
  let removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger";
  removeBtn.type = "button";
  removeBtn.innerHTML = "REMOVE";
  removeBtn.addEventListener("click", removeProduct);
  lastDiv.append(newInput, removeBtn);
  newRow.append(image, firstSpan);
  cartRow.append(newRow, priceSpan, lastDiv);
  cartContainer.append(cartRow);
  let priceText = e.target.parentElement.children[0].innerHTML.trim();
  price += parseFloat(priceText.replace(/[^0-9.]/g, ""));
  totalPrice();
}
function removeProduct(e) {
  e.target.parentElement.parentElement.remove();
}
function totalPrice() {
  const priceCounter = document.querySelector(".cart-total-price");
  priceCounter.innerHTML = "$" + price;
}
function inputCountHandler(e) {
  let targetPrice = parseFloat(
    e.target.parentElement.previousElementSibling.innerHTML.slice(1)
  );

  let quantity = parseInt(e.target.value) || 0;

  // Get previous quantity or assume 1 if not set
  let previousQuantity = parseInt(e.target.dataset.previousQuantity) || 1;

  // If quantity is zero, remove the item
  if (quantity === 0) {
    e.target.parentElement.parentElement.remove();
    price -= previousQuantity * targetPrice; // Subtract the price of the removed item
  } else {
    // Adjust price based on the quantity change
    price += (quantity - previousQuantity) * targetPrice;
  }

  // Update the dataset to store the new quantity
  e.target.dataset.previousQuantity = quantity;

  // Ensure price is rounded to 2 decimal places
  price = Math.round(price * 100) / 100;

  totalPrice();
}
