import makeProductCard from "./scripts/productCard.js";

function makeFilterBtn(obj, target) {
  let filterBtn = document.createElement("button");
  filterBtn.classList.add("filter-btn");
  filterBtn.innerText = obj.name;
  filterBtn.addEventListener("click", () => {
    fetchProducts(obj.name);
  });
  target.appendChild(filterBtn);
}

let productGrid = document.getElementById("product-grid");
let filterSection = document.getElementById("filter-container");

fetch("http://localhost:3000/categories")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      makeFilterBtn(element, filterSection);
    });
  });

function fetchProducts(catName) {
  fetch("http://localhost:3000/products")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (catName.toLowerCase() === "all") {
        data.forEach((element) => {
          makeProductCard(element, productGrid);
        });
      } else {
        let filData = data.filter((element) => {
          return element.categoryBadge === catName;
        });
        filData.forEach((element) => {
          makeProductCard(element, productGrid);
        });
      }
    });
}
fetchProducts("all");
