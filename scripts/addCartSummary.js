function addCartSummary(arr, targetEle) {
  let priceCurrency = "$";
  let subTotal = 0;
  let shipping = 0;
  if (arr.length) {
    arr.forEach((element) => {
      subTotal += element.price * element.qnty;
    });
  }

  targetEle.innerHTML = `<h3 class="summary-title">Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${priceCurrency + subTotal}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span class="free-text">${priceCurrency + shipping}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${priceCurrency + (subTotal + shipping)}</span>
          </div>

          <button class="order-now-btn">
            Order Now <i class="fas fa-arrow-right"></i>
          </button>`;
}

export default addCartSummary;
