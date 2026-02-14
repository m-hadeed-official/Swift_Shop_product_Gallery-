import makeProductCard from "./scripts/productCard.js";
import revealCart from "./scripts/cartSection.js";
let cartProducts = JSON.parse(localStorage.getItem("cartItem")) || [];

function makeFilterBtn(obj, target) {
  target.innerHTML += `<button class="filter-btn" onclick="fetchProductsByCat('${obj.name}' , this)">${obj.name}</button>`;
}
let cartButton = document.getElementById("cart-btn");
let productGrid = document.getElementById("product-grid");
let filterSection = document.getElementById("filter-container");
let productSearchBar = document.getElementById("product-search-bar");

fetch("http://localhost:3000/categories")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      makeFilterBtn(element, filterSection);
    });
    filterSection.firstChild.onclick();
  });

window.fetchProductsByCat = function (catName, currentBtn) {
  let allFilterBtns = currentBtn.parentElement.childNodes;
  allFilterBtns.forEach((element) => {
    element.classList.remove("active");
  });
  currentBtn.classList.add("active");
  productGrid.innerHTML = "";

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
};
window.fetchProductsBySearch = function (searchInp) {
  let searchInpLower = searchInp.toLowerCase();
  fetch("http://localhost:3000/products")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let filteredData = data.filter((element) => {
        let titleLower = element.title.toLowerCase();
        return titleLower.includes(searchInpLower);
      });
      console.log(filteredData);

      if (filteredData.length) {
        productGrid.innerHTML = "";
        filteredData.forEach((element) => {
          makeProductCard(element, productGrid);
        });
      } else {
        productGrid.innerHTML = "Product Not Found";
      }
    });
};

productSearchBar.addEventListener("input", (e) => {
  console.log(productSearchBar.value.toLowerCase());

  fetchProductsBySearch(productSearchBar.value.toLowerCase());
});

window.addToCart = function (id) {
  fetch("http://localhost:3000/products")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let filData = data.filter((element) => element.id == id);
      let cartProductContains = cartProducts.some(
        (element) => element.id == id,
      );

      if (cartProductContains) {
        console.log("Product Exists");
      } else {
        cartProducts.push(filData[0]);
        localStorage.setItem("cartItems", JSON.stringify(cartProducts));
      }
    });
};
let cart = document.getElementById("cart");
cartButton.onclick = () => revealCart(cartProducts, cart);
