// ✌ :))
let allProduct = [
  { id: 1, src: "images/1.png", name: "Boot", price: 25, desc: "Lorem Iptum" },
  {
    id: 2,
    src: "images/2.png",
    name: "Men Shoes",
    price: 52,
    desc: "Lorem Iptum",
  },
  {
    id: 3,
    src: "images/3.png",
    name: "Women Shoes",
    price: 99,
    desc: "Lorem Iptum",
  },
  {
    id: 4,
    src: "images/4.png",
    name: "Men Shoes 2",
    price: 22,
    desc: "Lorem Iptum",
  },
];

let urlParameter = new URLSearchParams(location.search);
let userID = urlParameter.get("id");

let productFinder = allProduct.find(function (item) {
  return item.id == userID;
});

// if product is undefined then go back
if (!productFinder) {
  history.back();
}

const h1Element = document.querySelector("h1");
h1Element.innerHTML = productFinder.name;

const image = document.querySelector("img");
image.src = productFinder.src;

const pElement = document.querySelector("p");
pElement.innerHTML = productFinder.desc;

const backBtn = document.querySelector("button");

backBtn.addEventListener("click", function () {
  history.back();
});
