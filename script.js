import makeProductCard from "./scripts/productCard.js";
import revealCartBody from "./scripts/cartSection.js";
import addCartItem from "./scripts/addCartItem.js";

import addCartSummary from "./scripts/addCartSummary.js";

let cartProducts = JSON.parse(localStorage.getItem("cartItems")) || [];
let categoriesURL =
  "https://api.mockfly.dev/mocks/7b3618b5-d94e-4b28-99c9-161807b3c3a3/categories";
let productsURL =
  "https://api.mockfly.dev/mocks/7b3618b5-d94e-4b28-99c9-161807b3c3a3/products";

let cartButton = document.getElementById("cart-btn");
let productGrid = document.getElementById("product-grid");
let filterSection = document.getElementById("filter-container");
let productSearchBar = document.getElementById("product-search-bar");
let cartBadge = document.getElementById("cartBadge");

cartBadge.textContent = cartProducts.length;
let cart = document.getElementById("cart");
let cartWrapper = document.getElementById("cartWrapper");
function makeFilterBtn(obj, target) {
  target.innerHTML += `<button class="filter-btn" onclick="fetchProductsByCat('${obj.name}' , this)">${obj.name}</button>`;
}
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

fetch(categoriesURL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.categories.forEach((element) => {
      makeFilterBtn(element, filterSection);
    });
    filterSection.firstChild.onclick();
  })
  .catch((error) => {
    filterSection.innerHTML = `<div style = 'color :red;font-style:italic' >Error : fetching categories from server failed</div>`;
  });

window.fetchProductsByCat = function (catName, currentBtn) {
  let allFilterBtns = currentBtn.parentElement.childNodes;
  allFilterBtns.forEach((element) => {
    element.classList.remove("active");
  });
  currentBtn.classList.add("active");
  productGrid.innerHTML = "";

  fetch(productsURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.products);

      if (catName.toLowerCase() === "all") {
        data.products.forEach((element) => {
          makeProductCard(element, productGrid);
        });
      } else {
        let filData = data.products.filter((element) => {
          return element.categoryBadge === catName;
        });
        filData.forEach((element) => {
          makeProductCard(element, productGrid);
        });
      }
    })
    .catch(() => {
      productGrid.innerHTML = `<div style = 'color :red;font-style:italic' >Error : fetching products from server failed</div>`;
    });
};

window.fetchProductsBySearch = function (searchInp) {
  let searchInpLower = searchInp.toLowerCase();
  fetch(productsURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let filteredData = data.products.filter((element) => {
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
    })
    .catch(() => {
      productGrid.innerHTML = `<div style = 'color :red;font-style:italic' >Error : fetching products from server failed</div>`;
    });
};

productSearchBar.addEventListener("input", () => {
  console.log(productSearchBar.value.toLowerCase());

  fetchProductsBySearch(productSearchBar.value.toLowerCase());
});

window.addToCart = function (obj) {
  let cartProductContains = cartProducts.some(
    (element) => element.id == obj.id,
  );

  if (cartProductContains) {
    console.log("Product Exists");
  } else {
    cartProducts.push(obj);
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
};
function revealCart(arr, par, cartWrap) {
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
  cartWrap.classList.toggle("hidden");
}

cartButton.onclick = () => revealCart(cartProducts, cart, cartWrapper);

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
