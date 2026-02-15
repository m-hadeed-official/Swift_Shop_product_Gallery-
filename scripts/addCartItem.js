function addCartItem(obj, target) {
  console.log("object Qntty", obj.qnty);

  // parent (example: cart items container)
  const cartList = document.getElementById("cart-items-list");

  // main cart item
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";

  // image wrapper
  const itemImg = document.createElement("div");
  itemImg.className = "item-img";

  const img = document.createElement("img");
  img.src = obj.image.imageURL;
  img.alt = obj.image.imageAlt;

  itemImg.append(img);

  // item details
  const itemDetails = document.createElement("div");
  itemDetails.className = "item-details";

  // item main section
  const itemMain = document.createElement("div");
  itemMain.className = "item-main";

  const heading = document.createElement("h3");
  heading.className = "item-heading";
  heading.textContent = obj.title;

  const price = document.createElement("span");
  price.className = "item-price";
  price.textContent = obj.priceCurrency + obj.price;

  itemMain.append(heading, price);

  // item actions
  const itemActions = document.createElement("div");
  itemActions.className = "item-actions";

  // quantity controls
  const quantityControls = document.createElement("div");
  quantityControls.className = "quantity-controls";

  const minusBtn = document.createElement("button");
  minusBtn.className = "qty-btn";
  minusBtn.type = "button";

  const minusIcon = document.createElement("i");
  minusIcon.className = "fas fa-minus";

  minusBtn.append(minusIcon);

  const qtyNumber = document.createElement("span");
  qtyNumber.className = "qty-number";
  qtyNumber.textContent = obj.qnty;

  const plusBtn = document.createElement("button");
  plusBtn.className = "qty-btn";
  plusBtn.type = "button";

  const plusIcon = document.createElement("i");
  plusIcon.className = "fas fa-plus";

  plusBtn.append(plusIcon);

  quantityControls.append(minusBtn, qtyNumber, plusBtn);

  minusBtn.onclick = () => qntyDecreaser(obj, qtyNumber);
  plusBtn.onclick = () => qntyIncreaser(obj, qtyNumber);

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.title = "Remove Item";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "far fa-trash-alt";

  deleteBtn.append(deleteIcon);

  // assemble actions
  itemActions.append(quantityControls, deleteBtn);

  // assemble details
  itemDetails.append(itemMain, itemActions);

  // assemble cart item
  cartItem.append(itemImg, itemDetails);

  deleteBtn.onclick = () => deleteCartItem(obj.id, cartItem);
  // append to parent
  target.appendChild(cartItem);
}

export default addCartItem;
