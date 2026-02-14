function revealCart(arr, target) {
  target.innerHTML = "";
  target.classList.toggle("hidden");

  // SECTION
  const section = document.createElement("section");
  section.class = "cart-section";
  section.id = "shopping-cart";
  if (arr.length) {
    // TITLE
    const h2 = document.createElement("h2");
    h2.className = "section-title";
    h2.textContent = "Your Cart";
    section.appendChild(h2);

    // CART CONTAINER
    const cartContainer = document.createElement("div");
    cartContainer.className = "cart-container";

    const cartItemsList = document.createElement("div");
    cartItemsList.className = "cart-items-list";
    cartItemsList.id = "cart-items-list";

    arr.forEach((element) => {
      // CART ITEM
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.id = "cart-item-1";

      // IMAGE WRAPPER
      const itemImg = document.createElement("div");
      itemImg.className = "item-img";

      const img = document.createElement("img");
      img.src = element.image.imageURL;
      img.alt = element.image.imageAlt;

      itemImg.appendChild(img);

      // ITEM DETAILS
      const itemDetails = document.createElement("div");
      itemDetails.className = "item-details";

      // ITEM MAIN
      const itemMain = document.createElement("div");
      itemMain.className = "item-main";

      const itemHeading = document.createElement("h3");
      itemHeading.className = "item-heading";
      itemHeading.textContent = element.title;

      const itemPrice = document.createElement("span");
      itemPrice.className = "item-price";
      itemPrice.textContent = element.priceCurrency + element.price;

      itemMain.appendChild(itemHeading);
      itemMain.appendChild(itemPrice);

      // ITEM ACTIONS
      const itemActions = document.createElement("div");
      itemActions.className = "item-actions";

      // QUANTITY CONTROLS
      const quantityControls = document.createElement("div");
      quantityControls.className = "quantity-controls";

      const minusBtn = document.createElement("button");
      minusBtn.className = "qty-btn";
      minusBtn.type = "button";

      const minusIcon = document.createElement("i");
      minusIcon.className = "fas fa-minus";
      minusBtn.appendChild(minusIcon);

      const qtyNumber = document.createElement("span");
      qtyNumber.className = "qty-number";
      qtyNumber.textContent = "1";

      const plusBtn = document.createElement("button");
      plusBtn.className = "qty-btn";
      plusBtn.type = "button";

      const plusIcon = document.createElement("i");
      plusIcon.className = "fas fa-plus";
      plusBtn.appendChild(plusIcon);

      quantityControls.appendChild(minusBtn);
      quantityControls.appendChild(qtyNumber);
      quantityControls.appendChild(plusBtn);

      // DELETE BUTTON
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.title = "Remove Item";

      const deleteIcon = document.createElement("i");
      deleteIcon.className = "far fa-trash-alt";
      deleteBtn.appendChild(deleteIcon);

      // Assemble item actions
      itemActions.appendChild(quantityControls);
      itemActions.appendChild(deleteBtn);

      // Assemble item details
      itemDetails.appendChild(itemMain);
      itemDetails.appendChild(itemActions);

      // Assemble cart item
      cartItem.appendChild(itemImg);
      cartItem.appendChild(itemDetails);

      // Add cart item to list
      cartItemsList.appendChild(cartItem);
    });
    // =====================
    // CART SUMMARY
    // =====================

    const cartSummary = document.createElement("aside");
    cartSummary.className = "cart-summary";

    const summaryTitle = document.createElement("h3");
    summaryTitle.className = "summary-title";
    summaryTitle.textContent = "Order Summary";

    // SUBTOTAL ROW
    const subtotalRow = document.createElement("div");
    subtotalRow.className = "summary-row";

    const subtotalText = document.createElement("span");
    subtotalText.textContent = "Subtotal";

    const subtotalValue = document.createElement("span");
    subtotalValue.textContent = "$970.00";

    subtotalRow.appendChild(subtotalText);
    subtotalRow.appendChild(subtotalValue);

    // SHIPPING ROW
    const shippingRow = document.createElement("div");
    shippingRow.className = "summary-row";

    const shippingText = document.createElement("span");
    shippingText.textContent = "Shipping";

    const shippingValue = document.createElement("span");
    shippingValue.className = "free-text";
    shippingValue.textContent = "FREE";

    shippingRow.appendChild(shippingText);
    shippingRow.appendChild(shippingValue);

    // TOTAL ROW
    const totalRow = document.createElement("div");
    totalRow.className = "summary-row total";

    const totalText = document.createElement("span");
    totalText.textContent = "Total";

    const totalValue = document.createElement("span");
    totalValue.textContent = "$970.00";

    totalRow.appendChild(totalText);
    totalRow.appendChild(totalValue);

    // ORDER BUTTON
    const orderBtn = document.createElement("button");
    orderBtn.className = "order-now-btn";

    const orderText = document.createTextNode("Order Now ");
    const arrowIcon = document.createElement("i");
    arrowIcon.className = "fas fa-arrow-right";

    orderBtn.appendChild(orderText);
    orderBtn.appendChild(arrowIcon);

    // Assemble summary
    cartSummary.appendChild(summaryTitle);
    cartSummary.appendChild(subtotalRow);
    cartSummary.appendChild(shippingRow);
    cartSummary.appendChild(totalRow);
    cartSummary.appendChild(orderBtn);

    // =====================
    // FINAL ASSEMBLY
    // =====================

    cartContainer.appendChild(cartItemsList);
    cartContainer.appendChild(cartSummary);
    section.appendChild(cartContainer);
  } else {
    console.log("inner else");
  }

  target.appendChild(section);
}

export default revealCart;
