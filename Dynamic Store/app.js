// DOM => Document Object Model
// BOM => Browser Object Model

let allProduct = [
  { id: 1, src: "images/1.png", name: "Boot", price: 25 },
  { id: 2, src: "images/2.png", name: "Men Shoes", price: 52 },
  { id: 3, src: "images/3.png", name: "Women Shoes", price: 99 },
  { id: 4, src: "images/4.png", name: "Men Shoes 2", price: 22 },
];

const container = document.querySelector(".container");

allProduct.forEach(function (item) {
  container.insertAdjacentHTML(
    "afterbegin",
    `
        <div class="product-card">
        <h1>${item.name}</h1>
        <p>Lorem ipsum, or lipsum as it is sometimes known</p>
        <div class="product-pic" style="background-image: url(${item.src});"></div>
        <div class="product-info">
          <div class="product-price">$${item.price}</div>
          <a href="product.html?id=${item.id}" + product.id + " class="product-button">See More</a>
        </div>
      </div>
        `
  );
});
