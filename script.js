import makeProductCard from "./scripts/productCard.js";
import revealCartBody from "./scripts/cartSection.js";
import addCartItem from "./scripts/addCartItem.js";

import addCartSummary from "./scripts/addCartSummary.js";

let cartProducts = JSON.parse(localStorage.getItem("cartItems")) || [];

function makeFilterBtn(obj, target) {
  target.innerHTML += `<button class="filter-btn" onclick="fetchProductsByCat('${obj.name}' , this)">${obj.name}</button>`;
}
let cartButton = document.getElementById("cart-btn");
let productGrid = document.getElementById("product-grid");
let filterSection = document.getElementById("filter-container");
let productSearchBar = document.getElementById("product-search-bar");
let cartBadge = document.getElementById("cartBadge");
cartBadge.textContent = cartProducts.length;
let cart = document.getElementById("cart");

window.qntyDecreaser = function (obj, qtyDisplay) {
  if (+qtyDisplay.textContent > 1) {
    obj.qnty--;
    qtyDisplay.textContent = obj.qnty;
  }
  let cartSummarySection = document.getElementById("cartSummarySection");
  addCartSummary(cartProducts, cartSummarySection);
  localStorage.setItem("cartItems", JSON.stringify(cartProducts));
};
window.qntyIncreaser = function (obj, qtyDisplay) {
  obj.qnty++;
  qtyDisplay.textContent = obj.qnty;
  let cartSummarySection = document.getElementById("cartSummarySection");
  addCartSummary(cartProducts, cartSummarySection);
  localStorage.setItem("cartItems", JSON.stringify(cartProducts));
};

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

        cartBadge.textContent = cartProducts.length;

        revealCartBody(cartProducts, cart);
        let cartItemsList = document.getElementById("cart-items-list");
        let cartSummarySection = document.getElementById("cartSummarySection");
        addCartSummary(cartProducts, cartSummarySection);

        if (cartProducts.length) {
          cartProducts.forEach((element) => {
            addCartItem(element, cartItemsList);
          });
        } else {
          cartItemsList.innerHTML = `<h3 class = "empty_cart_msg">Cart Empty....</h3>`;
        }
      }
    });
};
function revealCart(arr, par) {
  revealCartBody(arr, par);

  let cartItemsList = document.getElementById("cart-items-list");
  console.log(cartItemsList);

  if (arr.length) {
    arr.forEach((element) => {
      addCartItem(element, cartItemsList);
    });
  } else {
    cartItemsList.innerHTML = `<h3 class = "empty_cart_msg">Cart Empty....</h3>`;
  }
  let cartSummarySection = document.getElementById("cartSummarySection");

  addCartSummary(arr, cartSummarySection);
  par.classList.toggle("hidden");
}

cartButton.onclick = () => revealCart(cartProducts, cart);

window.deleteCartItem = function (objID, target) {
  target.classList.add("delete_animate");
  // target.remove();
  target.addEventListener("animationend", () => {
    let obj = cartProducts.filter((element) => {
      return element.id == objID;
    })[0];

    let objIndex = cartProducts.indexOf(obj);
    console.log(objIndex);
    cartProducts.splice(objIndex, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartProducts));

    cartBadge.textContent = cartProducts.length;

    revealCartBody(cartProducts, cart);

    let cartSummarySection = document.getElementById("cartSummarySection");
    addCartSummary(cartProducts, cartSummarySection);

    let cartItemsList = document.getElementById("cart-items-list");
    console.log(cartItemsList);

    if (cartProducts.length) {
      cartProducts.forEach((element) => {
        addCartItem(element, cartItemsList);
      });
    } else {
      cartItemsList.innerHTML = `<h3 class = "empty_cart_msg">Cart Empty....</h3>`;
    }
  });
};
